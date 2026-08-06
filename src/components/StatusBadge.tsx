import type { Priority, ProjectStatus, TaskStatus } from '../types';
import { cn } from '../lib/utils';

type BadgeValue = Priority | ProjectStatus | TaskStatus | string;

const tone = (value: BadgeValue) => {
  if (['Done', 'Completed', 'Low', 'On Track'].includes(value)) return 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20';
  if (['In Progress', 'Active', 'Medium', 'Needs Attention'].includes(value)) return 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20';
  if (['Review', 'Planning', 'High'].includes(value)) return 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20';
  if (['Urgent', 'At Risk'].includes(value)) return 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20';
  return 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700';
};

interface StatusBadgeProps {
  value: BadgeValue;
  className?: string;
}

export const StatusBadge = ({ value, className }: StatusBadgeProps) => (
  <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1', tone(value), className)}>
    {value}
  </span>
);
