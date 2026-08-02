export const todayISO = () => new Date().toISOString().slice(0, 10);

export const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const formatDate = (iso: string) => {
  if (!iso) return 'No date';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${iso}T00:00:00`));
};

export const isOverdue = (iso: string) => Boolean(iso) && new Date(`${iso}T23:59:59`) < new Date();

export const daysUntil = (iso: string) => {
  if (!iso) return 999;
  const now = new Date();
  const target = new Date(`${iso}T23:59:59`);
  return Math.ceil((target.getTime() - now.getTime()) / 86400000);
};

export const groupByTime = <T extends { dueDate?: string; deadline?: string }>(items: T[]) => {
  const groups: Record<string, T[]> = {
    Overdue: [],
    Today: [],
    'This Week': [],
    Upcoming: [],
    'No Date': [],
  };

  items.forEach((item) => {
    const date = item.dueDate || item.deadline;
    if (!date) {
      groups['No Date'].push(item);
      return;
    }
    const days = daysUntil(date);
    if (days < 0) groups.Overdue.push(item);
    else if (days === 0) groups.Today.push(item);
    else if (days <= 7) groups['This Week'].push(item);
    else groups.Upcoming.push(item);
  });

  return groups;
};
