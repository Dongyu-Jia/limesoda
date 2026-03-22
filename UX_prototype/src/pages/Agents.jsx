import React, { useState, useMemo } from 'react';
import { useProject } from '../context/ProjectContext';
import { 
  Terminal, 
  CheckCircle2, 
  Circle, 
  Activity, 
  Play, 
  Pause, 
  History,
  ChevronRight,
  ChevronDown,
  Cpu,
  Clock,
  User,
  Github,
  XOctagon,
  Search,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_PHASES = [
  { id: 1, name: "P1: Market Research", status: "COMPLETED", issues: [] },
  { id: 2, name: "P2: PRD & User Story", status: "COMPLETED", issues: [] },
  { id: 3, name: "P3: UX/DX Prototyping", status: "COMPLETED", issues: [] },
  { id: 4, name: "P4: System Architecture", status: "COMPLETED", issues: [] },
  { id: 5, name: "P5: Task Decomposition", status: "COMPLETED", issues: [] },
  { id: 6, name: "P6: Component Design", status: "COMPLETED", issues: [] },
  { 
    id: 7, name: "P7: Implementation", status: "IN_PROGRESS", 
    issues: [
      { 
        id: "#42", title: "Build Stripe Checkout UI", status: "working", owner: "A3-Developer", startTime: "14:05", ghLink: "#",
        details: {
          prompt: "Implement a responsive Stripe-style payment form with validation for card numbers, CVC, and expiry. Ensure it fits the Limesoda glassmorphism theme.",
          model: "gemini-2.0-flash",
          runtime: "18m 22s",
          config: "temp: 0.0, top_p: 1.0"
        }
      },
      { 
        id: "#43", title: "API Persistence Layer", status: "working", owner: "A3-Developer", startTime: "14:10", ghLink: "#",
        details: {
          prompt: "Create Prisma schemas and CRUD services for the new Payment model...",
          model: "gemini-2.0-flash",
          runtime: "13m 05s",
          config: "temp: 0.1"
        }
      },
      { 
        id: "#44", title: "Auth Middleware Review", status: "pending-human-review", owner: "A3-Developer", startTime: "15:20", ghLink: "#",
        details: {
           prompt: "Verify the JWT rotation logic and session invalidation rules.",
           model: "gemini-2.0-flash",
           runtime: "0m 00s"
        }
      },
      { 
        id: "#45", title: "Unit Test Scaffold", status: "pending-other-agent-work", owner: "A3-Developer", startTime: "16:00", ghLink: "#",
        details: {
           prompt: "Waiting for A2-Architect to finalize the contract for the Testing Harness.",
           model: "gemini-2.0-flash",
           runtime: "0m 00s"
        }
      }
    ]
  },
  { id: 8, name: "P8: Integration Testing", status: "PENDING", issues: [] },
  { id: 9, name: "P9: Observability", status: "PENDING", issues: [] },
  { id: 10, name: "P10: Remediation", status: "PENDING", issues: [] },
];

const TaskManagement = () => {
  const { activeProject } = useProject();
  
  // State Hooks
  const [selectedPhaseId, setSelectedPhaseId] = useState(7);
  const [expandedIssueId, setExpandedIssueId] = useState("#42");
  const [showEscalation, setShowEscalation] = useState(false);
  const [isHaltedGlobal, setIsHaltedGlobal] = useState(false);
  const [rawPrompt, setRawPrompt] = useState(null);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState("id");

  // Override State
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overridePhaseId, setOverridePhaseId] = useState(null);
  const [phaseData, setPhaseData] = useState(INITIAL_PHASES);

  const handleManualFulfill = (phaseId) => {
    setPhaseData(prev => prev.map(p => {
      if (p.id === phaseId) return { ...p, status: 'COMPLETED', manual: true };
      if (p.id === phaseId + 1) return { ...p, status: 'IN_PROGRESS' };
      return p;
    }));
    setShowOverrideModal(false);
    setSelectedPhaseId(phaseId + 1);
  };

  const selectedPhase = phaseData.find(p => p.id === selectedPhaseId);

  // Filter and Sort Logic
  const filteredIssues = useMemo(() => {
    if (!selectedPhase || !selectedPhase.issues) return [];
    let items = selectedPhase.issues.filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            issue.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return items.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    });
  }, [selectedPhase, searchQuery, statusFilter, sortKey]);

  return (
    <div className="page-fade-in" style={{ padding: '40px', maxWidth: '1800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)', marginBottom: '8px' }}>
            <Terminal size={20} />
            <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>Live Orchestration</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Outfit', letterSpacing: '-0.02em', color: '#1A1C1E' }}>
            {activeProject.codename} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ Task Management</span>
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
              boxShadow: isHaltedGlobal ? '0 4px 15px rgba(212, 255, 0, 0.3)' : '0 4px 15px rgba(239, 68, 68, 0.2)',
              transition: '0.3s'
            }}
          >
            {isHaltedGlobal ? <Play size={18} /> : <Pause size={18} />}
            {isHaltedGlobal ? 'RESUME ORCHESTRATION' : 'PAUSE ALL AGENTS'}
          </button>
          
          <button onClick={() => setShowEscalation(true)} className="hover-lift" style={{ background: 'var(--surface-solid)', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#1A1C1E' }}>
            <History size={18} /> Diagnostic Logs
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '40px', alignItems: 'start' }}>
        {/* Phase Navigation */}
        <nav className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', fontWeight: 800, padding: '8px 16px', marginBottom: '8px' }}>
            10-Phase Pipeline
          </h3>
          {phaseData.map((phase) => (
            <div 
              key={phase.id}
              onClick={() => setSelectedPhaseId(phase.id)}
              style={{
                padding: '14px 16px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: selectedPhaseId === phase.id ? 'var(--primary)' : 'transparent', transition: 'all 0.2s',
                position: 'relative'
              }}
              className={selectedPhaseId === phase.id ? '' : 'hover-lift group'}
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: selectedPhaseId === phase.id ? '#1A1C1E' : (phase.status === 'PENDING' ? 'var(--text-muted)' : '#1A1C1E') }}>
                    {phase.name}
                  </span>
                  {phase.manual && <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#1A1C1E', opacity: 0.6 }}>MANUAL OVERRIDE</span>}
                </div>
              </div>

              {selectedPhaseId === phase.id && phase.status === 'IN_PROGRESS' && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setOverridePhaseId(phase.id); setShowOverrideModal(true); }}
                  style={{ background: 'rgba(0,0,0,0.1)', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '0.625rem', fontWeight: 800, cursor: 'pointer' }}
                >
                  OVERRIDE
                </button>
              )}
              {selectedPhaseId === phase.id && phase.status !== 'IN_PROGRESS' && <ChevronRight size={16} color="#1A1C1E" />}
            </div>
          ))}
        </nav>

        {/* Task Registry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {isHaltedGlobal && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '16px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="pulse" style={{ width: 12, height: 12, background: '#EF4444', borderRadius: '50%' }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#991B1B' }}>GLOBAL EXECUTION HALTED</div>
                <div style={{ fontSize: '0.75rem', color: '#B91C1C' }}>Agents are in a wait-state. Pull requests and issues will not be updated until resumed.</div>
              </div>
              <button onClick={() => setIsHaltedGlobal(false)} style={{ background: '#EF4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>RESUME NOW</button>
            </motion.div>
          )}

          {/* Registry Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Search issues, agents, or PRs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px 14px 48px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '0.875rem' }}
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '14px 16px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 600 }}
              >
                <option value="all">All Statuses</option>
                <option value="working">Work in Progress</option>
                <option value="finished">Finished</option>
                <option value="pending-human-review">Pending Human</option>
                <option value="pending-other-agent-work">Pending Agent</option>
              </select>
            </div>
          </div>

          <section className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '100px 1.5fr 1.2fr 1fr 1fr 40px', alignItems: 'center', background: 'var(--bg-main)' }}>
              <SortHeader label="ID" currentKey={sortKey} target="id" setSort={setSortKey} />
              <SortHeader label="Task Description" currentKey={sortKey} target="title" setSort={setSortKey} />
              <SortHeader label="Status" currentKey={sortKey} target="status" setSort={setSortKey} />
              <SortHeader label="Agent" currentKey={sortKey} target="owner" setSort={setSortKey} />
              <SortHeader label="Started" currentKey={sortKey} target="startTime" setSort={setSortKey} />
              <div></div>
            </div>

            {filteredIssues.length === 0 ? (
              <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Activity size={48} style={{ margin: '0 auto 24px', opacity: 0.2 }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1C1E', marginBottom: '8px' }}>
                  {selectedPhase.status === 'PENDING' ? 'Phase Locked' : 'No matches found'}
                </h3>
                <p>{selectedPhase.status === 'PENDING' ? 'This phase will unlock once the previous stage is complete.' : 'Try adjusting your search or filters.'}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {filteredIssues.map((issue) => (
                  <React.Fragment key={issue.id}>
                    <div 
                      onClick={() => setExpandedIssueId(expandedIssueId === issue.id ? null : issue.id)}
                      style={{ padding: '24px 32px', display: 'grid', gridTemplateColumns: '100px 1.5fr 1.2fr 1fr 1fr 40px', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}
                      className="hover-lift"
                    >
                      <span style={{ fontWeight: 900, color: 'var(--primary-dark)', fontSize: '0.875rem' }}>{issue.id}</span>
                      <span style={{ fontWeight: 700, color: '#1A1C1E' }}>{issue.title}</span>
                      <TaskStatusBadge status={isHaltedGlobal && issue.status === 'working' ? 'halted' : issue.status} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1A1C1E', fontSize: '0.875rem' }}>
                        <Cpu size={14} color="var(--primary-dark)" />
                        <span style={{ fontWeight: 600 }}>{issue.owner}</span>
                      </div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{issue.startTime}</span>
                      <ChevronRight size={18} style={{ transform: expandedIssueId === issue.id ? 'rotate(90deg)' : 'none', transition: '0.3s', color: 'var(--text-muted)' }} />
                    </div>

                    <AnimatePresence>
                      {expandedIssueId === issue.id && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden', background: '#F8FAFC' }}>
                          <div style={{ padding: '32px 48px', borderBottom: '1px solid var(--border)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '48px' }}>
                               <div>
                                 <h4 style={{ fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '16px' }}>Current Prompt Buffer</h4>
                                 <div 
                                    onClick={() => setRawPrompt(issue.details.prompt)}
                                    style={{ background: '#1A1C1E', color: 'rgba(255,255,255,0.9)', padding: '24px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6', border: '1px solid rgba(212, 255, 0, 0.2)', cursor: 'zoom-in' }}
                                 >
                                    {issue.details.prompt.split(' ').slice(0, 30).join(' ')}...
                                    <div style={{ marginTop: '16px', fontSize: '0.625rem', color: 'var(--primary)', fontWeight: 800 }}>CLICK TO VIEW RAW BUFFER</div>
                                 </div>
                               </div>
                               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                  <div className="glass-card" style={{ padding: '20px', background: 'white' }}>
                                    <div style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Execution Context</div>
                                    <div style={{ fontSize: '0.9375rem', fontWeight: 800, marginBottom: '4px' }}>{issue.details.model}</div>
                                    <div style={{ fontSize: '0.8125rem', color: 'var(--primary-dark)', fontWeight: 700 }}>{issue.details.runtime || "0m 00s"} Active</div>
                                  </div>
                                  <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); setIsHaltedGlobal(true); }}
                                      style={{ flex: 1, padding: '14px', borderRadius: '10px', background: '#EF4444', color: 'white', border: 'none', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}
                                    >
                                      HALT AGENT
                                    </button>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); setOverridePhaseId(selectedPhase.id); setShowOverrideModal(true); }}
                                      style={{ flex: 1, padding: '14px', borderRadius: '10px', background: '#1A1C1E', color: 'white', border: 'none', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}
                                    >
                                      OVERRIDE
                                    </button>
                                  </div>
                                  <a href={issue.ghLink} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', color: '#1A1C1E', fontSize: '0.75rem', fontWeight: 800, marginTop: '8px' }}>
                                    <Github size={16} /> View Pull Request
                                  </a>
                               </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Slide-overs & Modals */}
      <AnimatePresence>
        {showOverrideModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowOverrideModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 3000, backdropFilter: 'blur(8px)' }} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', background: 'white', zIndex: 3001, padding: '40px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>Manual Phase Override</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>You are choosing to fulfill <b>{phaseData.find(p => p.id === overridePhaseId)?.name}</b> manually. This will bypass the AI and advance the pipeline.</p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Manual Result Link (e.g. GitHub PR)</label>
                  <input type="text" placeholder="https://github.com/..." style={{ width: '100%', padding: '14px', background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '0.875rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Override Rationale</label>
                  <textarea placeholder="e.g. Existing architecture schematic reused from Project Zeus." style={{ width: '100%', padding: '14px', background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '0.875rem', minHeight: '100px', fontFamily: 'inherit' }} />
                </div>
                
                <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                  <button onClick={() => setShowOverrideModal(false)} style={{ flex: 1, padding: '16px', borderRadius: '14px', background: '#F4F4F5', color: '#1A1C1E', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                  <button onClick={() => handleManualFulfill(overridePhaseId)} style={{ flex: 1, padding: '16px', borderRadius: '14px', background: 'var(--primary)', color: '#1A1C1E', border: 'none', fontWeight: 900, cursor: 'pointer' }}>FULFILL MANUALLY</button>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {rawPrompt && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRawPrompt(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2000, backdropFilter: 'blur(12px)' }} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={{ position: 'fixed', top: '10%', left: '10%', right: '10%', bottom: '10%', background: '#1A1C1E', zIndex: 2001, padding: '48px', borderRadius: '24px', border: '1px solid rgba(212, 255, 0, 0.3)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Terminal size={24} color="var(--primary)" />
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>Raw Prompt Buffer</h2>
                </div>
                <button onClick={() => setRawPrompt(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>Close (ESC)</button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '32px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace', fontSize: '1.125rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{rawPrompt}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const SortHeader = ({ label, currentKey, target, setSort }) => (
  <div 
    onClick={() => setSort(target)}
    style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', color: currentKey === target ? 'var(--primary-dark)' : 'var(--text-muted)' }}
  >
    {label}
    <ArrowUpDown size={12} opacity={currentKey === target ? 1 : 0.3} />
  </div>
);

const TaskStatusBadge = ({ status }) => {
  const configs = {
    "finished": { label: "Finished", bg: "#10B98120", color: "#10B981", icon: <CheckCircle2 size={12} /> },
    "working": { label: "Working", bg: "#1A1C1E", color: "white", icon: <div className="pulse" style={{ width: 6, height: 6, background: 'var(--primary)', borderRadius: '50%' }} /> },
    "pending-other-agent-work": { label: "Pending Agent", bg: "#F59E0B20", color: "#F59E0B", icon: <Cpu size={12} /> },
    "pending-human-review": { label: "Pending Human", bg: "#6366F120", color: "#6366F1", icon: <User size={12} /> },
    "halted": { label: "Halted", bg: "#EF444420", color: "#EF4444", icon: <Pause size={12} /> },
    "awaiting-human": { label: "Awaiting Manual Input", bg: "#8B5CF620", color: "#8B5CF6", icon: <User size={12} /> }
  };
  const c = configs[status] || { label: status, bg: "#F4F4F5", color: "#71717A" };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: c.bg, color: c.color, padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, width: 'fit-content' }}>
      {c.icon}
      {c.label}
    </div>
  );
};

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

export default TaskManagement;
