export default function ModerationPage() {
  const flags = [
    {
      id: 'rep-1',
      type: 'Doubt',
      reason: 'Suspected exam question posted during live midterm testing hours.',
      targetTitle: 'Solve for eigenvector in question 4b of current Math exam',
      reportedBy: 'Elena Rostova',
      status: 'PENDING',
    },
    {
      id: 'rep-2',
      type: 'Answer',
      reason: 'Spam / promotional external tutoring link in response body.',
      targetTitle: 'Re: Physics derivation question',
      reportedBy: 'Alex Rivera',
      status: 'PENDING',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Academic Integrity & Moderation Queue
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Review reported questions and peer responses violating campus honor codes.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {flags.map((flag) => (
          <div key={flag.id} className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185' }}>
                  {flag.type} Report
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                  Reported by {flag.reportedBy}
                </span>
              </div>
              <span className="badge badge-claimed">{flag.status}</span>
            </div>

            <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
              {flag.targetTitle}
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              <strong>Flag Reason:</strong> {flag.reason}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-rose)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                Remove Content
              </button>
              <button
                type="button"
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                }}
              >
                Dismiss Flag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
