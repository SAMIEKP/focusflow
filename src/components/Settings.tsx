import { useState } from 'react';
import { ChevronLeft, User, ShieldCheck, Timer, Bell, Palette, LogOut, ChevronRight, Zap, Moon, Sun, Monitor, AppWindow, FileText, AlertTriangle, BellRing, Brain, Coffee, Calendar, Play, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings, SOUND_OPTIONS } from '../context/SettingsContext';
import FocusSchedules from './FocusSchedules';

interface SettingsProps {
  onBack: () => void;
}

export default function Settings({ onBack }: SettingsProps) {
  const { 
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
    ignoreBackgroundEnabled, setIgnoreBackgroundEnabled
  } = useSettings();

  const [showSchedules, setShowSchedules] = useState(false);

  const playPreview = (url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio playback failed:', e));
  };

  const icons = [
    { id: 'default', name: 'Default', color: 'from-blue-500 to-indigo-600' },
    { id: 'forest', name: 'Forest', color: 'from-emerald-400 to-green-600' },
    { id: 'sunset', name: 'Sunset', color: 'from-orange-400 to-red-600' },
    { id: 'midnight', name: 'Midnight', color: 'from-slate-700 to-slate-900' },
  ];

  return (
    <>
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 bg-background-light dark:bg-background-dark flex flex-col max-w-md mx-auto"
      >
        <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBack}
              className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft size={24} className="text-slate-900 dark:text-white" />
            </button>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Settings</h2>
            <div className="absolute right-4 flex w-12 items-center justify-end">
              <button onClick={onBack} className="text-[#2b8cee] text-base font-bold hover:text-blue-400 transition-colors">Done</button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-6 p-4">
          {/* App Info Section */}
          <div className="flex items-center gap-4 bg-white dark:bg-[#1C252E] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-transparent">
            <div className="bg-[#2b8cee] rounded-xl h-12 w-12 flex items-center justify-center text-white shadow-lg">
              <Zap size={28} />
            </div>
            <div className="flex flex-col justify-center flex-1">
              <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">FocusFlow</p>
              <p className="text-slate-500 dark:text-[#92adc9] text-sm font-medium">Local Activity Tracker</p>
            </div>
          </div>

          {/* Focus Mode Settings */}
          <div>
            <h4 className="text-slate-500 dark:text-[#92adc9] text-xs font-bold px-2 pb-2 uppercase tracking-wider">Focus Mode</h4>
            <div className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-[#1C252E] shadow-sm border border-slate-100 dark:border-transparent divide-y divide-slate-100 dark:divide-slate-800">
              <div 
                onClick={() => setShowSchedules(true)}
                className="flex items-center gap-4 px-4 py-3.5 justify-between hover:bg-slate-50 dark:hover:bg-[#232d38] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-white flex items-center justify-center rounded-lg bg-orange-500 shrink-0 size-8 shadow-sm group-hover:scale-110 transition-transform">
                    <Calendar size={20} />
                  </div>
                  <p className="text-slate-900 dark:text-white text-base font-medium flex-1 truncate">Focus Schedules</p>
                </div>
                <ChevronRight size={20} className="text-slate-400 dark:text-slate-600" />
              </div>
              <div className="flex items-center gap-4 px-4 py-3.5 justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-white flex items-center justify-center rounded-lg bg-[#2b8cee] shrink-0 size-8 shadow-sm">
                    <Brain size={20} />
                  </div>
                  <p className="text-slate-900 dark:text-white text-base font-medium">Focus Duration</p>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={focusDuration}
                    onChange={(e) => setFocusDuration(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 bg-slate-100 dark:bg-[#233648] px-2 py-1 rounded text-[#2b8cee] text-sm font-semibold text-center focus:outline-none focus:ring-1 focus:ring-[#2b8cee]"
                  />
                  <span className="text-xs text-slate-500 dark:text-[#92adc9]">min</span>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 py-3.5 justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-white flex items-center justify-center rounded-lg bg-green-500 shrink-0 size-8 shadow-sm">
                    <Coffee size={20} />
                  </div>
                  <p className="text-slate-900 dark:text-white text-base font-medium">Short Break</p>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={shortBreakDuration}
                    onChange={(e) => setShortBreakDuration(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 bg-slate-100 dark:bg-[#233648] px-2 py-1 rounded text-[#2b8cee] text-sm font-semibold text-center focus:outline-none focus:ring-1 focus:ring-[#2b8cee]"
                  />
                  <span className="text-xs text-slate-500 dark:text-[#92adc9]">min</span>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 py-3.5 justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-white flex items-center justify-center rounded-lg bg-indigo-500 shrink-0 size-8 shadow-sm">
                    <Timer size={20} />
                  </div>
                  <p className="text-slate-900 dark:text-white text-base font-medium">Long Break</p>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={longBreakDuration}
                    onChange={(e) => setLongBreakDuration(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 bg-slate-100 dark:bg-[#233648] px-2 py-1 rounded text-[#2b8cee] text-sm font-semibold text-center focus:outline-none focus:ring-1 focus:ring-[#2b8cee]"
                  />
                  <span className="text-xs text-slate-500 dark:text-[#92adc9]">min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Preferences */}
        <div>
          <h4 className="text-slate-500 dark:text-[#92adc9] text-xs font-bold px-2 pb-2 uppercase tracking-wider">Tracking Preferences</h4>
          <div className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-[#1C252E] shadow-sm border border-slate-100 dark:border-transparent divide-y divide-slate-100 dark:divide-slate-800">
            <div 
              onClick={() => setTrackingEnabled(!trackingEnabled)}
              className="flex items-center gap-4 px-4 py-3.5 justify-between hover:bg-slate-50 dark:hover:bg-[#232d38] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="text-white flex items-center justify-center rounded-lg bg-[#2b8cee] shrink-0 size-8 shadow-sm group-hover:scale-110 transition-transform">
                  <ShieldCheck size={20} />
                </div>
                <p className="text-slate-900 dark:text-white text-base font-medium flex-1 truncate">Tracking Enabled</p>
              </div>
              <Toggle checked={trackingEnabled} />
            </div>
            <div className="flex items-center gap-4 px-4 py-3.5 justify-between hover:bg-slate-50 dark:hover:bg-[#232d38] transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="text-white flex items-center justify-center rounded-lg bg-orange-500 shrink-0 size-8 shadow-sm group-hover:scale-110 transition-transform">
                  <Timer size={20} />
                </div>
                <p className="text-slate-900 dark:text-white text-base font-medium flex-1 truncate">Daily Goal</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-slate-500 dark:text-[#92adc9] text-base font-normal">4h 30m</p>
                <ChevronRight size={20} className="text-slate-400 dark:text-slate-600" />
              </div>
            </div>
            <div 
              onClick={() => setIgnoreBackgroundEnabled(!ignoreBackgroundEnabled)}
              className="flex items-center gap-4 px-4 py-3.5 justify-between hover:bg-slate-50 dark:hover:bg-[#232d38] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="text-white flex items-center justify-center rounded-lg bg-purple-500 shrink-0 size-8 shadow-sm group-hover:scale-110 transition-transform">
                  <AppWindow size={20} />
                </div>
                <p className="text-slate-900 dark:text-white text-base font-medium flex-1 truncate">Ignore Background Apps</p>
              </div>
              <Toggle checked={ignoreBackgroundEnabled} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h4 className="text-slate-500 dark:text-[#92adc9] text-xs font-bold px-2 pb-2 uppercase tracking-wider">Notification Preferences</h4>
          <div className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-[#1C252E] shadow-sm border border-slate-100 dark:border-transparent divide-y divide-slate-100 dark:divide-slate-800">
            <div 
              onClick={() => setWeeklyReportEnabled(!weeklyReportEnabled)}
              className="flex items-center gap-4 px-4 py-3.5 justify-between hover:bg-slate-50 dark:hover:bg-[#232d38] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="text-white flex items-center justify-center rounded-lg bg-green-500 shrink-0 size-8 shadow-sm group-hover:scale-110 transition-transform">
                  <FileText size={20} />
                </div>
                <p className="text-slate-900 dark:text-white text-base font-medium flex-1 truncate">Weekly Report</p>
              </div>
              <Toggle checked={weeklyReportEnabled} />
            </div>
            <div 
              onClick={() => setLimitWarningsEnabled(!limitWarningsEnabled)}
              className="flex items-center gap-4 px-4 py-3.5 justify-between hover:bg-slate-50 dark:hover:bg-[#232d38] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="text-white flex items-center justify-center rounded-lg bg-red-500 shrink-0 size-8 shadow-sm group-hover:scale-110 transition-transform">
                  <AlertTriangle size={20} />
                </div>
                <p className="text-slate-900 dark:text-white text-base font-medium flex-1 truncate">Limit Warnings</p>
              </div>
              <Toggle checked={limitWarningsEnabled} />
            </div>
            <div className="flex items-center gap-4 px-4 py-3.5 justify-between hover:bg-slate-50 dark:hover:bg-[#232d38] transition-colors group">
              <div className="flex items-center gap-3">
                <div className="text-white flex items-center justify-center rounded-lg bg-indigo-500 shrink-0 size-8 shadow-sm group-hover:scale-110 transition-transform">
                  <BellRing size={20} />
                </div>
                <p className="text-slate-900 dark:text-white text-base font-medium flex-1 truncate">Reminder Time</p>
              </div>
              <input 
                type="time" 
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="bg-slate-100 dark:bg-[#233648] px-2 py-1 rounded text-[#2b8cee] text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#2b8cee]"
              />
            </div>
            <div className="flex items-center gap-4 px-4 py-3.5 justify-between hover:bg-slate-50 dark:hover:bg-[#232d38] transition-colors group">
              <div className="flex items-center gap-3">
                <div className="text-white flex items-center justify-center rounded-lg bg-blue-500 shrink-0 size-8 shadow-sm group-hover:scale-110 transition-transform">
                  <Brain size={20} />
                </div>
                <p className="text-slate-900 dark:text-white text-base font-medium flex-1 truncate">Focus Reminder</p>
              </div>
              <input 
                type="time" 
                value={focusReminderTime}
                onChange={(e) => setFocusReminderTime(e.target.value)}
                className="bg-slate-100 dark:bg-[#233648] px-2 py-1 rounded text-[#2b8cee] text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#2b8cee]"
              />
            </div>
          </div>

          <h4 className="text-slate-500 dark:text-[#92adc9] text-xs font-bold px-2 pt-4 pb-2 uppercase tracking-wider">Timer Sounds</h4>
          <div className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-[#1C252E] shadow-sm border border-slate-100 dark:border-transparent divide-y divide-slate-100 dark:divide-slate-800">
            {/* Start Sound */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-white flex items-center justify-center rounded-lg bg-blue-500 shrink-0 size-8 shadow-sm">
                  <Play size={18} fill="currentColor" />
                </div>
                <p className="text-slate-900 dark:text-white text-base font-medium">Start Sound</p>
              </div>
              <div className="flex gap-2">
                {SOUND_OPTIONS.start.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => {
                      setStartSound(sound.url);
                      playPreview(sound.url);
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${
                      startSound === sound.url 
                        ? 'bg-[#2b8cee] text-white border-[#2b8cee]' 
                        : 'bg-slate-50 dark:bg-[#233648] text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-[#2c4258]'
                    }`}
                  >
                    {sound.name}
                  </button>
                ))}
              </div>
            </div>

            {/* End Sound */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-white flex items-center justify-center rounded-lg bg-emerald-500 shrink-0 size-8 shadow-sm">
                  <Bell size={18} fill="currentColor" />
                </div>
                <p className="text-slate-900 dark:text-white text-base font-medium">End Sound</p>
              </div>
              <div className="flex gap-2">
                {SOUND_OPTIONS.end.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => {
                      setEndSound(sound.url);
                      playPreview(sound.url);
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${
                      endSound === sound.url 
                        ? 'bg-[#2b8cee] text-white border-[#2b8cee]' 
                        : 'bg-slate-50 dark:bg-[#233648] text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-[#2c4258]'
                    }`}
                  >
                    {sound.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Transition Sound */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-white flex items-center justify-center rounded-lg bg-purple-500 shrink-0 size-8 shadow-sm">
                  <Volume2 size={18} />
                </div>
                <p className="text-slate-900 dark:text-white text-base font-medium">Transition Sound</p>
              </div>
              <div className="flex gap-2">
                {SOUND_OPTIONS.transition.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => {
                      setTransitionSound(sound.url);
                      playPreview(sound.url);
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${
                      transitionSound === sound.url 
                        ? 'bg-[#2b8cee] text-white border-[#2b8cee]' 
                        : 'bg-slate-50 dark:bg-[#233648] text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-[#2c4258]'
                    }`}
                  >
                    {sound.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div>
          <h4 className="text-slate-500 dark:text-[#92adc9] text-xs font-bold px-2 pb-2 uppercase tracking-wider">Appearance</h4>
          <div className="flex flex-col gap-4">
            <div className="bg-white dark:bg-[#1C252E] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-transparent">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-white flex items-center justify-center rounded-lg bg-pink-500 shrink-0 size-8 shadow-sm">
                  <Palette size={20} />
                </div>
                <p className="text-slate-900 dark:text-white text-base font-medium">App Theme</p>
              </div>
              <div className="bg-slate-100 dark:bg-[#111a22] p-1 rounded-lg flex text-sm font-medium">
                <button 
                  onClick={() => setTheme('System')}
                  className={`flex-1 py-1.5 rounded-md transition-all flex items-center justify-center gap-1 ${
                    theme === 'System' ? 'bg-[#2b8cee] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Monitor size={14} /> System
                </button>
                <button 
                  onClick={() => setTheme('Dark')}
                  className={`flex-1 py-1.5 rounded-md transition-all flex items-center justify-center gap-1 ${
                    theme === 'Dark' ? 'bg-[#2b8cee] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Moon size={14} /> Dark
                </button>
                <button 
                  onClick={() => setTheme('Light')}
                  className={`flex-1 py-1.5 rounded-md transition-all flex items-center justify-center gap-1 ${
                    theme === 'Light' ? 'bg-[#2b8cee] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Sun size={14} /> Light
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1C252E] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-transparent overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-900 dark:text-white text-base font-medium">App Icon</p>
                <span className="text-xs text-[#2b8cee] font-semibold cursor-pointer">View All</span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                {icons.map((icon) => (
                  <div 
                    key={icon.id} 
                    onClick={() => setAppIcon(icon.id)}
                    className={`flex flex-col items-center gap-2 shrink-0 cursor-pointer transition-all ${
                      appIcon === icon.id ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className={`size-14 rounded-xl bg-gradient-to-br ${icon.color} shadow-lg flex items-center justify-center text-white border border-slate-200 dark:border-slate-700/50 ${
                      appIcon === icon.id ? 'ring-2 ring-[#2b8cee] ring-offset-2 ring-offset-white dark:ring-offset-[#1C252E]' : ''
                    }`}>
                      <Zap size={32} />
                    </div>
                    <span className={`text-xs font-semibold ${appIcon === icon.id ? 'text-[#2b8cee]' : 'text-slate-500 dark:text-slate-400'}`}>{icon.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to reset all app data? This cannot be undone.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="w-full py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-base font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-transparent flex items-center justify-center gap-2"
          >
            <AlertTriangle size={20} /> Reset App Data
          </button>
          <p className="text-center text-slate-400 dark:text-slate-600 text-xs mt-6 mb-8 font-medium">Version 1.0.4 (Build 220)</p>
        </div>
      </div>
      </motion.div>

      <AnimatePresence>
        {showSchedules && (
          <FocusSchedules onBack={() => setShowSchedules(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function Toggle({ checked }: { checked?: boolean }) {
  return (
    <div className={`relative flex h-[30px] w-[50px] cursor-pointer items-center rounded-full p-1 transition-colors duration-200 ${checked ? 'bg-[#2b8cee]' : 'bg-slate-300 dark:bg-[#233648]'}`}>
      <div className={`h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
    </div>
  );
}
