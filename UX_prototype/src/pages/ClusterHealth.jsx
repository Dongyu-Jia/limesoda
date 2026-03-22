import React from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Server,
  Cloud,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const ClusterHealth = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)', marginBottom: '8px' }}>
            <Activity size={20} />
            <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>Infrastructure Intelligence</span>
          </div>
          <h1 className="page-title">Cluster Health</h1>
          <p className="page-subtitle">Real-time telemetry for the Limesoda compute and orchestration layer.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <MetricCard icon={<Cpu size={20} />} label="Total CPU Compute" value="42.8 GHz" trend="Stable" />
        <MetricCard icon={<Zap size={20} />} label="Orchestration Latency" value="34ms" trend="Optimal" />
        <MetricCard icon={<Server size={20} />} label="Nodes Online" value="12 Active" trend="100%" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
        <section className="glass-card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Cloud size={24} color="var(--primary-dark)" />
            Real-time Node Map
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ 
                padding: '20px', 
                borderRadius: '16px', 
                background: 'var(--bg-main)', 
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B98180' }}></div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Node-{i+1}</span>
                <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>US-CENTRAL-1</span>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '24px' }}>System Integrity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <IntegrityItem label="Auth Vault (KMS)" status="SECURE" icon={<ShieldCheck size={16} />} />
            <IntegrityItem label="GitHub Webhooks" status="ACTIVE" icon={<Zap size={16} />} />
            <IntegrityItem label="Postgres Pool" status="OPTIMAL" icon={<Server size={16} />} />
            <IntegrityItem label="EM Backlog" status="CLEAR" icon={<CheckCircle2 size={16} />} />
          </div>
          
          <div style={{ marginTop: '32px', padding: '20px', background: '#F8FAFC', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
               <AlertCircle size={16} color="var(--primary-dark)" />
               <span style={{ fontSize: '0.8125rem', fontWeight: 800 }}>Orchestrator Note</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Current cluster utilization is at 14%. System is prepared for high-concurrency genesis prompts.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, trend }) => (
  <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
    <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)' }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{value}</div>
        <span style={{ fontSize: '0.625rem', background: '#D4FF00', color: '#1A1C1E', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>{trend}</span>
      </div>
    </div>
  </div>
);

const IntegrityItem = ({ label, status, icon }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ color: 'var(--text-muted)' }}>{icon}</span>
      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{label}</span>
    </div>
    <span style={{ fontSize: '0.625rem', fontWeight: 900, color: '#10B981' }}>{status}</span>
  </div>
);

export default ClusterHealth;
