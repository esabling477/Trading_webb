
import React from 'react';
import { Product, ChartDataPoint } from '../types';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import { Theme } from '../App';

interface ChartProps {
  product: Product;
  data: ChartDataPoint[];
  theme: Theme;
}

const Candlestick = (props: any) => {
  const { x, y, width, height, low, high, open, close } = props;
  const isRising = close > open;
  const color = isRising ? '#26a69a' : '#ef5350';
  const wickX = x + width / 2;

  return (
    <g stroke={color} fill={isRising ? 'none' : color} strokeWidth="1">
      <path d={`M ${wickX},${y + height - (high - Math.max(open, close))} L ${wickX},${y + height}`} />
      <path d={`M ${wickX},${y} L ${wickX},${y + (Math.min(open, close) - low)}`} />
      <rect x={x} y={y + height - (Math.max(open, close) - Math.min(open,close))} width={width} height={Math.abs(open - close)} />
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-light-card dark:bg-dark-card p-2 border border-light-border dark:border-dark-border rounded shadow-lg text-xs text-gray-800 dark:text-gray-200">
                <p className="font-bold">{label}</p>
                <p>Open: <span className="font-semibold">{data.open}</span></p>
                <p>High: <span className="font-semibold">{data.high}</span></p>
                <p>Low: <span className="font-semibold">{data.low}</span></p>
                <p>Close: <span className="font-semibold">{data.close}</span></p>
            </div>
        );
    }
    return null;
};

const Chart: React.FC<ChartProps> = ({ product, data, theme }) => {
  const latestData = data[data.length - 1];
  const domain = [Math.min(...data.map(p => p.low)) - 2, Math.max(...data.map(p => p.high)) + 2];
  
  const isDarkMode = theme === 'dark';
  const gridColor = isDarkMode ? '#2a2e39' : '#e0e0e0';
  const textColor = isDarkMode ? '#9ca3af' : '#6b7280';
  
  return (
    <div className="w-full flex-1 bg-light-card dark:bg-dark-card p-4 flex flex-col">
      <div className="flex items-center mb-2 flex-wrap">
        <h2 className="text-lg font-bold mr-4">{product.name}</h2>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex space-x-3 flex-wrap">
          <span>Time: 2025-08-04 21:00</span>
          <span>Open: <span className="text-gray-800 dark:text-gray-200">{latestData.open.toFixed(2)}</span></span>
          <span>High: <span className="text-gray-800 dark:text-gray-200">{data[45].high.toFixed(2)}</span></span>
          <span>Low: <span className="text-gray-800 dark:text-gray-200">{latestData.low.toFixed(2)}</span></span>
          <span>Close: <span className="text-gray-800 dark:text-gray-200">{latestData.close.toFixed(2)}</span></span>
          <span>Volume: --</span>
        </div>
      </div>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: textColor }} tickFormatter={(tick) => tick.split(' ')[1]} stroke={textColor} />
            <YAxis 
              orientation="right" 
              domain={domain} 
              tick={{ fontSize: 10, fill: textColor }}
              tickFormatter={(tick) => typeof tick === 'number' ? tick.toFixed(2) : tick}
              stroke={textColor}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="close" shape={<Candlestick />} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
