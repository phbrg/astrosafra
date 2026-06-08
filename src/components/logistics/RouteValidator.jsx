import React, { useState } from 'react';
import { FiMapPin, FiTruck, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export default function RouteValidator({ onValidate, loading, routeData }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (origin && destination) onValidate(origin, destination);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
      <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
        <FiTruck className="text-[#a87b20]" />
        Validador de Rota Segura
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiMapPin className="absolute left-3 top-3 text-stone-400" />
          <select 
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#F4C358] focus:border-[#F4C358] focus:outline-none"
          >
            <option value="">Origem...</option>
            <option value="Sorriso, MT">Sorriso, MT</option>
            <option value="Ribeirão Preto, SP">Ribeirão Preto, SP</option>
          </select>
        </div>
        
        <div className="flex-1 relative">
          <FiMapPin className="absolute left-3 top-3 text-stone-400" />
          <select 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#F4C358] focus:border-[#F4C358] focus:outline-none"
          >
            <option value="">Destino...</option>
            <option value="Paranaguá, PR">Paranaguá, PR</option>
            <option value="Santos, SP">Santos, SP</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading || !origin || !destination}
          className="bg-[#F4C358] hover:bg-[#dfae45] text-stone-900 font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Analisando...' : 'Validar Rota'}
        </button>
      </form>

      {/* Feedback Visual Semântico */}
      {routeData && (
        <div className={`p-4 rounded-lg border ${routeData.status === 'clear' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-start gap-3">
            {routeData.status === 'clear' ? (
              <FiCheckCircle className="w-6 h-6 text-emerald-600 mt-1" />
            ) : (
              <FiAlertTriangle className="w-6 h-6 text-red-600 mt-1" />
            )}
            <div>
              <h4 className={`font-bold ${routeData.status === 'clear' ? 'text-emerald-800' : 'text-red-800'}`}>
                {routeData.status === 'clear' ? 'Rota Liberada' : 'Alerta de Risco Alto na Rota'}
              </h4>
              <p className="text-stone-700 mt-1">{routeData.reason}</p>
              <p className="text-sm font-semibold mt-2 text-stone-800">Sugestão: {routeData.suggestion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}