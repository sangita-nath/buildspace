import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CommandPalette } from './CommandPalette';
import { TaskDrawer } from './TaskDrawer';
import { useToast } from '../hooks/useToast';
import { useTheme } from '../hooks/useTheme';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import { useWorkspaceStore } from '../store/workspaceStore';
import { CheckCircle2 } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  useTheme();
  const toast = useToast();
  const setCommandOpen = useWorkspaceStore((state) => state.setCommandOpen);
  useKeyboardShortcut(['ctrl', 'k'], () => setCommandOpen(true));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar />
      <div className="lg:pl-72">
        <Header />
        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
      <CommandPalette />
      <TaskDrawer />
      {toast && (
        <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
          <CheckCircle2 className="text-emerald-500" size={18} />
          {toast}
        </div>
      )}
    </div>
  );
};
