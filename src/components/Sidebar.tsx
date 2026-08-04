import { BarChart3, CalendarDays, FileText, FolderKanban, LayoutDashboard, ListTodo, Settings, StickyNote, WalletCards } from 'lucide-react';
import type { Page } from '../types';
import { useWorkspaceStore } from '../store/workspaceStore';
import { cn } from '../lib/utils';
import logo from '../assets/logo.svg';

const nav: Array<{ page: Page; label: string; icon: typeof LayoutDashboard }> = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { page: 'projects', label: 'Projects', icon: FolderKanban },
  { page: 'board', label: 'Board', icon: ListTodo },
  { page: 'timeline', label: 'Timeline', icon: CalendarDays },
  { page: 'notes', label: 'Notes', icon: StickyNote },
  { page: 'resources', label: 'Resources', icon: WalletCards },
  { page: 'analytics', label: 'Analytics', icon: BarChart3 },
  { page: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const currentPage = useWorkspaceStore((state) => state.currentPage);
  const setPage = useWorkspaceStore((state) => state.setPage);
  const projects = useWorkspaceStore((state) => state.projects.filter((project) => !project.archived));

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white px-5 py-6 dark:border-slate-800 dark:bg-slate-900 lg:block">
      <div className="flex items-center gap-3">
        <img src={logo} alt="BuildSpace" className="h-11 w-11" />
        <div>
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">BuildSpace</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Project workspace</p>
        </div>
      </div>

      <nav className="mt-8 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => setPage(item.page)}
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition',
                active
                  ? 'bg-slate-950 text-white shadow-soft dark:bg-white dark:text-slate-950'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
              )}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
          <FileText size={16} />
          Active projects
        </div>
        <div className="mt-4 space-y-3">
          {projects.slice(0, 4).map((project) => (
            <div key={project.id} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: project.color }} />
              <span className="truncate">{project.name}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
