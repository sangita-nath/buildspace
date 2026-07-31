import { useEffect } from 'react';

export const useKeyboardShortcut = (keys: string[], callback: () => void) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const normalized = keys.map((key) => key.toLowerCase());
      const keyMatches = normalized.includes(event.key.toLowerCase());
      const wantsControl = normalized.includes('ctrl') || normalized.includes('meta');
      const controlMatches = !wantsControl || event.ctrlKey || event.metaKey;

      if (keyMatches && controlMatches) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [callback, keys]);
};
