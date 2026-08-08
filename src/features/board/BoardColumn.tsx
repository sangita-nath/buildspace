import { useDroppable } from '@dnd-kit/core';
import type { TaskStatus, Task } from '../../types';
import { TaskCard } from './TaskCard';

interface BoardColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

export const BoardColumn = ({ status, tasks }: BoardColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <section ref={setNodeRef} className={`min-h-[520px] rounded-3xl border border-slate-200 bg-slate-100/70 p-3 dark:border-slate-800 dark:bg-slate-950 ${isOver ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="mb-3 flex items-center justify-between px-2">
        <h3 className="font-bold text-slate-800 dark:text-slate-100">{status}</h3>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-500 dark:bg-slate-900">{tasks.length}</span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </section>
  );
};
