import { Calendar, CheckSquare, Trash2, X } from 'lucide-react';
import { useWorkspaceStore } from '../store/workspaceStore';
import { PRIORITIES, TASK_COLUMNS } from '../lib/constants';
import { StatusBadge } from './StatusBadge';
import { formatDate } from '../lib/dates';

export const TaskDrawer = () => {
  const selectedTaskId = useWorkspaceStore((state) => state.selectedTaskId);
  const setSelectedTask = useWorkspaceStore((state) => state.setSelectedTask);
  const task = useWorkspaceStore((state) => state.tasks.find((item) => item.id === selectedTaskId));
  const project = useWorkspaceStore((state) => state.projects.find((item) => item.id === task?.projectId));
  const updateTask = useWorkspaceStore((state) => state.updateTask);
  const deleteTask = useWorkspaceStore((state) => state.deleteTask);

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-sm" onClick={() => setSelectedTask(null)}>
      <aside className="h-full w-full max-w-xl overflow-auto border-l border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{project?.name ?? 'No project'}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{task.title}</h2>
          </div>
          <button onClick={() => setSelectedTask(null)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <StatusBadge value={task.status} />
          <StatusBadge value={task.priority} />
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <Calendar size={13} /> {formatDate(task.dueDate)}
          </span>
        </div>

        <label className="mt-6 block text-sm font-semibold text-slate-700 dark:text-slate-200">Description</label>
        <textarea
          value={task.description}
          onChange={(event) => updateTask(task.id, { description: event.target.value })}
          className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950"
        />

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Status
            <select
              value={task.status}
              onChange={(event) => updateTask(task.id, { status: event.target.value as typeof task.status })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-950"
            >
              {TASK_COLUMNS.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Priority
            <select
              value={task.priority}
              onChange={(event) => updateTask(task.id, { priority: event.target.value as typeof task.priority })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-950"
            >
              {PRIORITIES.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-5 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          Due date
          <input
            type="date"
            value={task.dueDate}
            onChange={(event) => updateTask(task.id, { dueDate: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-950"
          />
        </label>

        <section className="mt-6 rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white">
            <CheckSquare size={18} /> Checklist
          </div>
          <div className="mt-3 space-y-2">
            {task.checklist.length === 0 && <p className="text-sm text-slate-500">No checklist items yet.</p>}
            {task.checklist.map((item) => (
              <label key={item.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 text-sm dark:bg-slate-950">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={(event) =>
                    updateTask(task.id, {
                      checklist: task.checklist.map((check) => (check.id === item.id ? { ...check, done: event.target.checked } : check)),
                    })
                  }
                />
                <span className={item.done ? 'text-slate-400 line-through' : ''}>{item.text}</span>
              </label>
            ))}
          </div>
        </section>

        <label className="mt-6 block text-sm font-semibold text-slate-700 dark:text-slate-200">Task notes</label>
        <textarea
          value={task.notes}
          onChange={(event) => updateTask(task.id, { notes: event.target.value })}
          className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950"
        />

        <button
          onClick={() => deleteTask(task.id)}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-500/20 dark:hover:bg-rose-500/10"
        >
          <Trash2 size={16} /> Delete task
        </button>
      </aside>
    </div>
  );
};
