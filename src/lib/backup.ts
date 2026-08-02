import type { WorkspaceData } from '../types';

export const createBackup = (data: WorkspaceData) => {
  return JSON.stringify(
    {
      app: 'BuildSpace',
      exportedAt: new Date().toISOString(),
      data,
    },
    null,
    2,
  );
};

const isWorkspaceData = (value: unknown): value is WorkspaceData => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<WorkspaceData>;
  return Array.isArray(candidate.projects) && Array.isArray(candidate.tasks) && Array.isArray(candidate.notes) && Array.isArray(candidate.resources);
};

export const parseBackup = (raw: string): WorkspaceData => {
  const parsed = JSON.parse(raw) as unknown;
  const wrappedData = parsed && typeof parsed === 'object' && 'data' in parsed ? (parsed as { data?: unknown }).data : undefined;
  const data = wrappedData ?? parsed;

  if (!isWorkspaceData(data)) {
    throw new Error('This backup file does not look like valid BuildSpace data.');
  }

  return data;
};
