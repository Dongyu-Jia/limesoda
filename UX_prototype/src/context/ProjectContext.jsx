import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const projects = [
    { codename: 'Project-Zeus', repo: 'org/project-alpha', phase: 'P7 Implementation' },
    { codename: 'Limesoda-Engine', repo: 'org/limesoda-engine', phase: 'P10 Remediation' },
    { codename: 'Vanguard-Alpha', repo: 'org/vanguard', phase: 'P3 Prototyping' }
  ];

  const [activeProject, setActiveProjectState] = useState(() => {
    const saved = localStorage.getItem('limesoda_active_project');
    return saved ? JSON.parse(saved) : projects[0];
  });

  const setActiveProject = (project) => {
    setActiveProjectState(project);
    localStorage.setItem('limesoda_active_project', JSON.stringify(project));
  };

  return (
    <ProjectContext.Provider value={{ activeProject, setActiveProject, projects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
