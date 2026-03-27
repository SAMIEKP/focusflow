import React, { createContext, useContext, useState, useEffect } from 'react';
import { FocusSchedule, AppLimit } from '../types';

type Theme = 'System' | 'Dark' | 'Light';

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  appIcon: string;
  setAppIcon: (icon: string) => void;
  trackingEnabled: boolean;
  setTrackingEnabled: (enabled: boolean) => void;
  focusDuration: number;
  setFocusDuration: (duration: number) => void;
  shortBreakDuration: number;
  setShortBreakDuration: (duration: number) => void;
  longBreakDuration: number;
  setLongBreakDuration: (duration: number) => void;
  startSound: string;
  setStartSound: (sound: string) => void;
  endSound: string;
  setEndSound: (sound: string) => void;
  transitionSound: string;
  setTransitionSound: (sound: string) => void;
  reminderTime: string;
  setReminderTime: (time: string) => void;
  focusReminderTime: string;
  setFocusReminderTime: (time: string) => void;
  weeklyReportEnabled: boolean;
  setWeeklyReportEnabled: (enabled: boolean) => void;
  limitWarningsEnabled: boolean;
  setLimitWarningsEnabled: (enabled: boolean) => void;
  ignoreBackgroundEnabled: boolean;
  setIgnoreBackgroundEnabled: (enabled: boolean) => void;
  schedules: FocusSchedule[];
  addSchedule: (schedule: Omit<FocusSchedule, 'id'>) => void;
  updateSchedule: (id: string, schedule: Partial<FocusSchedule>) => void;
  deleteSchedule: (id: string) => void;
  limits: AppLimit[];
  addLimit: (limit: Omit<AppLimit, 'id'>) => void;
  updateLimit: (id: string, limit: Partial<AppLimit>) => void;
  deleteLimit: (id: string) => void;
  downtimeEnabled: boolean;
  setDowntimeEnabled: (enabled: boolean) => void;
  downtimeStart: string;
  setDowntimeStart: (time: string) => void;
  downtimeEnd: string;
  setDowntimeEnd: (time: string) => void;
  notificationStrictness: 'Strict' | 'Gentle' | 'Off';
  setNotificationStrictness: (strictness: 'Strict' | 'Gentle' | 'Off') => void;
  alwaysAllowedApps: string[];
  setAlwaysAllowedApps: (apps: string[]) => void;
  dailyGoal: number;
  setDailyGoal: (goal: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SOUND_OPTIONS = {
  start: [
    { id: 'pop', name: 'Pop', url: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' },
    { id: 'click', name: 'Click', url: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3' },
    { id: 'blip', name: 'Blip', url: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3' },
  ],
  end: [
    { id: 'chime', name: 'Chime', url: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' },
    { id: 'bell', name: 'Bell', url: 'https://assets.mixkit.co/active_storage/sfx/2567/2567-preview.mp3' },
    { id: 'success', name: 'Success', url: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3' },
  ],
  transition: [
    { id: 'swish', name: 'Swish', url: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3' },
    { id: 'slide', name: 'Slide', url: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3' },
    { id: 'whoosh', name: 'Whoosh', url: 'https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3' },
  ]
};

const API_URL = 'http://localhost:3001/api';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('Dark');
  const [appIcon, setAppIconState] = useState('default');
  const [trackingEnabled, setTrackingEnabledState] = useState(true);
  const [focusDuration, setFocusDurationState] = useState(25);
  const [shortBreakDuration, setShortBreakDurationState] = useState(5);
  const [longBreakDuration, setLongBreakDurationState] = useState(15);
  const [startSound, setStartSoundState] = useState(SOUND_OPTIONS.start[0].url);
  const [endSound, setEndSoundState] = useState(SOUND_OPTIONS.end[0].url);
  const [transitionSound, setTransitionSoundState] = useState(SOUND_OPTIONS.transition[0].url);
  const [reminderTime, setReminderTimeState] = useState('09:00');
  const [focusReminderTime, setFocusReminderTimeState] = useState('10:00');
  const [weeklyReportEnabled, setWeeklyReportEnabledState] = useState(true);
  const [limitWarningsEnabled, setLimitWarningsEnabledState] = useState(true);
  const [ignoreBackgroundEnabled, setIgnoreBackgroundEnabledState] = useState(false);
  const [schedules, setSchedules] = useState<FocusSchedule[]>([]);
  const [limits, setLimits] = useState<AppLimit[]>([]);
  const [downtimeEnabled, setDowntimeEnabledState] = useState(true);
  const [downtimeStart, setDowntimeStartState] = useState('22:00');
  const [downtimeEnd, setDowntimeEndState] = useState('07:00');
  const [notificationStrictness, setNotificationStrictnessState] = useState<'Strict' | 'Gentle' | 'Off'>('Strict');
  const [dailyGoal, setDailyGoalState] = useState(270);
  const [alwaysAllowedApps, setAlwaysAllowedAppsState] = useState<string[]>(['Phone', 'Messages', 'Maps', 'Calendar']);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsRes = await fetch(`${API_URL}/settings`);
        if (settingsRes.ok) {
          const data = await settingsRes.json();
          // Update all states if data exists
          if (data.theme) setThemeState(data.theme);
          if (data.appIcon) setAppIconState(data.appIcon);
          if (data.trackingEnabled !== undefined) setTrackingEnabledState(data.trackingEnabled);
          if (data.focusDuration) setFocusDurationState(data.focusDuration);
          if (data.shortBreakDuration) setShortBreakDurationState(data.shortBreakDuration);
          if (data.longBreakDuration) setLongBreakDurationState(data.longBreakDuration);
          if (data.startSound) setStartSoundState(data.startSound);
          if (data.endSound) setEndSoundState(data.endSound);
          if (data.transitionSound) setTransitionSoundState(data.transitionSound);
          if (data.reminderTime) setReminderTimeState(data.reminderTime);
          if (data.focusReminderTime) setFocusReminderTimeState(data.focusReminderTime);
          if (data.weeklyReportEnabled !== undefined) setWeeklyReportEnabledState(data.weeklyReportEnabled);
          if (data.limitWarningsEnabled !== undefined) setLimitWarningsEnabledState(data.limitWarningsEnabled);
          if (data.ignoreBackgroundEnabled !== undefined) setIgnoreBackgroundEnabledState(data.ignoreBackgroundEnabled);
          if (data.downtimeEnabled !== undefined) setDowntimeEnabledState(data.downtimeEnabled);
          if (data.downtimeStart) setDowntimeStartState(data.downtimeStart);
          if (data.downtimeEnd) setDowntimeEndState(data.downtimeEnd);
          if (data.notificationStrictness) setNotificationStrictnessState(data.notificationStrictness);
          if (data.dailyGoal) setDailyGoalState(data.dailyGoal);
          if (data.alwaysAllowedApps) setAlwaysAllowedAppsState(data.alwaysAllowedApps);
        }

        const limitsRes = await fetch(`${API_URL}/limits`);
        if (limitsRes.ok) {
          const data = await limitsRes.json();
          setLimits(data);
        }
      } catch (error) {
        console.error('Failed to fetch initial settings:', error);
      }
    };
    fetchData();
  }, []);

  // Helper to sync setting to server
  const syncSetting = async (updates: any) => {
    try {
      await fetch(`${API_URL}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (error) {
      console.error('Failed to sync setting:', error);
    }
  };

  const setTheme = (val: Theme) => {
    setThemeState(val);
    syncSetting({ theme: val });
  };
  const setAppIcon = (val: string) => {
    setAppIconState(val);
    syncSetting({ appIcon: val });
  };
  const setTrackingEnabled = (val: boolean) => {
    setTrackingEnabledState(val);
    syncSetting({ trackingEnabled: val });
  };
  const setFocusDuration = (val: number) => {
    setFocusDurationState(val);
    syncSetting({ focusDuration: val });
  };
  const setShortBreakDuration = (val: number) => {
    setShortBreakDurationState(val);
    syncSetting({ shortBreakDuration: val });
  };
  const setLongBreakDuration = (val: number) => {
    setLongBreakDurationState(val);
    syncSetting({ longBreakDuration: val });
  };
  const setStartSound = (val: string) => {
    setStartSoundState(val);
    syncSetting({ startSound: val });
  };
  const setEndSound = (val: string) => {
    setEndSoundState(val);
    syncSetting({ endSound: val });
  };
  const setTransitionSound = (val: string) => {
    setTransitionSoundState(val);
    syncSetting({ transitionSound: val });
  };
  const setReminderTime = (val: string) => {
    setReminderTimeState(val);
    syncSetting({ reminderTime: val });
  };
  const setFocusReminderTime = (val: string) => {
    setFocusReminderTimeState(val);
    syncSetting({ focusReminderTime: val });
  };
  const setWeeklyReportEnabled = (val: boolean) => {
    setWeeklyReportEnabledState(val);
    syncSetting({ weeklyReportEnabled: val });
  };
  const setLimitWarningsEnabled = (val: boolean) => {
    setLimitWarningsEnabledState(val);
    syncSetting({ limitWarningsEnabled: val });
  };
  const setIgnoreBackgroundEnabled = (val: boolean) => {
    setIgnoreBackgroundEnabledState(val);
    syncSetting({ ignoreBackgroundEnabled: val });
  };
  const setDowntimeEnabled = (val: boolean) => {
    setDowntimeEnabledState(val);
    syncSetting({ downtimeEnabled: val });
  };
  const setDowntimeStart = (val: string) => {
    setDowntimeStartState(val);
    syncSetting({ downtimeStart: val });
  };
  const setDowntimeEnd = (val: string) => {
    setDowntimeEndState(val);
    syncSetting({ downtimeEnd: val });
  };
  const setNotificationStrictness = (val: 'Strict' | 'Gentle' | 'Off') => {
    setNotificationStrictnessState(val);
    syncSetting({ notificationStrictness: val });
  };
  const setDailyGoal = (val: number) => {
    setDailyGoalState(val);
    syncSetting({ dailyGoal: val });
  };
  const setAlwaysAllowedApps = (val: string[]) => {
    setAlwaysAllowedAppsState(val);
    syncSetting({ alwaysAllowedApps: val });
  };

  const addSchedule = (schedule: Omit<FocusSchedule, 'id'>) => {
    const newSchedule = { ...schedule, id: crypto.randomUUID() };
    setSchedules([...schedules, newSchedule]);
    // TODO: Connect schedules to backend if needed
  };

  const updateSchedule = (id: string, updatedFields: Partial<FocusSchedule>) => {
    setSchedules(schedules.map(s => s.id === id ? { ...s, ...updatedFields } : s));
  };

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const addLimit = async (limit: Omit<AppLimit, 'id'>) => {
    try {
      const res = await fetch(`${API_URL}/limits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(limit),
      });
      if (res.ok) {
        const newLimit = await res.json();
        setLimits([...limits, newLimit]);
      }
    } catch (error) {
      console.error('Failed to add limit:', error);
    }
  };

  const updateLimit = async (id: string, updatedFields: Partial<AppLimit>) => {
    try {
      const res = await fetch(`${API_URL}/limits/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      if (res.ok) {
        const updated = await res.json();
        setLimits(limits.map(l => l.id === id ? updated : l));
      }
    } catch (error) {
      console.error('Failed to update limit:', error);
    }
  };

  const deleteLimit = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/limits/${id}`, {
        method: 'DELETE',
      });
      if (res.status === 204) {
        setLimits(limits.filter(l => l.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete limit:', error);
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'Light') {
      root.classList.remove('dark');
    } else if (theme === 'Dark') {
      root.classList.add('dark');
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      if (systemTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  return (
    <SettingsContext.Provider value={{ 
      theme, setTheme, 
      appIcon, setAppIcon, 
      trackingEnabled, setTrackingEnabled,
      focusDuration, setFocusDuration,
      shortBreakDuration, setShortBreakDuration,
      longBreakDuration, setLongBreakDuration,
      startSound, setStartSound,
      endSound, setEndSound,
      transitionSound, setTransitionSound,
      reminderTime, setReminderTime,
      focusReminderTime, setFocusReminderTime,
      weeklyReportEnabled, setWeeklyReportEnabled,
      limitWarningsEnabled, setLimitWarningsEnabled,
      ignoreBackgroundEnabled, setIgnoreBackgroundEnabled,
      schedules, addSchedule, updateSchedule, deleteSchedule,
      limits, addLimit, updateLimit, deleteLimit,
      downtimeEnabled, setDowntimeEnabled,
      downtimeStart, setDowntimeStart,
      downtimeEnd, setDowntimeEnd,
      notificationStrictness, setNotificationStrictness,
      alwaysAllowedApps, setAlwaysAllowedApps,
      dailyGoal, setDailyGoal
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

