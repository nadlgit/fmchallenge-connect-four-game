import { useState } from 'react';
import { Home } from '@/components/home';
import { Game } from '@/components/game';
import { Rules } from '@/components/rules';

export const AppContent = () => {
  type AppStage = 'rules' | 'vsPlayer' | 'vsCPU';
  const [appStage, setAppStage] = useState<AppStage | undefined>();
  const goHome = () => setAppStage(undefined);
  const showRules = () => setAppStage('rules');
  const playVsPlayer = () => setAppStage('vsPlayer');
  const playVsCPU = () => setAppStage('vsCPU');

  if (appStage === 'rules') {
    return <Rules goHome={goHome} />;
  }
  if (appStage === 'vsPlayer' || appStage === 'vsCPU') {
    return <Game goHome={goHome} playMode={appStage} />;
  }
  return <Home showRules={showRules} playVsPlayer={playVsPlayer} playVsCPU={playVsCPU} />;
};
