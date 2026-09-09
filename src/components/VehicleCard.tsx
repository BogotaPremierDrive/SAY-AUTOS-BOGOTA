import React, { useState } from 'react';
import { Vehicle, BusinessConfig } from '../types';
import { formatCOP, formatKm, generateWhatsAppLink, calculateMonthlyPayment } from '../utils/formatters';
import { 
  ShieldCheck, 
  MessageSquare, 
  Calendar, 
  Gauge, 
  Fuel, 
  Cpu, 
  ChevronLeft, 
  ChevronRight, 
  FileText,
  Sparkles,
  CheckCircle2,
  ZoomIn,
  ArrowUpRight,
  Activity
} from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  config: BusinessConfig;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenFinance: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  config,
  onSelectVehicle,
  onOpenFinance
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  const handleTouchCard = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 2500);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  // 20% down payment, 60 months credit estimation
  const financeEstimate = calculateMonthlyPayment(vehicle.priceCOP, 20, 60);

  const whatsAppMessage = `¡Hola ${config.advisorName}! Me interesa consultar por el vehículo en vitrina: ${vehicle.brand} ${vehicle.model} ${vehicle.year} (${vehicle.version}) en ${formatCOP(vehicle.priceCOP)} (Placa terminada en ${vehicle.plateLastDigit}). ¿Sigue disponible para prueba de ruta?`;

  const vehicleWhatsAppUrl = generateWhatsAppLink(config.whatsappNumber, whatsAppMessage);

  const isHybrid = vehicle.fuelType === 'Híbrido' || vehicle.fuelType === 'Eléctrico';
  const isPlateEven = vehicle.plateLastDigit % 2 === 0;

  // Telemetry score
  const peritajeScore = vehicle.peritaje?.score || 98;
  const isTelemetryActive = isHovered || isTapped;

  return (
    <div 
      id={`vehicle-card-${vehicle.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchCard}
      className="group relative bg-gradient-to-b from-[#0a192f] via-[#071322] to-[#050d18] border border-[#dfb692]/25 hover:border-[#dfb692]/60 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-[0_0_25px_rgba(223,182,146,0.2)]"
    >
      {/* Media Gallery / Image Carousel */}
      <div 
        className="relative aspect-16/10 overflow-hidden bg-[#040810] cursor-pointer" 
        onClick={() => onSelectVehicle(vehicle)}
      >
        {/* Floating VIP Telemetry Popup on Hover/Tap */}
        <div 
          className={`absolute top-11 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300 ${
            isTelemetryActive 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-90 -translate-y-2'
          }`}
        >
          <div className="px-3 py-1 rounded-full bg-[#071220]/95 border border-[#dfb692] shadow-[0_0_22px_rgba(223,182,146,0.4)] flex items-center gap-1.5 text-[9.5px] uppercase font-semibold tracking-[0.16em] text-[#dfb692] whitespace-nowrap backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Colserautos 100% Aprobado</span>
          </div>
        </div>

        <img
          src={vehicle.images[currentImageIndex]}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071220] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            {vehicle.status === 'Apartado' ? (
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-md">
                Apartado
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-[#071220]/80 backdrop-blur-md text-emerald-400 border border-emerald-400/40 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Disponible
              </span>
            )}

            {isHybrid && (
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-[#071220]/80 backdrop-blur-md text-[#dfb692] border border-[#dfb692]/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#dfb692]" />
                Sin Pico y Placa
              </span>
            )}
          </div>

          {/* Peritaje Score Badge */}
          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-[#071220]/90 backdrop-blur-md text-[#dfb692] border border-[#dfb692]/40">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono">{vehicle.peritaje.score}/100</span>
          </div>
        </div>

        {/* Carousel controls if multi images */}
        {vehicle.images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImage}
              aria-label="Foto anterior"
              className="pointer-events-auto p-2 rounded-full bg-[#071220]/80 hover:bg-[#dfb692] hover:text-[#071220] text-white border border-[#dfb692]/30 backdrop-blur-sm transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Foto siguiente"
              className="pointer-events-auto p-2 rounded-full bg-[#071220]/80 hover:bg-[#dfb692] hover:text-[#071220] text-white border border-[#dfb692]/30 backdrop-blur-sm transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Carousel indicators */}
        {vehicle.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none">
            {vehicle.images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1 rounded-full transition-all ${
                  idx === currentImageIndex ? 'w-4 bg-[#dfb692]' : 'w-1 bg-white/30'
                }`}
              />
            ))}
          </div>
        )}

        {/* Bottom Plate Info on Image */}
        <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest text-white/80 bg-[#071220]/85 px-2.5 py-1 rounded-full border border-[#dfb692]/30 backdrop-blur-sm font-mono">
          Placa {vehicle.plateLastDigit} • {isPlateEven ? 'Par' : 'Impar'}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Brand & Model */}
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 
              onClick={() => onSelectVehicle(vehicle)}
              className="text-xl font-light text-white group-hover:text-[#dfb692] transition-colors cursor-pointer font-serif"
            >
              {vehicle.brand} <span className="font-normal">{vehicle.model}</span>
            </h3>
            <span className="text-xs font-mono text-white/50 tracking-wider">
              {vehicle.year}
            </span>
          </div>

          <p className="text-[11px] uppercase tracking-wider text-[#dfb692]/80 font-light line-clamp-1 mb-2">
            {vehicle.version}
          </p>

          {/* Narrative description snippet */}
          {vehicle.description && (
            <p className="text-xs text-white/60 font-light line-clamp-2 italic mb-3 leading-relaxed">
              "{vehicle.description}"
            </p>
          )}

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-[#dfb692]/15 text-xs text-white/70 font-light mb-3.5">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-[#dfb692]" />
              <span className="font-mono">{formatKm(vehicle.mileageKm)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#dfb692]" />
              <span>{vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-[#dfb692]" />
              <span>{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="truncate">{vehicle.traction} • {vehicle.ownersCount} {vehicle.ownersCount === 1 ? 'Dueño' : 'Dueños'}</span>
            </div>
          </div>

          {/* Telemetría de Peritaje Dinámica (Interactive Tacómetro / RPM Score Bar) */}
          <div className="mb-4 p-2.5 rounded-2xl bg-[#050e1a]/80 border border-[#dfb692]/20 group-hover:border-[#dfb692]/40 transition-colors">
            <div className="flex items-center justify-between text-[9px] uppercase tracking-wider mb-1.5 font-mono">
              <div className="flex items-center gap-1.5 text-white/60">
                <Activity className={`w-3 h-3 ${isTelemetryActive ? 'text-emerald-400 animate-pulse' : 'text-[#dfb692]'}`} />
                <span>Telemetría Peritaje</span>
              </div>
              <span className={`font-semibold transition-colors ${isTelemetryActive ? 'text-emerald-400' : 'text-[#dfb692]'}`}>
                {peritajeScore}/100 • {vehicle.peritaje?.company || 'COLSERAUTOS'}
              </span>
            </div>

            {/* Graduated Telemetry Bar */}
            <div className="h-1.5 w-full bg-[#071322] rounded-full overflow-hidden relative shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#dfb692] via-[#faece0] to-[#c5926b] rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(223,182,146,0.6)]"
                style={{ width: isTelemetryActive ? `${peritajeScore}%` : '55%' }}
              />
            </div>

            {/* Calibrated Notches (Gran Turismo Style) */}
            <div className="flex justify-between items-center mt-1 px-0.5">
              {[...Array(10)].map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-0.5 h-1 rounded-full transition-colors duration-300 ${
                    isTelemetryActive && idx < Math.floor(peritajeScore / 10)
                      ? 'bg-[#dfb692] shadow-[0_0_4px_#dfb692]' 
                      : 'bg-white/10'
                  }`} 
                />
              ))}
            </div>

            {/* Telemetric Certification Tags */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap text-[8.5px] uppercase font-mono tracking-wider">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                ✓ 100% Chasis
              </span>
              <span className="px-2 py-0.5 rounded bg-[#dfb692]/10 text-[#dfb692] border border-[#dfb692]/25">
                Sin Siniestro
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-white/70 border border-white/10">
                RUNT Limpio
              </span>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white tracking-tight font-mono">
                {formatCOP(vehicle.priceCOP)}
              </span>
              {vehicle.originalPriceCOP && (
                <span className="text-xs text-white/30 line-through font-mono">
                  {formatCOP(vehicle.originalPriceCOP)}
                </span>
              )}
            </div>

            {/* Estimated Cuota */}
            <div className="flex items-center justify-between text-[11px] text-white/50 mt-1.5">
              <span>Cuota estimada:</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenFinance(vehicle);
                }}
                className="text-[#dfb692] hover:underline underline-offset-2 cursor-pointer font-light font-mono"
              >
                ~{formatCOP(financeEstimate.monthlyPayment)}/mes
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2.5">
          <button
            id={`btn-peritaje-modal-${vehicle.id}`}
            onClick={() => onSelectVehicle(vehicle)}
            className="w-full py-2.5 px-2.5 rounded-xl border border-[#dfb692]/40 bg-[#091a30] hover:bg-[#dfb692] hover:text-[#071220] text-[#dfb692] text-[10px] uppercase tracking-[0.16em] font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer group/btn"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#dfb692] group-hover/btn:text-[#071220]" />
            <span>Ficha & Zoom HD</span>
          </button>

          <a
            id={`btn-whatsapp-car-${vehicle.id}`}
            href={vehicleWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-2.5 rounded-xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] via-[#f3d5bd] to-[#c5926b] text-[#071220] text-[10px] uppercase tracking-[0.16em] font-semibold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#dfb692]/20 hover:brightness-105 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
