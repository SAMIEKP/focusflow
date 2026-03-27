export type Screen = 'dashboard' | 'reports' | 'focus' | 'limits' | 'settings' | 'app-details';

export interface AppUsage {
  id: string;
  name: string;
  icon: string;
  category: string;
  timeSpent: string;
  percentage: number;
  color: string;
  launches: number;
  dataUsed: string;
  avgSession: string;
  date: string; // ISO format YYYY-MM-DD
}

export interface ActivityItem {
  id: string;
  time: string;
  appName: string;
  category: string;
  description: string;
  duration?: string;
  icon: string;
  color: string;
}

export interface CategoryStat {
  name: string;
  time: string;
  color: string;
}

export interface FocusSchedule {
  id: string;
  days: number[]; // 0-6 for Sun-Sat
  time: string; // "HH:mm"
  duration: number; // minutes
  label: string;
  enabled: boolean;
}

export interface AppLimit {
  id: string;
  type: 'category' | 'app';
  title: string;
  subtitle: string;
  limit: string; // e.g., "1h 30m" or "No Limit"
  color: string;
  icon: string; // icon name for lucide
  enabled: boolean;
}
