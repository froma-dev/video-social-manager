export const calculateTrend = (currentValue: number, previousValue: number) => {
  const trend = ((currentValue - previousValue) / previousValue) * 100;
  console.log("THE TREND IS ===== ", trend);
  return Number(trend.toFixed(2));
};
