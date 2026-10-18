'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/dashboard' },
    { label: 'Academic Doubts', href: '/doubts' },
    { label: 'Ask a Doubt', href: '/doubts/new' },
    { label: 'Peer Helpers', href: '/helpers' },
    { label: 'Knowledge Base', href: '/knowledge' },
    { label: 'Moderation', href: '/moderation' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem 1rem',
          background: 'var(--bg-secondary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', padding: '0 0.5rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.95rem',
            }}
          >
            DB
          </div>
          <span style={{ fontSize: '1.15rem', fontWeight: 700 }}>DoubtBridge</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  background: isActive ? 'var(--accent-primary)' : 'transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Alex Rivera</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>150 Karma • Student</p>
          </div>
          <Link href="/" style={{ fontSize: '0.8rem', color: 'var(--accent-rose)' }}>
            Exit
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            height: '64px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            background: 'rgba(17, 24, 39, 0.5)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Peer Academic Resolution Portal
          </span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span className="badge badge-open">🟢 Live Network</span>
          </div>
        </header>

        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
