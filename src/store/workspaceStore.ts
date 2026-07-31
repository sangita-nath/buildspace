import { create } from 'zustand';
import type { ActivityItem, Filters, Page, Project, ProjectNote, Resource, Task, TaskStatus, ThemeMode, WorkspaceData } from '../types';
import { starterData } from '../data/starterData';
import { uid } from '../lib/utils';
import { clearWorkspace, loadWorkspace, saveWorkspace } from '../lib/storage';

interface WorkspaceState extends WorkspaceData {
  hydrated: boolean;
  currentPage: Page;
  selectedProjectId: string;
  selectedTaskId: string | null;
  commandOpen: boolean;
  filters: Filters;
  toast: string | null;
  hydrate: () => Promise<void>;
  persist: () => Promise<void>;
  resetWorkspace: () => Promise<void>;
  importWorkspace: (data: WorkspaceData) => Promise<void>;
  setPage: (page: Page) => void;
  setSelectedProject: (projectId: string) => void;
  setSelectedTask: (taskId: string | null) => void;
  setCommandOpen: (open: boolean) => void;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'archived'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  archiveProject: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  addNote: (note: Omit<ProjectNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<ProjectNote>) => void;
  deleteNote: (id: string) => void;
  addResource: (resource: Omit<Resource, 'id' | 'createdAt'>) => void;
  deleteResource: (id: string) => void;
  setTheme: (theme: ThemeMode) => void;
  setToast: (message: string | null) => void;
}

const initialFilters: Filters = {
  search: '',
  projectId: 'all',
  status: 'all',
  priority: 'all',
};

const activity = (message: string, projectId?: string, taskId?: string): ActivityItem => ({
  id: uid('activity'),
  message,
  projectId,
  taskId,
  createdAt: new Date().toISOString(),
});

const saveCurrentState = async (get: () => WorkspaceState) => {
  const state = get();
  const data: WorkspaceData = {
    projects: state.projects,
    tasks: state.tasks,
    notes: state.notes,
    resources: state.resources,
    activity: state.activity.slice(0, 50),
    settings: state.settings,
  };
  await saveWorkspace(data);
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  ...starterData,
  hydrated: false,
  currentPage: 'dashboard',
  selectedProjectId: starterData.projects[0]?.id ?? 'all',
  selectedTaskId: null,
  commandOpen: false,
  filters: initialFilters,
  toast: null,

  hydrate: async () => {
    const saved = await loadWorkspace();
    if (saved) {
      set({ ...saved, hydrated: true, selectedProjectId: saved.projects[0]?.id ?? 'all' });
    } else {
      set({ hydrated: true });
      await saveCurrentState(get);
    }
  },

  persist: async () => saveCurrentState(get),

  resetWorkspace: async () => {
    await clearWorkspace();
    set({ ...starterData, selectedProjectId: starterData.projects[0]?.id ?? 'all', filters: initialFilters, selectedTaskId: null });
    await saveCurrentState(get);
  },

  importWorkspace: async (data) => {
    set({ ...data, selectedProjectId: data.projects[0]?.id ?? 'all', selectedTaskId: null });
    await saveWorkspace(data);
  },

  setPage: (page) => set({ currentPage: page }),
  setSelectedProject: (projectId) => set({ selectedProjectId: projectId }),
  setSelectedTask: (taskId) => set({ selectedTaskId: taskId }),
  setCommandOpen: (open) => set({ commandOpen: open }),
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),

  addProject: (project) => {
    const next: Project = {
      ...project,
      id: uid('project'),
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      projects: [next, ...state.projects],
      selectedProjectId: next.id,
      activity: [activity(`Created project: ${next.name}`, next.id), ...state.activity],
      toast: 'Project created',
    }));
    void saveCurrentState(get);
  },

  updateProject: (id, updates) => {
    set((state) => ({
      projects: state.projects.map((project) => (project.id === id ? { ...project, ...updates, updatedAt: new Date().toISOString() } : project)),
      activity: [activity('Updated project details', id), ...state.activity],
      toast: 'Project updated',
    }));
    void saveCurrentState(get);
  },

  archiveProject: (id) => {
    set((state) => ({
      projects: state.projects.map((project) => (project.id === id ? { ...project, archived: true, status: 'Archived', updatedAt: new Date().toISOString() } : project)),
      activity: [activity('Archived a project', id), ...state.activity],
      toast: 'Project archived',
    }));
    void saveCurrentState(get);
  },

  addTask: (task) => {
    const next: Task = {
      ...task,
      id: uid('task'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      tasks: [next, ...state.tasks],
      activity: [activity(`Created task: ${next.title}`, next.projectId, next.id), ...state.activity],
      toast: 'Task created',
    }));
    void saveCurrentState(get);
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task)),
      activity: [activity('Updated a task', updates.projectId, id), ...state.activity],
      toast: 'Task updated',
    }));
    void saveCurrentState(get);
  },

  moveTask: (id, status) => {
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, status, updatedAt: new Date().toISOString() } : task)),
      activity: [activity(`Moved task to ${status}`, undefined, id), ...state.activity],
    }));
    void saveCurrentState(get);
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      selectedTaskId: state.selectedTaskId === id ? null : state.selectedTaskId,
      activity: [activity('Deleted a task', undefined, id), ...state.activity],
      toast: 'Task deleted',
    }));
    void saveCurrentState(get);
  },

  addNote: (note) => {
    const next: ProjectNote = {
      ...note,
      id: uid('note'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      notes: [next, ...state.notes],
      activity: [activity(`Added note: ${next.title}`, next.projectId), ...state.activity],
      toast: 'Note added',
    }));
    void saveCurrentState(get);
  },

  updateNote: (id, updates) => {
    set((state) => ({
      notes: state.notes.map((note) => (note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note)),
      toast: 'Note updated',
    }));
    void saveCurrentState(get);
  },

  deleteNote: (id) => {
    set((state) => ({ notes: state.notes.filter((note) => note.id !== id), toast: 'Note deleted' }));
    void saveCurrentState(get);
  },

  addResource: (resource) => {
    const next: Resource = { ...resource, id: uid('resource'), createdAt: new Date().toISOString() };
    set((state) => ({
      resources: [next, ...state.resources],
      activity: [activity(`Saved resource: ${next.title}`, next.projectId), ...state.activity],
      toast: 'Resource saved',
    }));
    void saveCurrentState(get);
  },

  deleteResource: (id) => {
    set((state) => ({ resources: state.resources.filter((resource) => resource.id !== id), toast: 'Resource deleted' }));
    void saveCurrentState(get);
  },

  setTheme: (theme) => {
    set((state) => ({ settings: { ...state.settings, theme } }));
    void saveCurrentState(get);
  },

  setToast: (message) => set({ toast: message }),
}));
