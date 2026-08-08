import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ProgressChartProps {
  data: Array<{ name: string; progress: number }>;
}

export const ProgressChart = ({ data }: ProgressChartProps) => (
  <div className="h-80 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="progress" fill="#2563eb" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
