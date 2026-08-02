export const uid = (prefix = 'id') => `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36)}`;

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

export const downloadFile = (filename: string, content: string, type = 'application/json') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
