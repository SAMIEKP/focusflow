import { useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';

export function useFocusScheduler(onScheduleStart: (duration: number, label: string) => void) {
  const { schedules } = useSettings();
  const lastCheckedRef = useRef<string>('');

  useEffect(() => {
    const checkSchedules = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      // Prevent multiple triggers in the same minute
      if (currentTime === lastCheckedRef.current) return;
      lastCheckedRef.current = currentTime;

      const activeSchedule = schedules.find(s => 
        s.enabled && 
        s.days.includes(currentDay) && 
        s.time === currentTime
      );

      if (activeSchedule) {
        onScheduleStart(activeSchedule.duration, activeSchedule.label);
      }
    };

    const interval = setInterval(checkSchedules, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [schedules, onScheduleStart]);
}
