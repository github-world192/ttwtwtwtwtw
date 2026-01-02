
import React, { useState, useEffect } from 'react';
import { Task, View } from './types';
import { INITIAL_TASKS } from './constants';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [view, setView] = useState<View>('onboarding');
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskflow_tasks');
    const hasOnboarded = localStorage.getItem('taskflow_onboarded');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(INITIAL_TASKS);
    }

    if (hasOnboarded === 'true') {
      setView('dashboard');
    }
  }, []);

  // Persist tasks on change
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleOnboardingFinish = () => {
    localStorage.setItem('taskflow_onboarded', 'true');
    setView('dashboard');
  };

  const handleAddTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const renderContent = () => {
    switch (view) {
      case 'onboarding':
        return <Onboarding onFinish={handleOnboardingFinish} />;
      case 'dashboard':
        return (
          <Dashboard 
            tasks={tasks} 
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'assistant':
        return <AIAssistant tasks={tasks} />;
      case 'analytics':
        return (
          <div className="flex flex-col items-center justify-center h-full p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">insights</span>
            <h2 className="text-xl font-bold text-white mb-2">Insights coming soon</h2>
            <p className="text-slate-500">We're building detailed analytics to track your productivity journey.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout activeView={view} onViewChange={setView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
