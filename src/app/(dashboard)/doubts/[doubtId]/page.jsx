'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DoubtDetailPage() {
  const [answers, setAnswers] = useState([
    {
      id: 'ans-1',
      author: 'Dr. Priya Sharma',
      authorRole: 'Peer Mentor • 890 Karma',
      content:
        'Dijkstra operates on a greedy choice property: it permanently marks vertices as visited assuming their distance cannot be shortened later. In negative edge weight scenarios, this assumption is broken because a longer sequence of vertices can have a smaller cumulative cost. Use Bellman-Ford or SPFA instead when negative edge weights are present.',
      upvotes: 14,
      isAccepted: true,
      createdAt: '2 hours ago',
    },
  ]);
  const [newAnswer, setNewAnswer] = useState('');

  const handlePostAnswer = (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    setAnswers([
      ...answers,
      {
        id: `ans-${Date.now()}`,
        author: 'Alex Rivera (You)',
        authorRole: 'Student • 150 Karma',
        content: newAnswer,
        upvotes: 0,
        isAccepted: false,
        createdAt: 'Just now',
      },
    ]);
    setNewAnswer('');
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <Link href="/doubts" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        ← Back to Doubts Feed
      </Link>

      {/* Main Doubt Header */}
      <div className="glass-panel" style={{ padding: '2rem', marginTop: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'center' }}>
          <span className="badge badge-claimed">CLAIMED</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>Algorithms</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--accent-rose)' }}>• High Urgency</span>
        </div>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem' }}>
          How does Dijkstra algorithm handle negative weight cycles?
        </h1>

        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          I understand Dijkstra greedy approach for shortest paths, but why does it fail or enter infinite
          loops with negative edge weights compared to Bellman-Ford? Could someone explain how relaxation
          differs between the two?
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-subtle)',
          }}
        >
          <div>Asked by Alex Rivera • 3 hours ago</div>
          <div>Assigned Peer Helper: Dr. Priya Sharma</div>
        </div>
      </div>

      {/* Solutions / Answers List */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
        Answers & Explanations ({answers.length})
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
        {answers.map((ans) => (
          <div
            key={ans.id}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              border: ans.isAccepted ? '1px solid var(--border-accent)' : '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{ans.author}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                  ({ans.authorRole})
                </span>
              </div>
              {ans.isAccepted && <span className="badge badge-open">✓ Accepted Solution</span>}
            </div>

            <p style={{ color: 'var(--text-main)', lineHeight: 1.6, fontSize: '0.925rem', marginBottom: '1rem' }}>
              {ans.content}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
              <span>{ans.createdAt}</span>
              <button
                type="button"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-muted)',
                }}
              >
                ▲ Upvote ({ans.upvotes})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post Answer Box */}
      <form onSubmit={handlePostAnswer} className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          Contribute an Academic Answer
        </h3>
        <textarea
          rows={4}
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Provide a step-by-step mathematical or conceptual explanation..."
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            background: 'rgba(0, 0, 0, 0.2)',
            outline: 'none',
            resize: 'vertical',
            marginBottom: '0.75rem',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-primary)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          Submit Answer
        </button>
      </form>
    </div>
  );
}
