import { useProject } from '../context/ProjectContext';

const Settings = () => {
  const { activeProject } = useProject();

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h1 className="page-title">Project Protocol</h1>
          <p className="page-subtitle">Customize the 10-Phase SDLC Pipeline for <strong>{activeProject.codename}</strong>.</p>
        </div>
      </header>

      <div className="glass-card">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Pipeline Governance</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '32px' }}>Enable or disable specific gates. Disabling a gate allows the EM Agent to bypass human review for that phase.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { phase: "Phase 1: Market Research & PRD", desc: "AI conducts feasibility and alignment checks.", locked: true, checked: true },
            { phase: "Phase 4: Architecture Design", desc: "High-level system design and RFC generation.", locked: false, checked: true },
            { phase: "Phase 8: SecOps Review", desc: "Automated and manual security audit of logic.", locked: false, checked: false, highlight: true },
            { phase: "Phase 10: Production Remediation", desc: "Post-deploy monitoring and automated bug fixing.", locked: false, checked: true }
          ].map(p => (
            <div key={p.phase} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px',
              background: 'rgba(255,255,255,0.5)', border: `1px solid ${p.highlight ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: 'var(--radius)', borderLeft: p.highlight ? '4px solid var(--primary)' : ''
            }}>
              <div>
                <h4 style={{ margin: 0, fontFamily: 'Outfit' }}>{p.phase}</h4>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{p.desc}</p>
              </div>
              <div style={{
                width: 44, height: 24, borderRadius: 24, padding: 3,
                background: p.checked ? 'var(--primary)' : '#cbd5e1', cursor: p.locked ? 'not-allowed' : 'pointer',
                position: 'relative'
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', background: 'white',
                  transform: p.checked ? 'translateX(20px)' : 'translateX(0)', transition: '0.4s'
                }}></div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary">Save Protocol Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
