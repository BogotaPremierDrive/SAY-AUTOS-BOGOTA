import React from 'react';
import { BusinessConfig } from '../types';
import { generateWhatsAppLink } from '../utils/formatters';
import { SayAutosLogo } from './SayAutosLogo';
import { 
  ShieldCheck, 
  MessageSquare, 
  FileCheck2, 
  Car, 
  BadgePercent, 
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  QrCode,
  Handshake,
  Settings2,
  Compass
} from 'lucide-react';

interface HeroProps {
  config: BusinessConfig;
  onExploreClick: () => void;
  onOpenPeritaje: () => void;
  onOpenFinance: () => void;
  onOpenSchedule: () => void;
  onOpenCard: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  onExploreClick,
  onOpenPeritaje,
  onOpenFinance,
  onOpenSchedule,
  onOpenCard
}) => {
  const heroWhatsAppUrl = generateWhatsAppLink(
    config.whatsappNumber,
    `¡Hola ${config.advisorName}! Estoy explorando la vitrina digital de SAY Autos Bogotá y deseo consultar sobre los vehículos disponibles y agendar una visita.`
  );

  return (
    <section id="hero-section" className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#dfb692]/20 bg-[#071220]">
      {/* Background ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#dfb692]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#0d223d]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Main Editorial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Col Left: 7 Cols */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#dfb692]/30 bg-[#dfb692]/10 rounded-full mb-6 text-[#dfb692]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
                {config.advisorName} • {config.advisorRole || 'Gerente de Ventas Especializadas'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight mb-6 text-white font-serif">
              VEHÍCULOS USADOS<br />
              <span className="italic font-normal bg-gradient-to-r from-[#f5ddca] via-[#dfb692] to-[#c5926b] bg-clip-text text-transparent">
                SELECCIONADOS
              </span><br />
              CON PERITAJE 100%
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-lg font-light leading-relaxed mb-8">
              Tu próxima inversión automotriz con total certeza técnica y legal. Asesoría especializada, financiación bancaria ágil y retoma segura en nuestro showroom de Usaquén.
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="hero-explore-inventory-btn"
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-2xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] via-[#f3d5bd] to-[#c5926b] text-[#071220] font-semibold text-xs uppercase tracking-[0.2em] flex items-center gap-2.5 shadow-xl shadow-[#dfb692]/20 hover:brightness-105 transition-all cursor-pointer"
              >
                <span>Explorar Vitrina</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-schedule-vip-btn"
                onClick={onOpenSchedule}
                className="px-6 py-3.5 rounded-2xl border border-[#dfb692]/40 bg-[#0b1b30] hover:bg-[#11243d] text-[#dfb692] text-xs uppercase tracking-[0.16em] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Cita VIP</span>
              </button>

              <button
                id="hero-view-card-btn"
                onClick={onOpenCard}
                className="px-5 py-3.5 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.02] text-white/80 hover:text-white text-xs tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#dfb692]" />
                <span>Tarjeta Digital & QR</span>
              </button>
            </div>
          </div>

          {/* Col Right: 5 Cols Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] bg-gradient-to-b from-[#0e213b] via-[#091729] to-[#050e1b] rounded-3xl border-2 border-[#dfb692]/40 flex flex-col justify-between p-8 relative overflow-hidden group shadow-2xl">
              {/* Corner Art Deco Accents with Official Logo */}
              <div className="absolute top-2 right-4 p-2 flex flex-col items-end pointer-events-none">
                <SayAutosLogo size="sm" showSubtitle={true} showFraming={false} />
              </div>

              {/* Background Car Image Subtle Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-500 -z-10"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80')" }}
              />

              {/* Top Card Badge */}
              <div className="relative z-10 pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071220]/80 backdrop-blur-md border border-[#dfb692]/30 text-[10px] uppercase tracking-widest text-[#dfb692]">
                  <Sparkles className="w-3 h-3" />
                  <span>Selección Destacada</span>
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="space-y-4 relative z-10 bg-[#071220]/90 backdrop-blur-md p-5 rounded-2xl border border-[#dfb692]/30">
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#dfb692]">
                      Entrega Inmediata
                    </p>
                    <p className="text-xl font-light font-serif text-white">BMW Serie 3 330i M Sport</p>
                  </div>
                  <p className="text-lg font-light text-white/80 font-mono">2023</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#050c18] p-2.5 rounded-xl border border-white/10">
                    <p className="text-[9px] uppercase tracking-widest text-white/40 mb-0.5">Kilometraje</p>
                    <p className="text-xs font-mono text-white">12.400 KM</p>
                  </div>
                  <div className="bg-[#050c18] p-2.5 rounded-xl border border-white/10">
                    <p className="text-[9px] uppercase tracking-widest text-white/40 mb-0.5">Peritaje</p>
                    <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>99 / 100 Colserautos</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white/60 pt-1">
                  <span>Placa Bogotá (Par)</span>
                  <button 
                    onClick={onExploreClick}
                    className="text-[#dfb692] hover:underline text-[11px] uppercase tracking-wider font-medium cursor-pointer"
                  >
                    Ver en vitrina →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid (Sleek Architecture from Physical Business Card) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 pt-10 border-t border-[#dfb692]/20">
          <div 
            id="pillar-used-vehicles"
            onClick={onExploreClick}
            className="p-6 rounded-2xl bg-[#09172a] border border-[#dfb692]/20 hover:border-[#dfb692]/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full border border-[#dfb692]/40 flex items-center justify-center text-[#dfb692] mb-4 bg-[#dfb692]/10 group-hover:bg-[#dfb692] group-hover:text-[#071220] transition-all">
              <Car className="w-5 h-5" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[#dfb692] mb-1">Pilar I</p>
            <h3 className="text-sm font-light text-white mb-2 font-serif">Vehículos Usados Seleccionados</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Catálogo estricto con peritaje técnico de 100 puntos, bajo kilometraje y latonería certificada.
            </p>
          </div>

          <div 
            id="pillar-specialized-advice"
            onClick={onOpenSchedule}
            className="p-6 rounded-2xl bg-[#09172a] border border-[#dfb692]/20 hover:border-[#dfb692]/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full border border-[#dfb692]/40 flex items-center justify-center text-[#dfb692] mb-4 bg-[#dfb692]/10 group-hover:bg-[#dfb692] group-hover:text-[#071220] transition-all">
              <Handshake className="w-5 h-5" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[#dfb692] mb-1">Pilar II</p>
            <h3 className="text-sm font-light text-white mb-2 font-serif">Asesoría Especializada</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Atención directa con Sayda Riscanevo. Acompañamiento imparcial según tu presupuesto y necesidades.
            </p>
          </div>

          <div 
            id="pillar-credits-tradein"
            onClick={onOpenFinance}
            className="p-6 rounded-2xl bg-[#09172a] border border-[#dfb692]/20 hover:border-[#dfb692]/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full border border-[#dfb692]/40 flex items-center justify-center text-[#dfb692] mb-4 bg-[#dfb692]/10 group-hover:bg-[#dfb692] group-hover:text-[#071220] transition-all">
              <Settings2 className="w-5 h-5" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[#dfb692] mb-1">Pilar III</p>
            <h3 className="text-sm font-light text-white mb-2 font-serif">Créditos, Retomas, Cambios</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Financiación hasta del 90% con bancos aliados y avalúo justo para recibir tu auto en parte de pago.
            </p>
          </div>

          <div 
            id="pillar-professional-support"
            className="p-6 rounded-2xl bg-[#09172a] border border-[#dfb692]/20 hover:border-[#dfb692]/50 transition-all"
          >
            <div className="w-10 h-10 rounded-full border border-[#dfb692]/40 flex items-center justify-center text-[#dfb692] mb-4 bg-[#dfb692]/10">
              <Compass className="w-5 h-5" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[#dfb692] mb-1">Pilar IV</p>
            <h3 className="text-sm font-light text-white mb-2 font-serif">Acompañamiento Profesional</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Traspaso 100% garantizado en SIM Bogotá, verificación en RUNT, SIMIT y entrega transparente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
