import type { HealthResult, Project, Task } from '../types';
import { clamp } from './utils';
import { daysUntil, isOverdue } from './dates';
import { PRIORITY_WEIGHT } from './constants';

export const calculateProjectProgress = (project: Project, tasks: Task[]) => {
  const projectTasks = tasks.filter((task) => task.projectId === project.id);
  if (projectTasks.length === 0) return 0;
  const completed = projectTasks.filter((task) => task.status === 'Done').length;
  return Math.round((completed / projectTasks.length) * 100);
};

export const calculateProjectHealth = (project: Project, tasks: Task[]): HealthResult => {
  const projectTasks = tasks.filter((task) => task.projectId === project.id);
  const openTasks = projectTasks.filter((task) => task.status !== 'Done');
  const overdue = openTasks.filter((task) => isOverdue(task.dueDate));
  const blocked = openTasks.filter((task) => task.status === 'Review');
  const urgentLoad = openTasks.reduce((total, task) => total + PRIORITY_WEIGHT[task.priority], 0);
  const deadlinePressure = daysUntil(project.deadline) <= 7 && project.status !== 'Completed' ? 12 : 0;
  const progress = calculateProjectProgress(project, tasks);

  const penalty = overdue.length * 16 + blocked.length * 6 + urgentLoad * 1.5 + deadlinePressure;
  const score = clamp(Math.round(70 + progress * 0.3 - penalty), 0, 100);

  if (score >= 75) {
    return {
      score,
      label: 'On Track',
      reason: 'Work is moving well and the project has a healthy completion balance.',
    };
  }

  if (score >= 45) {
    return {
      score,
      label: 'Needs Attention',
      reason: 'Some tasks need follow-up, especially items near deadline or stuck in review.',
    };
  }

  return {
    score,
    label: 'At Risk',
    reason: 'The project has overdue or high-priority work that needs attention soon.',
  };
};
