import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chart from './components/Chart';
import TradingPanel from './components/TradingPanel';
import PositionsPanel from './components/PositionsPanel';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import BottomNavBar from './components/BottomNavBar';
import { Product } from './types';
import { PRODUCTS, CHART_DATA } from './constants';

export type View = 'trading' | 'login' | 'register';
export type Theme = 'light' | 'dark';
export type MobileTab = 'chart' | 'trade' | 'positions';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [view, setView] = useState<View>('login');
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || 'light';
  });
  const [mobileTab, setMobileTab] = useState<MobileTab>('chart');

  useEffect(() => {
    // Apply theme class to the document and save to localStorage
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLoginSuccess = () => {
    setView('trading');
  };
  
  const handleLogout = () => {
      setView('login');
  }

  if (view === 'login') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={() => setView('register')} />;
  }

  if (view === 'register') {
    return <RegisterPage onRegisterSuccess={handleLoginSuccess} onNavigate={() => setView('login')} />;
  }

  return (
    <div className="bg-light-bg dark:bg-dark-bg flex flex-col h-screen text-gray-800 dark:text-gray-200 font-sans text-xs">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onLogout={handleLogout}
        products={PRODUCTS}
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar products={PRODUCTS} selectedProduct={selectedProduct} onSelectProduct={setSelectedProduct} />
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop View */}
          <div className="hidden lg:flex flex-1 border-t border-light-border dark:border-dark-border">
            <Chart product={selectedProduct} data={CHART_DATA} theme={theme} />
            <TradingPanel product={selectedProduct} />
          </div>
          <div className="hidden lg:block">
            <PositionsPanel />
          </div>

          {/* Mobile View */}
          <div className="lg:hidden flex-1 overflow-y-auto">
            {mobileTab === 'chart' && <Chart product={selectedProduct} data={CHART_DATA} theme={theme} />}
            {mobileTab === 'trade' && <TradingPanel product={selectedProduct} />}
            {mobileTab === 'positions' && <PositionsPanel />}
          </div>
        </main>
      </div>
      <BottomNavBar activeTab={mobileTab} setTab={setMobileTab} />
    </div>
  );
};

export default App;