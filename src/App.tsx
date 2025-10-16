import { useState, useEffect, useCallback } from 'react';
import type { AppScreen } from './types';
import IdleScreen from './components/IdleScreen';
import GameScreen from './components/GameScreen';

const IDLE_TIMEOUT = 120000; // 2 minutes of inactivity

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('idle');
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Track user activity
  const handleActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  useEffect(() => {
    // Add event listeners for user activity
    const events = ['mousedown', 'touchstart', 'keydown', 'mousemove'];
    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [handleActivity]);

  // Auto-return to idle screen after inactivity
  useEffect(() => {
    if (currentScreen === 'idle') return;

    const interval = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity;
      if (timeSinceActivity >= IDLE_TIMEOUT) {
        setCurrentScreen('idle');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentScreen, lastActivity]);

  const handleStartGame = () => {
    setCurrentScreen('game');
    setLastActivity(Date.now());
  };

  const handleBackToIdle = () => {
    setCurrentScreen('idle');
  };

  return (
    <div className="app">
      {currentScreen === 'idle' ? (
        <IdleScreen onStart={handleStartGame} />
      ) : (
        <GameScreen onBackToIdle={handleBackToIdle} />
      )}
    </div>
  );
}

export default App;
