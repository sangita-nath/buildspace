import { useEffect } from 'react';
import { useWorkspaceStore } from '../store/workspaceStore';

export const useTheme = () => {
  const theme = useWorkspaceStore((state) => state.settings.theme);

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = theme === 'dark' || (theme === 'system' && prefersDark);

    root.classList.toggle('dark', shouldDark);
  }, [theme]);
};
