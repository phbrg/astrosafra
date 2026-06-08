import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { FiTrendingUp, FiTrendingDown, FiCrosshair, FiCalendar, FiCheckCircle, FiSearch, FiInfo, FiActivity } from 'react-icons/fi';
import { useAstroData } from '../hooks/useAstroData';

export default function CropManagement() {
  const [locationInput, setLocationInput] = useState('');
  const { farmData, loadingFarm, fetchFarmData } = useAstroData();

  // Estados do Simulador ZARC
  const [selectedCycle, setSelectedCycle] = useState('precoce');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (locationInput) fetchFarmData(locationInput);
  };

  // Limpa o resultado do simulador se o usuário trocar de fazenda
  useEffect(() => {
    setSimulationResult(null);
  }, [farmData]);

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationResult(null);

    // Simula o tempo de processamento do modelo (1.2 segundos)
    setTimeout(() => {
      if (farmData && farmData.zarc) {
        setSimulationResult(farmData.zarc[selectedCycle]);
      }
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        
        {/* Header e Busca */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <div>
            <h2 className="text-2xl font-bold text-stone-800">Gestão e Projeção de Safra</h2>
            <p className="text-stone-500">Estimativas geradas por Machine Learning baseadas no histórico da propriedade.</p>
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
            <button type="submit" disabled={loadingFarm || !locationInput} className="bg-[#F4C358] hover:bg-[#dfae45] text-stone-900 font-bold px-6 rounded-lg transition-colors flex items-center disabled:opacity-50">
              {loadingFarm ? '...' : <FiSearch className="w-5 h-5" />}
            </button>
          </form>
        </div>

        {farmData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Projeção */}
            <div className="bg-stone-900 text-stone-50 p-6 rounded-xl shadow-sm border-l-4 border-[#F4C358] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#F4C358]">
                  <FiTrendingUp className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Estimativa de Colheita</span>
                </div>
                <p className="text-stone-400 text-sm">Safra 2026/2027 (Modelo Preditivo)</p>
              </div>
              <div className="mt-6">
                <span className="text-5xl font-bold text-white">{farmData.crop.estimatedYield}</span>
                <span className="text-stone-400 ml-2">sacas / ha</span>
                <p className={`text-sm mt-2 font-medium flex items-center gap-1 ${
                  farmData.crop.yieldTrend === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {farmData.crop.yieldTrend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
                  {farmData.crop.yieldVariation} em relação à média histórica
                </p>
              </div>
            </div>

            {/* Janela de Plantio */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 text-stone-800">
                <FiCalendar className="w-5 h-5 text-[#a87b20]" />
                <h3 className="font-bold text-lg">Janela Ideal de Plantio</h3>
              </div>
              
              <div className="relative pt-6 pb-4">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-stone-50 p-4 rounded-lg border border-stone-200">
                  <div className="text-center md:text-left">
                    <p className="text-xs text-stone-500 font-bold uppercase">Início Calculado</p>
                    <p className="text-xl font-bold text-stone-800">{farmData.crop.windowStart}</p>
                  </div>
                  <div className="hidden md:block flex-1 h-px bg-stone-300 border-dashed border-t"></div>
                  <div className="text-center md:text-right">
                    <p className="text-xs text-stone-500 font-bold uppercase">Fim Calculado</p>
                    <p className="text-xl font-bold text-stone-800">{farmData.crop.windowEnd}</p>
                  </div>
                </div>
              </div>

              <div className={`mt-2 flex gap-2 items-start p-3 rounded-lg border text-sm ${
                farmData.riskLevel === 'safe' ? 'bg-[#fdf5e4] border-[#F4C358]/30' : 'bg-red-50 border-red-200'
              }`}>
                {farmData.riskLevel === 'safe' ? (
                  <FiCheckCircle className="text-[#a87b20] mt-0.5 shrink-0" />
                ) : (
                  <FiInfo className="text-red-600 mt-0.5 shrink-0" />
                )}
                <p className="text-stone-700">
                  <strong className="text-stone-900">IA Recomenda: </strong> 
                  {farmData.crop.recommendation}
                </p>
              </div>
            </div>

            {/* Simulador de Insumos (ZARC) Funcional */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 md:col-span-3">
               <div className="flex items-center gap-2 mb-4 text-stone-800">
                  <FiCrosshair className="w-5 h-5 text-[#a87b20]" />
                  <h3 className="font-bold text-lg">Simulador de Zoneamento Agrícola (ZARC)</h3>
                </div>
                <p className="text-sm text-stone-600 mb-6">
                  Cruze o ciclo da semente com a previsão climática da sua fazenda para obter o índice de risco.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <select 
                    value={selectedCycle}
                    onChange={(e) => setSelectedCycle(e.target.value)}
                    className="flex-1 p-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#F4C358] focus:border-[#F4C358] focus:outline-none"
                  >
                    <option value="precoce">Soja - Ciclo Precoce (100 a 110 dias)</option>
                    <option value="medio">Soja - Ciclo Médio (115 a 125 dias)</option>
                    <option value="tardio">Soja - Ciclo Tardio (130+ dias)</option>
                  </select>
                  <button 
                    onClick={handleSimulate}
                    disabled={isSimulating}
                    className="bg-stone-800 text-white font-bold px-8 py-3 rounded-lg hover:bg-stone-900 transition-colors disabled:opacity-50 min-w-[200px]"
                  >
                    {isSimulating ? 'Calculando...' : 'Simular Cenário'}
                  </button>
                </div>

                {/* Exibição do Resultado do Simulador */}
                {simulationResult && (
                  <div className={`p-6 rounded-xl border animate-fade-in ${
                    simulationResult.color === 'emerald' ? 'bg-emerald-50 border-emerald-200' :
                    simulationResult.color === 'amber' ? 'bg-amber-50 border-amber-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-full ${
                          simulationResult.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                          simulationResult.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          <FiActivity className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wide text-stone-500 mb-1">Status da Simulação</p>
                          <h4 className={`text-2xl font-bold ${
                            simulationResult.color === 'emerald' ? 'text-emerald-800' :
                            simulationResult.color === 'amber' ? 'text-amber-800' :
                            'text-red-800'
                          }`}>
                            {simulationResult.status}
                          </h4>
                        </div>
                      </div>
                      
                      <div className="flex-1 md:ml-8 border-t md:border-t-0 md:border-l border-stone-300/50 pt-4 md:pt-0 md:pl-8">
                        <div className="mb-2">
                          <span className="text-sm font-semibold text-stone-600">Probabilidade de Risco: </span>
                          <span className="font-bold text-stone-900">{simulationResult.risk}</span>
                        </div>
                        <p className="text-stone-700 text-sm leading-relaxed">
                          {simulationResult.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        ) : (
          !loadingFarm && (
            <div className="bg-stone-200/50 p-12 rounded-xl text-center text-stone-500 border-2 border-dashed border-stone-300">
              Selecione uma fazenda para rodar o modelo preditivo de safra.
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
}