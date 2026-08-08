import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CalendarDays, CheckSquare } from 'lucide-react';
import type { Task } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';
import { formatDate } from '../../lib/dates';
import { useWorkspaceStore } from '../../store/workspaceStore';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const setSelectedTask = useWorkspaceStore((state) => state.setSelectedTask);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id });
  const completed = task.checklist.filter((item) => item.done).length;

  return (
    <article
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      {...listeners}
      {...attributes}
      onClick={() => setSelectedTask(task.id)}
      className={`cursor-grab rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-soft dark:border-slate-800 dark:bg-slate-900 ${isDragging ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-bold text-slate-950 dark:text-white">{task.title}</h4>
        <StatusBadge value={task.priority} />
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{task.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {task.labels.map((label) => <span key={label} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">{label}</span>)}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} /> {formatDate(task.dueDate)}</span>
        <span className="inline-flex items-center gap-1.5"><CheckSquare size={14} /> {completed}/{task.checklist.length}</span>
      </div>
    </article>
  );
};
