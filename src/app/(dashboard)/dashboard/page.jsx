import Link from 'next/link';

export default function DashboardOverviewPage() {
  const stats = [
    { label: 'Active Doubts', value: '18', badge: '+3 today' },
    { label: 'Resolved Questions', value: '142', badge: '98% rate' },
    { label: 'Peer Helpers Online', value: '24', badge: 'Active' },
    { label: 'Karma Points', value: '150', badge: 'Rank #42' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Academic Workspace
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Track your open inquiries, peer answers, and active mentoring requests.
          </p>
        </div>

        <Link
          href="/doubts/new"
          style={{
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-primary)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          + Post New Doubt
        </Link>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {stats.map((s) => (
          <div key={s.label} className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s.label}</span>
              <span className="badge badge-open">{s.badge}</span>
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Activity Section */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem' }}>
          Recent Inquiries Awaiting Solutions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                How does Dijkstra algorithm handle negative weight cycles?
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Algorithms • Urgency: High • 1 Answer
              </div>
            </div>
            <Link
              href="/doubts/doubt-demo-1"
              style={{
                fontSize: '0.85rem',
                color: 'var(--accent-primary)',
                fontWeight: 500,
              }}
            >
              View Doubt →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
