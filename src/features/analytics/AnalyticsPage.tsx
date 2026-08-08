import { BarChart3, CheckCircle2, FolderKanban, ListTodo, PieChart } from 'lucide-react';
import { Cell, Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { StatCard } from '../../components/StatCard';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { projectProgressData, tasksByStatus } from './analyticsUtils';
import { ProgressChart } from './ProgressChart';

const colors = ['#2563eb', '#7c3aed', '#059669', '#ea580c', '#dc2626'];

export const AnalyticsPage = () => {
  const projects = useWorkspaceStore((state) => state.projects.filter((project) => !project.archived));
  const tasks = useWorkspaceStore((state) => state.tasks);
  const notes = useWorkspaceStore((state) => state.notes);
  const resources = useWorkspaceStore((state) => state.resources);
  const progressData = projectProgressData(projects, tasks);
  const statusData = tasksByStatus(tasks);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projects" value={projects.length} detail="Active workspace projects" icon={FolderKanban} />
        <StatCard label="Tasks" value={tasks.length} detail="Total planned work items" icon={ListTodo} />
        <StatCard label="Completed" value={tasks.filter((task) => task.status === 'Done').length} detail="Finished tasks" icon={CheckCircle2} />
        <StatCard label="Notes + Resources" value={notes.length + resources.length} detail="Knowledge items saved" icon={BarChart3} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">Project progress</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Completion percentage based on done tasks.</p>
          <div className="mt-6"><ProgressChart data={progressData} /></div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2"><PieChart size={18} /><h2 className="text-lg font-bold text-slate-950 dark:text-white">Task status</h2></div>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={110} label>
                  {statusData.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};
