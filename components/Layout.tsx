
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  if (activeView === 'onboarding') return <>{children}</>;

  const NavItem = ({ view, icon, label }: { view: View, icon: string, label: string }) => {
    const isActive = activeView === view;
    return (
      <button 
        onClick={() => onViewChange(view)}
        className={`flex flex-col items-center gap-1 flex-1 py-2 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`}
      >
        <span className={`material-symbols-outlined text-2xl ${isActive ? 'fill-1' : ''}`}>
          {icon}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-widest">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background-dark relative max-w-md mx-auto w-full">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-xl font-bold">check_circle</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">TaskFlow</span>
        </div>
        <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      {/* Main Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background-dark/90 backdrop-blur-xl border-t border-slate-800 px-6 py-2 flex items-center justify-around z-50">
        <NavItem view="dashboard" icon="dashboard" label="Home" />
        <NavItem view="assistant" icon="smart_toy" label="AI" />
        <NavItem view="analytics" icon="bar_chart" label="Stats" />
        
        {/* Safe Area for iOS */}
        <div className="h-6 w-full absolute bottom-0 left-0 hidden lg:block"></div>
      </nav>

      <div className="h-1 w-1/3 bg-slate-700 rounded-full mx-auto mb-2 opacity-50 absolute bottom-1 left-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default Layout;
