import { LayoutDashboard, BarChart2, Timer, Brain } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, setScreen }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'reports', label: 'Stats', icon: BarChart2 },
    { id: 'focus', label: 'Focus', icon: Brain },
    { id: 'limits', label: 'Limits', icon: Timer },
  ] as const;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md z-[100] px-4">
      <nav className="bg-white/80 dark:bg-[#101922]/90 backdrop-blur-3xl border border-slate-200/50 dark:border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-1.5 ring-1 ring-black/5 dark:ring-white/5">
        <div className="flex w-full items-center justify-between relative gap-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setScreen(item.id)}
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 flex-1 transition-all duration-500 z-10 h-14 rounded-2xl group ${
                  isActive ? 'text-white' : 'text-slate-400 dark:text-[#5a7187] hover:text-[#2b8cee] dark:hover:text-[#2b8cee]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#2b8cee] rounded-2xl shadow-[0_8px_20px_rgba(43,140,238,0.3)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                <motion.div
                  className="relative z-20"
                  animate={{ 
                    scale: isActive ? 1.15 : 1,
                    y: isActive ? -1 : 0
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <item.icon 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2} 
                    className="transition-colors duration-300"
                  />
                </motion.div>
                
                <motion.span 
                  animate={{ 
                    opacity: isActive ? 1 : 0.7,
                    scale: isActive ? 1 : 0.95
                  }}
                  className={`relative z-20 text-[10px] font-black mt-1.5 uppercase tracking-widest transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-slate-400 dark:text-[#5a7187] group-hover:text-[#2b8cee]'
                  }`}
                >
                  {item.label}
                </motion.span>

                {/* Subtle dot indicator for non-active items on hover */}
                {!isActive && (
                  <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#2b8cee] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
