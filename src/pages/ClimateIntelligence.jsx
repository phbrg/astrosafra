import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { FiCloudRain, FiWind, FiSun, FiMap, FiAlertTriangle, FiCheckCircle, FiSearch } from 'react-icons/fi';
import { useAstroData } from '../hooks/useAstroData';

export default function ClimateIntelligence() {
  const [locationInput, setLocationInput] = useState('');
  const { farmData, loadingFarm, fetchFarmData } = useAstroData();

  const handleSearch = (e) => {
    e.preventDefault();
    if (locationInput) fetchFarmData(locationInput);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        
        {/* Header e Busca */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <div>
            <h2 className="text-2xl font-bold text-stone-800">Radar e Telemetria Climática</h2>
            <p className="text-stone-500">Monitoramento por satélite atualizado em tempo real.</p>
          </div>
          
          <form onSubmit={handleSearch} className="w-full md:w-auto flex gap-2">
            <select
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="flex-1 md:w-64 p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#F4C358] focus:border-[#F4C358] focus:outline-none"
            >
              <option value="">Selecione a Fazenda...</option>
              <option value="Sorriso, MT">Sorriso, MT</option>
              <option value="Ribeirão Preto, SP">Ribeirão Preto, SP</option>
              <option value="Passo Fundo, RS">Passo Fundo, RS</option>
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

        {/* Renderização Condicional dos Dados */}
        {farmData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-stone-800 rounded-xl overflow-hidden relative min-h-[300px] shadow-sm flex items-center justify-center border border-stone-200">
              <div className="absolute inset-0 bg-stone-900 opacity-90"></div>
              <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] ${
                farmData.riskLevel === 'safe' ? 'bg-emerald-900/40' : 
                farmData.riskLevel === 'danger' ? 'bg-red-900/40' : 'bg-blue-900/40'
              }`}></div>
              
              <div className="relative z-10 text-center">
                <FiMap className="w-16 h-16 text-stone-500/50 mx-auto mb-2" />
                <p className="text-stone-300 font-medium text-lg">{locationInput}</p>
                <p className="text-stone-400 text-sm">Camada Visível: Umidade do Solo</p>
              </div>
            </div>

            {/* Métricas e Alertas */}
            <div className="flex flex-col gap-6">
              {/* Alerta Dinâmico */}
              {farmData.climate.alert ? (
                <div className={`p-5 rounded-xl flex items-start gap-3 border ${
                  farmData.climate.alert.type === 'danger' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                }`}>
                  <FiAlertTriangle className={`w-6 h-6 shrink-0 mt-0.5 ${
                    farmData.climate.alert.type === 'danger' ? 'text-red-600' : 'text-amber-600'
                  }`} />
                  <div>
                    <h4 className={`font-bold ${farmData.climate.alert.type === 'danger' ? 'text-red-800' : 'text-amber-800'}`}>
                      {farmData.climate.alert.title}
                    </h4>
                    <p className={`text-sm mt-1 ${farmData.climate.alert.type === 'danger' ? 'text-red-700' : 'text-amber-700'}`}>
                      {farmData.climate.alert.message}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl flex items-start gap-3">
                  <FiCheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-emerald-800">Clima Favorável</h4>
                    <p className="text-sm text-emerald-700 mt-1">Nenhum evento climático severo detectado para a região nos próximos 7 dias.</p>
                  </div>
                </div>
              )}

              {/* Condições Atuais */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex-1">
                <h4 className="font-bold text-stone-800 mb-4">Condições Atuais</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-stone-600"><FiCloudRain className="text-blue-500" /> Precipitação</div>
                    <span className="font-bold text-stone-800">{farmData.climate.precipitation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-stone-600"><FiWind className="text-stone-400" /> Vento</div>
                    <span className="font-bold text-stone-800">{farmData.climate.wind}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-stone-600"><FiSun className="text-amber-500" /> Radiação Solar</div>
                    <span className="font-bold text-stone-800">{farmData.climate.solarRadiation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          !loadingFarm && (
            <div className="bg-stone-200/50 p-12 rounded-xl text-center text-stone-500 border-2 border-dashed border-stone-300">
              Selecione uma fazenda para visualizar o radar meteorológico.
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
}