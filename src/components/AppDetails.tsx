import { ArrowLeft, MoreVertical, Timer, Smartphone, Wifi, Hourglass, Ban, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';

interface AppDetailsProps {
  appId: string;
  onBack: () => void;
}

export default function AppDetails({ appId, onBack }: AppDetailsProps) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const data = [40, 65, 35, 50, 85, 95, 60];

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-background-light dark:bg-[#101922] flex flex-col max-w-md mx-auto overflow-y-auto text-slate-900 dark:text-white"
    >
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white/90 dark:bg-[#101922]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/50">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-base font-bold leading-tight tracking-tight text-center text-slate-900 dark:text-white">App Details</h1>
        <button className="flex size-10 items-center justify-center rounded-full text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <MoreVertical size={24} />
        </button>
      </header>

      <main className="flex-1 flex flex-col gap-6 p-4 pb-10">
        <section className="flex flex-col items-center gap-4 py-2">
          <div className="relative group cursor-pointer">
            <div className="size-24 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500 p-[2px] shadow-lg shadow-[#2b8cee]/10 transition-transform duration-300 group-hover:scale-105">
              <div className="h-full w-full rounded-[14px] bg-white dark:bg-black overflow-hidden relative flex items-center justify-center">
                <Smartphone size={48} className="text-slate-900 dark:text-white opacity-80" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Instagram</h2>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">Social Media</span>
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-xs font-medium text-red-500">Distracting</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Weekly Activity</h3>
            <div className="flex items-center gap-1 text-sm font-medium text-[#2b8cee] cursor-pointer">
              Last 7 Days <ChevronDown size={14} />
            </div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-[#1c2630] p-5 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Daily Average</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">4h 12m</span>
                  <span className="text-sm font-medium text-emerald-500 flex items-center">
                    <ArrowUp size={16} /> 12%
                  </span>
                </div>
              </div>
            </div>
            <div className="h-40 w-full flex items-end justify-between gap-2">
              {days.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group cursor-pointer">
                  <div 
                    className={`w-full max-w-[12px] rounded-t-sm relative transition-all duration-300 ${day === 'F' ? 'bg-[#2b8cee] shadow-[0_0_10px_rgba(43,140,238,0.4)]' : 'bg-slate-200 dark:bg-slate-700 group-hover:bg-[#2b8cee]/50'}`} 
                    style={{ height: `${data[i]}%` }}
                  ></div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${day === 'F' ? 'text-[#2b8cee] font-bold' : 'text-slate-400'}`}>{day}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-slate-50 dark:bg-[#23303c] p-4 flex flex-col gap-3 border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 dark:text-slate-300 font-medium">Vs. Category Average</span>
            <span className="text-slate-900 dark:text-white font-bold">+45m</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div className="bg-[#2b8cee] h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">You use Instagram more than 85% of users.</p>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-bold tracking-tight px-1 text-slate-900 dark:text-white">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard icon={<Timer size={20} />} label="Time Spent" value="4h 12m" sub="Today" color="text-[#2b8cee]" />
            <MetricCard icon={<Smartphone size={20} />} label="Launches" value="32" sub="Times opened" color="text-purple-500" />
            <MetricCard icon={<Wifi size={20} />} label="Data Used" value="450 MB" sub="80% on Wi-Fi" color="text-cyan-500" />
            <MetricCard icon={<Hourglass size={20} />} label="Avg Session" value="12m" sub="Per open" color="text-orange-500" />
          </div>
        </section>

        <section className="mt-2 flex flex-col gap-3">
          <button 
            onClick={() => {}}
            className="w-full bg-[#2b8cee] hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-[#2b8cee]/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          >
            <Timer size={20} /> Set Daily Limit
          </button>
          <button 
            onClick={() => {}}
            className="w-full bg-slate-100 dark:bg-[#23303c] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-colors"
          >
            <Ban size={20} className="text-slate-500 dark:text-slate-400" /> Block App
          </button>
        </section>
      </main>
    </motion.div>
  );
}

function MetricCard({ icon, label, value, sub, color }: any) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-[#1c2630] p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className={`flex items-center gap-2 ${color}`}>
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide opacity-80">{label}</span>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>
    </div>
  );
}

function ChevronDown({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
