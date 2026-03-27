import React, { useState } from 'react';
import { Calendar, Filter, ChevronDown, Camera, MessageSquare, Phone, Film, Timer, BarChart2, LayoutGrid, MessageCircle, PlayCircle } from 'lucide-react';
import { ActivityItem } from '../types';

export default function Reports() {
  const [activeFilter, setActiveFilter] = useState('All Activity');

  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedDate = `Today, ${monthNames[now.getMonth()]} ${now.getDate()}`;

  const activities: ActivityItem[] = [
    { id: '1', time: '10:42 PM', appName: 'Instagram', category: 'SOCIAL', description: 'Browsing feed & stories', duration: '12m duration', icon: 'camera', color: 'border-primary text-primary' },
    { id: '2', time: '10:30 PM', appName: 'Messages', category: 'SOCIAL', description: 'Sarah J. (2 texts)', icon: 'message', color: 'border-green-500 text-green-500' },
    { id: '3', time: '10:15 PM', appName: 'Phone', category: 'COMM', description: 'Mom (Incoming Call)', duration: '5m duration', icon: 'phone', color: 'border-blue-500 text-blue-500' },
    { id: '4', time: '09:00 PM', appName: 'Netflix', category: 'ENT', description: 'Stranger Things S4:E2', duration: '45m duration', icon: 'film', color: 'border-red-500 text-red-500' },
  ];

  const filteredActivities = activities.filter(item => {
    if (activeFilter === 'All Activity') return true;
    if (activeFilter === 'Apps') return item.category !== 'COMM';
    if (activeFilter === 'Communication') return item.category === 'COMM' || item.appName === 'Messages';
    if (activeFilter === 'Entertainment') return item.category === 'ENT';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col font-display overflow-x-hidden animate-in fade-in duration-500 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#101922]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold leading-tight text-slate-900 dark:text-white">Activity Log</h1>
          <button 
            onClick={() => {}}
            className="flex items-center gap-1 text-[#2b8cee] text-xs font-medium mt-0.5"
          >
            <span>{formattedDate}</span>
            <ChevronDown size={14} />
          </button>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {}}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Calendar size={20} />
          </button>
          <button 
            onClick={() => {}}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2b8cee]/10 text-[#2b8cee] hover:bg-[#2b8cee]/20 transition-colors"
          >
            <Filter size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-24">
        <section className="p-4 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#1C2936] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800/50">
            <div className="p-2 bg-[#2b8cee]/10 rounded-lg text-[#2b8cee] w-fit mb-2">
              <Timer size={20} />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide">Screen Time</p>
            <p className="text-2xl font-bold mt-1 tracking-tight text-slate-900 dark:text-white">4h 12m</p>
          </div>
          <div className="bg-white dark:bg-[#1C2936] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800/50">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-500 w-fit mb-2">
              <BarChart2 size={20} />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide">Total Activities</p>
            <p className="text-2xl font-bold mt-1 tracking-tight text-slate-900 dark:text-white">142</p>
          </div>
        </section>

        <section className="px-4 pb-2">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <FilterChip 
              label="All Activity" 
              active={activeFilter === 'All Activity'} 
              onClick={() => setActiveFilter('All Activity')} 
              icon={<span className="text-lg">✓</span>}
            />
            <FilterChip 
              label="Apps" 
              active={activeFilter === 'Apps'} 
              onClick={() => setActiveFilter('Apps')} 
              icon={<LayoutGrid size={18} />}
            />
            <FilterChip 
              label="Communication" 
              active={activeFilter === 'Communication'} 
              onClick={() => setActiveFilter('Communication')} 
              icon={<MessageCircle size={18} />}
            />
            <FilterChip 
              label="Entertainment" 
              active={activeFilter === 'Entertainment'} 
              onClick={() => setActiveFilter('Entertainment')} 
              icon={<PlayCircle size={18} />}
            />
          </div>
        </section>

        <section className="px-4 pt-4">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 ml-1">Timeline Feed</h3>
          <div className="relative">
            <div className="absolute left-[70px] top-2 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>
            
            {filteredActivities.map((item) => (
              <div key={item.id} className="relative flex gap-4 mb-6 group animate-in slide-in-from-bottom-2 duration-300">
                <div className="w-[54px] flex-shrink-0 text-right pt-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.time}</span>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full bg-white dark:bg-[#1C2936] border-2 flex items-center justify-center shadow-sm ${item.color}`}>
                    {item.icon === 'camera' && <Camera size={16} />}
                    {item.icon === 'message' && <MessageSquare size={16} />}
                    {item.icon === 'phone' && <Phone size={16} />}
                    {item.icon === 'film' && <Film size={16} />}
                  </div>
                </div>
                <div className="flex-1 bg-white dark:bg-[#1C2936] rounded-lg p-3 shadow-sm border border-slate-100 dark:border-slate-800/50 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{item.appName}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.category === 'SOCIAL' ? 'bg-purple-500/10 text-purple-500' : item.category === 'COMM' ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'}`}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-2">{item.description}</p>
                  {item.duration && (
                    <div className="flex items-center gap-1 text-[#2b8cee] text-xs font-medium">
                      <Timer size={14} />
                      {item.duration}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredActivities.length === 0 && (
              <div className="pl-[100px] py-10 text-slate-500 text-sm italic">
                No activities found for this filter.
              </div>
            )}

            <div className="relative flex gap-4 mb-6 group opacity-50">
              <div className="w-[54px] flex-shrink-0 text-right pt-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">--:--</span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-2 h-2 mt-3 rounded-full bg-slate-400 dark:bg-slate-600"></div>
              </div>
              <div className="flex-1 pt-2">
                <p className="text-slate-500 dark:text-slate-400 text-xs italic">No earlier activity recorded today</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FilterChip({ label, active, onClick, icon }: { label: string, active: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active 
          ? 'bg-[#2b8cee] text-white shadow-md shadow-[#2b8cee]/20' 
          : 'bg-white dark:bg-[#1C2936] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
