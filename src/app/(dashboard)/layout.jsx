'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        /* Pass userRole here when auth is integrated, e.g. userRole="moderator" */
      />

      {/* ── Main content area ────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main
          id="main-content"
          tabIndex={-1}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem',
          }}
        >
          {children}
        </main>
      </div>

      {/* Desktop sidebar spacer — reserves 252px on the left */}
      <style>{`
        @media (min-width: 768px) {
          /* Sidebar is sticky/in-flow on desktop; no spacer needed with flex */
        }
      `}</style>
    </div>
  );
}
