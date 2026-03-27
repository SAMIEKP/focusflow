/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { Screen } from './types';
import { SettingsProvider } from './context/SettingsContext';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import FocusMode from './components/FocusMode';
import Limits from './components/Limits';
import Settings from './components/Settings';
import AppDetails from './components/AppDetails';
import BottomNav from './components/BottomNav';
import { useFocusScheduler } from './hooks/useFocusScheduler';

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [scheduledSession, setScheduledSession] = useState<{ duration: number; label: string } | null>(null);

  const handleScheduleStart = useCallback((duration: number, label: string) => {
    setScheduledSession({ duration, label });
    setCurrentScreen('focus');
  }, []);

  useFocusScheduler(handleScheduleStart);

  const handleAppClick = (appId: string) => {
    setSelectedAppId(appId);
    setCurrentScreen('app-details');
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
    setSelectedAppId(null);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans selection:bg-[#2b8cee] selection:text-white transition-colors duration-300">
      <div className="relative w-full max-w-md mx-auto min-h-screen flex flex-col shadow-2xl overflow-hidden bg-background-light dark:bg-background-dark">
        <main className="flex-1 flex flex-col pb-24">
          {currentScreen === 'dashboard' && (
            <Dashboard 
              onAppClick={handleAppClick} 
              onSettingsClick={() => setCurrentScreen('settings')} 
              onFocusClick={() => setCurrentScreen('focus')}
            />
          )}
          {currentScreen === 'reports' && <Reports />}
          {currentScreen === 'focus' && (
            <FocusMode 
              scheduledSession={scheduledSession} 
              onSessionHandled={() => setScheduledSession(null)} 
            />
          )}
          {currentScreen === 'limits' && <Limits />}
          
          <AnimatePresence>
            {currentScreen === 'settings' && (
              <Settings onBack={handleBack} />
            )}
            {currentScreen === 'app-details' && selectedAppId && (
              <AppDetails appId={selectedAppId} onBack={handleBack} />
            )}
          </AnimatePresence>
        </main>

        {currentScreen !== 'settings' && currentScreen !== 'app-details' && (
          <BottomNav currentScreen={currentScreen} setScreen={setCurrentScreen} />
        )}
      </div>
    </div>
  );
}
