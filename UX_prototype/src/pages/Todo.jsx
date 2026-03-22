import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Zap, ExternalLink, Clock, ShieldAlert, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TodoPage = () => {
  const [activeTab, setActiveTab] = useState('review');

  const todos = {
    review: [
      { id: 'T-101', title: 'Approve System Architecture RFC', project: 'Vanguard-Alpha', age: '2h ago', author: 'A2-Architect', detail: 'Phase 4 requires human sign-off on the core data schema before implementation.' },
      { id: 'T-102', title: 'Security Review: Auth Middleware', project: 'Vanguard-Alpha', age: '5h ago', author: 'A8-SecOps', detail: 'New JWT rotation logic needs verification against OWASP standards.' }
    ],
    escalation: [
      { id: 'E-501', title: 'EM Feedback Loop: Redesign Required', project: 'Project-Zeus', age: '15m ago', author: 'A6-EM', detail: 'Developer Agent (A3) failed functional tests 3 times on Issue #98. Escalating to Human TL.' }
    ],
    infra: [
      { id: 'I-901', title: 'Token Limit Reached: gemini-2.0-pro', project: 'Global', age: '1h ago', status: 'CRITICAL', detail: 'Organization monthly quota exhausted. Increase budget or upgrade billing tier.' },
      { id: 'I-902', title: 'Cluster Startup Failure', project: 'Vanguard-Alpha', age: '45m ago', status: 'ERROR', detail: 'GCP Zone us-central1-a reporting resource exhaustion. Consider migrating dev nodes.' }
    ]
  };

  const tabs = [
    { id: 'review', label: 'Human Review', icon: <Clock size={16} />, color: '#6366F1', count: todos.review.length },
    { id: 'escalation', label: 'Loop Escalations', icon: <ShieldAlert size={16} />, color: '#F59E0B', count: todos.escalation.length },
    { id: 'infra', label: 'Infra & Quota', icon: <Zap size={16} />, color: '#EF4444', count: todos.infra.length }
  ];

  return (
    <div className="page-fade-in" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>
          <Bell size={18} />
          <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>Attention Required</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Outfit' }}>Human TODO</h1>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', background: 'var(--surface-solid)', padding: '6px', borderRadius: '16px', border: '1px solid var(--border)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '12px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === tab.id ? 'white' : 'transparent',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ color: tab.color }}>{tab.icon}</div>
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: activeTab === tab.id ? '#1A1C1E' : 'var(--text-muted)' }}>{tab.label}</span>
            <div style={{ background: activeTab === tab.id ? tab.color : 'var(--border)', color: activeTab === tab.id ? 'white' : 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 900, padding: '2px 8px', borderRadius: '8px' }}>
              {tab.count}
            </div>
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {todos[activeTab].map((todo, idx) => (
              <div key={todo.id} className="glass-card" style={{ padding: '24px', border: `1px solid ${tabs.find(t => t.id === activeTab).color}20`, borderLeft: `4px solid ${tabs.find(t => t.id === activeTab).color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 900, color: tabs.find(t => t.id === activeTab).color }}>{todo.id}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>• {todo.project}</span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1C1E' }}>{todo.title}</h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{todo.age}</div>
                    {todo.author && <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1A1C1E', marginTop: '4px' }}>via {todo.author}</div>}
                  </div>
                </div>
                
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                  {todo.detail}
                </p>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{ padding: '10px 20px', borderRadius: '10px', background: '#1A1C1E', color: 'white', border: 'none', fontWeight: 800, fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                     {activeTab === 'review' ? 'Start Review' : (activeTab === 'infra' ? 'Resolve Now' : 'Take Action')}
                     <ExternalLink size={14} />
                  </button>
                  <button style={{ padding: '10px 20px', borderRadius: '10px', background: 'transparent', color: '#1A1C1E', border: '1px solid var(--border)', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}>
                    Snooze
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodoPage;
