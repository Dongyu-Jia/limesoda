import React from 'react';

const Onboarding = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h1 className="page-title">Onboard New Project</h1>
          <p className="page-subtitle">Complete the binding to initialize the autonomous SDLC pipeline.</p>
        </div>
      </header>

      <div className="glass-card">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Step 1: Project Identity</h3>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.875rem' }}>Internal Codename</label>
          <input type="text" placeholder="e.g. Project-Zeus" style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }} />
        </div>
        <div style={{ marginBottom: '40px' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.875rem' }}>GitHub Repository Binding</label>
          <select style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <option>Select a repository...</option>
            <option>org/project-alpha</option>
            <option>org/limesoda-engine</option>
          </select>
        </div>

        <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid var(--border)' }} />

        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Step 2: Infrastructure Vaulting</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Upload your encrypted GCP Service Account JSON keys.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {['Development (Dev)', 'Integration (Test)', 'Staging', 'Production (Prod)'].map(env => (
            <div key={env} style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.5)' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.875rem' }}>{env}</label>
              <input type="file" style={{ fontSize: '0.8125rem' }} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary">Initialize Orchestration</button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
