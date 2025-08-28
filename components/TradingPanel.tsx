
import React, { useState } from 'react';
import { Product } from '../types';

interface TradingPanelProps {
  product: Product;
}

const TradingPanel: React.FC<TradingPanelProps> = ({ product }) => {
  const [lots, setLots] = useState(0.01);

  const handleLotsChange = (amount: number) => {
    setLots(prev => Math.max(0.01, parseFloat((prev + amount).toFixed(2))));
  };

  return (
    <aside className="w-full lg:w-80 bg-light-card dark:bg-dark-card lg:border-l border-light-border dark:border-dark-border flex flex-col">
      <div className="p-4 bg-green-50/50 dark:bg-green-900/10" style={{ backgroundImage: 'linear-gradient(45deg, #e6f7f5 25%, transparent 25%, transparent 75%, #e6f7f5 75%, #e6f7f5), linear-gradient(45deg, #e6f7f5 25%, transparent 25%, transparent 75%, #e6f7f5 75%, #e6f7f5)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}>
        <p className="text-xs text-green-800 dark:text-green-300">VIP:</p>
        <p className="text-gray-600 dark:text-gray-400 text-xs">Available funds</p>
        <p className="text-2xl font-bold my-1">$0</p>
        <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
          <p>Today: <span className="text-green-600">0</span> <span className="text-gray-400">0%</span></p>
          <div className="flex items-center space-x-2">
            <p>Credit score:</p>
            <p>UIDs:</p>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1">
        <div className="flex border border-gray-200 dark:border-dark-border rounded-md text-sm text-center">
          <button className="flex-1 py-2 bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-gray-200 rounded-l-md font-semibold">Contract</button>
          <button className="flex-1 py-2 text-gray-500 dark:text-gray-400 rounded-r-md">Future</button>
        </div>

        <div className="flex justify-between items-center my-4">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className={`text-lg font-semibold ${product.change >= 0 ? 'text-positive' : 'text-negative'}`}>
            {product.price.toFixed(2)}
          </p>
        </div>
        <p className="text-xs text-gray-400 -mt-3 mb-4">Market Price</p>
        
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600 dark:text-gray-300">Set Loss</label>
                <div className="flex items-center">
                    <input type="text" value="0" readOnly className="w-24 bg-gray-100 dark:bg-dark-bg text-right px-2 py-1 rounded-l-md text-sm text-gray-800 dark:text-gray-200" />
                    <div className="w-8 h-8 bg-gray-100 dark:bg-dark-bg rounded-r-md"></div>
                </div>
            </div>
             <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600 dark:text-gray-300">Set Profit</label>
                <div className="flex items-center">
                     <input type="text" value="0" readOnly className="w-24 bg-gray-100 dark:bg-dark-bg text-right px-2 py-1 rounded-l-md text-sm text-gray-800 dark:text-gray-200" />
                    <div className="w-8 h-8 bg-gray-100 dark:bg-dark-bg rounded-r-md"></div>
                </div>
            </div>
             <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600 dark:text-gray-300">Lots(Step:0.01)</label>
                 <div className="flex items-center">
                    <button onClick={() => handleLotsChange(-0.01)} className="px-2 py-1 bg-gray-200 dark:bg-dark-border rounded-l-md text-gray-800 dark:text-gray-200">-</button>
                    <input type="text" value={lots} onChange={(e) => setLots(parseFloat(e.target.value) || 0)} className="w-16 text-center bg-white dark:bg-dark-card border-t border-b border-gray-200 dark:border-dark-border py-1 text-sm text-gray-800 dark:text-gray-200"/>
                    <button onClick={() => handleLotsChange(0.01)} className="px-2 py-1 bg-gray-200 dark:bg-dark-border rounded-r-md text-gray-800 dark:text-gray-200">+</button>
                </div>
            </div>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mt-4">
          <div className="flex justify-between">
            <span>Each Loss</span>
            <span>1 Lots = 1000 {product.name.replace('USD','')}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Handling Fee</span>
            <span>0.3</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Margin</span>
            <span>10</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <button className="w-full py-2 bg-positive text-white rounded-md">Buy</button>
          <button className="w-full py-2 bg-negative text-white rounded-md">Sell</button>
        </div>
      </div>
    </aside>
  );
};

export default TradingPanel;
