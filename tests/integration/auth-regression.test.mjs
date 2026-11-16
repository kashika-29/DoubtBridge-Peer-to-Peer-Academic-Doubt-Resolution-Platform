import test from 'node:test';
import assert from 'node:assert/strict';
import bcrypt from 'bcryptjs';
import { unsealData, sealData } from 'iron-session';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionSecret, sessionOptions, SESSION_COOKIE_NAME } from '@/lib/sessionConfig';
import { getSession } from '@/lib/session';
import { getCurrentUser } from '@/lib/auth';
import { middleware } from '@/middleware';
import { POST as loginHandler } from '@/app/api/auth/login/route';
import { POST as logoutHandler } from '@/app/api/auth/logout/route';
import { GET as meHandler } from '@/app/api/auth/me/route';
import { globalMockCookieStore } from '../mock-headers.mjs';

test('Integration: Authentication Regression Suite (Task 10)', async (t) => {
  const ts = Date.now();
  const validPassword = 'TestPassword123!';
  const activeEmail = `regres_active_${ts}@doubtbridge.test`;
  const suspendedEmail = `regres_suspended_${ts}@doubtbridge.test`;

  let activeUser = null;
  let suspendedUser = null;

  t.before(async () => {
    const passwordHash = await bcrypt.hash(validPassword, 12);

    activeUser = await prisma.user.create({
      data: {
        name: 'Active Test User',
        email: activeEmail,
        passwordHash,
        role: 'STUDENT',
        isActive: true,
        department: 'Computer Science',
        reputation: 100,
      },
    });

    suspendedUser = await prisma.user.create({
      data: {
        name: 'Suspended Test User',
        email: suspendedEmail,
        passwordHash,
        role: 'STUDENT',
        isActive: false,
        suspensionReason: 'Academic integrity violation',
        department: 'Physics',
      },
    });
  });

  t.after(async () => {
    const userIds = [activeUser?.id, suspendedUser?.id].filter(Boolean);
    if (userIds.length > 0) {
      await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    }
    globalMockCookieStore.clear();
    await prisma.$disconnect();
  });

  // ── 1. Valid credentials login ─────────────────────────────────────────────
  await t.test('1. Login with valid credentials succeeds and returns 200 + user data', async () => {
    globalMockCookieStore.clear();
    const req = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: activeEmail, password: validPassword }),
    });

    const res = await loginHandler(req);
    assert.equal(res.status, 200, 'Login must return 200 OK');

    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.user.email, activeEmail);
    assert.equal(data.user.id, activeUser.id);
    assert.equal(data.user.role, 'STUDENT');
    assert.equal(data.user.passwordHash, undefined, 'passwordHash must never be exposed');
  });

  // ── 2. Invalid password ───────────────────────────────────────────────────
  await t.test('2. Login with invalid password fails with 401', async () => {
    globalMockCookieStore.clear();
    const req = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: activeEmail, password: 'WrongPassword999!' }),
    });

    const res = await loginHandler(req);
    assert.equal(res.status, 401, 'Invalid password must return 401');

    const data = await res.json();
    assert.equal(data.success, false);
    assert.equal(data.error, 'Invalid email or password.');
  });

  // ── 3. Nonexistent user ───────────────────────────────────────────────────
  await t.test('3. Login with nonexistent user fails with 401', async () => {
    globalMockCookieStore.clear();
    const req = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: `nonexistent_${ts}@doubtbridge.test`, password: validPassword }),
    });

    const res = await loginHandler(req);
    assert.equal(res.status, 401, 'Nonexistent user must return 401');

    const data = await res.json();
    assert.equal(data.success, false);
    assert.equal(data.error, 'Invalid email or password.');
  });

  // ── 4. Inactive / Suspended user login ────────────────────────────────────
  await t.test('4. Login with inactive/suspended user fails with 403', async () => {
    globalMockCookieStore.clear();
    const req = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: suspendedEmail, password: validPassword }),
    });

    const res = await loginHandler(req);
    assert.equal(res.status, 403, 'Suspended user must return 403');

    const data = await res.json();
    assert.equal(data.success, false);
    assert.ok(data.error.includes('deactivated') || data.error.includes('contact support'));
  });

  // ── 5. Session cookie set in store ────────────────────────────────────────
  await t.test('5. Login sets doubtbridge_session cookie in session store', async () => {
    globalMockCookieStore.clear();
    const req = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: activeEmail, password: validPassword }),
    });

    await loginHandler(req);
    const cookie = globalMockCookieStore.get(SESSION_COOKIE_NAME);
    assert.ok(cookie, 'doubtbridge_session cookie must be set');
    assert.ok(typeof cookie.value === 'string' && cookie.value.length > 0);
  });

  // ── 6. Session cookie unseals correctly ───────────────────────────────────
  await t.test('6. Session cookie can be unsealed and contains correct userId and status', async () => {
    const cookie = globalMockCookieStore.get(SESSION_COOKIE_NAME);
    assert.ok(cookie, 'Cookie must exist from previous login');

    const secret = getSessionSecret();
    const unsealed = await unsealData(cookie.value, { password: secret });

    assert.equal(unsealed.userId, activeUser.id);
    assert.equal(unsealed.role, 'STUDENT');
    assert.equal(unsealed.isActive, true);
  });

  // ── 7. Authenticated request to /api/auth/me ──────────────────────────────
  await t.test('7. Authenticated request to /api/auth/me returns the user', async () => {
    // Session is already set from test 5
    const res = await meHandler();
    assert.equal(res.status, 200, 'Must return 200 for authenticated user');

    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.user.id, activeUser.id);
    assert.equal(data.user.email, activeEmail);
    assert.equal(data.user.isActive, true);
  });

  // ── 8. Unauthenticated request to /api/auth/me ────────────────────────────
  await t.test('8. Unauthenticated request to /api/auth/me returns 401', async () => {
    globalMockCookieStore.clear();
    const res = await meHandler();
    assert.equal(res.status, 401, 'Must return 401 when no session exists');

    const data = await res.json();
    assert.equal(data.success, false);
    assert.equal(data.error, 'Not authenticated.');
  });

  // ── 9. Logout clears the session ──────────────────────────────────────────
  await t.test('9. Logout clears the session cookie', async () => {
    // Re-establish session
    const session = await getSession();
    session.userId = activeUser.id;
    session.isActive = true;
    await session.save();

    const res = await logoutHandler();
    assert.equal(res.status, 200);

    // Verify session has been destroyed
    const postSession = await getSession();
    assert.equal(postSession.userId, undefined, 'userId must be undefined after logout');
  });

  // ── 10. Middleware protects routes from unauthenticated users ─────────────
  await t.test('10. Middleware protects /dashboard, /admin from unauthenticated requests', async () => {
    const protectedPaths = ['/dashboard', '/admin', '/admin/users'];

    for (const pathname of protectedPaths) {
      const req = new NextRequest(`http://localhost:3000${pathname}`);
      const res = await middleware(req);

      assert.equal(res.status, 307, `Unauthenticated ${pathname} must redirect with 307`);
      const location = res.headers.get('location');
      assert.ok(location.includes('/login'), `Redirect target must be /login`);
      assert.ok(location.includes(`callbackUrl=${encodeURIComponent(pathname)}`), `Callback URL must be preserved`);
    }

    // Protected API route must return 401 JSON
    const apiReq = new NextRequest('http://localhost:3000/api/dashboard/overview');
    const apiRes = await middleware(apiReq);
    assert.equal(apiRes.status, 401, 'Protected API route must return 401');
  });

  // ── 11. Middleware allows authenticated requests through ──────────────────
  await t.test('11. Middleware allows authenticated requests through to protected routes', async () => {
    const secret = getSessionSecret();
    const sealedCookie = await sealData(
      { userId: activeUser.id, role: 'STUDENT', isActive: true },
      { password: secret }
    );

    const req = new NextRequest('http://localhost:3000/dashboard', {
      headers: {
        cookie: `${SESSION_COOKIE_NAME}=${encodeURIComponent(sealedCookie)}`,
      },
    });

    const res = await middleware(req);
    assert.equal(res.status, 200, 'Authenticated request must be allowed through');
    assert.equal(res.headers.get('x-middleware-next'), '1');
  });

  // ── 12. Middleware rejects deactivated/suspended users ────────────────────
  await t.test('12. Middleware rejects deactivated/suspended users', async () => {
    const secret = getSessionSecret();
    const suspendedCookie = await sealData(
      { userId: suspendedUser.id, role: 'STUDENT', isActive: false },
      { password: secret }
    );

    // Page route redirects to /login
    const pageReq = new NextRequest('http://localhost:3000/dashboard', {
      headers: {
        cookie: `${SESSION_COOKIE_NAME}=${encodeURIComponent(suspendedCookie)}`,
      },
    });

    const pageRes = await middleware(pageReq);
    assert.equal(pageRes.status, 307, 'Suspended user must be redirected away from dashboard');
    assert.ok(pageRes.headers.get('location').includes('/login'));

    // API route returns 403
    const apiReq = new NextRequest('http://localhost:3000/api/dashboard/overview', {
      headers: {
        cookie: `${SESSION_COOKIE_NAME}=${encodeURIComponent(suspendedCookie)}`,
      },
    });

    const apiRes = await middleware(apiReq);
    assert.equal(apiRes.status, 403, 'Suspended user must receive 403 on API routes');
  });

  // ── 13. Production SESSION_SECRET validation ──────────────────────────────
  await t.test('13. Production SESSION_SECRET validation: throws in production, succeeds in dev', () => {
    const origEnv = process.env.NODE_ENV;
    const origSecret = process.env.SESSION_SECRET;

    try {
      process.env.NODE_ENV = 'production';

      // 13a. Missing secret in production throws
      delete process.env.SESSION_SECRET;
      assert.throws(
        () => getSessionSecret(),
        (err) => err.message.includes('CRITICAL CONFIGURATION ERROR')
      );

      // 13b. Short secret in production throws
      process.env.SESSION_SECRET = 'short_secret_under_32';
      assert.throws(
        () => getSessionSecret(),
        (err) => err.message.includes('CRITICAL CONFIGURATION ERROR')
      );

      // 13c. Placeholder secret in production throws
      process.env.SESSION_SECRET = 'changeme_at_least_32_chars_long_placeholder!!';
      assert.throws(
        () => getSessionSecret(),
        (err) => err.message.includes('CRITICAL CONFIGURATION ERROR')
      );

      // 13d. Valid production secret succeeds
      process.env.SESSION_SECRET = 'c84a51e62ff1875e525143a53fef3cbb27685d3f82cb5635f60641154c1be48a';
      assert.equal(getSessionSecret(), 'c84a51e62ff1875e525143a53fef3cbb27685d3f82cb5635f60641154c1be48a');

      // 13e. Development mode uses fallback if unset
      process.env.NODE_ENV = 'development';
      delete process.env.SESSION_SECRET;
      const devSecret = getSessionSecret();
      assert.ok(devSecret.length >= 32, 'Dev fallback secret must be >= 32 characters');
    } finally {
      process.env.NODE_ENV = origEnv;
      process.env.SESSION_SECRET = origSecret;
    }
  });

  // ── 14. Session persistence ───────────────────────────────────────────────
  await t.test('14. Session persistence: sequential requests with the same cookie maintain session', async () => {
    // Log in to get fresh session
    globalMockCookieStore.clear();
    const loginReq = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: activeEmail, password: validPassword }),
    });
    await loginHandler(loginReq);

    // Perform 3 sequential getCurrentUser() queries
    for (let i = 0; i < 3; i++) {
      const user = await getCurrentUser();
      assert.ok(user !== null, `Request ${i + 1} must resolve user`);
      assert.equal(user.id, activeUser.id, `Request ${i + 1} user ID must match`);
      assert.equal(user.isActive, true, `Request ${i + 1} user must be active`);
    }

    // Perform 3 sequential /api/auth/me requests
    for (let i = 0; i < 3; i++) {
      const meRes = await meHandler();
      assert.equal(meRes.status, 200, `/api/auth/me call ${i + 1} must return 200`);
      const meData = await meRes.json();
      assert.equal(meData.user.id, activeUser.id);
    }
  });
});

