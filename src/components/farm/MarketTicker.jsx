import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function MarketTicker({ data }) {
  return (
    <div className="bg-stone-900 text-stone-100 p-4 rounded-xl shadow-md flex flex-wrap gap-6 items-center justify-between border-l-4 border-[#F4C358]">
      <div className="text-sm font-bold text-[#F4C358] uppercase tracking-widest hidden md:block">
        Mercado Atual
      </div>
      <div className="flex flex-1 gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col min-w-max">
            <span className="text-xs text-stone-400">{item.crop}</span>
            <div className="flex items-center gap-2">
              <span className="font-bold">{item.price}</span>
              <span className={`text-xs flex items-center font-bold ${item.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {item.trend === 'up' ? <FiTrendingUp className="mr-1"/> : <FiTrendingDown className="mr-1"/>}
                {item.variation}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}