
import React from 'react';
import { Product } from '../types';

interface SidebarProps {
  products: Product[];
  selectedProduct: Product;
  onSelectProduct: (product: Product) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ products, selectedProduct, onSelectProduct }) => {
  return (
    <aside className="w-64 bg-light-card dark:bg-dark-card hidden lg:flex flex-col border-r border-light-border dark:border-dark-border">
      <div className="p-2 border-b border-light-border dark:border-dark-border">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Select" className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-sm py-1 pl-7 pr-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul>
          {products.map(product => (
            <li 
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className={`flex items-center justify-between p-2 cursor-pointer hover:bg-light-bg dark:hover:bg-dark-bg ${selectedProduct.id === product.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
            >
              <div className="flex items-center space-x-2">
                {product.icon}
                <span className="font-semibold">{product.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`${product.change >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {product.price.toLocaleString(undefined, { minimumFractionDigits: product.price > 1000 ? 1: product.price > 1 ? 3 : 5, maximumFractionDigits: product.price > 1000 ? 1: product.price > 1 ? 3 : 5})}
                </span>
                <span className={`px-2 py-0.5 rounded text-white text-xs ${product.change >= 0 ? 'bg-positive' : 'bg-negative'}`}>
                  {product.change >= 0 ? '+' : ''}{product.change.toFixed(2)}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
