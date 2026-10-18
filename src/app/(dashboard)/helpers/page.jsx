export default function HelpersDirectoryPage() {
  const helpers = [
    {
      id: 'h1',
      name: 'Dr. Priya Sharma',
      subjects: ['Algorithms', 'Linear Algebra', 'Calculus'],
      reputation: 890,
      doubtsResolved: 54,
      isAvailable: true,
    },
    {
      id: 'h2',
      name: 'Elena Rostova',
      subjects: ['Quantum Physics', 'Thermodynamics'],
      reputation: 640,
      doubtsResolved: 38,
      isAvailable: true,
    },
    {
      id: 'h3',
      name: 'David Kim',
      subjects: ['Organic Chemistry', 'Biochemistry'],
      reputation: 430,
      doubtsResolved: 25,
      isAvailable: false,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Peer Mentors & Helpers Directory
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Connect directly with top-ranked student mentors across university faculties.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {helpers.map((h) => (
          <div key={h.id} className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{h.name}</h2>
              <span className={`badge ${h.isAvailable ? 'badge-open' : 'badge-claimed'}`}>
                {h.isAvailable ? 'Available' : 'Busy'}
              </span>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
              ⭐ {h.reputation} Reputation • {h.doubtsResolved} Solved
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
              {h.subjects.map((s) => (
                <span
                  key={s}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            <button
              type="button"
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                background: h.isAvailable ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              Request 1-on-1 Help
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
