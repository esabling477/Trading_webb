
import React from 'react';
import { ChartIcon, TradeIcon, PositionsIcon } from '../constants';
import { MobileTab } from '../App';

interface BottomNavBarProps {
  activeTab: MobileTab;
  setTab: (tab: MobileTab) => void;
}

const NavButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const activeClass = isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400';
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center flex-1 space-y-1 ${activeClass}`}>
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setTab }) => {
  return (
    <nav className="lg:hidden h-16 bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border flex items-center justify-around shrink-0">
      <NavButton
        label="Chart"
        icon={<ChartIcon />}
        isActive={activeTab === 'chart'}
        onClick={() => setTab('chart')}
      />
      <NavButton
        label="Trade"
        icon={<TradeIcon />}
        isActive={activeTab === 'trade'}
        onClick={() => setTab('trade')}
      />
      <NavButton
        label="Positions"
        icon={<PositionsIcon />}
        isActive={activeTab === 'positions'}
        onClick={() => setTab('positions')}
      />
    </nav>
  );
};

export default BottomNavBar;
