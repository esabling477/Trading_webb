
import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '../constants';
import { Theme } from '../App';
import { Product } from '../types';

interface HeaderProps {
    theme: Theme;
    toggleTheme: () => void;
    onLogout: () => void;
    products: Product[];
    selectedProduct: Product;
    onSelectProduct: (product: Product) => void;
}

const TimeframeButton: React.FC<{ children: React.ReactNode; active?: boolean }> = ({ children, active }) => (
  <button className={`px-2 py-1 text-xs ${active ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}>
    {children}
  </button>
);

const ProductSelectorDropdown: React.FC<{
    products: Product[];
    selectedProduct: Product;
    onSelectProduct: (product: Product) => void;
}> = ({ products, selectedProduct, onSelectProduct }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (product: Product) => {
        onSelectProduct(product);
        setIsOpen(false);
    }

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="px-3 py-1.5 text-xs bg-gray-200 dark:bg-dark-border text-gray-700 dark:text-gray-300 rounded flex items-center space-x-2">
                <span>{selectedProduct.name}</span>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 top-full mt-1 w-48 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-md shadow-lg">
                    <ul className="max-h-60 overflow-auto">
                        {products.map(product => (
                            <li key={product.id} onClick={() => handleSelect(product)} className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-bg dark:hover:bg-dark-bg">
                                {product.icon}
                                <span>{product.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onLogout, products, selectedProduct, onSelectProduct }) => {
  return (
    <header className="bg-light-card dark:bg-dark-card h-14 flex items-center px-4 border-b border-light-border dark:border-dark-border shrink-0">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-500 mr-4">GTC</h1>
        <div className="hidden lg:flex items-center">
          <button className="px-3 py-1.5 text-xs bg-green-500 text-white rounded mr-2">Product List</button>
          <button className="px-3 py-1.5 text-xs bg-gray-200 dark:bg-dark-border text-gray-700 dark:text-gray-300 rounded">Submit Order</button>
        </div>
        <div className="lg:hidden">
            <ProductSelectorDropdown products={products} selectedProduct={selectedProduct} onSelectProduct={onSelectProduct} />
        </div>
      </div>

      <div className="hidden lg:flex items-center ml-6 border-l border-light-border dark:border-dark-border pl-4">
        <TimeframeButton>1M</TimeframeButton>
        <TimeframeButton>5M</TimeframeButton>
        <TimeframeButton>15M</TimeframeButton>
        <TimeframeButton>30M</TimeframeButton>
        <TimeframeButton active>1H</TimeframeButton>
        <TimeframeButton>1D</TimeframeButton>
      </div>
      
      <div className="hidden lg:flex items-center ml-4 border-l border-light-border dark:border-dark-border pl-4 space-x-4 text-gray-500 dark:text-gray-400">
        {/* Placeholder for icons */}
        <span>Indicator</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300">
            {theme === 'light' ? <MoonIcon className="h-5 w-5"/> : <SunIcon className="h-5 w-5"/>}
        </button>
        <div className="hidden lg:flex items-center space-x-4">
            <button className="text-xs text-gray-600 dark:text-gray-300">Loan</button>
            <button className="text-xs text-gray-600 dark:text-gray-300">Financial</button>
            <button className="text-xs text-gray-600 dark:text-gray-300">English</button>
        </div>
        <button onClick={onLogout} className="text-xs text-gray-600 dark:text-gray-300">Logout</button>
      </div>
    </header>
  );
};

export default Header;
