import React, { useState, useEffect } from 'react';
import { useProject } from '../context/ProjectContext';
import { 
  Activity, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Play, 
  Pause, 
  ExternalLink,
  History,
  ChevronRight,
  ChevronDown,
  Terminal,
  Cpu,
  Clock,
  User,
  Github,
  XOctagon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Agents = () => {
  const { activeProject } = useProject();
  const [selectedPhaseId, setSelectedPhaseId] = useState(4);
  const [expandedIssueId, setExpandedIssueId] = useState("#42");
  const [showEscalation, setShowEscalation] = useState(false);
  const [isHaltedGlobal, setIsHaltedGlobal] = useState(false);

  const phases = [
    { 
      id: 1, name: "Market Research", status: "COMPLETED", 
      issues: [
        { id: "#12", title: "Analyze Competitor Pricing", status: "Done", owner: "A1-PM", startTime: "09:00", ghLink: "#", details: { model: "gemini-2.0-flash", runtime: "2m 10s", prompt: "Identify top 5 competitors..." } }
      ]
    },
    { id: 2, name: "Architecture RFC", status: "COMPLETED", issues: [] },
    { id: 3, name: "Low-Level Design", status: "COMPLETED", issues: [] },
    { 
      id: 4, name: "Implementation", status: "IN_PROGRESS", 
      issues: [
        { 
          id: "#42", title: "Build Stripe Checkout UI", status: "Running", owner: "A3-Developer", startTime: "14:05", ghLink: "#",
          details: {
            prompt: "Implement a responsive Stripe-style payment form with validation for card numbers, CVC, and expiry. Ensure it fits the Limesoda glassmorphism theme.",
            model: "gemini-2.0-flash",
            runtime: "18m 22s",
            config: "temp: 0.0, top_p: 1.0"
          }
        },
        { 
          id: "#43", title: "API Persistence Layer", status: "Running", owner: "A3-Developer", startTime: "14:10", ghLink: "#",
          details: {
            prompt: "Create Prisma schemas and CRUD services for the new Payment model...",
            model: "gemini-2.0-flash",
            runtime: "13m 05s",
            config: "temp: 0.1"
          }
        }
      ]
    },
    { id: 5, name: "Initial Testing", status: "PENDING", issues: [] },
    { id: 6, name: "EM Quality Gate", status: "PENDING", issues: [] },
    { id: 7, name: "Security Audit", status: "PENDING", issues: [] },
    { id: 8, name: "User Acceptance", status: "PENDING", issues: [] },
    { id: 9, name: "Performance Bench", status: "PENDING", issues: [] },
    { id: 10, name: "Post-Deployment", status: "PENDING", issues: [] },
  ];

  const selectedPhase = phases.find(p => p.id === selectedPhaseId);

  return (
    <div className="page-fade-in" style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1A1C1E', marginBottom: '8px' }}>
            <Activity size={20} style={{ color: 'var(--primary-dark)' }} />
            <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>Live Orchestration Radar</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Outfit', letterSpacing: '-0.02em', color: '#1A1C1E' }}>
            {activeProject.codename} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ Runtime</span>
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button 
            onClick={() => setIsHaltedGlobal(!isHaltedGlobal)}
            style={{
              background: isHaltedGlobal ? 'var(--primary)' : '#EF4444',
              color: isHaltedGlobal ? '#1A1C1E' : 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.2)'
            }}
          >
            {isHaltedGlobal ? <Play size={18} /> : <XOctagon size={18} />}
            {isHaltedGlobal ? 'RESUME ALL' : 'HALT ALL AGENTS'}
          </button>
          
          <button 
            onClick={() => setShowEscalation(true)}
            style={{
              background: 'var(--surface-solid)',
              border: '1px solid var(--border)',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              color: '#1A1C1E'
            }}
            className="hover-lift"
          >
            <History size={18} />
            Diagnostic Logs
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 300px', gap: '32px', alignItems: 'start' }}>
        {/* Phase Navigation */}
        <nav className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', fontWeight: 800, padding: '8px 16px', marginBottom: '8px' }}>
            10-Phase Pipeline
          </h3>
          {phases.map((phase) => (
            <div 
              key={phase.id}
              onClick={() => setSelectedPhaseId(phase.id)}
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: selectedPhaseId === phase.id ? 'var(--primary)' : 'transparent',
                transition: 'all 0.2s',
                border: selectedPhaseId === phase.id ? 'none' : '1px solid transparent'
              }}
              className={selectedPhaseId === phase.id ? '' : 'hover-lift'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: 24, height: 24, borderRadius: '50%', 
                  background: phase.status === 'COMPLETED' ? '#1A1C1E' : (phase.status === 'IN_PROGRESS' ? 'white' : 'var(--bg-main)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {phase.status === 'COMPLETED' ? <CheckCircle2 size={14} color="var(--primary)" /> : 
                   (phase.status === 'IN_PROGRESS' ? <div className="pulse" style={{ width: 8, height: 8, background: 'var(--primary)', borderRadius: '50%' }}></div> : 
                   <Circle size={8} color="var(--text-muted)" />)}
                </div>
                <span style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: 700, 
                  color: selectedPhaseId === phase.id ? '#1A1C1E' : (phase.status === 'PENDING' ? 'var(--text-muted)' : '#1A1C1E') 
                }}>
                  {phase.name}
                </span>
              </div>
              {selectedPhaseId === phase.id && <ChevronRight size={16} color="#1A1C1E" />}
            </div>
          ))}
        </nav>

        {/* Phase Work Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section className="glass-card" style={{ padding: '40px' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '4px', color: '#1A1C1E' }}>{selectedPhase.name} Registry</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Monitoring active task buffers and agent health.</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                 <StatusBadge status={selectedPhase.status} />
              </div>
            </div>

            {selectedPhase.issues.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)', border: '2px dashed var(--border)', borderRadius: '16px' }}>
                <Terminal size={32} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                <p style={{ fontWeight: 600 }}>No active issues in this phase.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedPhase.issues.map((issue) => (
                  <div key={issue.id} className="glass-card" style={{ padding: '0', overflow: 'hidden', border: expandedIssueId === issue.id ? '2px solid var(--primary)' : '1px solid var(--border)' }}>
                    <div 
                      onClick={() => setExpandedIssueId(expandedIssueId === issue.id ? null : issue.id)}
                      style={{ padding: '24px', display: 'grid', gridTemplateColumns: '80px 1.5fr 1fr 1fr 40px', alignItems: 'center', cursor: 'pointer', background: expandedIssueId === issue.id ? 'rgba(212, 255, 0, 0.05)' : 'transparent' }}
                    >
                      <span style={{ fontWeight: 900, color: 'var(--primary-dark)', fontSize: '0.875rem' }}>{issue.id}</span>
                      <span style={{ fontWeight: 700, color: '#1A1C1E' }}>{issue.title}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                        <User size={14} />
                        <span>{issue.owner}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                        <Clock size={14} />
                        <span>Started {issue.startTime}</span>
                      </div>
                      <ChevronDown size={20} style={{ transform: expandedIssueId === issue.id ? 'rotate(180deg)' : 'none', transition: '0.3s', color: 'var(--text-muted)' }} />
                    </div>

                    <AnimatePresence>
                      {expandedIssueId === issue.id && (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '24px', borderTop: '1px solid var(--border)', background: 'var(--bg-main)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '32px' }}>
                              <div>
                                <h4 style={{ fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '12px' }}>Current Prompt Buffer</h4>
                                <div style={{ background: '#1A1C1E', color: 'rgba(255,255,255,0.9)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: '1.6', border: '1px solid rgba(212, 255, 0, 0.2)' }}>
                                  {issue.details.prompt}
                                </div>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div className="glass-card" style={{ padding: '16px', background: 'white' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <Cpu size={14} color="var(--primary-dark)" />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Model Config</span>
                                  </div>
                                  <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '4px' }}>{issue.details.model}</div>
                                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{issue.details.config || "temp: 0.0"}</div>
                                </div>
                                <div className="glass-card" style={{ padding: '16px', background: 'white' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <Clock size={14} color="var(--primary-dark)" />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Total Runtime</span>
                                  </div>
                                  <div style={{ fontSize: '1.125rem', fontWeight: 900 }}>{issue.details.runtime}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button style={{ flex: 1, padding: '10px', borderRadius: '8px', background: '#EF4444', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>HALT</button>
                                  <button style={{ flex: 1, padding: '10px', borderRadius: '8px', background: '#1A1C1E', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>OVERRIDE</button>
                                </div>
                                <a href={issue.ghLink} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', color: '#1A1C1E', fontSize: '0.75rem', fontWeight: 700, marginTop: '8px' }}>
                                  <Github size={14} />
                                  View on GitHub
                                </a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Health Metrics */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section className="glass-card" style={{ padding: '24px' }}>
             <h3 style={{ fontSize: '0.75rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              <AlertCircle size={16} style={{ color: 'var(--primary-dark)' }} />
              Cluster Health
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <MetricItem label="Nodes Online" value="12/12" trend="stable" />
              <MetricItem label="Orch. Latency" value="38ms" trend="up" />
              <MetricItem label="EM Backlog" value="0" trend="stable" />
            </div>
          </section>

          <div className="glass-card" style={{ padding: '24px', background: '#1A1C1E', color: 'white' }}>
            <h4 style={{ color: 'white', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '16px', opacity: 0.9 }}>Pro Tip</h4>
            <p style={{ fontSize: '0.8125rem', lineHeight: '1.5', opacity: 0.8 }}>
              Click on a phase to see the active issues and agent bidding buffers. You can override specific agents without stopping the entire pipeline.
            </p>
          </div>
        </aside>
      </div>

      {/* Escalation Slide-over */}
      <AnimatePresence>
        {showEscalation && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEscalation(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, backdropFilter: 'blur(8px)' }}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ 
                position: 'fixed', top: 0, right: 0, bottom: 0, width: '550px', 
                background: 'white', zIndex: 1001, padding: '48px',
                boxShadow: '-20px 0 50px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 900, fontFamily: 'Outfit', color: '#1A1C1E' }}>Diagnostic Logs</h2>
                <button onClick={() => setShowEscalation(false)} style={{ background: '#F4F4F5', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: 700, cursor: 'pointer' }}>
                  Close
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <LogEntry 
                  time="18:32:05" agent="EM-6" title="Remediation Triggered"
                  body="A3 Developer failed functional tests for 'Stripe Binding'. Swapping model to Gemini 2.0 Pro for remediation retry."
                />
                <LogEntry 
                  time="18:10:12" agent="A2-System" title="Schema Verification"
                  body="Validated architecture against 4 connected GCP environments. No drift detected."
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    COMPLETED: { bg: 'var(--primary)', color: '#1A1C1E' },
    IN_PROGRESS: { bg: '#1A1C1E', color: 'white' },
    PENDING: { bg: 'var(--bg-main)', color: 'var(--text-muted)' }
  };
  const s = styles[status] || styles.PENDING;
  return (
    <span style={{ background: s.bg, color: s.color, padding: '4px 12px', borderRadius: '6px', fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {status.replace('_', ' ')}
    </span>
  );
};

const MetricItem = ({ label, value, trend }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-muted)' }}>{label}</span>
    <div style={{ textAlign: 'right' }}>
      <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#1A1C1E' }}>{value}</div>
      <div style={{ fontSize: '0.625rem', color: trend === 'up' ? '#10B981' : 'var(--text-muted)' }}>
        {trend === 'up' ? '↗ +2%' : 'stable'}
      </div>
    </div>
  </div>
);

const LogEntry = ({ time, agent, title, body }) => (
  <div style={{ borderLeft: '3px solid var(--border)', paddingLeft: '24px', position: 'relative' }}>
    <div style={{ position: 'absolute', left: '-7px', top: '0', width: '11px', height: '11px', borderRadius: '50%', background: 'var(--primary)', border: '2px solid white' }}></div>
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
      <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--text-muted)' }}>{time}</span>
      <span style={{ fontSize: '0.6875rem', fontWeight: 900, color: 'var(--primary-dark)', textTransform: 'uppercase' }}>{agent}</span>
    </div>
    <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '8px', color: '#1A1C1E' }}>{title}</div>
    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{body}</p>
  </div>
);

export default Agents;
