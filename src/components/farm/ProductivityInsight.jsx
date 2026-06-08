import React from 'react';
import { FiTrendingUp, FiDroplet } from 'react-icons/fi';

export default function ProductivityInsight({ insight, soilMoisture }) {
  return (
    <div className="bg-stone-900 text-stone-50 p-6 rounded-xl shadow-md relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <FiTrendingUp className="w-24 h-24 text-[#F4C358]" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <FiDroplet className="w-5 h-5 text-[#F4C358]" />
          <span className="font-semibold text-[#F4C358]">Umidade do Solo: {soilMoisture}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Insight de Produtividade</h3>
        <p className="text-stone-300 leading-relaxed max-w-prose">
          {insight}
        </p>
      </div>
    </div>
  );
}