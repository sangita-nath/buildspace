import { Monitor, Moon, Sun } from 'lucide-react';
import { useWorkspaceStore } from '../store/workspaceStore';
import type { ThemeMode } from '../types';
import { cn } from '../lib/utils';

const options: Array<{ value: ThemeMode; label: string; icon: typeof Sun }> = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export const ThemeToggle = () => {
  const theme = useWorkspaceStore((state) => state.settings.theme);
  const setTheme = useWorkspaceStore((state) => state.setTheme);

  return (
    <div className="flex rounded-2xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-950">
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={cn(
              'flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition',
              theme === option.value
                ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white',
            )}
          >
            <Icon size={14} />
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
