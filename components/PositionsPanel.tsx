
import React, { useState } from 'react';
import { POSITIONS } from '../constants';
import { Position } from '../types';

const TabButton: React.FC<{ active: boolean, onClick: () => void, children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm border-b-2 ${active ? 'border-blue-500 text-blue-500 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
    >
        {children}
    </button>
);

const PositionsPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Position holding');

    const renderContent = () => {
        if (activeTab === 'Position holding' && POSITIONS.length > 0) {
            return (
                <>
                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-auto h-[calc(100%-41px)]">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="text-gray-500 dark:text-gray-400 font-normal">
                                    {['Transaction pairs', 'Reservation number', 'direction', 'Lots', 'lower unit price', 'Current price', 'Set Profit', 'Set Loss', 'Handling fee', 'Margin', 'profit', 'Open time', 'Operation'].map(h => 
                                        <th key={h} className="p-2 font-normal">{h}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {POSITIONS.map((pos: Position) => (
                                    <tr key={pos.id} className="border-t border-light-border dark:border-dark-border">
                                        <td className="p-2">{pos.pair}</td>
                                        <td className="p-2">{pos.id}</td>
                                        <td className="p-2">
                                            <span className={`px-2 py-1 rounded text-white ${pos.direction === 'Buy' ? 'bg-positive' : 'bg-negative'}`}>
                                                {pos.direction}
                                            </span>
                                        </td>
                                        <td className="p-2">{pos.lots}</td>
                                        <td className="p-2">{pos.lowerPrice.toFixed(6)}</td>
                                        <td className="p-2">{pos.currentPrice}</td>
                                        <td className="p-2">{pos.setProfit}</td>
                                        <td className="p-2">{pos.setLoss}</td>
                                        <td className="p-2">{pos.fee}</td>
                                        <td className="p-2">{pos.margin.toFixed(6)}</td>
                                        <td className={`p-2 ${pos.profit >= 0 ? 'text-positive' : 'text-negative'}`}>{pos.profit.toFixed(4)}</td>
                                        <td className="p-2">{pos.openTime}</td>
                                        <td className="p-2 space-x-2">
                                            <button className="text-blue-500 dark:text-blue-400">TP/SL</button>
                                            <button className="text-blue-500 dark:text-blue-400">Close position</button>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="border-t border-light-border dark:border-dark-border">
                                    <td colSpan={10} className="p-2 text-right font-semibold">Profit and Loss:</td>
                                    <td className="p-2 font-semibold text-negative">-61.1222</td>
                                    <td colSpan={2} className="p-2 text-right">Current Margin: 212.2412</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden space-y-3 pt-4">
                        {POSITIONS.map((pos: Position) => (
                            <div key={pos.id} className="bg-light-bg dark:bg-dark-bg p-3 rounded-md text-gray-800 dark:text-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="font-bold">{pos.pair} ({pos.id})</div>
                                    <span className={`px-2 py-1 rounded text-white text-xs ${pos.direction === 'Buy' ? 'bg-positive' : 'bg-negative'}`}>
                                        {pos.direction} {pos.lots} lots
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                                    <div>Profit</div>
                                    <div className={`text-right font-semibold ${pos.profit >= 0 ? 'text-positive' : 'text-negative'}`}>{pos.profit.toFixed(4)}</div>
                                    <div>Open Price</div>
                                    <div className="text-right">{pos.lowerPrice.toFixed(4)}</div>
                                    <div>Current Price</div>
                                    <div className="text-right">{pos.currentPrice}</div>
                                    <div>Margin</div>
                                    <div className="text-right">{pos.margin.toFixed(4)}</div>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Opened: {pos.openTime}</div>
                                <div className="flex justify-end space-x-4 mt-2">
                                    <button className="text-blue-500 dark:text-blue-400 text-sm">TP/SL</button>
                                    <button className="text-blue-500 dark:text-blue-400 text-sm">Close position</button>
                                </div>
                            </div>
                        ))}
                        <div className="bg-light-bg dark:bg-dark-bg p-3 rounded-md text-sm mt-3">
                            <div className="flex justify-between">
                                <span className="font-semibold">Total P/L:</span>
                                <span className="font-semibold text-negative">-61.1222</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Current Margin:</span>
                                <span className="text-gray-500 dark:text-gray-400">212.2412</span>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
        return <div className="p-4 text-center text-gray-500 dark:text-gray-400">No data</div>;
    };

    return (
        <div className="h-64 lg:h-auto bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border shrink-0 p-4">
            <div className="flex border-b border-light-border dark:border-dark-border">
                <TabButton active={activeTab === 'Position holding'} onClick={() => setActiveTab('Position holding')}>Position holding</TabButton>
                <TabButton active={activeTab === 'Pending Orders'} onClick={() => setActiveTab('Pending Orders')}>Pending Orders</TabButton>
                <TabButton active={activeTab === 'History'} onClick={() => setActiveTab('History')}>History</TabButton>
            </div>
            {renderContent()}
        </div>
    );
};

export default PositionsPanel;
