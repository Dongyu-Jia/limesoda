import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Credentials = () => {
  return (
    <div className="fade-in">
      <header style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Outfit', fontSize: '2rem', marginBottom: '8px' }}>Infrastructure Credentials</h2>
        <p style={{ color: 'var(--text-muted)' }}>Centralized vault for organization-level secrets and GCP keys.</p>
      </header>

      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Vaulted Credentials</h3>
          <button className="btn btn-primary">
            <ShieldCheck size={18} /> Vault New Secret
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Group Name</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Type</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Last Rotated</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Usage Count</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '16px', fontWeight: 600 }}>Main GCP Billing</td>
              <td style={{ padding: '16px' }}>GCP Service Account</td>
              <td style={{ padding: '16px' }}>Jan 15, 2026</td>
              <td style={{ padding: '16px' }}>3 Projects</td>
              <td style={{ padding: '16px' }}><a href="#" style={{ color: 'var(--text-main)', fontWeight: 600, textDecoration: 'none' }}>Rotate Key</a></td>
            </tr>
            <tr>
              <td style={{ padding: '16px', fontWeight: 600 }}>GitHub App (Primary)</td>
              <td style={{ padding: '16px' }}>GitHub App Private Key</td>
              <td style={{ padding: '16px' }}>Dec 02, 2025</td>
              <td style={{ padding: '16px' }}>Global</td>
              <td style={{ padding: '16px' }}><a href="#" style={{ color: 'var(--text-main)', fontWeight: 600, textDecoration: 'none' }}>View Logs</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Credentials;
