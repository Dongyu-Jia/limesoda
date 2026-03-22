import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';

const Dashboard = () => {
  const { activeProject } = useProject();

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h2 className="page-title">Project Registry</h2>
          <p className="page-subtitle">Currently managing <strong>{activeProject.codename}</strong> and associated environments.</p>
        </div>
        <Link to="/onboarding" className="btn btn-primary">
          <Plus size={18} /> New Project
        </Link>
      </header>

      <div className="section-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Active Projects</h3>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Project Codename</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Active Phase</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Environments</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Last Activity</th>
              <th style={{ textAlign: 'left', padding: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '16px', fontWeight: 600 }}>Project-Zeus</td>
              <td style={{ padding: '16px' }}>
                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', background: 'var(--primary-light)', fontWeight: 600 }}>P7 Implementation</span>
              </td>
              <td style={{ padding: '16px' }}>4/4 Secure</td>
              <td style={{ padding: '16px', color: 'var(--text-muted)' }}>2 mins ago</td>
              <td style={{ padding: '16px' }}>
                <a href="#" style={{ color: 'var(--text-main)', fontWeight: 600, textDecoration: 'none' }}>View Radar</a>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '16px', fontWeight: 600 }}>Limesoda-Engine</td>
              <td style={{ padding: '16px' }}>
                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', background: '#DCFCE7', color: '#166534', fontWeight: 600 }}>P10 Remediation</span>
              </td>
              <td style={{ padding: '16px' }}>4/4 Secure</td>
              <td style={{ padding: '16px', color: 'var(--text-muted)' }}>1 hour ago</td>
              <td style={{ padding: '16px' }}>
                <a href="#" style={{ color: 'var(--text-main)', fontWeight: 600, textDecoration: 'none' }}>View Radar</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
