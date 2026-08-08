import type { FormEvent } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Modal } from '../../components/Modal';
import { SearchBox } from '../../components/SearchBox';
import { PRIORITIES, TASK_COLUMNS } from '../../lib/constants';
import { addDays } from '../../lib/dates';
import { uid } from '../../lib/utils';
import { useWorkspaceStore } from '../../store/workspaceStore';
import type { Priority, TaskStatus } from '../../types';
import { BoardColumn } from './BoardColumn';
import { filterTasks } from './boardUtils';

export const BoardPage = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [dueDate, setDueDate] = useState(addDays(5));
  const [labels, setLabels] = useState('');
  const projects = useWorkspaceStore((state) => state.projects.filter((project) => !project.archived));
  const tasks = useWorkspaceStore((state) => state.tasks);
  const filters = useWorkspaceStore((state) => state.filters);
  const setFilter = useWorkspaceStore((state) => state.setFilter);
  const addTask = useWorkspaceStore((state) => state.addTask);
  const moveTask = useWorkspaceStore((state) => state.moveTask);

  const filteredTasks = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    addTask({
      title,
      description,
      projectId: projectId || projects[0]?.id || '',
      status: 'Backlog',
      priority,
      dueDate,
      labels: labels.split(',').map((label) => label.trim()).filter(Boolean),
      notes: '',
      checklist: [{ id: uid('check'), text: 'Define next action', done: false }],
    });
    setOpen(false);
    setTitle('');
    setDescription('');
    setLabels('');
  };

  const onDragEnd = (event: DragEndEvent) => {
    const taskId = String(event.active.id);
    const status = event.over?.id ? String(event.over.id) : '';
    if (TASK_COLUMNS.includes(status as TaskStatus)) {
      moveTask(taskId, status as TaskStatus);
    }
  };

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Task board</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Move work through backlog, planning, progress, review, and completion.</p>
        </div>
        <button onClick={() => { setProjectId(projects[0]?.id ?? ''); setOpen(true); }} className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"><Plus size={16} /> New task</button>
      </section>

      <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[1fr_180px_160px_160px]">
        <SearchBox value={filters.search} onChange={(value) => setFilter('search', value)} placeholder="Search tasks..." />
        <select value={filters.projectId} onChange={(event) => setFilter('projectId', event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm dark:border-slate-800 dark:bg-slate-950"><option value="all">All projects</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select>
        <select value={filters.status} onChange={(event) => setFilter('status', event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm dark:border-slate-800 dark:bg-slate-950"><option value="all">All status</option>{TASK_COLUMNS.map((status) => <option key={status}>{status}</option>)}</select>
        <select value={filters.priority} onChange={(event) => setFilter('priority', event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm dark:border-slate-800 dark:bg-slate-950"><option value="all">All priority</option>{PRIORITIES.map((item) => <option key={item}>{item}</option>)}</select>
      </div>

      <DndContext onDragEnd={onDragEnd}>
        <section className="grid gap-4 xl:grid-cols-5">
          {TASK_COLUMNS.map((status) => <BoardColumn key={status} status={status} tasks={filteredTasks.filter((task) => task.status === status)} />)}
        </section>
      </DndContext>

      <Modal open={open} title="Create task" onClose={() => setOpen(false)}>
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm font-semibold">Title<input required value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950" /></label>
          <label className="block text-sm font-semibold">Description<textarea required value={description} onChange={(event) => setDescription(event.target.value)} className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950" /></label>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-semibold">Project<select value={projectId} onChange={(event) => setProjectId(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label>
            <label className="block text-sm font-semibold">Priority<select value={priority} onChange={(event) => setPriority(event.target.value as Priority)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">{PRIORITIES.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="block text-sm font-semibold">Due date<input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950" /></label>
          </div>
          <label className="block text-sm font-semibold">Labels<input value={labels} onChange={(event) => setLabels(event.target.value)} placeholder="ui, backend, docs" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950" /></label>
          <div className="flex justify-end gap-3"><button type="button" onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold dark:border-slate-700">Cancel</button><button className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">Create task</button></div>
        </form>
      </Modal>
    </div>
  );
};
