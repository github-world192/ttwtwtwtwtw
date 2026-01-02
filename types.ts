
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  category: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  subtasks: { id: string; title: string; completed: boolean }[];
}

export type View = 'onboarding' | 'dashboard' | 'assistant' | 'analytics';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
