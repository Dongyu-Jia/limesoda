import { Sparkles } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

const Genesis = () => {
  const { activeProject } = useProject();

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h1 className="page-title">The Genesis Prompt</h1>
          <p className="page-subtitle">Briefing the agents for <strong>{activeProject.codename}</strong> to begin autonomous construction.</p>
        </div>
      </header>

      <div className="section-card" style={{ padding: '48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img src="/logo.png" style={{ width: 64, height: 64, marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>What are we building today?</h3>
          <p style={{ color: 'var(--text-muted)' }}>Limesoda will autonomously handle the PRD, Design, and Implementation.</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <textarea 
            placeholder="Describe your feature idea... e.g. 'Add a Stripe Checkout UI supporting Apple Pay'" 
            style={{ 
              width: '100%', height: '160px', padding: '20px', borderRadius: 'var(--radius)', 
              border: '1px solid var(--border)', fontFamily: 'inherit', fontSize: '1.125rem', 
              resize: 'none', background: 'rgba(255,255,255,0.8)' 
            }}
          ></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', background: '#E2E8F0', color: '#475569', fontWeight: 600 }}>High Reasoner (Gemini 2.0 Pro)</span>
            <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', background: '#DCFCE7', color: '#166534', fontWeight: 600 }}>Self-Correction Enabled</span>
          </div>
          <button className="btn btn-primary" onClick={() => alert('Limesoda Engine Waking Up...')}>
            <Sparkles size={18} /> Trigger Deployment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Genesis;
