import type { WorkspaceData } from '../types';
import { clearIndexedDB, loadFromIndexedDB, saveToIndexedDB } from './db';

const FALLBACK_KEY = 'buildspace-workspace';

export const saveWorkspace = async (data: WorkspaceData) => {
  localStorage.setItem(FALLBACK_KEY, JSON.stringify(data));
  try {
    await saveToIndexedDB(data);
  } catch {
    // localStorage is already updated as a safe fallback.
  }
};

export const loadWorkspace = async () => {
  try {
    const indexed = await loadFromIndexedDB();
    if (indexed) return indexed;
  } catch {
    // fall back to localStorage below
  }

  const raw = localStorage.getItem(FALLBACK_KEY);
  return raw ? (JSON.parse(raw) as WorkspaceData) : null;
};

export const clearWorkspace = async () => {
  localStorage.removeItem(FALLBACK_KEY);
  try {
    await clearIndexedDB();
  } catch {
    // ignored because localStorage was cleared
  }
};
