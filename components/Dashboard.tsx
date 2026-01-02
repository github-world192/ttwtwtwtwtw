
import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';
import { getTaskBreakdown } from '../services/geminiService';

interface DashboardProps {
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [isBreakingDown, setIsBreakingDown] = useState(false);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === TaskStatus.DONE).length,
    todo: tasks.filter(t => t.status === TaskStatus.TODO).length
  };

  const progress = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  const handleQuickAdd = async () => {
    if (!newTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTitle,
      description: '',
      status: TaskStatus.TODO,
      category: 'General',
      priority: 'medium',
      subtasks: []
    };

    onAddTask(newTask);
    setNewTitle('');
    setIsAdding(false);
  };

  const handleMagicBreakdown = async (task: Task) => {
    setIsBreakingDown(true);
    const subtaskTitles = await getTaskBreakdown(task.title);
    const subtasks = subtaskTitles.map(title => ({
      id: Math.random().toString(36).substr(2, 9),
      title,
      completed: false
    }));
    
    onUpdateTask({ ...task, subtasks });
    setIsBreakingDown(false);
  };

  const toggleTask = (task: Task) => {
    const nextStatus = task.status === TaskStatus.DONE ? TaskStatus.TODO : TaskStatus.DONE;
    onUpdateTask({ ...task, status: nextStatus });
  };

  return (
    <div className="px-6 py-6 flex flex-col gap-8">
      {/* Progress Card */}
      <section className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 shadow-xl shadow-primary/20 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-white text-xl font-bold mb-1">Your Progress</h2>
          <p className="text-white/80 text-sm mb-4">You have {stats.todo} tasks left today</p>
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-white h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-white font-bold text-xs uppercase tracking-wider">{Math.round(progress)}% Complete</span>
        </div>
        <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-white/10 rotate-12">
          verified
        </span>
      </section>

      {/* Task List */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Active Tasks</h3>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 text-primary font-semibold text-sm"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Add Task
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {tasks.map(task => (
            <div 
              key={task.id}
              className={`bg-slate-900/50 border border-slate-800 rounded-xl p-4 transition-all ${task.status === TaskStatus.DONE ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start gap-4">
                <button 
                  onClick={() => toggleTask(task)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.status === TaskStatus.DONE 
                      ? 'bg-primary border-primary text-white' 
                      : 'border-slate-600'
                  }`}
                >
                  {task.status === TaskStatus.DONE && <span className="material-symbols-outlined text-xs font-bold">check</span>}
                </button>
                <div className="flex-1">
                  <h4 className={`font-bold text-white ${task.status === TaskStatus.DONE ? 'line-through' : ''}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{task.category}</span>
                    {task.priority === 'high' && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
                  </div>
                  
                  {task.subtasks.length > 0 && (
                    <div className="mt-3 flex flex-col gap-1">
                      {task.subtasks.map(st => (
                        <div key={st.id} className="flex items-center gap-2 text-xs text-slate-400">
                          <span className={`material-symbols-outlined text-[14px] ${st.completed ? 'text-primary' : 'text-slate-600'}`}>
                            {st.completed ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          {st.title}
                        </div>
                      ))}
                    </div>
                  )}

                  {task.subtasks.length === 0 && task.status !== TaskStatus.DONE && (
                    <button 
                      onClick={() => handleMagicBreakdown(task)}
                      disabled={isBreakingDown}
                      className="mt-3 flex items-center gap-2 text-xs text-primary font-medium bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      {isBreakingDown ? 'Thinking...' : 'AI Breakdown'}
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => onDeleteTask(task.id)}
                  className="text-slate-600 hover:text-red-400 p-1"
                >
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">playlist_add_check</span>
              <p className="text-slate-500">No tasks found. Time to relax or plan ahead!</p>
            </div>
          )}
        </div>
      </section>

      {/* Add Task Bottom Sheet (Simulated Modal) */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-end justify-center px-4 pb-4">
          <div className="bg-slate-900 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">New Task</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-500">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <input 
              autoFocus
              type="text" 
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuickAdd()}
              className="w-full bg-slate-800 border-none text-white rounded-xl h-14 px-4 focus:ring-2 focus:ring-primary mb-6"
            />
            <button 
              onClick={handleQuickAdd}
              className="w-full h-14 bg-primary text-white font-bold rounded-xl active:scale-95 transition-transform"
            >
              Add to List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
