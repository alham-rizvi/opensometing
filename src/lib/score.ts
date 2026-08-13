import { Tool } from './types';

const PERMISSIVE = ['MIT', 'Apache-2.0', 'BSD-3-Clause', 'BSD-2-Clause', 'ISC', 'Unlicense', 'MPL-2.0'];

const SELF_HOST_CATEGORIES = [
  'selfhosted',
  'cms',
  'file-sync',
  'analytics',
  'databases',
  'project-management',
  'crm-erp',
  'ecommerce',
  'monitoring',
  'cloud-native',
  'devops',
  'social',
  'search',
  'llm-tools',
  'marketing',
  'forms-surveys',
];

/** Deterministic 0-100 "Open Stacker Score" derived from the metadata we hold. */
export const openStackerScore = (tool: Tool): number => {
  let score = 58;
  if (tool.featured) score += 12;
  if (PERMISSIVE.includes(tool.license)) score += 8;
  if (tool.longDescription && tool.longDescription.length > 240) score += 6;
  if (tool.install) score += 4;
  if (tool.website) score += 4;
  if (tool.alternativeTo?.length) score += 5;
  score += Math.min(tool.tags.length, 5);
  score += Math.min(tool.platforms?.length ?? 0, 3);
  if (tool.difficulty === 'beginner') score += 3;
  return Math.max(40, Math.min(99, score));
};

export const scoreLabel = (score: number): string =>
  score >= 90 ? 'Exceptional' : score >= 80 ? 'Excellent' : score >= 70 ? 'Solid' : 'Promising';

export const isSelfHostable = (tool: Tool): boolean =>
  SELF_HOST_CATEGORIES.includes(tool.category) ||
  tool.tags.some((t) => /self.?host|server|docker|cloud/i.test(t));

export const isAiTool = (tool: Tool): boolean =>
  tool.category === 'ai-ml' || tool.category === 'llm-tools' || tool.tags.some((t) => /\bai\b|llm|model/i.test(t));

/** Popular proprietary products people are trying to escape. */
export const replacesExpensiveSaaS = (tool: Tool): boolean => (tool.alternativeTo?.length ?? 0) > 0;

export const byScore = (a: Tool, b: Tool) => openStackerScore(b) - openStackerScore(a);

export const byNewest = (a: Tool, b: Tool) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
