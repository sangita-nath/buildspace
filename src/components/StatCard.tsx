import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
}

export const StatCard = ({ label, value, detail, icon: Icon }: StatCardProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{value}</p>
      </div>
      <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
        <Icon size={22} />
      </div>
    </div>
    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{detail}</p>
  </div>
);
