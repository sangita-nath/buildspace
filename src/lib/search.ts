import type { Project, ProjectNote, Resource, Task } from '../types';

const matches = (value: string, query: string) => value.toLowerCase().includes(query.toLowerCase());

export const searchWorkspace = (
  query: string,
  projects: Project[],
  tasks: Task[],
  notes: ProjectNote[],
  resources: Resource[],
) => {
  const q = query.trim();
  if (!q) return { projects: [], tasks: [], notes: [], resources: [] };

  return {
    projects: projects.filter((project) => matches(`${project.name} ${project.description} ${project.tags.join(' ')}`, q)),
    tasks: tasks.filter((task) => matches(`${task.title} ${task.description} ${task.labels.join(' ')} ${task.notes}`, q)),
    notes: notes.filter((note) => matches(`${note.title} ${note.body} ${note.category}`, q)),
    resources: resources.filter((resource) => matches(`${resource.title} ${resource.url} ${resource.notes} ${resource.type}`, q)),
  };
};
