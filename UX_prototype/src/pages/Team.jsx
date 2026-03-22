import React from 'react';
import { UserPlus } from 'lucide-react';

const Team = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h1 className="page-title">Team Management</h1>
          <p className="page-subtitle">Manage human engineers for agent-to-human escalation and governance.</p>
        </div>
      </header>

      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Organization Members</h3>
          <button className="btn btn-primary">
            <UserPlus size={18} /> Invite Member
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Name / GitHub</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Role</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Access Level</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '16px' }}>
                <div style={{ fontWeight: 600 }}>Dongyu Jia</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>@dongyujia</div>
              </td>
              <td style={{ padding: '16px' }}>Organization Lead</td>
              <td style={{ padding: '16px' }}>Owner</td>
              <td style={{ padding: '16px' }}>
                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', background: '#DCFCE7', color: '#166534', fontWeight: 600 }}>Active</span>
              </td>
              <td style={{ padding: '16px' }}><a href="#" style={{ color: 'var(--text-muted)' }}>Edit</a></td>
            </tr>
            <tr>
              <td style={{ padding: '16px' }}>
                <div style={{ fontWeight: 600 }}>Alice Smith</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>@alice-dev</div>
              </td>
              <td style={{ padding: '16px' }}>Human Tech Lead</td>
              <td style={{ padding: '16px' }}>Read/Write</td>
              <td style={{ padding: '16px' }}>
                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', background: '#DCFCE7', color: '#166534', fontWeight: 600 }}>Active</span>
              </td>
              <td style={{ padding: '16px' }}>
                <a href="#" style={{ color: 'var(--accent-red)', fontWeight: 600, textDecoration: 'none' }}>Remove</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Team;
