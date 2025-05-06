export const calculateTrend = (currentValue: number, previousValue: number) => {
  const trend = ((currentValue - previousValue) / previousValue) * 100;
  return Number(trend.toFixed(2));
};
