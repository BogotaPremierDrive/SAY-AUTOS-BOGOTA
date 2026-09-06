import React from 'react';
import { BusinessConfig } from '../types';
import { SayAutosLogo } from './SayAutosLogo';
import { generateWhatsAppLink, getInstagramUrl } from '../utils/formatters';
import { 
  Car, 
  ShieldCheck, 
  Instagram, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Sparkles,
  CalendarCheck,
  QrCode
} from 'lucide-react';

interface FooterProps {
  config: BusinessConfig;
  onSelectTab: (tabId: string) => void;
  onOpenConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onSelectTab, onOpenConfig }) => {
  const whatsAppGeneralUrl = generateWhatsAppLink(
    config.whatsappNumber,
    `¡Hola ${config.advisorName}! Deseo comunicarme con SAY Autos Bogotá.`
  );

  return (
    <footer id="main-footer" className="bg-[#040912] border-t border-[#dfb692]/20 text-white/60 text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Sayda */}
          <div className="space-y-4">
            <SayAutosLogo size="md" showSubtitle={true} />
            <p className="text-white/60 leading-relaxed text-xs font-light mt-3">
              Curaduría y venta de vehículos seleccionados en Bogotá bajo la gerencia de <strong className="text-white">{config.advisorName}</strong>. Transparencia técnica absoluta, peritaje certificado y garantía legal de traspaso.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={getInstagramUrl(config.instagramHandle)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#dfb692]/30 flex items-center justify-center text-[#dfb692] hover:text-white hover:border-[#dfb692] transition-all bg-[#081525]"
                title={`@${config.instagramHandle}`}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={whatsAppGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#dfb692]/30 flex items-center justify-center text-[#dfb692] hover:text-white hover:border-[#dfb692] transition-all bg-[#081525]"
                title={config.whatsappDisplay}
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`tel:${config.whatsappNumber}`}
                className="w-10 h-10 rounded-full border border-[#dfb692]/30 flex items-center justify-center text-[#dfb692] hover:text-white hover:border-[#dfb692] transition-all bg-[#081525]"
                title="Llamada telefónica"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#dfb692] font-semibold mb-3">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-light">
              <li>
                <button
                  onClick={() => onSelectTab('inventario')}
                  className="hover:text-[#dfb692] transition-colors cursor-pointer text-left"
                >
                  Vitrina de Vehículos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('tarjeta')}
                  className="hover:text-[#dfb692] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <QrCode className="w-3 h-3 text-[#dfb692]" />
                  <span>Tarjeta Digital VIP & QR</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('citas')}
                  className="hover:text-[#dfb692] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <CalendarCheck className="w-3 h-3 text-[#dfb692]" />
                  <span>Invitación VIP / Agenda Cita</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('peritaje')}
                  className="hover:text-[#dfb692] transition-colors cursor-pointer text-left"
                >
                  Peritaje & Certificación
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('financiacion')}
                  className="hover:text-[#dfb692] transition-colors cursor-pointer text-left"
                >
                  Simulador de Financiación
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ubicación y Contacto */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#dfb692] font-semibold mb-3">
              Showroom Bogotá
            </h4>
            <div className="space-y-2.5 text-xs text-white/70 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#dfb692] shrink-0 mt-0.5" />
                <span>{config.address}, {config.neighborhood}, Bogotá</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>WhatsApp: {config.whatsappDisplay}</span>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#dfb692] shrink-0" />
                <span>@{config.instagramHandle}</span>
              </p>
              <p className="text-[11px] text-white/50 pt-1">
                Atención: {config.scheduleWeekdays}
              </p>
            </div>
            <button
              onClick={onOpenConfig}
              className="text-[10px] uppercase tracking-widest text-[#dfb692]/70 hover:text-[#dfb692] underline underline-offset-2 transition-colors cursor-pointer pt-1"
            >
              Configurar teléfono WhatsApp
            </button>
          </div>

          {/* Col 4: Certificaciones y Confianza */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#dfb692] font-semibold mb-3">
              Respaldo & Legalidad
            </h4>
            <div className="p-5 rounded-2xl bg-[#081525] border border-[#dfb692]/20 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-light text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Peritaje 100% Verificado</span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed font-light">
                Inspección técnica Colserautos / Automas. Traspasos garantizados ante el RUNT y Tránsito de Bogotá.
              </p>
            </div>
          </div>
        </div>

        {/* Elegant Dark Footnote Strip */}
        <div className="pt-8 border-t border-[#dfb692]/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                Atención Especializada
              </span>
              <a 
                href={whatsAppGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light text-white flex items-center gap-2 hover:text-[#dfb692] transition-colors"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span>{config.advisorName} • {config.whatsappDisplay}</span>
              </a>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Síguenos</span>
              <a 
                href={getInstagramUrl(config.instagramHandle)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light text-white flex items-center gap-2 hover:text-[#dfb692] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#dfb692]" />
                <span>Instagram @{config.instagramHandle}</span>
              </a>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-[10px] uppercase tracking-widest text-white/50">
              SAY Autos Bogotá © {new Date().getFullYear()}
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#dfb692] mt-0.5">
              Curaduría Automotriz de Autor
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
