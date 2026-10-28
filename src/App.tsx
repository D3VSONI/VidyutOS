/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SceneId, RecoveryTask } from './lib/types';
import { INITIAL_RECOVERY_TASKS } from './lib/demoData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';

import { Scene01Opening } from './components/scenes/Scene01Opening';
import { Scene02Problem } from './components/scenes/Scene02Problem';
import { Scene03Insight } from './components/scenes/Scene03Insight';
import { Scene04Ecosystem } from './components/scenes/Scene04Ecosystem';
import { Scene05IntroduceCatchMeUp } from './components/scenes/Scene05IntroduceCatchMeUp';
import { Scene06InteractiveRecovery } from './components/scenes/Scene06InteractiveRecovery';
import { Scene07SmartLostFound } from './components/scenes/Scene07SmartLostFound';
import { Scene08PeerHelp } from './components/scenes/Scene08PeerHelp';
import { Scene09InvisibleStudentAlert } from './components/scenes/Scene09InvisibleStudentAlert';
import { Scene10MultiRole } from './components/scenes/Scene10MultiRole';
import { Scene11TrustFeasibility } from './components/scenes/Scene11TrustFeasibility';
import { Scene12Closing } from './components/scenes/Scene12Closing';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>(() => {
    const params = new URLSearchParams(window.location.search);
    const sceneParam = params.get('scene');
    if (sceneParam) {
      const num = parseInt(sceneParam, 10);
      if (num >= 1 && num <= 12) return num as SceneId;
    }
    if (params.get('autostart') === '1') return 6 as SceneId;
    return 1;
  });

  const [tasks, setTasks] = useState<RecoveryTask[]>(INITIAL_RECOVERY_TASKS);
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP subtle scene entrance animation
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0.3, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScene]);

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleResetTasks = () => {
    setTasks(INITIAL_RECOVERY_TASKS);
  };

  const handleNext = () => {
    if (currentScene < 12) {
      setCurrentScene((currentScene + 1) as SceneId);
    }
  };

  const handleSelectScene = (id: SceneId) => {
    setCurrentScene(id);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-['DM_Sans'] antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Bar Header adhering strictly to Top Bar Contract */}
      <Header currentScene={currentScene} onSelectScene={handleSelectScene} />

      {/* Main Scene Container */}
      <main
        id="scene-container"
        ref={containerRef}
        className="flex-1 pb-32 sm:pb-40 transition-opacity"
      >
        {currentScene === 1 && (
          <Scene01Opening
            onNext={handleNext}
            onJumpToDemo={() => handleSelectScene(6)}
          />
        )}
        {currentScene === 2 && <Scene02Problem onNext={handleNext} />}
        {currentScene === 3 && <Scene03Insight onNext={handleNext} />}
        {currentScene === 4 && (
          <Scene04Ecosystem
            onNext={handleNext}
            onSelectCatchMeUp={() => handleSelectScene(5)}
          />
        )}
        {currentScene === 5 && (
          <Scene05IntroduceCatchMeUp
            onNext={handleNext}
            onLaunchDemo={() => handleSelectScene(6)}
          />
        )}
        {currentScene === 6 && (
          <Scene06InteractiveRecovery
            onNext={handleNext}
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onResetTasks={handleResetTasks}
          />
        )}
        {currentScene === 7 && <Scene07SmartLostFound onNext={handleNext} />}
        {currentScene === 8 && <Scene08PeerHelp onNext={handleNext} />}
        {currentScene === 9 && <Scene09InvisibleStudentAlert onNext={handleNext} />}
        {currentScene === 10 && <Scene10MultiRole onNext={handleNext} />}
        {currentScene === 11 && <Scene11TrustFeasibility onNext={handleNext} />}
        {currentScene === 12 && (
          <Scene12Closing
            onRestart={() => handleSelectScene(1)}
            onJumpToDemo={() => handleSelectScene(6)}
          />
        )}
      </main>

      {/* Floating Presentation Bar & Scene Index Drawer */}
      <Navigation
        currentScene={currentScene}
        onSelectScene={handleSelectScene}
        onResetDemo={handleResetTasks}
      />
    </div>
  );
}
