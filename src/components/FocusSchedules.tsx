import React, { useState } from 'react';
import { ChevronLeft, Plus, Trash2, Clock, Calendar as CalendarIcon, Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from '../context/SettingsContext';
import { FocusSchedule } from '../types';

interface FocusSchedulesProps {
  onBack: () => void;
}

export default function FocusSchedules({ onBack }: FocusSchedulesProps) {
  const { schedules, addSchedule, updateSchedule, deleteSchedule } = useSettings();
  const [isAdding, setIsAdding] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Omit<FocusSchedule, 'id'>>({
    label: 'Deep Work',
    time: '09:00',
    duration: 60,
    days: [1, 2, 3, 4, 5],
    enabled: true
  });

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleToggleDay = (dayIndex: number) => {
    setNewSchedule(prev => ({
      ...prev,
      days: prev.days.includes(dayIndex)
        ? prev.days.filter(d => d !== dayIndex)
        : [...prev.days, dayIndex].sort()
    }));
  };

  const handleSave = () => {
    addSchedule(newSchedule);
    setIsAdding(false);
    setNewSchedule({
      label: 'Deep Work',
      time: '09:00',
      duration: 60,
      days: [1, 2, 3, 4, 5],
      enabled: true
    });
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[60] bg-background-light dark:bg-background-dark flex flex-col max-w-md mx-auto"
    >
      <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft size={24} className="text-slate-900 dark:text-white" />
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Focus Schedules</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {schedules.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-60">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
              <CalendarIcon size={48} className="text-slate-400" />
            </div>
            <p className="text-slate-900 dark:text-white font-bold text-lg">No Schedules Yet</p>
            <p className="text-slate-500 dark:text-[#92adc9] text-sm mt-1">Plan your focus sessions in advance to stay productive.</p>
          </div>
        ) : (
          schedules.map((schedule) => (
            <div 
              key={schedule.id}
              className="bg-white dark:bg-[#1C252E] p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-transparent flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-xl flex items-center justify-center text-white shadow-sm ${schedule.enabled ? 'bg-[#2b8cee]' : 'bg-slate-400 dark:bg-slate-600'}`}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold">{schedule.label}</h4>
                    <p className="text-slate-500 dark:text-[#92adc9] text-xs font-medium">{schedule.time} • {schedule.duration} min</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateSchedule(schedule.id, { enabled: !schedule.enabled })}
                    className={`relative flex h-6 w-11 cursor-pointer items-center rounded-full p-1 transition-colors duration-200 ${schedule.enabled ? 'bg-[#2b8cee]' : 'bg-slate-300 dark:bg-[#233648]'}`}
                  >
                    <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${schedule.enabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </button>
                  <button 
                    onClick={() => deleteSchedule(schedule.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between px-1">
                {daysOfWeek.map((day, i) => (
                  <span 
                    key={i}
                    className={`text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full ${
                      schedule.days.includes(i) 
                        ? 'bg-[#2b8cee]/10 text-[#2b8cee]' 
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full py-4 rounded-2xl bg-[#2b8cee] text-white text-base font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Plus size={20} /> Add New Schedule
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-background-light dark:bg-[#1C252E] w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-900 dark:text-white text-xl font-bold">New Schedule</h3>
                <button 
                  onClick={() => setIsAdding(false)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-slate-500 dark:text-[#92adc9] text-xs font-bold uppercase tracking-wider mb-2 block">Label</label>
                  <input 
                    type="text" 
                    value={newSchedule.label}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, label: e.target.value }))}
                    className="w-full bg-slate-100 dark:bg-[#111a22] p-4 rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#2b8cee]"
                    placeholder="e.g. Morning Focus"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 dark:text-[#92adc9] text-xs font-bold uppercase tracking-wider mb-2 block">Start Time</label>
                    <input 
                      type="time" 
                      value={newSchedule.time}
                      onChange={(e) => setNewSchedule(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full bg-slate-100 dark:bg-[#111a22] p-4 rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#2b8cee]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 dark:text-[#92adc9] text-xs font-bold uppercase tracking-wider mb-2 block">Duration (min)</label>
                    <input 
                      type="number" 
                      value={newSchedule.duration}
                      onChange={(e) => setNewSchedule(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-slate-100 dark:bg-[#111a22] p-4 rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#2b8cee]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 dark:text-[#92adc9] text-xs font-bold uppercase tracking-wider mb-2 block">Repeat Days</label>
                  <div className="flex justify-between">
                    {daysOfWeek.map((day, i) => (
                      <button
                        key={i}
                        onClick={() => handleToggleDay(i)}
                        className={`size-10 rounded-full font-bold transition-all ${
                          newSchedule.days.includes(i)
                            ? 'bg-[#2b8cee] text-white shadow-lg shadow-blue-500/20'
                            : 'bg-slate-100 dark:bg-[#111a22] text-slate-400 dark:text-slate-600'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleSave}
                  className="w-full py-4 rounded-2xl bg-[#2b8cee] text-white text-base font-bold shadow-lg shadow-blue-500/20 mt-2 active:scale-95 transition-all"
                >
                  Save Schedule
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
