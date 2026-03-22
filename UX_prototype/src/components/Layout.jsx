import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ 
        marginLeft: 'var(--sidebar-width)', 
        flexGrow: 1, 
        padding: '40px',
        maxWidth: '1200px'
      }}>
        {children}
      </main>
      
      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 'var(--sidebar-width)',
        right: 0,
        backgroundColor: '#1A1C1E',
        color: 'white',
        padding: '12px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.8125rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 8, height: 8, background: '#10B981', borderRadius: '50%' }}></div>
          <span>System Status: All Agents Nominal</span>
        </div>
        <div style={{ color: 'white', opacity: 0.8, fontWeight: 'bold' }}>
          <span>Limesoda Control Plane v1.0 [React]</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
