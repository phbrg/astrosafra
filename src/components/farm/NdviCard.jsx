import React from 'react';
import { FiActivity } from 'react-icons/fi';

export default function NdviCard({ value }) {
  const percentage = (value * 100).toFixed(0);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-4">
        <FiActivity className="text-[#a87b20] w-5 h-5" />
        <h3 className="text-stone-600 font-medium text-sm uppercase tracking-wide">Saúde da Vegetação (NDVI)</h3>
      </div>
      
      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-bold text-stone-800">{value}</span>
        <span className="text-stone-400 font-medium mb-1">Índice</span>
      </div>

      <div className="w-full bg-stone-100 rounded-full h-3 mb-2 overflow-hidden">
        <div 
          className="bg-[#F4C358] h-3 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-stone-500">
        {value >= 0.6 ? 'Alta densidade fotossintética detectada.' : 'Atenção: Anomalia no desenvolvimento foliar.'}
      </p>
    </div>
  );
}