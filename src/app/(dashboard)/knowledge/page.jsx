export default function KnowledgeBasePage() {
  const articles = [
    {
      id: 'kb-1',
      title: 'Mastering Asymptotic Notation (Big-O, Big-Theta, Big-Omega)',
      subject: 'Computer Science',
      author: 'Dr. Priya Sharma',
      views: 342,
      summary: 'A foundational walkthrough of worst-case, tight-bound, and best-case analysis with recurrence relations.',
    },
    {
      id: 'kb-2',
      title: 'Step-by-Step Proof of the Mean Value Theorem',
      subject: 'Mathematics',
      author: 'Alex Rivera',
      views: 189,
      summary: 'Geometric intuition and formal epsilon-delta continuity requirements for Rolle Theorem and MVT.',
    },
    {
      id: 'kb-3',
      title: 'Navier-Stokes Equations Simplified for Laminar Flow',
      subject: 'Fluid Dynamics',
      author: 'Samir Patel',
      views: 215,
      summary: 'How to eliminate zero-velocity components in cylindrical pipes and solve Poiseuille flow problems.',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Academic Knowledge Hub
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Curated guides, peer solutions, and conceptual walkthroughs authored by students and mentors.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {articles.map((item) => (
          <div key={item.id} className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>{item.subject}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>👁️ {item.views} views</span>
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              {item.title}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
              {item.summary}
            </p>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
              Authored by {item.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
