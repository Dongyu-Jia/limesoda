import React, { useState } from 'react';
import { ShieldCheck, Plus, Key, Cloud, Lock, Eye, EyeOff, Search, Trash2, Edit3, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Credentials = () => {
  const [showValues, setShowValues] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const [variables, setVariables] = useState([
    { id: 1, key: 'GEMINI_API_KEY', value: 'AIzaSyB-vU7...', category: 'AI Providers', lastUpdated: '2 days ago', status: 'Active' },
    { id: 2, key: 'OPENAI_API_KEY', value: 'sk-proj-7a8...', category: 'AI Providers', lastUpdated: '1 month ago', status: 'Active' },
    { id: 3, key: 'AUTOPUSH_GCP_PROJECT', value: 'limesoda-autopush-98', category: 'Cloud Infrastructure', lastUpdated: '1 week ago', status: 'Active' },
    { id: 4, key: 'TEST_GCP_PROJECT', value: 'limesoda-testing-21', category: 'Cloud Infrastructure', lastUpdated: '1 week ago', status: 'Active' },
    { id: 5, key: 'STAGING_GCP_PROJECT', value: 'limesoda-staging-05', category: 'Cloud Infrastructure', lastUpdated: '1 week ago', status: 'Active' },
    { id: 6, key: 'PROD_GCP_PROJECT', value: 'limesoda-production-main', category: 'Cloud Infrastructure', lastUpdated: '3 weeks ago', status: 'Active' },
    { id: 7, key: 'GITHUB_APP_PRIVATE_KEY', value: '-----BEGIN RSA...', category: 'Tooling', lastUpdated: '3 months ago', status: 'Rotated' },
    { id: 8, key: 'STRIPE_SECRET_KEY', value: 'sk_test_51Mz...', category: 'Tooling', lastUpdated: '5 days ago', status: 'Active' },
  ]);

  const toggleValue = (id) => {
    setShowValues(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredVars = variables.filter(v => 
    v.key.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-dark)', marginBottom: '12px' }}>
            <ShieldCheck size={20} />
            <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>Security & Governance</span>
          </div>
          <h1 className="page-title">Infrastructure Secrets</h1>
          <p className="page-subtitle" style={{ maxWidth: '800px' }}>
            Organization-wide `.env` store for AI orchestration, environment scoping, and project deployment.
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} /> Add New Variable
        </button>
      </header>

      {/* Search & Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', marginBottom: '32px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search variables by key or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '18px 24px 18px 56px', background: 'white', border: '1px solid var(--border)', borderRadius: '16px', fontSize: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
          />
        </div>
        <div className="glass-card" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)' }}>AI Keys</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{variables.filter(v => v.category === 'AI Providers').length}</div>
          </div>
          <div style={{ width: '1px', height: '20px', background: 'var(--border)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)' }}>Environments</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>4</div>
          </div>
        </div>
      </div>

      {/* Variables List */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '20px 32px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800 }}>Key Name</th>
              <th style={{ textAlign: 'left', padding: '20px 32px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800 }}>Value</th>
              <th style={{ textAlign: 'left', padding: '20px 32px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800 }}>Category</th>
              <th style={{ textAlign: 'left', padding: '20px 32px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800 }}>Status</th>
              <th style={{ textAlign: 'right', padding: '20px 32px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredVars.map((v) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={v.id} 
                  style={{ borderBottom: '1px solid var(--border)' }}
                  className="hover-lift"
                >
                  <td style={{ padding: '24px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ pading: '8px', borderRadius: '8px', background: v.category === 'AI Providers' ? '#EEF2FF' : '#F0FDF4', color: v.category === 'AI Providers' ? '#4F46E5' : '#16A34A', display: 'flex', padding: '8px' }}>
                        {v.category === 'AI Providers' ? <Key size={16} /> : <Cloud size={16} />}
                      </div>
                      <code style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1A1C1E', background: '#F8F9FA', padding: '4px 8px', borderRadius: '6px' }}>{v.key}</code>
                    </div>
                  </td>
                  <td style={{ padding: '24px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'monospace' }}>
                      <span style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                        {showValues[v.id] ? v.value : '••••••••••••••••'}
                      </span>
                      <button 
                        onClick={() => toggleValue(v.id)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
                      >
                        {showValues[v.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: '24px 32px' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', background: 'var(--bg-main)', padding: '6px 12px', borderRadius: '20px' }}>
                      {v.category}
                    </span>
                  </td>
                  <td style={{ padding: '24px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: v.status === 'Active' ? '#10B981' : '#F59E0B' }}></div>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{v.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: '24px 32px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '8px' }} className="hover-lift"><Edit3 size={18} /></button>
                      <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#EF4444', padding: '8px' }} className="hover-lift"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '32px', padding: '24px', background: '#F0F9FF', border: '1px solid #B9E6FE', borderRadius: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <AlertCircle size={24} color="#0284C7" />
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0369A1', marginBottom: '4px' }}>Pro-Tip: Hierarchy Matters</h4>
          <p style={{ fontSize: '0.875rem', color: '#075985', lineHeight: '1.5' }}>
            Infrastructure keys defined here apply globally. You can override specific variables like `GCP_PROJECT` on a project-by-project basis in **Project Settings** to satisfy strict isolation requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
