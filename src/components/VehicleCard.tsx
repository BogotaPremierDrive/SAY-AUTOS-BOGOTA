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
  ExternalLink
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

  return (
    <div 
      id={`vehicle-card-${vehicle.id}`}
      className="group relative bg-gradient-to-b from-[#0a192f] via-[#071322] to-[#050d18] border border-[#dfb692]/25 hover:border-[#dfb692]/60 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-[0_0_25px_rgba(223,182,146,0.15)]"
    >
      {/* Media Gallery / Image Carousel */}
      <div 
        className="relative aspect-16/10 overflow-hidden bg-[#040810] cursor-pointer" 
        onClick={() => onSelectVehicle(vehicle)}
      >
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
          {/* Trust and Veracity Tag Row */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] tracking-wide font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Dato Verificado • Suba, Bogotá</span>
            </div>
            {vehicle.publicationUrl && (
              <a
                href={vehicle.publicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] text-yellow-300 hover:text-yellow-200 flex items-center gap-1 font-medium bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/30 transition-colors"
                title="Ver publicación oficial en Mercado Libre"
              >
                <ExternalLink className="w-3 h-3 text-yellow-400" />
                <span>Mercado Libre</span>
              </a>
            )}
          </div>

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
          <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-[#dfb692]/15 text-xs text-white/70 font-light mb-3">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-[#dfb692]" />
              <span className="font-mono">{formatKm(vehicle.mileageKm)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#dfb692]" />
              <span className="truncate">{vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-[#dfb692]" />
              <span className="truncate">{vehicle.fuelType.split(' ')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="truncate">{vehicle.traction} • {vehicle.ownersCount === 1 ? 'Único Dueño' : `${vehicle.ownersCount} Dueños`}</span>
            </div>
          </div>

          {/* Equipment Highlights Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {vehicle.features.slice(0, 3).map((feat, idx) => (
              <span 
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/10 text-white/70 truncate max-w-[130px]"
              >
                {feat}
              </span>
            ))}
            {vehicle.features.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#dfb692]/10 text-[#dfb692] font-mono">
                +{vehicle.features.length - 3}
              </span>
            )}
          </div>

          {/* Pricing Section */}
          <div className="mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white tracking-tight font-mono">
                {formatCOP(vehicle.priceCOP)}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-mono">
                Precio Oficial Verificado
              </span>
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
