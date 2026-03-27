import { useState } from 'react';
import { 
  PlusCircle, Moon, Bell, ShieldCheck, ChevronRight, Users, 
  Clapperboard, CheckCircle, X, Trash2, AlertTriangle, Smartphone, Brain, 
  Search as SearchIcon, Camera, Play, Music, MessageSquare, Tv, Slack, MessageCircle, Twitter, Facebook
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { motion, AnimatePresence } from 'motion/react';
import { AppLimit } from '../types';

export default function Limits() {
  const { 
    limits, addLimit, deleteLimit, updateLimit,
    downtimeEnabled, setDowntimeEnabled,
    downtimeStart, setDowntimeStart,
    downtimeEnd, setDowntimeEnd,
    notificationStrictness, setNotificationStrictness,
    focusReminderTime, setFocusReminderTime,
    alwaysAllowedApps, setAlwaysAllowedApps
  } = useSettings();
  
  const [viewMode, setViewMode] = useState<'Daily' | 'Weekly'>('Daily');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDowntimeModal, setShowDowntimeModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showAlwaysAllowedModal, setShowAlwaysAllowedModal] = useState(false);
  
  // Modal state
  const [limitType, setLimitType] = useState<'category' | 'app'>('category');
  const [appSearchQuery, setAppSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [newAllowedApp, setNewAllowedApp] = useState('');

  const [newLimit, setNewLimit] = useState<Omit<AppLimit, 'id'>>({
    type: 'category',
    title: '',
    subtitle: '',
    limit: '1h 00m',
    color: 'bg-blue-500',
    icon: 'Users',
    enabled: true
  });

  const availableApps = [
    { id: 'instagram', name: 'Instagram', icon: 'Camera', color: 'bg-pink-500', category: 'Social' },
    { id: 'tiktok', name: 'TikTok', icon: 'Music', color: 'bg-slate-900', category: 'Social' },
    { id: 'youtube', name: 'YouTube', icon: 'Play', color: 'bg-red-600', category: 'Entertainment' },
    { id: 'facebook', name: 'Facebook', icon: 'Facebook', color: 'bg-blue-600', category: 'Social' },
    { id: 'x', name: 'X', icon: 'Twitter', color: 'bg-slate-800', category: 'Social' },
    { id: 'netflix', name: 'Netflix', icon: 'Tv', color: 'bg-red-700', category: 'Entertainment' },
    { id: 'slack', name: 'Slack', icon: 'Slack', color: 'bg-purple-600', category: 'Productivity' },
    { id: 'discord', name: 'Discord', icon: 'MessageSquare', color: 'bg-indigo-500', category: 'Social' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', color: 'bg-green-500', category: 'Social' },
  ];

  const filteredApps = availableApps.filter(app => 
    app.name.toLowerCase().includes(appSearchQuery.toLowerCase())
  );

  const handleAddLimit = () => {
    if (limitType === 'category' && newLimit.title.trim()) {
      addLimit({ ...newLimit, type: 'category' });
      resetAddModal();
    } else if (limitType === 'app' && selectedApp) {
      addLimit({
        type: 'app',
        title: selectedApp.name,
        subtitle: selectedApp.category,
        limit: newLimit.limit,
        color: selectedApp.color,
        icon: selectedApp.icon,
        enabled: true
      });
      resetAddModal();
    }
  };

  const resetAddModal = () => {
    setShowAddModal(false);
    setLimitType('category');
    setAppSearchQuery('');
    setSelectedApp(null);
    setNewLimit({
      type: 'category',
      title: '',
      subtitle: '',
      limit: '1h 00m',
      color: 'bg-blue-500',
      icon: 'Users',
      enabled: true
    });
  };

  const handleAddAllowedApp = () => {
    if (newAllowedApp.trim() && !alwaysAllowedApps.includes(newAllowedApp.trim())) {
      setAlwaysAllowedApps([...alwaysAllowedApps, newAllowedApp.trim()]);
      setNewAllowedApp('');
    }
  };

  const removeAllowedApp = (app: string) => {
    setAlwaysAllowedApps(alwaysAllowedApps.filter(a => a !== app));
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Users': return <Users size={20} />;
      case 'Clapperboard': return <Clapperboard size={20} />;
      case 'CheckCircle': return <CheckCircle size={20} />;
      case 'Camera': return <Camera size={20} />;
      case 'Play': return <Play size={20} />;
      case 'Music': return <Music size={20} />;
      case 'MessageSquare': return <MessageSquare size={20} />;
      case 'Tv': return <Tv size={20} />;
      case 'Slack': return <Slack size={20} />;
      case 'MessageCircle': return <MessageCircle size={20} />;
      case 'Twitter': return <Twitter size={20} />;
      case 'Facebook': return <Facebook size={20} />;
      default: return <Smartphone size={20} />;
    }
  };

  const getIconBg = (color: string) => {
    const base = color.replace('bg-', '');
    return `bg-${base}-100 dark:bg-${base}-900/30 text-${base}-600 dark:text-${base}-400`;
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased overflow-x-hidden animate-in fade-in duration-500">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-[#101922]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/50">
        <h2 className="text-xl font-bold leading-tight tracking-tight flex-1 text-slate-900 dark:text-white">Goals & Limits</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center justify-center p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="text-[#2b8cee] text-base font-semibold">{isEditing ? 'Done' : 'Edit'}</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="px-4 py-4">
          <div className="flex h-10 w-full items-center justify-center rounded-lg bg-slate-100 dark:bg-[#233648] p-1">
            <button 
              onClick={() => setViewMode('Daily')}
              className={`flex grow items-center justify-center rounded-md transition-all duration-200 text-sm font-medium h-full ${
                viewMode === 'Daily' ? 'bg-white dark:bg-[#101922] shadow-sm text-slate-900 dark:text-white' : 'hover:bg-white/5 text-slate-500 dark:text-[#92adc9]'
              }`}
            >
              Daily
            </button>
            <button 
              onClick={() => setViewMode('Weekly')}
              className={`flex grow items-center justify-center rounded-md transition-all duration-200 text-sm font-medium h-full ${
                viewMode === 'Weekly' ? 'bg-white dark:bg-[#101922] shadow-sm text-slate-900 dark:text-white' : 'hover:bg-white/5 text-slate-500 dark:text-[#92adc9]'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="rounded-2xl bg-white dark:bg-[#1c2630] p-6 shadow-sm ring-1 ring-slate-200 dark:ring-white/10">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-slate-500 dark:text-[#92adc9] text-sm font-medium mb-1">Total Screen Time</span>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                {viewMode === 'Daily' ? '2h 15m' : '15h 45m'}
              </h1>
              <p className="text-slate-500 text-xs font-medium mb-6">
                {viewMode === 'Daily' ? 'of 4h daily goal' : 'of 28h weekly goal'}
              </p>
              <div className="w-full relative h-4 bg-slate-100 dark:bg-[#324d67] rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#2b8cee] rounded-full transition-all duration-500" 
                  style={{ width: viewMode === 'Daily' ? '56%' : '62%' }}
                ></div>
              </div>
              <div className="w-full flex justify-between mt-3 text-xs font-medium text-slate-500">
                <span>0h</span>
                <span>{viewMode === 'Daily' ? '1h 45m left' : '12h 15m left'}</span>
                <span>{viewMode === 'Daily' ? '4h' : '28h'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mb-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">App Limits</h3>
            <button className="text-[#2b8cee] text-sm font-medium hover:opacity-80">See All</button>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-4 mb-8">
          <AnimatePresence initial={false}>
            {limits.map((limit, index) => {
              const mockPercentage = limit.title === 'Entertainment' ? 96 : limit.title === 'Social Media' ? 80 : (20 + (index * 15)) % 100;
              const isWarning = mockPercentage > 90;
              
              return (
                <motion.div
                  key={limit.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative group"
                >
                  <LimitItem 
                    title={limit.title} 
                    subtitle={limit.subtitle} 
                    time={viewMode === 'Daily' ? '1h 12m' : '8h 24m'} 
                    limit={limit.limit} 
                    percentage={mockPercentage} 
                    color={limit.color} 
                    icon={getIcon(limit.icon)} 
                    iconBg={getIconBg(limit.color)} 
                    warning={isWarning}
                    isEditing={isEditing}
                    onDelete={() => deleteLimit(limit.id)}
                    onToggle={() => updateLimit(limit.id, { enabled: !limit.enabled })}
                    enabled={limit.enabled}
                    type={limit.type}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-4 text-[#2b8cee] hover:bg-[#2b8cee]/5 active:bg-[#2b8cee]/10 transition-colors"
          >
            <PlusCircle size={20} />
            <span className="font-semibold text-sm">Add Limit</span>
          </button>
        </div>

        <div className="px-4 mb-2">
          <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Settings</h3>
          <div className="rounded-xl bg-white dark:bg-[#1c2630] shadow-sm ring-1 ring-slate-200 dark:ring-white/10 divide-y divide-slate-100 dark:divide-slate-800">
            <SettingsRow 
              icon={<Moon size={18} />} 
              iconBg="bg-indigo-500" 
              label="Downtime" 
              value={downtimeEnabled ? `${formatTime(downtimeStart)} - ${formatTime(downtimeEnd)}` : 'Off'} 
              onClick={() => setShowDowntimeModal(true)}
            />
            <SettingsRow 
              icon={<Bell size={18} />} 
              iconBg="bg-red-500" 
              label="Notifications" 
              value={notificationStrictness} 
              onClick={() => setShowNotificationsModal(true)}
            />
            <SettingsRow 
              icon={<ShieldCheck size={18} />} 
              iconBg="bg-emerald-500" 
              label="Always Allowed" 
              value={`${alwaysAllowedApps.length} Apps`}
              onClick={() => setShowAlwaysAllowedModal(true)}
            />
          </div>
        </div>
        <div className="h-6"></div>
      </main>

      {/* Add Limit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetAddModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full max-w-md bg-white dark:bg-[#1c2630] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between mb-6 shrink-0">
                <h3 className="text-xl font-bold">Add New Limit</h3>
                <button onClick={resetAddModal} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X size={20} />
                </button>
              </div>

              <div className="flex p-1 bg-slate-100 dark:bg-[#233648] rounded-xl mb-6 shrink-0">
                <button 
                  onClick={() => setLimitType('category')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                    limitType === 'category' ? 'bg-white dark:bg-[#1c2630] text-[#2b8cee] shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Category
                </button>
                <button 
                  onClick={() => setLimitType('app')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                    limitType === 'app' ? 'bg-white dark:bg-[#1c2630] text-[#2b8cee] shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Specific App
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-1">
                {limitType === 'category' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Category Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Games, News"
                        value={newLimit.title}
                        onChange={(e) => setNewLimit({ ...newLimit, title: e.target.value })}
                        className="w-full bg-slate-100 dark:bg-[#233648] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b8cee]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Apps (comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Candy Crush, Chess"
                        value={newLimit.subtitle}
                        onChange={(e) => setNewLimit({ ...newLimit, subtitle: e.target.value })}
                        className="w-full bg-slate-100 dark:bg-[#233648] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b8cee]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Icon</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'Users', label: 'Social', color: 'bg-blue-500' },
                          { id: 'Clapperboard', label: 'Entertainment', color: 'bg-orange-500' },
                          { id: 'CheckCircle', label: 'Productivity', color: 'bg-green-500' },
                        ].map((icon) => (
                          <button
                            key={icon.id}
                            onClick={() => setNewLimit({ ...newLimit, icon: icon.id, color: icon.color })}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                              newLimit.icon === icon.id 
                                ? 'border-[#2b8cee] bg-blue-50 dark:bg-blue-900/20' 
                                : 'border-transparent bg-slate-50 dark:bg-[#233648]'
                            }`}
                          >
                            <div className={`size-8 rounded-lg ${icon.color} flex items-center justify-center text-white`}>
                              {getIcon(icon.id)}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider">{icon.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search apps..."
                        value={appSearchQuery}
                        onChange={(e) => setAppSearchQuery(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-[#233648] pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b8cee]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {filteredApps.map((app) => (
                        <div 
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border-2 ${
                            selectedApp?.id === app.id 
                              ? 'border-[#2b8cee] bg-blue-50 dark:bg-blue-900/20' 
                              : 'border-transparent bg-slate-50 dark:bg-[#233648] hover:bg-slate-100 dark:hover:bg-[#2c4258]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`size-10 rounded-xl ${app.color} flex items-center justify-center text-white shadow-sm`}>
                              {getIcon(app.icon)}
                            </div>
                            <div>
                              <p className="font-bold text-sm">{app.name}</p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{app.category}</p>
                            </div>
                          </div>
                          {selectedApp?.id === app.id && (
                            <div className="size-5 rounded-full bg-[#2b8cee] flex items-center justify-center text-white">
                              <CheckCircle size={14} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Daily Limit</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="text" 
                      placeholder="1h 30m"
                      value={newLimit.limit}
                      onChange={(e) => setNewLimit({ ...newLimit, limit: e.target.value })}
                      className="flex-1 bg-slate-100 dark:bg-[#233648] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b8cee]"
                    />
                    <div className="flex gap-1">
                      {['30m', '1h', '2h'].map(preset => (
                        <button 
                          key={preset}
                          onClick={() => setNewLimit({ ...newLimit, limit: preset.includes('h') ? `${preset} 00m` : `0h ${preset}` })}
                          className="px-3 py-2 text-[10px] font-bold bg-slate-100 dark:bg-[#233648] rounded-lg hover:bg-slate-200 dark:hover:bg-[#2c4258]"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleAddLimit}
                disabled={limitType === 'category' ? !newLimit.title.trim() : !selectedApp}
                className="w-full mt-8 py-4 bg-[#2b8cee] text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                Create Limit
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Downtime Modal */}
      <AnimatePresence>
        {showDowntimeModal && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDowntimeModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full max-w-md bg-white dark:bg-[#1c2630] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Downtime</h3>
                <button onClick={() => setShowDowntimeModal(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#233648] rounded-xl">
                  <div>
                    <p className="font-bold">Enable Downtime</p>
                    <p className="text-xs text-slate-500">Scheduled time away from screen</p>
                  </div>
                  <div 
                    onClick={() => setDowntimeEnabled(!downtimeEnabled)}
                    className={`relative flex h-6 w-10 cursor-pointer items-center rounded-full p-1 transition-colors duration-200 ${downtimeEnabled ? 'bg-[#2b8cee]' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${downtimeEnabled ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                </div>

                <div className={`grid grid-cols-2 gap-4 transition-opacity ${downtimeEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Start Time</label>
                    <input 
                      type="time" 
                      value={downtimeStart}
                      onChange={(e) => setDowntimeStart(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-[#233648] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b8cee]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">End Time</label>
                    <input 
                      type="time" 
                      value={downtimeEnd}
                      onChange={(e) => setDowntimeEnd(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-[#233648] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b8cee]"
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowDowntimeModal(false)}
                className="w-full mt-8 py-4 bg-[#2b8cee] text-white rounded-xl font-bold"
              >
                Save Settings
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notifications Modal */}
      <AnimatePresence>
        {showNotificationsModal && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotificationsModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full max-w-md bg-white dark:bg-[#1c2630] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Notification Strictness</h3>
                <button onClick={() => setShowNotificationsModal(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {(['Strict', 'Gentle', 'Off'] as const).map((mode) => (
                  <div 
                    key={mode}
                    onClick={() => setNotificationStrictness(mode)}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border-2 ${
                      notificationStrictness === mode 
                        ? 'border-[#2b8cee] bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-transparent bg-slate-50 dark:bg-[#233648] hover:bg-slate-100 dark:hover:bg-[#2c4258]'
                    }`}
                  >
                    <div>
                      <p className="font-bold">{mode}</p>
                      <p className="text-xs text-slate-500">
                        {mode === 'Strict' && 'Block all non-essential apps immediately'}
                        {mode === 'Gentle' && 'Show warnings before blocking apps'}
                        {mode === 'Off' && 'Only track usage without blocking'}
                      </p>
                    </div>
                    {notificationStrictness === mode && (
                      <div className="size-5 rounded-full bg-[#2b8cee] flex items-center justify-center text-white">
                        <CheckCircle size={14} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Daily Focus Reminder</h4>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#233648] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="text-white flex items-center justify-center rounded-lg bg-blue-500 shrink-0 size-8 shadow-sm">
                      <Brain size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Reminder Time</p>
                      <p className="text-[10px] text-slate-500">Daily alert to start focus</p>
                    </div>
                  </div>
                  <input 
                    type="time" 
                    value={focusReminderTime}
                    onChange={(e) => setFocusReminderTime(e.target.value)}
                    className="bg-white dark:bg-[#1c2630] px-3 py-1.5 rounded-lg text-[#2b8cee] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2b8cee]"
                  />
                </div>
              </div>

              <button 
                onClick={() => setShowNotificationsModal(false)}
                className="w-full mt-8 py-4 bg-[#2b8cee] text-white rounded-xl font-bold"
              >
                Save Settings
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Always Allowed Modal */}
      <AnimatePresence>
        {showAlwaysAllowedModal && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAlwaysAllowedModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full max-w-md bg-white dark:bg-[#1c2630] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center justify-between mb-6 shrink-0">
                <h3 className="text-xl font-bold">Always Allowed</h3>
                <button onClick={() => setShowAlwaysAllowedModal(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X size={20} />
                </button>
              </div>

              <div className="flex gap-2 mb-6 shrink-0">
                <input 
                  type="text" 
                  placeholder="Add app name..."
                  value={newAllowedApp}
                  onChange={(e) => setNewAllowedApp(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddAllowedApp()}
                  className="flex-1 bg-slate-100 dark:bg-[#233648] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b8cee]"
                />
                <button 
                  onClick={handleAddAllowedApp}
                  className="bg-[#2b8cee] text-white px-4 py-3 rounded-xl font-bold"
                >
                  Add
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {alwaysAllowedApps.map((app) => (
                  <div 
                    key={app}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#233648] rounded-xl group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <Smartphone size={16} />
                      </div>
                      <span className="font-medium">{app}</span>
                    </div>
                    <button 
                      onClick={() => removeAllowedApp(app)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {alwaysAllowedApps.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <ShieldCheck size={40} className="mx-auto mb-2 opacity-20" />
                    <p>No apps always allowed</p>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setShowAlwaysAllowedModal(false)}
                className="w-full mt-6 py-4 bg-[#2b8cee] text-white rounded-xl font-bold shrink-0"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LimitItem({ title, subtitle, time, limit, percentage, color, icon, iconBg, warning, isEditing, onDelete, onToggle, enabled, type }: any) {
  return (
    <div className={`relative rounded-2xl bg-white dark:bg-[#1c2630] p-5 shadow-sm ring-1 transition-all duration-300 ${
      !enabled 
        ? 'ring-slate-100 dark:ring-white/5 opacity-70 grayscale-[0.5]' 
        : 'ring-slate-200 dark:ring-white/10 hover:shadow-md'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-colors duration-300 ${
            enabled ? iconBg : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className={`text-base font-bold transition-colors ${enabled ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                {title}
              </p>
              {type === 'app' && enabled && (
                <span className="px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-[8px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  App
                </span>
              )}
              {!enabled && (
                <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Paused
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-[#92adc9]">{subtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className={`text-base font-black tracking-tight transition-colors ${
              warning && enabled ? 'text-orange-500 dark:text-orange-400' : enabled ? 'text-slate-900 dark:text-white' : 'text-slate-500'
            }`}>
              {time}
            </p>
            <p className="text-[10px] font-bold text-slate-400 dark:text-[#5a7187] uppercase tracking-widest">
              Limit: {limit}
            </p>
          </div>
          
          {isEditing ? (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
            >
              <Trash2 size={20} />
            </button>
          ) : (
            <div 
              onClick={onToggle}
              className={`relative flex h-7 w-12 cursor-pointer items-center rounded-full p-1 transition-all duration-300 ${
                enabled ? 'bg-[#2b8cee] shadow-inner shadow-blue-600/20' : 'bg-slate-200 dark:bg-[#233648]'
              }`}
            >
              <motion.div 
                animate={{ x: enabled ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-5 w-5 rounded-full bg-white shadow-md"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-[#5a7187] uppercase tracking-widest">
          <span>Usage</span>
          <span>{percentage}%</span>
        </div>
        <div className="rounded-full h-2 w-full bg-slate-100 dark:bg-[#324d67] overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${
              !enabled ? 'bg-slate-300 dark:bg-slate-600' : warning ? 'bg-orange-500' : color
            }`}
          />
        </div>
      </div>
    </div>
  );
}

function SettingsRow({ icon, iconBg, label, value, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${iconBg} text-white`}>
          {icon}
        </div>
        <span className="text-sm font-medium text-slate-900 dark:text-white">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-xs text-slate-500 dark:text-[#92adc9]">{value}</span>}
        <ChevronRight size={18} className="text-slate-400" />
      </div>
    </div>
  );
}
