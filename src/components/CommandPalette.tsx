import { useMemo, useState } from 'react';
import { BarChart3, CalendarDays, FileDown, FolderKanban, LayoutDashboard, ListTodo, Search, Settings, StickyNote, WalletCards, X } from 'lucide-react';
import { useWorkspaceStore } from '../store/workspaceStore';
import type { Page } from '../types';
import { searchWorkspace } from '../lib/search';
import { createBackup } from '../lib/backup';
import { downloadFile } from '../lib/utils';

const pages: Array<{ page: Page; label: string; icon: typeof LayoutDashboard }> = [
  { page: 'dashboard', label: 'Open dashboard', icon: LayoutDashboard },
  { page: 'projects', label: 'Open projects', icon: FolderKanban },
  { page: 'board', label: 'Open task board', icon: ListTodo },
  { page: 'timeline', label: 'Open timeline', icon: CalendarDays },
  { page: 'notes', label: 'Open notes', icon: StickyNote },
  { page: 'resources', label: 'Open resources', icon: WalletCards },
  { page: 'analytics', label: 'Open analytics', icon: BarChart3 },
  { page: 'settings', label: 'Open settings', icon: Settings },
];

export const CommandPalette = () => {
  const [query, setQuery] = useState('');
  const open = useWorkspaceStore((state) => state.commandOpen);
  const setOpen = useWorkspaceStore((state) => state.setCommandOpen);
  const setPage = useWorkspaceStore((state) => state.setPage);
  const setSelectedTask = useWorkspaceStore((state) => state.setSelectedTask);
  const projects = useWorkspaceStore((state) => state.projects);
  const tasks = useWorkspaceStore((state) => state.tasks);
  const notes = useWorkspaceStore((state) => state.notes);
  const resources = useWorkspaceStore((state) => state.resources);
  const settings = useWorkspaceStore((state) => state.settings);

  const results = useMemo(() => searchWorkspace(query, projects, tasks, notes, resources), [query, projects, tasks, notes, resources]);

  if (!open) return null;

  const exportData = () => {
    downloadFile('buildspace-backup.json', createBackup({ projects, tasks, notes, resources, activity: [], settings }));
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="mx-auto mt-16 w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <Search className="text-slate-400" size={20} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tasks, projects, notes, resources..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          <button onClick={() => setOpen(false)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-auto p-4">
          <p className="px-2 text-xs font-bold uppercase tracking-wide text-slate-400">Navigation</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {pages.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.page}
                  onClick={() => {
                    setPage(item.page);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Icon size={17} />
                  {item.label}
                </button>
              );
            })}
            <button onClick={exportData} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
              <FileDown size={17} /> Export backup
            </button>
          </div>

          {query && (
            <div className="mt-6 space-y-5">
              <section>
                <p className="px-2 text-xs font-bold uppercase tracking-wide text-slate-400">Tasks</p>
                {results.tasks.slice(0, 6).map((task) => (
                  <button
                    key={task.id}
                    onClick={() => {
                      setSelectedTask(task.id);
                      setOpen(false);
                    }}
                    className="mt-2 flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <span className="font-semibold">{task.title}</span>
                    <span className="text-xs text-slate-500">{task.status}</span>
                  </button>
                ))}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
