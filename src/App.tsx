import { useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { AnalyticsPage } from './features/analytics/AnalyticsPage';
import { BoardPage } from './features/board/BoardPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { NotesPage } from './features/notes/NotesPage';
import { ProjectsPage } from './features/projects/ProjectsPage';
import { ResourcesPage } from './features/resources/ResourcesPage';
import { SettingsPage } from './features/settings/SettingsPage';
import { TimelinePage } from './features/timeline/TimelinePage';
import { useWorkspaceStore } from './store/workspaceStore';

const pages = {
  dashboard: DashboardPage,
  projects: ProjectsPage,
  board: BoardPage,
  timeline: TimelinePage,
  notes: NotesPage,
  resources: ResourcesPage,
  analytics: AnalyticsPage,
  settings: SettingsPage,
};

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
    <div className="text-center">
      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-white" />
      <p className="mt-4 text-sm text-slate-300">Loading workspace...</p>
    </div>
  </div>
);

export default function App() {
  const currentPage = useWorkspaceStore((state) => state.currentPage);
  const hydrated = useWorkspaceStore((state) => state.hydrated);
  const hydrate = useWorkspaceStore((state) => state.hydrate);
  const Page = pages[currentPage];

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  if (!hydrated) return <LoadingScreen />;

  return (
    <AppShell>
      <Page />
    </AppShell>
  );
}
