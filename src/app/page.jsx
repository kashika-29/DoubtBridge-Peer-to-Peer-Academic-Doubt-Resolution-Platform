import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid var(--border-color)',
          padding: '1.25rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
            }}
          >
            DB
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            DoubtBridge
          </span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/doubts" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Browse Doubts
          </Link>
          <Link href="/helpers" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Peer Mentors
          </Link>
          <Link href="/knowledge" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Knowledge Hub
          </Link>
          <Link
            href="/login"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-primary)',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <section style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '4rem' }}>
          <span
            className="badge badge-open"
            style={{ marginBottom: '1.5rem', padding: '0.35rem 1rem', fontSize: '0.85rem' }}
          >
            Academic Doubt Resolution Network
          </span>
          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
            }}
          >
            Peer-to-Peer Academic Clarity, <br />
            <span className="gradient-text">When You Need It Most.</span>
          </h1>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '1.2rem',
              maxWidth: '650px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}
          >
            Ask complex questions, match with top peer students and teaching assistants in real-time,
            and explore vetted academic walkthroughs.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/doubts/new"
              style={{
                padding: '0.85rem 1.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--accent-primary), #4338ca)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
              }}
            >
              Ask a Doubt Now
            </Link>
            <Link
              href="/dashboard"
              style={{
                padding: '0.85rem 1.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              Open Dashboard
            </Link>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#fff' }}>
              ⚡ Real-time Peer Matching
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Smart tagging and subject routing pairs your inquiry with available peer helpers specialized in your course.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#fff' }}>
              🏆 Reputation & Karma
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Helpers earn points, verified badges, and campus recognition by solving tough academic queries.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#fff' }}>
              📚 Curated Knowledge Base
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Accepted answers and peer solutions turn into lasting study guides and searchable references.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-color)',
          padding: '2rem',
          textAlign: 'center',
          color: 'var(--text-subtle)',
          fontSize: '0.875rem',
        }}
      >
        © {new Date().getFullYear()} DoubtBridge Academic Platform. All rights reserved.
      </footer>
    </div>
  );
}
