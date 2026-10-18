'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewDoubtPage() {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Computer Science');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('MEDIUM');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Doubt submitted successfully! Peer helpers will be notified.');
    window.location.href = '/doubts';
  };

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link href="/doubts" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          ← Back to Doubts
        </Link>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.5rem' }}>
          Ask an Academic Doubt
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Describe your problem clearly and our matching algorithm will connect you with qualified peer helpers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            Question Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Why does quicksort degrade to O(n^2) on already sorted arrays?"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'rgba(0, 0, 0, 0.2)',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
              Academic Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: '#111827',
                outline: 'none',
              }}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Economics">Economics</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
              Urgency Level
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: '#111827',
                outline: 'none',
              }}
            >
              <option value="LOW">Low (Casual discussion)</option>
              <option value="MEDIUM">Medium (Due this week)</option>
              <option value="HIGH">High (Urgent assignment / exam)</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            Detailed Explanation & Attempts
          </label>
          <textarea
            required
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain where you are stuck, what you have tried so far, and what specific steps you need help understanding..."
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'rgba(0, 0, 0, 0.2)',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="quicksort, sorting, partition, big-o"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'rgba(0, 0, 0, 0.2)',
              outline: 'none',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-primary)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.95rem',
            marginTop: '0.5rem',
          }}
        >
          Publish Doubt
        </button>
      </form>
    </div>
  );
}
