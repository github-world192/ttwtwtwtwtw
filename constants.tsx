
export const HERO_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuA-HbEwSOQ1FMHWHPA268borWrQdCArc0O_Fof8RfoxcqglS8J9kC7RNLmbLHbUbscgX8YvGShbZqBPaQGBOoO3J4nWai5SxD20UqLyB6sRccnjt9Nr1Dz0KXCAW2JbYwkZeSyBzqoWhpBiBdaz5KbHFj864BWs4QN1HVoX1cWnbQOi_UImK9933oMXAhK2ZHFeR46y4ihTihZke5eWxIACSV8lIyuZjRDHnKOOQqonIhWwzQQyKfEQEhSpYfy_Xike6OWLrhELvt4";

export const CATEGORIES = [
  { name: 'Work', icon: 'work' },
  { name: 'Personal', icon: 'person' },
  { name: 'Shopping', icon: 'shopping_cart' },
  { name: 'Health', icon: 'fitness_center' },
  { name: 'Finance', icon: 'account_balance_wallet' }
];

export const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Design TaskFlow Onboarding',
    description: 'Create the primary mobile onboarding experience based on the wireframes.',
    status: 'done',
    category: 'Work',
    priority: 'high',
    subtasks: []
  },
  {
    id: '2',
    title: 'Integrate Gemini API',
    description: 'Set up the smart assistant to help users break down complex goals.',
    status: 'in-progress',
    category: 'Work',
    priority: 'high',
    subtasks: []
  }
];
