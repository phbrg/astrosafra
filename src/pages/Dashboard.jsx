import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import RiskThermometer from '../components/farm/RiskThermometer';
import ProductivityInsight from '../components/farm/ProductivityInsight';
import RouteValidator from '../components/logistics/RouteValidator';
import MarketTicker from '../components/farm/MarketTicker';
import WeatherChart from '../components/farm/WeatherChart';
import NdviCard from '../components/farm/NdviCard';
import { useAstroData } from '../hooks/useAstroData';
import { FiSearch } from 'react-icons/fi';

export default function Dashboard() {
  const [locationInput, setLocationInput] = useState('');
  const { farmData, loadingFarm, fetchFarmData, routeData, loadingRoute, validateRoute, marketData } = useAstroData();

  const handleSearchFarm = (e) => {
    e.preventDefault();
    if (locationInput) fetchFarmData(locationInput);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        
        {/* Ticker de Mercado */}
        <MarketTicker data={marketData} />

        {/* Header de Busca */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <div>
            <h2 className="text-2xl font-bold text-stone-800">Inteligência de Cultivo</h2>
            <p className="text-stone-500 text-sm">Monitore o clima, solo e rotas da sua propriedade.</p>
          </div>
          
          <form onSubmit={handleSearchFarm} className="w-full md:w-auto flex gap-2">
            <select
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="flex-1 md:w-64 p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#F4C358] focus:border-[#F4C358] focus:outline-none"
            >
              <option value="">Selecione a Fazenda...</option>
              <option value="Sorriso, MT">Sorriso, MT</option>
              <option value="Ribeirão Preto, SP">Ribeirão Preto, SP</option>
            </select>
            <button 
              type="submit" 
              disabled={loadingFarm || !locationInput}
              className="bg-[#F4C358] hover:bg-[#dfae45] text-stone-900 font-bold px-6 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
            >
              {loadingFarm ? '...' : <FiSearch className="w-5 h-5" />}
            </button>
          </form>
        </div>

        {/* Bento Grid Principal */}
        {farmData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Coluna Esquerda: Insights Rápidos */}
            <div className="space-y-6 lg:col-span-1">
              <RiskThermometer riskLevel={farmData.riskLevel} temperature={farmData.temperature} />
              <NdviCard value={farmData.ndvi} />
              <ProductivityInsight insight={farmData.insight} soilMoisture={farmData.soilMoisture} />
            </div>

            {/* Coluna Central/Direita: Gráficos e Logística */}
            <div className="space-y-6 lg:col-span-2 flex flex-col">
              <div className="flex-1 min-h-[300px]">
                <WeatherChart data={farmData.history} />
              </div>
              <div className="flex-1">
                <RouteValidator onValidate={validateRoute} loading={loadingRoute} routeData={routeData} />
              </div>
            </div>

          </div>
        ) : (
          !loadingFarm && (
            <div className="bg-stone-200/50 p-12 rounded-xl text-center text-stone-500 border-2 border-dashed border-stone-300">
              Selecione uma localidade acima para carregar o painel de telemetria da fazenda.
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
}