import Link from 'next/link';

export default function DoubtsListPage() {
  const sampleDoubts = [
    {
      id: 'd1',
      title: 'How does Dijkstra algorithm handle negative weight cycles?',
      subject: 'Algorithms',
      status: 'CLAIMED',
      urgency: 'HIGH',
      author: 'Alex Rivera',
      answersCount: 1,
    },
    {
      id: 'd2',
      title: 'Evaluating improper integrals with infinite discontinuities',
      subject: 'Calculus',
      status: 'OPEN',
      urgency: 'MEDIUM',
      author: 'Maya Lin',
      answersCount: 0,
    },
    {
      id: 'd3',
      title: 'Deriving the Maxwell-Boltzmann distribution from partition functions',
      subject: 'Physics',
      status: 'RESOLVED',
      urgency: 'LOW',
      author: 'Samir Patel',
      answersCount: 3,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Academic Doubts Feed</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Browse questions posted by peers or filter by your study disciplines.
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
          + Ask Doubt
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sampleDoubts.map((doubt) => (
          <div
            key={doubt.id}
            className="glass-panel"
            style={{
              padding: '1.25rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                <span className={`badge ${doubt.status === 'RESOLVED' ? 'badge-resolved' : doubt.status === 'CLAIMED' ? 'badge-claimed' : 'badge-open'}`}>
                  {doubt.status}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                  {doubt.subject}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                  • Urgency: {doubt.urgency}
                </span>
              </div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                {doubt.title}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Asked by {doubt.author} • {doubt.answersCount} {doubt.answersCount === 1 ? 'answer' : 'answers'}
              </p>
            </div>

            <Link
              href={`/doubts/${doubt.id}`}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
