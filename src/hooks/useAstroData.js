import { useState, useEffect } from 'react';
import { farmDataMock, routeDataMock, marketDataMock } from '../data/mockData';

export function useAstroData() {
  const [loadingFarm, setLoadingFarm] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [farmData, setFarmData] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    setMarketData(marketDataMock);
  }, []);

  const fetchFarmData = (location) => {
    setLoadingFarm(true);
    setFarmData(null);
    setTimeout(() => {
      setFarmData(farmDataMock[location] || null);
      setLoadingFarm(false);
    }, 1000);
  };

  const validateRoute = (origin, destination) => {
    setLoadingRoute(true);
    setRouteData(null);
    const routeKey = `${origin}-${destination}`;
    setTimeout(() => {
      setRouteData(routeDataMock[routeKey] || { 
        status: 'unknown', reason: 'Rota não mapeada.', suggestion: 'Consulte a PRF.' 
      });
      setLoadingRoute(false);
    }, 1200);
  };

  return { farmData, loadingFarm, fetchFarmData, routeData, loadingRoute, validateRoute, marketData };
}