import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Team from './pages/Team';
import Credentials from './pages/Credentials';
import Settings from './pages/Settings';
import Genesis from './pages/Genesis';
import Agents from './pages/Agents';
import Todo from './pages/Todo';
import ClusterHealth from './pages/ClusterHealth';
import AgentManagement from './pages/AgentManagement';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/team" element={<Team />} />
          <Route path="/credentials" element={<Credentials />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/genesis" element={<Genesis />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/agent-management" element={<AgentManagement />} />
          <Route path="/health" element={<ClusterHealth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
