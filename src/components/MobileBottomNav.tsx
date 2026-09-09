import React, { useState, useEffect } from 'react';
import { BusinessConfig } from '../types';
import { generateWhatsAppLink } from '../utils/formatters';
import { 
  Home, 
  Car, 
  Calculator, 
  Calendar, 
  MessageSquare,
  BadgePercent
} from 'lucide-react';

interface MobileBottomNavProps {
  config: BusinessConfig;
  inventoryCount: number;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  config,
  inventoryCount,
  activeTab,
  onSelectTab
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-hide when scrolling down past 120px, reveal when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const whatsAppUrl = generateWhatsAppLink(
    config.whatsappNumber,
    `¡Hola ${config.advisorName}! Estoy navegando en la vitrina de SAY Autos Bogotá y deseo consultar sobre vehículos disponibles y peritaje.`
  );

  return (
    <nav
      id="mobile-bottom-navigation"
      aria-label="Navegación Móvil Rápida"
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#071220]/95 backdrop-blur-xl border-t border-[#dfb692]/30 px-2 pt-1.5 pb-[max(env(safe-area-inset-bottom),8px)] shadow-[0_-8px_25px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {/* 1. Inicio */}
        <button
          onClick={() => onSelectTab('hero')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'hero' ? 'text-[#dfb692]' : 'text-white/60 hover:text-white'
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {activeTab === 'hero' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#dfb692] rounded-full shadow-[0_0_6px_#dfb692]" />
            )}
          </div>
          <span className="text-[9.5px] uppercase tracking-wider font-mono mt-1 font-medium">
            Inicio
          </span>
        </button>

        {/* 2. Vitrina / Inventario */}
        <button
          onClick={() => onSelectTab('inventario')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer relative ${
            activeTab === 'inventario' ? 'text-[#dfb692]' : 'text-white/60 hover:text-white'
          }`}
        >
          <div className="relative">
            <Car className="w-5 h-5" />
            {inventoryCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 rounded-full text-[8px] font-mono font-bold bg-[#dfb692] text-[#071220]">
                {inventoryCount}
              </span>
            )}
            {activeTab === 'inventario' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#dfb692] rounded-full shadow-[0_0_6px_#dfb692]" />
            )}
          </div>
          <span className="text-[9.5px] uppercase tracking-wider font-mono mt-1 font-medium">
            Vitrina
          </span>
        </button>

        {/* 3. Tasador / Retoma */}
        <button
          onClick={() => onSelectTab('vender')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'vender' ? 'text-[#dfb692]' : 'text-white/60 hover:text-white'
          }`}
        >
          <div className="relative">
            <Calculator className="w-5 h-5" />
            {activeTab === 'vender' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#dfb692] rounded-full shadow-[0_0_6px_#dfb692]" />
            )}
          </div>
          <span className="text-[9.5px] uppercase tracking-wider font-mono mt-1 font-medium">
            Tasador
          </span>
        </button>

        {/* 4. Cita VIP */}
        <button
          onClick={() => onSelectTab('citas')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'citas' ? 'text-[#dfb692]' : 'text-white/60 hover:text-white'
          }`}
        >
          <div className="relative">
            <Calendar className="w-5 h-5" />
            {activeTab === 'citas' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#dfb692] rounded-full shadow-[0_0_6px_#dfb692]" />
            )}
          </div>
          <span className="text-[9.5px] uppercase tracking-wider font-mono mt-1 font-medium">
            Citas VIP
          </span>
        </button>

        {/* 5. WhatsApp Directo */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer group"
        >
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#071220] animate-pulse" />
          </div>
          <span className="text-[9.5px] uppercase tracking-wider font-mono mt-0.5 font-medium">
            Chat VIP
          </span>
        </a>
      </div>
    </nav>
  );
};
