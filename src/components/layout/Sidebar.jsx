'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  LayoutDashboard,
  HelpCircle,
  Users,
  Database,
  ShieldCheck,
  TrendingUp,
  Bookmark,
  MessageSquare,
  Trophy,
  Bell,
  Settings,
  ChevronDown,
  X,
  Sparkles,
} from 'lucide-react';

/**
 * Navigation configuration.
 * Each item supports an optional `roles` array for future role-based filtering.
 * When `roles` is undefined, the item is visible to all authenticated users.
 */
const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard',      href: '/dashboard',   icon: LayoutDashboard },
      { label: 'My Doubts',      href: '/doubts',      icon: HelpCircle },
      { label: 'Help Others',    href: '/helpers',     icon: Users },
      { label: 'Knowledge Base', href: '/knowledge',   icon: Database },
      { label: 'Moderation',     href: '/moderation',  icon: ShieldCheck, roles: ['moderator', 'admin'] },
    ],
  },
  {
    label: 'Learning',
    items: [
      { label: 'My Progress', href: '/progress',  icon: TrendingUp },
      { label: 'Bookmarks',   href: '/bookmarks', icon: Bookmark },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Discussion',  href: '/discussion',  icon: MessageSquare },
      { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Notifications', href: '/notifications', icon: Bell },
      { label: 'Settings',      href: '/settings',      icon: Settings },
    ],
  },
];

/**
 * Sidebar props:
 *   isOpen   {boolean}  — controls mobile drawer visibility
 *   onClose  {function} — called when user dismisses the drawer
 *   userRole {string}   — optional role for nav item visibility (future use)
 */
export default function Sidebar({ isOpen = false, onClose, userRole }) {
  const pathname = usePathname();

  const isVisible = (item) => {
    if (!item.roles) return true;
    if (!userRole) return false;
    return item.roles.includes(userRole);
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(2px)',
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar panel */}
      <aside
        role="navigation"
        aria-label="Main navigation"
        data-open={isOpen ? 'true' : 'false'}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '252px',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          overflowY: 'auto',
          transition: 'transform 0.25s ease',
        }}
        className="sidebar-panel"
      >
        {/* Branding */}
        <div style={{ padding: '1.25rem 1rem 0.75rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 12px rgba(99,102,241,0.4)',
                }}
              >
                <BookOpen size={17} color="#fff" strokeWidth={2.5} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: 'var(--text-main)',
                    lineHeight: 1.1,
                  }}
                >
                  DoubtBridge
                </div>
                <div
                  style={{
                    fontSize: '0.65rem',
                    color: 'var(--text-subtle)',
                    letterSpacing: '0.04em',
                    marginTop: '1px',
                  }}
                >
                  Learn · Ask · Solve
                </div>
              </div>
            </div>

            {/* Mobile close button — hidden on desktop via CSS */}
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="sidebar-close-btn"
              style={{
                background: 'transparent',
                color: 'var(--text-muted)',
                borderRadius: '6px',
                padding: '4px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ margin: '0 1rem', height: '1px', background: 'var(--border-color)' }} />

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0.75rem 0.75rem 0' }}>
          {NAV_GROUPS.map((group) => {
            const visibleItems = group.items.filter(isVisible);
            if (visibleItems.length === 0) return null;

            return (
              <div key={group.label} style={{ marginBottom: '1.25rem' }}>
                <div
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-subtle)',
                    padding: '0 0.5rem',
                    marginBottom: '0.35rem',
                  }}
                >
                  {group.label}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== '/dashboard' && pathname?.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                        aria-current={isActive ? 'page' : undefined}
                        className={`nav-link${isActive ? ' nav-link--active' : ''}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.625rem',
                          padding: '0.55rem 0.625rem',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? '#6366f1' : 'var(--text-muted)',
                          background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                          border: isActive
                            ? '1px solid rgba(99,102,241,0.2)'
                            : '1px solid transparent',
                          transition: 'all 0.15s ease',
                          textDecoration: 'none',
                          position: 'relative',
                        }}
                      >
                        {isActive && (
                          <span
                            aria-hidden="true"
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: '25%',
                              height: '50%',
                              width: '3px',
                              borderRadius: '0 3px 3px 0',
                              background: '#6366f1',
                            }}
                          />
                        )}
                        <Icon
                          size={16}
                          strokeWidth={isActive ? 2.5 : 2}
                          style={{
                            color: isActive ? '#6366f1' : 'var(--text-subtle)',
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ flex: 1 }}>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Learning encouragement card */}
        <div style={{ padding: '0 0.75rem', marginBottom: '0.75rem' }}>
          <div
            style={{
              background:
                'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(6,182,212,0.1) 100%)',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: '10px',
              padding: '0.875rem',
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <Sparkles
              size={15}
              style={{ color: '#6366f1', flexShrink: 0, marginTop: '1px' }}
            />
            <div>
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  marginBottom: '0.2rem',
                }}
              >
                Keep learning together
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-subtle)',
                  lineHeight: 1.45,
                }}
              >
                Ask, share, and grow with your peers.
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ margin: '0 1rem', height: '1px', background: 'var(--border-color)' }} />

        {/* User profile */}
        <div style={{ padding: '0.75rem' }}>
          <button
            aria-label="Open user menu"
            className="profile-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '8px',
              background: 'transparent',
              border: '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              textAlign: 'left',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
                letterSpacing: '0.03em',
              }}
            >
              SU
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Student User
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>Student</div>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-subtle)', flexShrink: 0 }} />
          </button>
        </div>
      </aside>

      {/* Responsive + interactive styles */}
      <style>{`
        @media (min-width: 768px) {
          .sidebar-panel {
            position: sticky !important;
            flex-shrink: 0;
            transform: none !important;
          }
          .sidebar-close-btn {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .sidebar-panel {
            transform: translateX(-100%);
          }
          .sidebar-panel[data-open="true"] {
            transform: translateX(0);
          }
          .sidebar-close-btn {
            display: flex !important;
          }
        }
        .nav-link:hover:not(.nav-link--active) {
          background: rgba(255,255,255,0.04) !important;
          color: var(--text-main) !important;
        }
        .nav-link:hover:not(.nav-link--active) svg {
          color: var(--text-muted) !important;
        }
        .profile-btn:hover {
          background: rgba(255,255,255,0.04) !important;
          border-color: var(--border-color) !important;
        }
        .nav-link:focus-visible,
        .profile-btn:focus-visible,
        .sidebar-close-btn:focus-visible {
          outline: 2px solid #6366f1;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}
