import type { Project, Task } from '../../types';

export const tasksByStatus = (tasks: Task[]) => {
  const counts: Record<string, number> = {};
  tasks.forEach((task) => {
    counts[task.status] = (counts[task.status] ?? 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

export const projectProgressData = (projects: Project[], tasks: Task[]) => {
  return projects.map((project) => {
    const projectTasks = tasks.filter((task) => task.projectId === project.id);
    const done = projectTasks.filter((task) => task.status === 'Done').length;
    return { name: project.name, progress: projectTasks.length ? Math.round((done / projectTasks.length) * 100) : 0 };
  });
};
