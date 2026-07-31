export type Page = 'dashboard' | 'projects' | 'board' | 'timeline' | 'notes' | 'resources' | 'analytics' | 'settings';
export type ThemeMode = 'light' | 'dark' | 'system';
export type ProjectStatus = 'Planning' | 'Active' | 'Paused' | 'Completed' | 'Archived';
export type TaskStatus = 'Backlog' | 'Planned' | 'In Progress' | 'Review' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type NoteCategory = 'Idea' | 'Decision' | 'Bug' | 'Resource' | 'Reminder';
export type ResourceType = 'Article' | 'Docs' | 'Video' | 'Course' | 'Repository' | 'Tool';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  deadline: string;
  color: string;
  tags: string[];
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  labels: string[];
  checklist: ChecklistItem[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectNote {
  id: string;
  projectId: string;
  title: string;
  body: string;
  category: NoteCategory;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  projectId: string;
  title: string;
  url: string;
  type: ResourceType;
  notes: string;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  message: string;
  projectId?: string;
  taskId?: string;
  createdAt: string;
}

export interface WorkspaceSettings {
  theme: ThemeMode;
  compactMode: boolean;
}

export interface WorkspaceData {
  projects: Project[];
  tasks: Task[];
  notes: ProjectNote[];
  resources: Resource[];
  activity: ActivityItem[];
  settings: WorkspaceSettings;
}

export interface Filters {
  search: string;
  projectId: string;
  status: string;
  priority: string;
}

export interface HealthResult {
  score: number;
  label: 'On Track' | 'Needs Attention' | 'At Risk';
  reason: string;
}
