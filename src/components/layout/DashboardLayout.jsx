import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCloudDrizzle, FiTarget, FiMenu, FiSettings } from 'react-icons/fi';
// Importando o seu SVG
import logo from '../../assets/astrosafra-logo.svg';

export default function DashboardLayout({ children }) {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Visão Geral' },
    { path: '/clima', icon: FiCloudDrizzle, label: 'Radar e Clima' },
    { path: '/safra', icon: FiTarget, label: 'Gestão de Safra' },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#F4C358] text-stone-900 flex flex-col shadow-md z-10">
        
        <div className="h-24 px-6 border-b border-[#ebba50] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AstroSafra Foguete" className="w-8 h-8" />
            <span className="text-2xl font-bold tracking-wider">AstroSafra</span>
          </div>
          <button className="md:hidden p-2 text-stone-900 hover:bg-[#dfae45] rounded-lg transition-colors">
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4 flex-1 hidden md:block">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors font-medium ${
                      isActive ? 'bg-[#dfae45] font-bold shadow-sm' : 'hover:bg-[#e5b64c]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" /> {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-[#dfae45] hidden md:block">
           <a href="#" className="flex items-center gap-3 p-3 hover:bg-[#e5b64c] rounded-lg transition-colors font-medium">
             <FiSettings className="w-5 h-5" /> Configurações
           </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="h-24 bg-white shadow-sm px-6 flex justify-between items-center border-b border-stone-200 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-stone-800">Painel de Controle</h1>
            <p className="text-sm text-stone-500">Fazendas Boa Esperança LTDA.</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-stone-800 group-hover:text-[#a87b20] transition-colors">Pedro Henrique</p>
              <p className="text-xs text-stone-500">Administrador</p>
            </div>
            <div className="w-10 h-10 bg-[#fdf5e4] border border-[#F4C358] rounded-full flex items-center justify-center text-[#a87b20] font-bold shadow-sm">
              PH
            </div>
          </div>
        </header>
        
        {/* Conteúdo rolável */}
        <div className="p-6 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}