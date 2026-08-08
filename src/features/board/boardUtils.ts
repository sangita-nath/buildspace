import type { Filters, Task } from '../../types';

export const filterTasks = (tasks: Task[], filters: Filters) => {
  return tasks.filter((task) => {
    const query = filters.search.trim().toLowerCase();
    const searchMatch = !query || `${task.title} ${task.description} ${task.labels.join(' ')}`.toLowerCase().includes(query);
    const projectMatch = filters.projectId === 'all' || task.projectId === filters.projectId;
    const statusMatch = filters.status === 'all' || task.status === filters.status;
    const priorityMatch = filters.priority === 'all' || task.priority === filters.priority;
    return searchMatch && projectMatch && statusMatch && priorityMatch;
  });
};
