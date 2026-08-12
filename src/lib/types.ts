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
  longDescription?: string;
  category: ToolCategory;
  url: string;
  website?: string;
  imageUrl: string;
  license: string;
  tags: string[];
  platforms?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  alternativeTo?: string[];
  install?: string;
  submittedBy: string | null;
  createdAt: string;
  featured?: boolean;
}

export type ToolCategory = string;

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  /** lucide-react icon name */
  icon: string;
  group: CategoryGroup;
  /** GitHub search query used by the daily discovery feed */
  query: string;
}

export type CategoryGroup =
  | 'Everyday Software'
  | 'Creative & Media'
  | 'Developer'
  | 'Data & AI'
  | 'Infrastructure'
  | 'Business & Web';

export const CATEGORY_GROUPS: CategoryGroup[] = [
  'Everyday Software',
  'Creative & Media',
  'Developer',
  'Data & AI',
  'Infrastructure',
  'Business & Web',
];

export const CATEGORIES: CategoryInfo[] = [
  // ---------- Everyday Software (non-technical people) ----------
  { id: 'everyday-apps', name: 'Everyday Apps', description: 'Free, safe replacements for the paid apps you use daily', icon: 'AppWindow', group: 'Everyday Software', query: 'open source desktop app' },
  { id: 'office-suites', name: 'Office & Documents', description: 'Word processors, spreadsheets and slide decks', icon: 'FileText', group: 'Everyday Software', query: 'office suite documents' },
  { id: 'notes', name: 'Notes & Knowledge', description: 'Note taking, second brain and personal wikis', icon: 'NotebookPen', group: 'Everyday Software', query: 'note taking app' },
  { id: 'productivity', name: 'Productivity', description: 'To-do lists, habits and personal automation', icon: 'ListChecks', group: 'Everyday Software', query: 'productivity todo app' },
  { id: 'browsers', name: 'Browsers', description: 'Private, fast and ad-free ways to browse the web', icon: 'Globe', group: 'Everyday Software', query: 'web browser' },
  { id: 'email-clients', name: 'Email Clients', description: 'Desktop and mobile mail apps you fully control', icon: 'Mail', group: 'Everyday Software', query: 'email client' },
  { id: 'messaging', name: 'Messaging & Chat', description: 'Private messengers and team chat', icon: 'MessageCircle', group: 'Everyday Software', query: 'messenger chat app' },
  { id: 'password-managers', name: 'Password Managers', description: 'Store logins safely without a subscription', icon: 'KeyRound', group: 'Everyday Software', query: 'password manager' },
  { id: 'file-sync', name: 'File Sync & Cloud', description: 'Your own Dropbox and Google Drive alternatives', icon: 'FolderSync', group: 'Everyday Software', query: 'file sync cloud storage' },
  { id: 'backup', name: 'Backup & Recovery', description: 'Never lose photos, documents or drives again', icon: 'HardDriveDownload', group: 'Everyday Software', query: 'backup tool' },
  { id: 'downloaders', name: 'Video & Media Downloaders', description: 'Save YouTube videos, podcasts and playlists offline', icon: 'Download', group: 'Everyday Software', query: 'youtube downloader' },
  { id: 'media-players', name: 'Media Players', description: 'Play any video or audio format on any device', icon: 'PlayCircle', group: 'Everyday Software', query: 'media player' },
  { id: 'ebooks', name: 'eBooks & Reading', description: 'Manage, convert and read your library', icon: 'BookOpen', group: 'Everyday Software', query: 'ebook reader library' },
  { id: 'education', name: 'Learning & Education', description: 'Study tools, courses and classroom software', icon: 'GraduationCap', group: 'Everyday Software', query: 'education learning platform' },
  { id: 'accessibility', name: 'Accessibility', description: 'Screen readers and tools that make tech usable for all', icon: 'Accessibility', group: 'Everyday Software', query: 'accessibility screen reader' },
  { id: 'health-fitness', name: 'Health & Fitness', description: 'Track workouts, food and wellbeing privately', icon: 'HeartPulse', group: 'Everyday Software', query: 'fitness health tracker' },
  { id: 'finance', name: 'Personal Finance', description: 'Budgeting, invoices and expense tracking', icon: 'Wallet', group: 'Everyday Software', query: 'personal finance budgeting' },
  { id: 'home-automation', name: 'Smart Home & IoT', description: 'Run your smart home without the cloud', icon: 'House', group: 'Everyday Software', query: 'home automation smart home' },
  { id: 'gaming', name: 'Games & Emulators', description: 'Open source games, launchers and emulators', icon: 'Gamepad2', group: 'Everyday Software', query: 'open source game emulator' },
  { id: 'maps', name: 'Maps & Navigation', description: 'Offline maps and community-built geodata', icon: 'MapPin', group: 'Everyday Software', query: 'maps navigation offline' },

  // ---------- Creative & Media ----------
  { id: 'design', name: 'Design & UI', description: 'Interface design, prototyping and icon libraries', icon: 'PenTool', group: 'Creative & Media', query: 'design tool ui' },
  { id: 'graphics', name: 'Graphics & Photo', description: 'Photo editing, illustration and raster tools', icon: 'Image', group: 'Creative & Media', query: 'photo editor graphics' },
  { id: 'video-editing', name: 'Video Editing', description: 'Cut, colour grade and export professional video', icon: 'Clapperboard', group: 'Creative & Media', query: 'video editor' },
  { id: 'audio', name: 'Audio & Music', description: 'DAWs, editors and music production suites', icon: 'Music', group: 'Creative & Media', query: 'audio editor music production' },
  { id: '3d-modeling', name: '3D & Animation', description: 'Modelling, sculpting, rendering and CAD', icon: 'Box', group: 'Creative & Media', query: '3d modeling animation' },
  { id: 'streaming', name: 'Streaming & Recording', description: 'Screen capture, live streaming and broadcasting', icon: 'Video', group: 'Creative & Media', query: 'screen recorder streaming' },
  { id: 'photography', name: 'Photography', description: 'RAW processing and photo library management', icon: 'Camera', group: 'Creative & Media', query: 'raw photo editor' },
  { id: 'fonts', name: 'Fonts & Typography', description: 'Free typefaces and font tooling', icon: 'Type', group: 'Creative & Media', query: 'open source font' },

  // ---------- Developer ----------
  { id: 'developer-tools', name: 'Developer Tools', description: 'Editors, IDEs and everyday coding companions', icon: 'Code2', group: 'Developer', query: 'developer tool editor' },
  { id: 'frameworks', name: 'Web Frameworks', description: 'Frontend and backend frameworks that power the web', icon: 'LayoutTemplate', group: 'Developer', query: 'web framework' },
  { id: 'mobile', name: 'Mobile Development', description: 'Build iOS and Android apps with open tooling', icon: 'Smartphone', group: 'Developer', query: 'mobile app framework' },
  { id: 'desktop-frameworks', name: 'Desktop Frameworks', description: 'Ship cross-platform desktop apps', icon: 'MonitorSmartphone', group: 'Developer', query: 'desktop app framework' },
  { id: 'testing', name: 'Testing & QA', description: 'Unit, end-to-end and load testing', icon: 'FlaskConical', group: 'Developer', query: 'testing framework' },
  { id: 'apis', name: 'APIs & GraphQL', description: 'API clients, gateways and schema tooling', icon: 'Webhook', group: 'Developer', query: 'api client graphql' },
  { id: 'plugins', name: 'Plugins & Extensions', description: 'Editor, browser and CMS plugins that add superpowers', icon: 'Puzzle', group: 'Developer', query: 'plugin extension' },
  { id: 'cli', name: 'Terminal & CLI', description: 'Shells, terminal emulators and command-line gems', icon: 'TerminalSquare', group: 'Developer', query: 'cli terminal tool' },
  { id: 'version-control', name: 'Version Control', description: 'Git servers, clients and code review', icon: 'GitBranch', group: 'Developer', query: 'git version control' },
  { id: 'docs', name: 'Documentation', description: 'Static docs, API references and knowledge sites', icon: 'BookMarked', group: 'Developer', query: 'documentation generator' },
  { id: 'game-dev', name: 'Game Development', description: 'Engines, frameworks and asset pipelines', icon: 'Joystick', group: 'Developer', query: 'game engine' },
  { id: 'low-code', name: 'Low-code & Automation', description: 'Build workflows and internal tools without code', icon: 'Workflow', group: 'Developer', query: 'low code automation workflow' },

  // ---------- Data & AI ----------
  { id: 'ai-ml', name: 'AI & Machine Learning', description: 'Frameworks and models behind modern AI', icon: 'BrainCircuit', group: 'Data & AI', query: 'machine learning framework' },
  { id: 'llm-tools', name: 'LLMs & Chatbots', description: 'Run and build with large language models locally', icon: 'Bot', group: 'Data & AI', query: 'llm local inference' },
  { id: 'data-science', name: 'Data Science', description: 'Notebooks, dataframes and scientific computing', icon: 'Sigma', group: 'Data & AI', query: 'data science notebook' },
  { id: 'databases', name: 'Databases', description: 'Relational, document, vector and time-series stores', icon: 'Database', group: 'Data & AI', query: 'database engine' },
  { id: 'analytics', name: 'Analytics & BI', description: 'Dashboards and privacy-friendly web analytics', icon: 'BarChart3', group: 'Data & AI', query: 'analytics dashboard' },
  { id: 'search', name: 'Search Engines', description: 'Full-text, vector and metasearch engines', icon: 'Search', group: 'Data & AI', query: 'search engine' },
  { id: 'scraping', name: 'Scraping & Data Collection', description: 'Crawlers, parsers and dataset builders', icon: 'Bug', group: 'Data & AI', query: 'web scraping crawler' },

  // ---------- Infrastructure ----------
  { id: 'devops', name: 'DevOps & CI/CD', description: 'Pipelines, containers and delivery automation', icon: 'Infinity', group: 'Infrastructure', query: 'devops ci cd' },
  { id: 'cloud-native', name: 'Cloud Native', description: 'Kubernetes, service meshes and orchestration', icon: 'Cloud', group: 'Infrastructure', query: 'kubernetes cloud native' },
  { id: 'monitoring', name: 'Monitoring & Observability', description: 'Metrics, logs, traces and alerting', icon: 'Activity', group: 'Infrastructure', query: 'monitoring observability' },
  { id: 'security', name: 'Security', description: 'Auditing, hardening and vulnerability scanning', icon: 'ShieldCheck', group: 'Infrastructure', query: 'security tool' },
  { id: 'privacy', name: 'Privacy & Anonymity', description: 'Encryption, tracker blocking and anonymity', icon: 'EyeOff', group: 'Infrastructure', query: 'privacy encryption' },
  { id: 'networking', name: 'Networking & VPN', description: 'VPNs, proxies, DNS and mesh networks', icon: 'Network', group: 'Infrastructure', query: 'vpn networking' },
  { id: 'selfhosted', name: 'Self-hosting', description: 'Run your own services on your own hardware', icon: 'Server', group: 'Infrastructure', query: 'self hosted' },
  { id: 'operating-systems', name: 'Operating Systems', description: 'Linux distributions, kernels and mobile OSes', icon: 'Cpu', group: 'Infrastructure', query: 'operating system linux' },
  { id: 'virtualization', name: 'Virtualization', description: 'VMs, hypervisors and sandboxes', icon: 'Layers', group: 'Infrastructure', query: 'virtualization hypervisor' },

  // ---------- Business & Web ----------
  { id: 'cms', name: 'CMS & Publishing', description: 'Content management systems and blogging platforms', icon: 'Newspaper', group: 'Business & Web', query: 'cms content management' },
  { id: 'ecommerce', name: 'E-commerce', description: 'Storefronts, carts and payments', icon: 'ShoppingCart', group: 'Business & Web', query: 'ecommerce platform' },
  { id: 'crm-erp', name: 'CRM & ERP', description: 'Run sales, support and operations in-house', icon: 'Building2', group: 'Business & Web', query: 'crm erp business' },
  { id: 'project-management', name: 'Project Management', description: 'Issues, boards, sprints and team planning', icon: 'KanbanSquare', group: 'Business & Web', query: 'project management issue tracker' },
  { id: 'marketing', name: 'Marketing & Email', description: 'Newsletters, campaigns and growth tooling', icon: 'Megaphone', group: 'Business & Web', query: 'email marketing newsletter' },
  { id: 'forms-surveys', name: 'Forms & Surveys', description: 'Collect answers without renting a SaaS', icon: 'ClipboardList', group: 'Business & Web', query: 'form builder survey' },
  { id: 'social', name: 'Social & Fediverse', description: 'Decentralised social networks and forums', icon: 'Users', group: 'Business & Web', query: 'fediverse social network' },
  { id: 'website-builders', name: 'Website Builders', description: 'Static site generators and page builders', icon: 'Rocket', group: 'Business & Web', query: 'static site generator' },
];

export const getCategory = (categoryId: ToolCategory): CategoryInfo | undefined =>
  CATEGORIES.find((c) => c.id === categoryId);

export const getCategoryName = (categoryId: ToolCategory): string =>
  getCategory(categoryId)?.name || categoryId;
