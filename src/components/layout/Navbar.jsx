'use client';

import { useState } from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';

/**
 * Navbar props:
 *   onMenuClick {function} — called when the mobile menu button is pressed
 */
export default function Navbar({ onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header
      role="banner"
      style={{
        height: '64px',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Left — mobile menu toggle + search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
        {/* Mobile hamburger — hidden on desktop via CSS */}
        <button
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-haspopup="true"
          className="navbar-menu-btn"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.15s ease',
          }}
        >
          <Menu size={18} />
        </button>

        {/* Search field */}
        <div
          className="navbar-search-wrapper"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            maxWidth: '460px',
          }}
        >
          {/* Search icon */}
          <Search
            size={15}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '0.75rem',
              color: 'var(--text-subtle)',
              pointerEvents: 'none',
              flexShrink: 0,
            }}
          />

          <input
            id="navbar-search"
            type="search"
            role="searchbox"
            aria-label="Search doubts, topics, or courses"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doubts, topics, or courses..."
            className="navbar-search-input"
            style={{
              width: '100%',
              height: '38px',
              padding: '0 2.75rem 0 2.25rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'rgba(255,255,255,0.04)',
              color: 'var(--text-main)',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'all 0.15s ease',
            }}
          />

          {/* Keyboard shortcut badge — hidden on mobile via CSS */}
          <div
            aria-hidden="true"
            className="navbar-kbd"
            style={{
              position: 'absolute',
              right: '0.625rem',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              pointerEvents: 'none',
            }}
          >
            <kbd
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1px 5px',
                borderRadius: '4px',
                fontSize: '0.6rem',
                fontFamily: 'inherit',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-subtle)',
                lineHeight: 1.6,
              }}
            >
              Ctrl
            </kbd>
            <kbd
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1px 5px',
                borderRadius: '4px',
                fontSize: '0.6rem',
                fontFamily: 'inherit',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-subtle)',
                lineHeight: 1.6,
              }}
            >
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right — notifications + user avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        {/* Notification bell */}
        <button
          aria-label="View notifications (3 unread)"
          className="navbar-icon-btn"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'transparent',
            border: '1px solid transparent',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <Bell size={18} />
          {/* Unread badge */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '7px',
              right: '7px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#6366f1',
              border: '1.5px solid var(--bg-secondary)',
            }}
          />
        </button>

        {/* Vertical divider */}
        <div
          aria-hidden="true"
          style={{
            width: '1px',
            height: '22px',
            background: 'var(--border-color)',
            margin: '0 0.125rem',
          }}
        />

        {/* User avatar + dropdown */}
        <button
          aria-label="Open user menu"
          aria-haspopup="true"
          className="navbar-user-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '4px 6px 4px 4px',
            borderRadius: '8px',
            background: 'transparent',
            border: '1px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {/* Avatar */}
          <div
            aria-hidden="true"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.68rem',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.03em',
              flexShrink: 0,
            }}
          >
            SU
          </div>

          {/* Name + role — hidden on small screens via CSS */}
          <div className="navbar-user-info" style={{ textAlign: 'left' }}>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                whiteSpace: 'nowrap',
                lineHeight: 1.2,
              }}
            >
              Student User
            </div>
            <div
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-subtle)',
                lineHeight: 1.2,
              }}
            >
              Student
            </div>
          </div>

          <ChevronDown
            size={13}
            className="navbar-chevron"
            style={{ color: 'var(--text-subtle)', flexShrink: 0 }}
          />
        </button>
      </div>

      {/* Responsive + interactive styles */}
      <style>{`
        /* Show hamburger on mobile */
        @media (max-width: 767px) {
          .navbar-menu-btn {
            display: flex !important;
          }
          .navbar-kbd {
            display: none !important;
          }
          .navbar-user-info,
          .navbar-chevron {
            display: none !important;
          }
        }

        /* Search input focus state */
        .navbar-search-input:focus {
          border-color: rgba(99,102,241,0.5) !important;
          background: rgba(99,102,241,0.06) !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        /* Search input placeholder */
        .navbar-search-input::placeholder {
          color: var(--text-subtle);
        }

        /* Remove native search cancel button */
        .navbar-search-input::-webkit-search-cancel-button {
          -webkit-appearance: none;
        }

        /* Hover states */
        .navbar-menu-btn:hover,
        .navbar-icon-btn:hover {
          background: rgba(255,255,255,0.06) !important;
          border-color: var(--border-color) !important;
          color: var(--text-main) !important;
        }

        .navbar-user-btn:hover {
          background: rgba(255,255,255,0.06) !important;
          border-color: var(--border-color) !important;
        }

        /* Focus rings */
        .navbar-menu-btn:focus-visible,
        .navbar-icon-btn:focus-visible,
        .navbar-user-btn:focus-visible,
        .navbar-search-input:focus-visible {
          outline: 2px solid #6366f1;
          outline-offset: 2px;
        }
      `}</style>
    </header>
  );
}
