import React, { useState } from 'react';
import { Settings as SettingsIcon, TrendingDown, Smartphone, Zap, Search, Brain, Calendar, Filter, Camera, Play, Music, Slack, MessageSquare } from 'lucide-react';
import { AppUsage, CategoryStat } from '../types';
import { useSettings } from '../context/SettingsContext';

interface DashboardProps {
  onAppClick: (appId: string) => void;
  onSettingsClick: () => void;
  onFocusClick?: () => void;
  onReportsClick?: () => void;
}

export default function Dashboard({ onAppClick, onSettingsClick, onFocusClick, onReportsClick }: DashboardProps) {
  const { appIcon } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedDate = `${dayNames[now.getDay()]}, ${monthNames[now.getMonth()]} ${now.getDate()}`;
  
  const icons = {
    default: 'from-blue-500 to-indigo-600',
    forest: 'from-emerald-400 to-green-600',
    sunset: 'from-orange-400 to-red-600',
    midnight: 'from-slate-700 to-slate-900',
  } as Record<string, string>;

  const categories: CategoryStat[] = [
    { name: 'Social', time: '2h 30m', color: '#2b8cee' },
    { name: 'Productivity', time: '1h 45m', color: '#8b5cf6' },
    { name: 'Entertain.', time: '57m', color: '#fb923c' },
  ];

  const mostUsedApps: AppUsage[] = [
    { id: 'instagram', name: 'Instagram', category: 'Social', timeSpent: '1h 12m', percentage: 75, icon: 'camera', color: 'from-yellow-400 via-red-500 to-purple-500', launches: 32, dataUsed: '450 MB', avgSession: '12m', date: '2026-03-27' },
    { id: 'youtube', name: 'YouTube', category: 'Entertainment', timeSpent: '55m', percentage: 55, icon: 'play', color: 'bg-red-600', launches: 12, dataUsed: '1.2 GB', avgSession: '25m', date: '2026-03-26' },
    { id: 'messages', name: 'Messages', category: 'Social', timeSpent: '40m', percentage: 30, icon: 'message-square', color: 'bg-green-500', launches: 45, dataUsed: '12 MB', avgSession: '2m', date: '2026-03-25' },
    { id: 'spotify', name: 'Spotify', category: 'Entertainment', timeSpent: '35m', percentage: 25, icon: 'music', color: 'bg-green-600', launches: 8, dataUsed: '80 MB', avgSession: '15m', date: '2026-03-24' },
    { id: 'slack', name: 'Slack', category: 'Productivity', timeSpent: '1h 05m', percentage: 65, icon: 'slack', color: 'bg-purple-600', launches: 20, dataUsed: '50 MB', avgSession: '10m', date: '2026-03-23' },
  ];

  const filteredApps = mostUsedApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.category.toLowerCase().includes(searchQuery.toLowerCase());

    const appDate = new Date(app.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesDate = (!start || appDate >= start) && (!end || appDate <= end);

    return matchesSearch && matchesDate;
  });

  const appIconMap: Record<string, React.ReactNode> = {
    instagram: <Camera size={20} />,
    youtube: <Play size={20} fill="currentColor" />,
    messages: <MessageSquare size={20} />,
    spotify: <Music size={20} />,
    slack: <Slack size={20} />,
  };

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const data = [45, 60, 85, 50, 70, 90, 40];

  return (
    <div className="flex-1 flex flex-col gap-6 p-4 animate-in fade-in duration-500">
      <header className="flex items-center justify-between mb-2">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{formattedDate}</p>
          <h2 className="text-xl font-bold leading-tight tracking-tight">Today's Activity</h2>
        </div>
        <button 
          onClick={onSettingsClick}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          <SettingsIcon size={20} />
        </button>
      </header>

      {/* Hero Stat Card */}
      <section className="w-full bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Screen Time</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">5h 12m</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown size={14} className="text-green-500" />
              <span className="text-xs font-medium text-green-500">-15% from yesterday</span>
            </div>
            
            <button 
              onClick={onFocusClick}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#2b8cee] text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors w-fit"
            >
              <Brain size={14} />
              Start Focus Mode
            </button>
          </div>
          
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="text-gray-100 dark:text-gray-800" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#2b8cee" strokeDasharray="251.2" strokeDashoffset="60" strokeLinecap="round" strokeWidth="8"></circle>
              <circle className="opacity-80" cx="50" cy="50" fill="transparent" r="40" stroke="#8b5cf6" strokeDasharray="251.2" strokeDashoffset="180" strokeLinecap="round" strokeWidth="8"></circle>
            </svg>
            <div className={`absolute size-10 rounded-lg bg-gradient-to-br ${icons[appIcon] || icons.default} flex items-center justify-center text-white shadow-lg`}>
              <Zap size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 dark:border-gray-700/50">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center gap-1">
              <div className="h-1.5 w-8 rounded-full mb-1" style={{ backgroundColor: cat.color }}></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{cat.name}</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{cat.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Search Bar & Filters */}
      <section className="flex flex-col gap-3">
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search apps or categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-[#1a2632] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 border border-gray-100 dark:border-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2b8cee] transition-all"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
              showFilters || startDate || endDate 
                ? 'bg-[#2b8cee] text-white shadow-lg shadow-blue-500/20' 
                : 'bg-white dark:bg-[#1a2632] text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-800'
            }`}
          >
            <Filter size={20} />
          </button>
        </div>

        {showFilters && (
          <div className="bg-white dark:bg-[#1a2632] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar size={14} />
                Date Range
              </h4>
              {(startDate || endDate) && (
                <button 
                  onClick={() => { setStartDate(''); setEndDate(''); }}
                  className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">From</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-gray-50 dark:bg-[#233648] border-none focus:ring-2 focus:ring-[#2b8cee] text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">To</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-gray-50 dark:bg-[#233648] border-none focus:ring-2 focus:ring-[#2b8cee] text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Weekly Activity Chart */}
      <section>
        <div className="flex justify-between items-end mb-3 px-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Weekly Activity</h3>
          <button onClick={onReportsClick} className="text-xs font-medium text-[#2b8cee] cursor-pointer hover:underline">View Report</button>
        </div>
        <div className="bg-white dark:bg-[#1a2632] rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Daily Average</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">4h 30m</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300">
              Last 7 Days
            </div>
          </div>
          <div className="grid grid-cols-7 gap-3 h-32 items-end">
            {days.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-t-sm relative h-full flex items-end overflow-hidden">
                  <div 
                    className={`w-full transition-all rounded-t-sm ${day === 'W' ? 'bg-[#2b8cee] shadow-[0_0_10px_rgba(43,140,238,0.3)]' : 'bg-[#2b8cee]/40 group-hover:bg-[#2b8cee]/60'}`} 
                    style={{ height: `${data[i]}%` }}
                  ></div>
                </div>
                <span className={`text-[10px] font-medium ${day === 'W' ? 'text-[#2b8cee] font-bold' : 'text-gray-400'}`}>{day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Most Used Apps */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 px-1">Most Used Apps</h3>
        <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <div 
                key={app.id} 
                onClick={() => onAppClick(app.id)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className={`relative w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${app.color.startsWith('bg-') ? app.color : `bg-gradient-to-tr ${app.color}`}`}>
                  <span className="text-white">
                    {appIconMap[app.id] ?? <Smartphone size={20} />}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">{app.name}</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{app.timeSpent}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#2b8cee] h-1.5 rounded-full" style={{ width: `${app.percentage}%` }}></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
              <Search size={32} className="mb-2 opacity-20" />
              <p className="text-sm font-medium">No apps found</p>
            </div>
          )}
        </div>
      </section>

      {/* Usage by Category */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 px-1">Usage by Category</h3>
        <div className="bg-white dark:bg-[#1a2632] rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col gap-5">
            {categories.map((cat) => (
              <div key={cat.name} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{cat.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{cat.time}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      backgroundColor: cat.color,
                      width: cat.name === 'Social' ? '65%' : cat.name === 'Productivity' ? '45%' : '25%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
