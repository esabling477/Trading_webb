import React, { useState, useRef, useMemo, useCallback } from 'react';
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
  const MIN_ZOOM_LEVEL = 20;
  const [domain, setDomain] = useState({ startIndex: 0, endIndex: data.length - 1 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ clientX: number, startIndex: number, endIndex: number } | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const visibleData = useMemo(() => {
    return data.slice(domain.startIndex, domain.endIndex + 1);
  }, [data, domain]);

  const yDomain = useMemo(() => {
    if (visibleData.length === 0) return [0, 100];
    const lows = visibleData.map(p => p.low);
    const highs = visibleData.map(p => p.high);
    const min = Math.min(...lows);
    const max = Math.max(...highs);
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding];
  }, [visibleData]);
  
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!chartRef.current) return;
    
    const chartWidth = chartRef.current.offsetWidth;
    const mouseX = e.clientX - chartRef.current.getBoundingClientRect().left;
    const mouseRatio = mouseX / chartWidth;

    const zoomFactor = 0.1;
    const direction = e.deltaY < 0 ? 1 : -1;
    
    const currentRange = domain.endIndex - domain.startIndex;
    const newRange = Math.round(currentRange * (1 - direction * zoomFactor));

    if (newRange < MIN_ZOOM_LEVEL || newRange > data.length) return;
    
    const rangeChange = currentRange - newRange;
    
    let newStartIndex = domain.startIndex + Math.round(rangeChange * mouseRatio);
    let newEndIndex = domain.endIndex - Math.round(rangeChange * (1 - mouseRatio));

    if (newStartIndex < 0) newStartIndex = 0;
    if (newEndIndex >= data.length) newEndIndex = data.length - 1;
    if (newEndIndex - newStartIndex < MIN_ZOOM_LEVEL) {
        newEndIndex = newStartIndex + MIN_ZOOM_LEVEL - 1;
        if (newEndIndex >= data.length) {
            newEndIndex = data.length - 1;
            newStartIndex = newEndIndex - MIN_ZOOM_LEVEL + 1;
        }
    }
    
    setDomain({ startIndex: newStartIndex, endIndex: newEndIndex });
  }, [data.length, domain]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsPanning(true);
    panStartRef.current = { clientX: e.clientX, startIndex: domain.startIndex, endIndex: domain.endIndex };
  }, [domain]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning || !panStartRef.current || !chartRef.current) return;
    
    const dx = e.clientX - panStartRef.current.clientX;
    const currentRange = panStartRef.current.endIndex - panStartRef.current.startIndex;
    const shift = Math.round((dx / chartRef.current.offsetWidth) * currentRange);
    
    let newStartIndex = panStartRef.current.startIndex - shift;
    let newEndIndex = panStartRef.current.endIndex - shift;

    if (newStartIndex < 0) {
      newStartIndex = 0;
      newEndIndex = currentRange;
    }
    if (newEndIndex >= data.length) {
      newEndIndex = data.length - 1;
      newStartIndex = newEndIndex - currentRange;
    }
    
    if (newStartIndex !== domain.startIndex || newEndIndex !== domain.endIndex) {
        setDomain({ startIndex: newStartIndex, endIndex: newEndIndex });
    }
  }, [isPanning, data.length, domain]);

  const handleMouseUpOrLeave = useCallback(() => {
    setIsPanning(false);
    panStartRef.current = null;
  }, []);

  const latestData = data[data.length - 1];
  
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
      <div 
        className="flex-1 min-h-[300px] select-none"
        ref={chartRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={visibleData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: textColor }} tickFormatter={(tick) => tick.split(' ')[1]} stroke={textColor} />
            <YAxis 
              orientation="right" 
              domain={yDomain} 
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