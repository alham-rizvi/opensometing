export interface User {
  id: string;
  username: string;
  passwordHash: string;
  securityQuestion: string;
  securityAnswerHash: string;
  createdAt: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  url: string;
  imageUrl: string;
  license: string;
  tags: string[];
  submittedBy: string | null; // username or null for sample data
  createdAt: string;
  featured?: boolean;
}

export type ToolCategory =
  | 'ai-ml'
  | 'developer-tools'
  | 'design'
  | 'security'
  | 'devops'
  | 'productivity';

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'ai-ml', name: 'AI & ML', description: 'Machine learning and AI tools', icon: '🤖' },
  { id: 'developer-tools', name: 'Developer Tools', description: 'IDEs, libraries, and frameworks', icon: '💻' },
  { id: 'design', name: 'Design', description: 'Design and creative tools', icon: '🎨' },
  { id: 'security', name: 'Security', description: 'Security and privacy tools', icon: '🔒' },
  { id: 'devops', name: 'DevOps', description: 'CI/CD, containers, and infrastructure', icon: '⚙️' },
  { id: 'productivity', name: 'Productivity', description: 'Task management and automation', icon: '📈' },
];

export const getCategoryName = (categoryId: ToolCategory): string => {
  return CATEGORIES.find((c) => c.id === categoryId)?.name || categoryId;
};
