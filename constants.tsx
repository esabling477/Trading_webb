
import React from 'react';
import { Product, ChartDataPoint, Position } from './types';

export const GoldIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.5 9.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-1 0V10H6a.5.5 0 01-.5-.5zm4-2a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v5a.5.5 0 01-1 0V8h-1.5a.5.5 0 01-.5-.5z" clipRule="evenodd" />
  </svg>
);
export const SilverIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.5 9.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-1 0V10H6a.5.5 0 01-.5-.5zm4-2a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v5a.5.5 0 01-1 0V8h-1.5a.5.5 0 01-.5-.5z" clipRule="evenodd" />
  </svg>
);
export const BtcIcon: React.FC = () => <div className="h-5 w-5 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs">B</div>;
export const EthIcon: React.FC = () => <div className="h-5 w-5 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold text-xs">E</div>;
export const LtcIcon: React.FC = () => <div className="h-5 w-5 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold text-xs">L</div>;
export const AudIcon: React.FC = () => <div className="h-5 w-5 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-xs">AU</div>;
export const EurIcon: React.FC = () => <div className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">EU</div>;
export const BchIcon: React.FC = () => <div className="h-5 w-5 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xs">BCH</div>;
export const UsoilIcon: React.FC = () => <div className="h-5 w-5 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-xs">OIL</div>;

export const PRODUCTS: Product[] = [
  { id: 'XAUUSD', name: 'XAUUSD', price: 3373.35, change: 0.14, icon: <GoldIcon /> },
  { id: 'XAGUSD', name: 'XAGUSD', price: 37.398, change: 1.03, icon: <SilverIcon /> },
  { id: 'BTCUSD', name: 'BTCUSD', price: 115031.5, change: 0.72, icon: <BtcIcon /> },
  { id: 'ETHUSD', name: 'ETHUSD', price: 3717.89, change: 6.32, icon: <EthIcon /> },
  { id: 'LTCUSD', name: 'LTCUSD', price: 119.89, change: 8.61, icon: <LtcIcon /> },
  { id: 'AUDUSD', name: 'AUDUSD', price: 0.64661, change: -0.04, icon: <AudIcon /> },
  { id: 'EURUSD', name: 'EURUSD', price: 1.15673, change: -0.18, icon: <EurIcon /> },
  { id: 'BCHUSD', name: 'BCHUSD', price: 560.4, change: 2.98, icon: <BchIcon /> },
  { id: 'USOIL', name: 'USOIL', price: 66.207, change: -1.11, icon: <UsoilIcon /> },
];

export const CHART_DATA: ChartDataPoint[] = Array.from({ length: 60 }).map((_, i) => {
  const open = 3375 + Math.random() * 2 - 1;
  const close = open + Math.random() * 2 - 1;
  const high = Math.max(open, close) + Math.random();
  const low = Math.min(open, close) - Math.random();
  return {
    time: `2025-08-04 ${20 + Math.floor(i/60)}:${i % 60 < 10 ? '0' : ''}${i % 60}`,
    open: parseFloat(open.toFixed(2)),
    high: parseFloat(high.toFixed(2)),
    low: parseFloat(low.toFixed(2)),
    close: parseFloat(close.toFixed(2)),
  }
}).sort((a,b) => new Date(`1/1/1970 ${a.time.split(' ')[1]}:00`).getTime() - new Date(`1/1/1/1970 ${b.time.split(' ')[1]}:00`).getTime());
CHART_DATA[45].high = 3377.03; // for crosshair point
CHART_DATA[45].close = 3373.35;


export const POSITIONS: Position[] = [
    {
      id: '#184607',
      pair: 'AMZN',
      direction: 'Buy',
      lots: 1,
      lowerPrice: 212.241222,
      currentPrice: 211.63,
      setProfit: 0,
      setLoss: 0,
      fee: 0.01,
      margin: 212.241222,
      profit: -61.1222,
      openTime: '2025-08-04 15:06:32',
    }
];

export const SunIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const MoonIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


export const ChartIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
    </svg>
);

export const TradeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
);

export const PositionsIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
    </svg>
);
