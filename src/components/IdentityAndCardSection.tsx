import React from 'react';
import { BusinessConfig } from '../types';
import { DigitalBusinessCard } from './DigitalBusinessCard';
import { SayAutosLogo } from './SayAutosLogo';
import { 
  ShieldCheck, 
  Car, 
  Handshake, 
  Settings2, 
  Compass, 
  Instagram, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  MapPin, 
  Award,
  QrCode
} from 'lucide-react';

interface IdentityAndCardSectionProps {
  config: BusinessConfig;
  onOpenSchedule: () => void;
}

export const IdentityAndCardSection: React.FC<IdentityAndCardSectionProps> = ({
  config,
  onOpenSchedule
}) => {
  return (
    <section id="tarjeta-section" className="py-20 bg-[#050b14] text-white border-b border-[#dfb692]/20 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-[#dfb692]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 rounded-full bg-[#0d223d]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story, Philosophy & Sayda Riscanevo info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SayAutosLogo size="md" showFraming={true} showSubtitle={true} layout="horizontal" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dfb692]/10 border border-[#dfb692]/30 text-[#dfb692] text-xs uppercase tracking-[0.25em] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Identidad Oficial</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif tracking-tight text-white leading-tight">
              SAY Autos Bogotá • <br />
              <span className="font-normal bg-gradient-to-r from-[#f5ddca] via-[#dfb692] to-[#c5926b] bg-clip-text text-transparent">
                Excelencia en Usados Seleccionados
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
              Bajo la dirección de <strong className="text-white font-medium">{config.advisorName}</strong> ({config.advisorRole}), SAY Autos redefine la compra y venta de vehículos en Bogotá mediante un estándar estricto de peritaje, transparencia legal y asesoría boutique.
            </p>

            {/* 4 Pillars as seen on the physical card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-[#09172a] border border-[#dfb692]/20 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#dfb692]/10 border border-[#dfb692]/30 flex items-center justify-center text-[#dfb692] shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Vehículos Usados Seleccionados
                  </h4>
                  <p className="text-[11px] text-white/60 mt-0.5">
                    Unidades peritadas con historial verificado y bajo kilometraje.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#09172a] border border-[#dfb692]/20 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#dfb692]/10 border border-[#dfb692]/30 flex items-center justify-center text-[#dfb692] shrink-0">
                  <Handshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Asesoría Especializada
                  </h4>
                  <p className="text-[11px] text-white/60 mt-0.5">
                    Orientación directa y honesta según tu presupuesto y estilo de vida.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#09172a] border border-[#dfb692]/20 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#dfb692]/10 border border-[#dfb692]/30 flex items-center justify-center text-[#dfb692] shrink-0">
                  <Settings2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Créditos, Retomas, Cambios
                  </h4>
                  <p className="text-[11px] text-white/60 mt-0.5">
                    Facilidades de financiación bancaria y toma de tu vehículo usado.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#09172a] border border-[#dfb692]/20 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#dfb692]/10 border border-[#dfb692]/30 flex items-center justify-center text-[#dfb692] shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Acompañamiento Profesional
                  </h4>
                  <p className="text-[11px] text-white/60 mt-0.5">
                    Traspaso 100% legal en SIM Bogotá y entrega de llaves segura.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] to-[#c5926b] text-[#071220] font-medium text-xs uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-[#dfb692]/20 hover:brightness-105 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp {config.whatsappDisplay}</span>
              </a>

              <button
                onClick={onOpenSchedule}
                className="px-6 py-3 rounded-2xl border border-[#dfb692]/40 bg-[#071424] hover:bg-[#0c1d33] text-[#dfb692] font-light text-xs uppercase tracking-[0.16em] flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Agendar Cita Privada</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Flippable Digital Business Card with exact QR */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="mb-3 text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-[#dfb692] font-mono flex items-center justify-center gap-1.5">
                <QrCode className="w-3.5 h-3.5" />
                <span>Tarjeta VIP Digital Interactiva</span>
              </span>
              <p className="text-[11px] text-white/50 mt-0.5">
                Toca la tarjeta para voltearla y escanear el código QR directo
              </p>
            </div>

            <DigitalBusinessCard config={config} />
          </div>
        </div>
      </div>
    </section>
  );
};
