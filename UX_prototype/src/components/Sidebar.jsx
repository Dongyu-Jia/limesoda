import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { LayoutDashboard, PlusCircle, Users, ShieldCheck, Settings, Sparkles, Activity, Terminal, ChevronDown, Cpu, Bell } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { activeProject, setActiveProject, projects } = useProject();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const path = location.pathname;

  // Determine context
  const isOrgScale = path === '/team' || path === '/credentials';

  return (
    <div style={{
      width: 'var(--sidebar-width)',
      background: 'var(--surface-solid)',
      borderRight: '1px solid var(--border)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', marginBottom: '56px' }}>
        <div style={{ 
          background: 'white', 
          padding: '12px', 
          borderRadius: '16px', 
          boxShadow: '0 8px 30px rgba(212, 255, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img src="/logo.png" alt="Limesoda" style={{ width: 64, height: 64, objectFit: 'contain' }} />
        </div>
        <div>
          <h1 style={{ fontFamily: 'Outfit', fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#1A1C1E', lineHeight: 1 }}>Limesoda</h1>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary-dark)', letterSpacing: '0.15em', marginTop: '4px' }}>Control Plane</div>
        </div>
      </div>

      <div style={{ padding: '0 8px', marginBottom: '32px', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ opacity: 0.6, textTransform: 'uppercase', fontWeight: 700, fontSize: '0.625rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
            {isOrgScale ? "Organization Scale" : "Working On"}
          </span>
          
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="project-bubble-glow"
            style={{
              background: "var(--primary)",
              color: "var(--text-main)",
              padding: '14px 24px',
              borderRadius: '50px',
              fontFamily: 'Outfit',
              fontWeight: 800,
              fontSize: '0.9375rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              border: "3px solid #1A1C1E",
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              width: '100%',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ 
              width: 8, height: 8, 
              background: "#1A1C1E",
              borderRadius: '50%' 
            }}></div>
            {activeProject.codename}
            <ChevronDown size={14} style={{ opacity: 0.5, transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: '0.3s' }} />
          </div>
        </div>

        {isDropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 8,
            right: 8,
            background: 'white',
            borderRadius: 'var(--radius)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            border: '1px solid var(--border)',
            padding: '8px',
            marginTop: '8px',
            zIndex: 1000
          }}>
            {projects.map(p => (
              <div 
                key={p.codename}
                onClick={() => { setActiveProject(p); setIsDropdownOpen(false); }}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  background: activeProject.codename === p.codename ? 'var(--bg-main)' : 'transparent',
                  color: activeProject.codename === p.codename ? 'var(--primary-dark)' : 'var(--text-main)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {p.codename}
                {activeProject.codename === p.codename && <div style={{ width: 6, height: 6, background: 'var(--primary)', borderRadius: '50%' }}></div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavItem to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <NavItem to="/genesis" icon={<Sparkles size={18} />} label="New Feature" />
        <NavItem to="/agents" icon={<Terminal size={18} />} label="Task Management" />
        <NavItem to="/todo" icon={<Bell size={18} />} label="Human TODO" badge="3" />
        <NavItem to="/agent-management" icon={<Cpu size={18} />} label="Agent Management" />
        <NavItem to="/health" icon={<Activity size={18} />} label="Cluster Health" />
        <NavItem to="/team" icon={<Users size={18} />} label="Team Settings" />
        <NavItem to="/credentials" icon={<ShieldCheck size={18} />} label="Infrastructure" />
        <NavItem to="/settings" icon={<Settings size={18} />} label="Project Settings" />
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
        <NavItem to="/onboarding" icon={<PlusCircle size={18} />} label="New Project" />
        <div style={{ height: '1px', background: 'var(--border)', margin: '16px 0' }}></div>
        <h4 style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '16px', padding: '0 16px' }}>
          Recent Projects
        </h4>
        <div className="mini-project" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', fontSize: '0.8125rem', fontWeight: 500 }}>
          <div style={{ width: 6, height: 6, background: '#D4FF00', borderRadius: '50%' }}></div>
          <span>Project-Zeus</span>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, badge }) => (
  <NavLink 
    to={to} 
    style={({ isActive }) => ({
      padding: '12px 16px',
      borderRadius: 'var(--radius)',
      textDecoration: 'none',
      color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
      background: isActive ? 'var(--primary)' : 'transparent',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      transition: 'all 0.2s',
      position: 'relative'
    })}
  >
    {icon}
    <span style={{ flex: 1 }}>{label}</span>
    {badge && (
      <span style={{ 
        background: '#EF4444', 
        color: 'white', 
        fontSize: '0.625rem', 
        fontWeight: 900, 
        padding: '2px 6px', 
        borderRadius: '10px',
        minWidth: '18px',
        textAlign: 'center'
      }}>
        {badge}
      </span>
    )}
  </NavLink>
);

export default Sidebar;
