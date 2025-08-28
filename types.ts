
export interface Product {
  id: string;
  name: string;
  price: number;
  change: number;
  icon: React.ReactNode;
}

export interface ChartDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Position {
  id: string;
  pair: string;
  direction: 'Buy' | 'Sell';
  lots: number;
  lowerPrice: number;
  currentPrice: number;
  setProfit: number;
  setLoss: number;
  fee: number;
  margin: number;
  profit: number;
  openTime: string;
}
