import { User, Tool } from './types';
import { sampleTools } from './sampleData';

const STORAGE_KEYS = {
  USERS: 'oss-directory-users',
  TOOLS: 'oss-directory-tools',
  SESSION: 'oss-directory-session',
  THEME: 'oss-directory-theme',
} as const;

// Simple hash function for passwords (not cryptographically secure, but sufficient for localStorage demo)
export const hashString = async (str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

// Users
export const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getUserByUsername = (username: string): User | undefined => {
  return getUsers().find((u) => u.username.toLowerCase() === username.toLowerCase());
};

export const createUser = async (
  username: string,
  password: string,
  securityQuestion: string,
  securityAnswer: string
): Promise<{ success: boolean; error?: string }> => {
  const existing = getUserByUsername(username);
  if (existing) {
    return { success: false, error: 'Username already exists' };
  }

  const passwordHash = await hashString(password);
  const securityAnswerHash = await hashString(securityAnswer.toLowerCase().trim());

  const newUser: User = {
    id: crypto.randomUUID(),
    username,
    passwordHash,
    securityQuestion,
    securityAnswerHash,
    createdAt: new Date().toISOString(),
  };

  const users = getUsers();
  users.push(newUser);
  saveUsers(users);

  return { success: true };
};

export const verifyPassword = async (username: string, password: string): Promise<boolean> => {
  const user = getUserByUsername(username);
  if (!user) return false;
  const hash = await hashString(password);
  return hash === user.passwordHash;
};

export const verifySecurityAnswer = async (username: string, answer: string): Promise<boolean> => {
  const user = getUserByUsername(username);
  if (!user) return false;
  const hash = await hashString(answer.toLowerCase().trim());
  return hash === user.securityAnswerHash;
};

export const updatePassword = async (username: string, newPassword: string): Promise<boolean> => {
  const users = getUsers();
  const index = users.findIndex((u) => u.username.toLowerCase() === username.toLowerCase());
  if (index === -1) return false;

  users[index].passwordHash = await hashString(newPassword);
  saveUsers(users);
  return true;
};

// Tools
export const getTools = (): Tool[] => {
  const data = localStorage.getItem(STORAGE_KEYS.TOOLS);
  if (data) {
    const userTools = JSON.parse(data) as Tool[];
    // Merge sample tools with user-submitted tools
    const allTools = [...sampleTools];
    userTools.forEach((tool) => {
      if (!allTools.find((t) => t.id === tool.id)) {
        allTools.push(tool);
      }
    });
    return allTools;
  }
  return sampleTools;
};

export const getUserTools = (): Tool[] => {
  const data = localStorage.getItem(STORAGE_KEYS.TOOLS);
  return data ? JSON.parse(data) : [];
};

export const saveUserTools = (tools: Tool[]): void => {
  localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(tools));
};

export const addTool = (tool: Omit<Tool, 'id' | 'createdAt'>): Tool => {
  const newTool: Tool = {
    ...tool,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const userTools = getUserTools();
  userTools.push(newTool);
  saveUserTools(userTools);

  return newTool;
};

export const deleteTool = (toolId: string): boolean => {
  const userTools = getUserTools();
  const filtered = userTools.filter((t) => t.id !== toolId);
  if (filtered.length === userTools.length) return false;
  saveUserTools(filtered);
  return true;
};

export const getToolById = (id: string): Tool | undefined => {
  return getTools().find((t) => t.id === id);
};

export const getToolsByUser = (username: string): Tool[] => {
  return getTools().filter((t) => t.submittedBy === username);
};

// Session
export const getSession = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.SESSION);
};

export const setSession = (username: string): void => {
  localStorage.setItem(STORAGE_KEYS.SESSION, username);
};

export const clearSession = (): void => {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
};

// Theme
export type Theme = 'light' | 'dark';

export const getTheme = (): Theme => {
  const stored = localStorage.getItem(STORAGE_KEYS.THEME);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const setTheme = (theme: Theme): void => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};
