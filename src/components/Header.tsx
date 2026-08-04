import { Command, Plus, Search } from 'lucide-react';
import { useWorkspaceStore } from '../store/workspaceStore';
import { ThemeToggle } from './ThemeToggle';

const titles = {
  dashboard: 'Workspace Dashboard',
  projects: 'Projects',
  board: 'Task Board',
  timeline: 'Timeline',
  notes: 'Project Notes',
  resources: 'Resources',
  analytics: 'Analytics',
  settings: 'Settings',
};

export const Header = () => {
  const currentPage = useWorkspaceStore((state) => state.currentPage);
  const setCommandOpen = useWorkspaceStore((state) => state.setCommandOpen);
  const setPage = useWorkspaceStore((state) => state.setPage);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50/90 px-4 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">BuildSpace</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{titles[currentPage]}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCommandOpen(true)}
            className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm transition hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white md:flex"
          >
            <Search size={16} />
            Search or run command
            <span className="ml-6 flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">
              <Command size={12} /> K
            </span>
          </button>
          <ThemeToggle />
          <button
            onClick={() => setPage('board')}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-soft hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            <Plus size={16} />
            New Task
          </button>
        </div>
      </div>
    </header>
  );
};
