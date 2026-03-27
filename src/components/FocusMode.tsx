import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Timer, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from '../context/SettingsContext';

type TimerMode = 'focus' | 'short-break' | 'long-break';

interface FocusModeProps {
  scheduledSession?: { duration: number; label: string } | null;
  onSessionHandled?: () => void;
}

export default function FocusMode({ scheduledSession, onSessionHandled }: FocusModeProps) {
  const { 
    focusDuration, 
    shortBreakDuration, 
    longBreakDuration,
    startSound,
    endSound,
    transitionSound
  } = useSettings();
  
  const MODE_CONFIG = {
    'focus': { label: 'Focus', time: focusDuration * 60, color: '#2b8cee', icon: Brain },
    'short-break': { label: 'Short Break', time: shortBreakDuration * 60, color: '#10b981', icon: Coffee },
    'long-break': { label: 'Long Break', time: longBreakDuration * 60, color: '#8b5cf6', icon: Timer },
  };

  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(MODE_CONFIG[mode].time);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const playSound = (type: 'start' | 'end' | 'transition') => {
    let url = '';
    if (type === 'start') url = startSound;
    else if (type === 'end') url = endSound;
    else if (type === 'transition') url = transitionSound;

    if (url) {
      const audio = new Audio(url);
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio playback failed:', e));
    }
  };

  // Handle scheduled session
  useEffect(() => {
    if (scheduledSession) {
      setMode('focus');
      setTimeLeft(scheduledSession.duration * 60);
      setActiveLabel(scheduledSession.label);
      setIsActive(true);
      playSound('start');
      onSessionHandled?.();
    }
  }, [scheduledSession, onSessionHandled]);

  // Update timeLeft when durations change in settings, but only if timer is not active
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(MODE_CONFIG[mode].time);
      setActiveLabel(null);
    }
  }, [focusDuration, shortBreakDuration, longBreakDuration, mode]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      playSound('end');
      if (mode === 'focus') {
        setSessionsCompleted((prev) => prev + 1);
      }
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    if (!isActive) playSound('start');
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODE_CONFIG[mode].time);
    playSound('transition');
  };

  const changeMode = (newMode: TimerMode) => {
    if (newMode !== mode) {
      setMode(newMode);
      setIsActive(false);
      setTimeLeft(MODE_CONFIG[newMode].time);
      playSound('transition');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / MODE_CONFIG[mode].time) * 100;
  const strokeDashoffset = 251.2 - (251.2 * progress) / 100;

  return (
    <div className="flex-1 flex flex-col p-4 animate-fade-in no-scrollbar overflow-y-auto bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">Focus Mode</h2>
        <div className="bg-white dark:bg-[#1C252E] px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-slate-100 dark:border-slate-800/50">
          <CheckCircle2 size={16} className="text-green-500" />
          <span className="text-slate-600 dark:text-[#92adc9] text-sm font-bold">{sessionsCompleted} Sessions</span>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="bg-slate-100 dark:bg-[#111a22] p-1 rounded-xl flex mb-12 shadow-inner border border-slate-200 dark:border-slate-800 relative overflow-hidden">
        {(Object.keys(MODE_CONFIG) as TimerMode[]).map((m) => {
          const Icon = MODE_CONFIG[m].icon;
          const isActiveMode = mode === m;
          return (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`relative flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-colors duration-300 z-10 ${
                isActiveMode 
                  ? 'text-[#2b8cee] dark:text-white' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {isActiveMode && (
                <motion.div
                  layoutId="activeMode"
                  className="absolute inset-0 bg-white dark:bg-[#233648] rounded-lg shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div 
                className="relative z-20 flex items-center gap-2"
                animate={{ scale: isActiveMode ? 1.05 : 1 }}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{MODE_CONFIG[m].label}</span>
              </motion.div>
            </button>
          );
        })}
      </div>

      {/* Timer Circle */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="relative size-64 flex items-center justify-center">
          {/* Background Glow */}
          <motion.div 
            className="absolute inset-0 rounded-full blur-3xl opacity-20 dark:opacity-30"
            animate={{ 
              backgroundColor: MODE_CONFIG[mode].color,
              scale: isActive ? [1, 1.1, 1] : 1
            }}
            transition={{ 
              backgroundColor: { duration: 0.8 },
              scale: { repeat: Infinity, duration: 4, ease: "easeInOut" }
            }}
          />
          
          <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
            <circle 
              className="text-slate-200 dark:text-[#1C252E]" 
              cx="50" cy="50" r="40" 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="6" 
            />
            <motion.circle 
              cx="50" cy="50" r="40" 
              fill="transparent" 
              stroke={MODE_CONFIG[mode].color} 
              strokeWidth="6" 
              strokeDasharray="251.2"
              animate={{ 
                strokeDashoffset,
                stroke: MODE_CONFIG[mode].color
              }}
              transition={{ 
                strokeDashoffset: { duration: isActive ? 1 : 0.5, ease: isActive ? "linear" : "easeInOut" },
                stroke: { duration: 0.8 }
              }}
              strokeLinecap="round"
            />
          </svg>
          
          <div className="absolute flex flex-col items-center z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode + (activeLabel || '')}
                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                {activeLabel && (
                  <span className="text-slate-400 dark:text-[#92adc9] text-xs font-bold uppercase tracking-widest mb-2 bg-slate-100 dark:bg-[#1C252E] px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
                    {activeLabel}
                  </span>
                )}
                <span className="text-slate-900 dark:text-white text-6xl font-black tracking-tighter tabular-nums">
                  {formatTime(timeLeft)}
                </span>
                <motion.span 
                  className="text-slate-400 dark:text-[#92adc9] text-sm font-bold uppercase tracking-widest mt-1"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  {isActive ? 'Stay Focused' : 'Ready?'}
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-12">
          <button 
            onClick={resetTimer}
            className="size-12 rounded-full bg-slate-100 dark:bg-[#1C252E] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#233648] transition-all active:scale-90"
          >
            <RotateCcw size={24} />
          </button>
          
          <button 
            onClick={toggleTimer}
            className="size-20 rounded-full bg-[#2b8cee] flex items-center justify-center text-white shadow-xl shadow-blue-500/20 hover:scale-105 transition-all active:scale-95"
          >
            {isActive ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
          </button>

          <button 
            onClick={() => setTimeLeft(0)}
            className="size-12 rounded-full bg-slate-100 dark:bg-[#1C252E] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#233648] transition-all active:scale-90"
          >
            <CheckCircle2 size={24} />
          </button>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-auto bg-white dark:bg-[#1C252E] p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-transparent">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-yellow-100 dark:bg-yellow-500/20 p-2 rounded-lg text-yellow-600 dark:text-yellow-500">
            <Brain size={18} />
          </div>
          <h4 className="text-slate-900 dark:text-white font-bold">Focus Tip</h4>
        </div>
        <p className="text-slate-500 dark:text-[#92adc9] text-sm leading-relaxed">
          The Pomodoro Technique helps you maintain high levels of focus by breaking work into manageable intervals.
        </p>
      </div>
    </div>
  );
}
