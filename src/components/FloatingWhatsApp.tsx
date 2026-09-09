import React, { useState } from 'react';
import { BusinessConfig } from '../types';
import { generateWhatsAppLink } from '../utils/formatters';
import { SayAutosLogo } from './SayAutosLogo';
import { MessageSquare, X, ChevronUp, Sparkles, Send, Settings, ShieldCheck, QrCode } from 'lucide-react';

interface FloatingWhatsAppProps {
  config: BusinessConfig;
  onOpenConfig: () => void;
  onOpenCard?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ 
  config, 
  onOpenConfig,
  onOpenCard 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      title: 'Consultar inventario en vitrina',
      message: `¡Hola ${config.advisorName}! Deseo conocer los vehículos disponibles actualmente en vitrina con entrega inmediata.`
    },
    {
      title: 'Agendar Cita VIP / Prueba de Ruta',
      message: `¡Hola ${config.advisorName}! Deseo agendar una visita privada al showroom de Usaquén para realizar una prueba de ruta.`
    },
    {
      title: 'Simular crédito vehicular',
      message: `¡Hola ${config.advisorName}! Quisiera asesoría para financiar un vehículo de la vitrina SAY Autos.`
    },
    {
      title: 'Retoma o consignación de mi auto',
      message: `¡Hola ${config.advisorName}! Me gustaría cotizar la retoma o consignación de mi vehículo actual.`
    }
  ];

  const handleOptionClick = (message: string) => {
    const url = generateWhatsAppLink(config.whatsappNumber, message);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const defaultChatUrl = generateWhatsAppLink(
    config.whatsappNumber,
    `¡Hola ${config.advisorName}! Me comunico desde la web de SAY Autos Bogotá para recibir asesoría personalizada.`
  );

  return (
    <div className="fixed bottom-20 lg:bottom-5 right-4 sm:right-5 z-40 flex flex-col items-end">
      {/* Quick Chat Popup Box */}
      {isOpen && (
        <div 
          id="floating-whatsapp-popup"
          className="mb-3 w-80 sm:w-88 bg-[#071322] border-2 border-[#dfb692]/40 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-[#050e1a] border-b border-[#dfb692]/20 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border border-[#dfb692] bg-[#071220] flex items-center justify-center p-1 shadow-inner overflow-hidden">
                  <SayAutosLogo size="sm" showSubtitle={false} className="scale-65 -mt-1" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#050e1a]"></span>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white tracking-wider">
                  {config.advisorName}
                </h4>
                <p className="text-[10px] text-[#dfb692] font-light flex items-center gap-1.5">
                  <span>{config.advisorRole || 'Gerente de Ventas Especializadas'}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onOpenConfig}
                className="p-1.5 text-white/40 hover:text-[#dfb692] rounded-full hover:bg-white/10 transition-colors"
                title="Configurar número"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/40 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-4 bg-[#071220] space-y-3">
            <div className="p-3 rounded-xl bg-[#0b1b30] border border-[#dfb692]/20 text-xs text-white/80 font-light">
              <p className="font-medium text-white mb-0.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb692]" />
                Atención directa en Bogotá
              </p>
              <p className="text-[11px] text-white/60 leading-relaxed font-light">
                Selecciona una opción o escribe directamente a WhatsApp {config.whatsappDisplay}:
              </p>
            </div>

            {/* Quick Option Pills */}
            <div className="space-y-1.5">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt.message)}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#09182c] hover:bg-[#0f2442] border border-white/10 hover:border-[#dfb692]/40 text-xs text-white/90 transition-all flex items-center justify-between group cursor-pointer font-light"
                >
                  <span className="group-hover:text-[#dfb692] transition-colors">{opt.title}</span>
                  <Send className="w-3 h-3 text-[#dfb692]/40 group-hover:text-[#dfb692] transition-colors" />
                </button>
              ))}
            </div>

            {/* Direct Open Button */}
            <a
              href={defaultChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] via-[#f3d5bd] to-[#c5926b] text-[#071220] text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#dfb692]/20 hover:brightness-105 transition-all mt-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chatear con Sayda Riscanevo</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        id="floating-whatsapp-main-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#071322] hover:bg-[#0c1d33] text-white shadow-2xl border border-[#dfb692]/40 hover:border-[#dfb692] transition-all transform hover:scale-[1.02] cursor-pointer"
        aria-label="Abrir chat de WhatsApp SAY Autos Bogotá"
      >
        <div className="relative flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-[#dfb692]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-[10px] font-medium uppercase tracking-widest block leading-tight text-white font-serif">
            Sayda Riscanevo
          </span>
          <span className="text-[10px] text-[#dfb692] font-mono leading-none">
            {config.whatsappDisplay}
          </span>
        </div>
      </button>
    </div>
  );
};
