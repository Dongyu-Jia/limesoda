import React, { useState } from 'react';
import { 
  Cpu, 
  Settings2, 
  Wrench, 
  BookOpen, 
  Shield, 
  Terminal,
  ChevronRight,
  ExternalLink,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AgentManagement = () => {
  const [selectedAgentId, setSelectedAgentId] = useState(null);

  const agents = [
    { 
      id: "A1-PM", 
      role: "Product Manager Agent", 
      description: "Responsible for market feasibility, PRD generation, and scope alignment.",
      skills: ["Market Analysis", "Strategic Planning", "Feature Grooming"],
      mcp: ["WebSearch", "NotionConnector"],
      model: "gemini-2.0-flash",
      status: "Online"
    },
    { 
      id: "A2-Architect", 
      role: "System Architect Agent", 
      description: "Designs high-level RFCs and low-level component designs (LLD).",
      skills: ["Cloud Architecture", "API Design", "Security Auditing"],
      mcp: ["FileSystem", "GCPCloudAsset"],
      model: "gemini-2.0-pro",
      status: "Online"
    },
    { 
      id: "A3-Developer", 
      role: "Software Engineer Agent", 
      description: "Writes production-grade code, unit tests, and documentation.",
      skills: ["React/Next.js", "Prisma/Node", "Python/FastAPI"],
      mcp: ["FileSystem", "Terminal", "GitHubProxy"],
      model: "gemini-2.0-flash",
      status: "Online"
    }
  ];

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)', marginBottom: '8px' }}>
            <Cpu size={20} />
            <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>Agent Registry</span>
          </div>
          <h1 className="page-title">Agent Management</h1>
          <p className="page-subtitle">Configure, deploy, and decommission specialized cognitive agents.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> Deploy New Agent
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
        {agents.map(agent => (
          <div 
            key={agent.id} 
            className="glass-card" 
            style={{ padding: '32px', border: selectedAgentId === agent.id ? '2px solid var(--primary)' : '1px solid var(--border)', position: 'relative' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                   <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary-dark)', background: '#D4FF0020', padding: '4px 8px', borderRadius: '4px' }}>{agent.id}</span>
                   <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }}></div>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1A1C1E' }}>{agent.role}</h3>
              </div>
              <button 
                onClick={() => setSelectedAgentId(agent.id)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                className="hover-lift"
              >
                <Settings2 size={24} />
              </button>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px', minHeight: '44px' }}>
              {agent.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Wrench size={14} color="var(--primary-dark)" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Skills</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {agent.skills.map(skill => (
                    <span key={skill} style={{ fontSize: '0.6875rem', fontWeight: 700, background: 'var(--bg-main)', color: '#1A1C1E', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border)' }}>{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Terminal size={14} color="var(--primary-dark)" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>MCP Tools</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {agent.mcp.map(tool => (
                    <span key={tool} style={{ fontSize: '0.6875rem', fontWeight: 700, background: '#1A1C1E', color: 'var(--primary)', padding: '4px 10px', borderRadius: '6px' }}>{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Modal */}
      <AnimatePresence>
        {selectedAgentId && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedAgentId(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, backdropFilter: 'blur(8px)' }}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '550px', background: 'white', zIndex: 1001, padding: '48px', boxShadow: '-20px 0 50px rgba(0,0,0,0.1)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '48px' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '4px' }}>{selectedAgent.id}</div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'Outfit' }}>Configure Agent</h2>
                </div>
                <button onClick={() => setSelectedAgentId(null)} style={{ background: '#F4F4F5', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: 700, cursor: 'pointer' }}>Close</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <ConfigField label="Role Description" type="textarea" value={selectedAgent.description} />
                <ConfigField label="Assigned Model" type="select" value={selectedAgent.model} options={["gemini-2.0-flash", "gemini-2.0-pro", "gemini-1.5-pro"]} />
                <ConfigField label="Skills (Comma-separated)" type="text" value={selectedAgent.skills.join(", ")} />
                <ConfigField label="MCP Tool Permissions" type="multiselect" value={selectedAgent.mcp} options={["FileSystem", "Terminal", "GitHubProxy", "SlackConnector", "GCPCloudAsset", "NotionConnector"]} />

                <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
                  <button style={{ flex: 1, padding: '16px', borderRadius: '14px', background: 'var(--primary)', color: '#1A1C1E', border: 'none', fontWeight: 900, cursor: 'pointer' }}>SAVE CONFIGURATION</button>
                  <button style={{ flex: 0.5, padding: '16px', borderRadius: '14px', background: 'white', color: '#EF4444', border: '1px solid #EF4444', fontWeight: 800, cursor: 'pointer' }}>DECOMMISSION</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const ConfigField = ({ label, type, value, options }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</label>
    {type === 'textarea' ? (
      <textarea style={{ background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', fontSize: '0.875rem', minHeight: '100px', fontFamily: 'inherit' }} defaultValue={value} />
    ) : type === 'select' ? (
      <select style={{ background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', fontSize: '0.875rem' }}>
        {options.map(o => <option key={o} value={o} selected={o === value}>{o}</option>)}
      </select>
    ) : (
      <input type="text" style={{ background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', fontSize: '0.875rem' }} defaultValue={value} />
    )}
  </div>
);

export default AgentManagement;
