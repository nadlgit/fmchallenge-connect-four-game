import { useState } from 'react';
import { Game, Home, Rules } from '@/components';
import { GameProvider } from '@/store';

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
    return (
      <GameProvider>
        <Game goHome={goHome} playMode={appStage} />
      </GameProvider>
    );
  }
  return <Home showRules={showRules} playVsPlayer={playVsPlayer} playVsCPU={playVsCPU} />;
};
