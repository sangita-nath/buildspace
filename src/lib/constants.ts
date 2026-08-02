import type { NoteCategory, Priority, ProjectStatus, ResourceType, TaskStatus } from '../types';

export const TASK_COLUMNS: TaskStatus[] = ['Backlog', 'Planned', 'In Progress', 'Review', 'Done'];
export const PROJECT_STATUSES: ProjectStatus[] = ['Planning', 'Active', 'Paused', 'Completed', 'Archived'];
export const PRIORITIES: Priority[] = ['Low', 'Medium', 'High', 'Urgent'];
export const NOTE_CATEGORIES: NoteCategory[] = ['Idea', 'Decision', 'Bug', 'Resource', 'Reminder'];
export const RESOURCE_TYPES: ResourceType[] = ['Article', 'Docs', 'Video', 'Course', 'Repository', 'Tool'];

export const PRIORITY_WEIGHT: Record<Priority, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Urgent: 4,
};
