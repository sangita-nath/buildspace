import { useEffect } from 'react';
import { useWorkspaceStore } from '../store/workspaceStore';

export const useToast = () => {
  const toast = useWorkspaceStore((state) => state.toast);
  const setToast = useWorkspaceStore((state) => state.setToast);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(timer);
  }, [toast, setToast]);

  return toast;
};
