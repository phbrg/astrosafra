import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WeatherChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 h-full">
      <h3 className="text-stone-800 font-bold mb-6 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#F4C358] inline-block"></span>
        Histórico de Precipitação (mm) e Temperatura
      </h3>
      <div className="h-64 w-full text-sm">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="rain" name="Chuva (mm)" stroke="#2563eb" fillOpacity={1} fill="url(#colorRain)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}