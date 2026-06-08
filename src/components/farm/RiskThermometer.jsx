import React from 'react';
import { FiThermometer, FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

export default function RiskThermometer({ riskLevel, temperature }) {
  const config = {
    safe: { color: 'bg-emerald-500', text: 'text-emerald-700', label: 'Seguro', Icon: FiCheckCircle },
    warning: { color: 'bg-amber-500', text: 'text-amber-700', label: 'Atenção', Icon: FiInfo },
    danger: { color: 'bg-red-500', text: 'text-red-700', label: 'Perigo Extremo', Icon: FiAlertCircle },
  };

  const currentConfig = config[riskLevel] || config.safe;
  const { Icon } = currentConfig;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center justify-between">
      <div>
        <h3 className="text-stone-500 text-sm font-medium uppercase tracking-wider mb-1">Risco Climático (15 dias)</h3>
        <div className="flex items-center gap-2">
          <Icon className={`w-6 h-6 ${currentConfig.text}`} />
          <span className={`text-xl font-bold ${currentConfig.text}`}>{currentConfig.label}</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <FiThermometer className="w-8 h-8 text-stone-400 mb-1" />
        <span className="text-2xl font-bold text-stone-800">{temperature}</span>
      </div>
    </div>
  );
}