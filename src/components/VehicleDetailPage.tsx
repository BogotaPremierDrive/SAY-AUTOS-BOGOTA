import React, { useState, useRef, MouseEvent } from 'react';
import { Vehicle, BusinessConfig } from '../types';
import { formatCOP, formatKm, generateWhatsAppLink } from '../utils/formatters';
import { 
  ArrowLeft, 
  Car, 
  ShieldCheck, 
  Calendar, 
  Gauge, 
  Fuel, 
  Cog, 
  Palette, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Instagram, 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  X, 
  RotateCcw, 
  Sparkles, 
  MapPin, 
  Compass, 
  Check, 
  Calculator,
  ChevronRight,
  Clock,
  ExternalLink
} from 'lucide-react';

interface VehicleDetailPageProps {
  vehicle: Vehicle;
  config: BusinessConfig;
  onBack: () => void;
  onOpenSchedule: (vehicle: Vehicle) => void;
  onOpenFinance: (vehicle: Vehicle) => void;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({
  vehicle,
  config,
  onBack,
  onOpenSchedule,
  onOpenFinance
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isFullscreenZoom, setIsFullscreenZoom] = useState(false);
  const [fullscreenScale, setFullscreenScale] = useState(1.5);
  const [copiedLink, setCopiedLink] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const currentImage = vehicle.images[activeImageIndex] || vehicle.images[0];

  // Mouse move handler for interactive zoom lens
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  // Pre-filled WhatsApp inquiry directed to Sayda Riscanevo
  const whatsAppInquireUrl = generateWhatsAppLink(
    config.whatsappNumber,
    `¡Hola ${config.advisorName}! Me interesa consultar por el vehículo en vitrina: ${vehicle.brand} ${vehicle.model} ${vehicle.year} (${vehicle.version}) Ref: [${vehicle.id}]. Precio: ${formatCOP(vehicle.priceCOP)}. ¿Sigue disponible y cuándo podría realizar una prueba de ruta?`
  );

  // Instagram direct URL
  const instagramInquireUrl = `https://instagram.com/${config.instagramHandle}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.brand} ${vehicle.model} ${vehicle.year} - SAY Autos Bogotá`,
        text: `Conoce este ${vehicle.brand} ${vehicle.model} ${vehicle.year} con peritaje certificado en SAY Autos Bogotá.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const isEvenPlate = vehicle.plateLastDigit % 2 === 0;

  return (
    <div className="min-h-screen bg-[#071220] text-neutral-100 font-['Plus_Jakarta_Sans',sans-serif] pb-24">
      {/* Top Breadcrumb & Return Bar */}
      <div className="sticky top-0 z-30 bg-[#071220]/95 backdrop-blur-md border-b border-[#dfb692]/20 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            id="btn-back-to-inventory"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#dfb692] hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Volver a la Vitrina Principal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              id="btn-share-vehicle"
              onClick={handleShare}
              className="px-3 py-1.5 rounded-full border border-[#dfb692]/30 bg-[#0b1b30] hover:bg-[#102442] text-xs text-white/80 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Compartir vehículo"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-[11px] text-green-400">Enlace Copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#dfb692]" />
                  <span className="text-[11px]">Compartir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Title and Key Badges */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dfb692]/15 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium bg-[#dfb692]/10 border border-[#dfb692]/30 text-[#dfb692]">
                Ref. {vehicle.id.toUpperCase()}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                {vehicle.status}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium bg-blue-500/10 border border-blue-500/30 text-blue-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Peritaje {vehicle.peritaje.score}/100
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif tracking-tight text-white">
              {vehicle.brand} <span className="font-normal text-[#dfb692]">{vehicle.model}</span>
            </h1>
            <p className="text-sm sm:text-base text-white/60 font-light mt-1">
              {vehicle.version} • Modelo {vehicle.year}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="flex flex-col md:items-end">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#dfb692]/80">
              Precio Especial de Contado
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                {formatCOP(vehicle.priceCOP)}
              </span>
              {vehicle.originalPriceCOP && vehicle.originalPriceCOP > vehicle.priceCOP && (
                <span className="text-sm sm:text-base text-white/40 line-through font-mono">
                  {formatCOP(vehicle.originalPriceCOP)}
                </span>
              )}
            </div>
            <span className="text-xs text-white/50 mt-0.5">
              Aprox. {formatCOP(Math.round(vehicle.priceCOP * 0.021))}/mes en crédito
            </span>
          </div>
        </div>

        {/* Top Grid: Interactive Gallery + Quick Actions & Inquire Now */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {/* Interactive Image Display with Zoom Lens */}
            <div
              ref={imageContainerRef}
              onMouseEnter={() => setIsZoomActive(true)}
              onMouseLeave={() => setIsZoomActive(false)}
              onMouseMove={handleMouseMove}
              className="relative w-full aspect-[16/10] bg-[#040a14] rounded-2xl border border-[#dfb692]/30 overflow-hidden cursor-crosshair group shadow-xl"
            >
              {/* Main Image */}
              <img
                src={currentImage}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-full object-cover transition-transform duration-300"
              />

              {/* Interactive Zoom Lens / Loupe Indicator */}
              {isZoomActive && (
                <div
                  className="absolute hidden md:block w-40 h-40 rounded-full border-2 border-[#dfb692] shadow-2xl pointer-events-none overflow-hidden [box-shadow:0_0_20px_rgba(223,182,146,0.5)]"
                  style={{
                    left: `calc(${zoomPos.x}% - 80px)`,
                    top: `calc(${zoomPos.y}% - 80px)`
                  }}
                >
                  <div
                    className="w-[800px] h-[500px] absolute"
                    style={{
                      backgroundImage: `url(${currentImage})`,
                      backgroundSize: '300% 300%',
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: 'scale(1.2)'
                    }}
                  />
                </div>
              )}

              {/* Gallery Overlay Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-[#071220]/80 backdrop-blur-md border border-[#dfb692]/30 text-[10px] uppercase tracking-widest text-[#dfb692]">
                  Foto {activeImageIndex + 1} de {vehicle.images.length}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/70">
                  <ZoomIn className="w-3 h-3 text-[#dfb692]" />
                  Pasa el cursor para zoom 2.5x
                </span>
              </div>

              {/* Fullscreen Inspection Trigger Button */}
              <button
                id="btn-fullscreen-zoom-inspection"
                onClick={() => setIsFullscreenZoom(true)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-[#071220]/90 hover:bg-[#071220] border border-[#dfb692]/40 text-[#dfb692] hover:text-white transition-all shadow-lg cursor-pointer"
                title="Abrir lupa de inspección ultra HD"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
              {vehicle.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#dfb692] ring-2 ring-[#dfb692]/40 scale-105'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Ángulo ${idx + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 text-[9px] px-1 bg-black/80 rounded font-mono text-white/80">
                    {idx === 0 ? 'Frente' : idx === 1 ? '3/4' : idx === 2 ? 'Interior' : 'Detalle'}
                  </span>
                </button>
              ))}
            </div>

            {/* Narrative Description Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#091629] border border-[#dfb692]/20 mt-2">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#dfb692] font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Reseña de Selección SAY Autos</span>
              </h3>
              <p className="text-sm text-white/80 leading-relaxed font-light font-serif italic">
                "{vehicle.description || 'Vehículo rigurosamente seleccionado por nuestro equipo técnico en Bogotá. Libre de choques estructurales, con mantenimiento al día en red de concesionario y documentación 100% verificada para traspaso inmediato.'}"
              </p>
            </div>
          </div>

          {/* Action & Inquire Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Direct Inquire Now Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0c1b30] to-[#081322] border-2 border-[#dfb692]/40 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-[#dfb692] bg-[#dfb692]/10 flex items-center justify-center text-[#dfb692]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">¿Te interesa este vehículo?</h3>
                  <p className="text-xs text-[#dfb692]">
                    Atención directa con {config.advisorName}
                  </p>
                </div>
              </div>

              <p className="text-xs text-white/70 leading-relaxed">
                Haz clic abajo para iniciar una conversación directa por WhatsApp o Instagram con el mensaje prellenado de esta referencia.
              </p>

              {/* Primary 'Inquire Now' WhatsApp Button */}
              <a
                id="btn-inquire-now-whatsapp"
                href={whatsAppInquireUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] via-[#f3d5bd] to-[#c5926b] text-[#071220] font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-[#dfb692]/20 hover:brightness-105 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consultar Ahora por WhatsApp</span>
              </a>

              {/* Secondary Instagram Inquire Button */}
              <a
                id="btn-inquire-now-instagram"
                href={instagramInquireUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-2xl border border-[#dfb692]/30 bg-[#071220] hover:bg-[#0d1d33] text-white font-medium text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-[#dfb692]" />
                <span>Consultar por Instagram @{config.instagramHandle}</span>
              </a>

              {vehicle.publicationUrl && (
                <a
                  id="btn-inquire-now-mercadolibre"
                  href={vehicle.publicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 font-medium text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Ver Publicación en Mercado Libre</span>
                </a>
              )}

              <div className="border-t border-[#dfb692]/15 pt-4 space-y-2.5">
                {/* Book VIP Test Drive / Appointment */}
                <button
                  id="btn-schedule-testdrive-for-vehicle"
                  onClick={() => onOpenSchedule(vehicle)}
                  className="w-full py-3 px-5 rounded-2xl border border-[#dfb692]/40 bg-[#0b192c] hover:bg-[#11243d] text-[#dfb692] text-xs uppercase tracking-[0.15em] font-light flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Prueba de Ruta VIP</span>
                </button>

                {/* Calculate Financing */}
                <button
                  id="btn-open-finance-for-vehicle"
                  onClick={() => onOpenFinance(vehicle)}
                  className="w-full py-2.5 px-5 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.02] text-white/70 hover:text-white text-xs tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#dfb692]" />
                  <span>Simular Plan de Financiación</span>
                </button>
              </div>
            </div>

            {/* Showroom & Legal Summary Card */}
            <div className="p-5 rounded-2xl bg-[#081424] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-white/70 border-b border-white/10 pb-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#dfb692]" />
                  Ubicación vitrina:
                </span>
                <span className="text-white font-mono">{config.neighborhood}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/70 border-b border-white/10 pb-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#dfb692]" />
                  Atención:
                </span>
                <span className="text-white text-right">{config.scheduleWeekdays.split(':')[0]}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Garantía SAY:
                </span>
                <span className="text-emerald-400 font-medium">Traspaso 100% garantizado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specifications Grid */}
        <div className="mb-14">
          <div className="border-b border-[#dfb692]/20 pb-3 mb-6 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-light font-serif tracking-wide text-white">
              Especificaciones Técnicas Detalladas
            </h2>
            <span className="text-xs uppercase tracking-widest text-[#dfb692]">
              Ficha Verificada
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#091629] border border-white/10">
              <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#dfb692]" />
                <span>Año / Modelo</span>
              </div>
              <span className="text-base font-semibold text-white">{vehicle.year}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#091629] border border-white/10">
              <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                <Gauge className="w-3.5 h-3.5 text-[#dfb692]" />
                <span>Kilometraje</span>
              </div>
              <span className="text-base font-semibold text-white font-mono">{formatKm(vehicle.mileageKm)}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#091629] border border-white/10">
              <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                <Cog className="w-3.5 h-3.5 text-[#dfb692]" />
                <span>Transmisión</span>
              </div>
              <span className="text-base font-semibold text-white">{vehicle.transmission}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#091629] border border-white/10">
              <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                <Fuel className="w-3.5 h-3.5 text-[#dfb692]" />
                <span>Combustible</span>
              </div>
              <span className="text-base font-semibold text-white">{vehicle.fuelType}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#091629] border border-white/10">
              <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                <Car className="w-3.5 h-3.5 text-[#dfb692]" />
                <span>Carrocería</span>
              </div>
              <span className="text-base font-semibold text-white">{vehicle.bodyType}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#091629] border border-white/10">
              <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                <Compass className="w-3.5 h-3.5 text-[#dfb692]" />
                <span>Tracción</span>
              </div>
              <span className="text-base font-semibold text-white font-mono">{vehicle.traction}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#091629] border border-white/10">
              <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                <Palette className="w-3.5 h-3.5 text-[#dfb692]" />
                <span>Color</span>
              </div>
              <span className="text-base font-semibold text-white truncate">{vehicle.color}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#091629] border border-white/10">
              <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                <FileText className="w-3.5 h-3.5 text-[#dfb692]" />
                <span>Placa (Bogotá)</span>
              </div>
              <span className="text-base font-semibold text-white font-mono">
                Termina en {vehicle.plateLastDigit} ({isEvenPlate ? 'Par' : 'Impar'})
              </span>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-[#071322] border border-[#dfb692]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/70">
            <div>
              <span className="text-[#dfb692] font-semibold">Motorización: </span>
              <span>{vehicle.engineDisplacement}</span>
            </div>
            <div>
              <span className="text-[#dfb692] font-semibold">SOAT: </span>
              <span>{vehicle.soatValidUntil}</span> • <span className="text-[#dfb692] font-semibold">RTM: </span>
              <span>{vehicle.rtmValidUntil}</span> • <span className="text-[#dfb692] font-semibold">Dueños: </span>
              <span>{vehicle.ownersCount}</span>
            </div>
          </div>
        </div>

        {/* Peritaje Certificado Breakdown */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#081527] border border-[#dfb692]/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dfb692]/20 pb-5 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Peritaje Técnico Certificado</span>
              </div>
              <h3 className="text-2xl font-light font-serif text-white">
                Diagnóstico {vehicle.peritaje.inspectorEntity}
              </h3>
              <p className="text-xs text-white/50">
                Inspeccionado el {vehicle.peritaje.inspectionDate}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-[#050e1a] px-5 py-3 rounded-2xl border border-[#dfb692]/40">
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-white/50">Calificación Global</div>
                <div className="text-2xl font-extrabold text-[#dfb692] font-mono">
                  {vehicle.peritaje.score} / 100
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
                <Check className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#060e1c] border border-white/10">
                <div className="text-xs font-semibold text-[#dfb692] mb-1">Chasis y Estructura</div>
                <p className="text-xs text-white/80">{vehicle.peritaje.chassisAndStructure}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#060e1c] border border-white/10">
                <div className="text-xs font-semibold text-[#dfb692] mb-1">Motor y Transmisión</div>
                <p className="text-xs text-white/80">{vehicle.peritaje.engineAndTransmission}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#060e1c] border border-white/10">
                <div className="text-xs font-semibold text-[#dfb692] mb-1">Pintura y Latonería</div>
                <p className="text-xs text-white/80">{vehicle.peritaje.paintAndBodywork}</p>
                <span className="inline-block mt-1 text-[10px] text-white/50 font-mono">
                  Micraje medido: {vehicle.peritaje.paintMicronsRange}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#060e1c] border border-white/10">
                <div className="text-xs font-semibold text-[#dfb692] mb-1">Llantas y Suspensión</div>
                <p className="text-xs text-white/80">{vehicle.peritaje.tiresStatus}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${vehicle.peritaje.tiresPercentage}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">
                    {vehicle.peritaje.tiresPercentage}% vida útil
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#060e1c] border border-white/10">
                <div className="text-xs font-semibold text-[#dfb692] mb-1">Historial Legal RUNT / SIMIT</div>
                <p className="text-xs text-white/80">{vehicle.peritaje.legalStatus}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#060e1c] border border-white/10">
                <div className="text-xs font-semibold text-[#dfb692] mb-1">Historial Fasecolda (Siniestros)</div>
                <p className="text-xs text-emerald-400 font-medium">{vehicle.peritaje.claimsHistory}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Equipment List */}
        <div className="mb-14">
          <h3 className="text-xl font-light font-serif tracking-wide text-white mb-4">
            Equipamiento y Tecnología Destacada
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {vehicle.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#091629] border border-white/10 text-xs text-white/90"
              >
                <CheckCircle2 className="w-4 h-4 text-[#dfb692] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Document Equipment & Veracity Seal */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#09182b] to-[#06111f] border border-emerald-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-light font-serif text-white">
                  Verificación de Datos y Equipamiento de Documento
                </h3>
                <p className="text-xs text-emerald-400/90 font-mono">
                  SAY Autos Suba Bogotá • Datos cotejados con inventario oficial
                </p>
              </div>
            </div>

            {vehicle.publicationUrl && (
              <a
                href={vehicle.publicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-yellow-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shrink-0"
              >
                <ExternalLink className="w-4 h-4 text-yellow-400" />
                <span>Ver Publicación en Mercado Libre</span>
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-white/80">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <div className="text-[11px] uppercase tracking-widest text-[#dfb692] font-semibold">
                Equipamiento Reportado en Ficha Oficial:
              </div>
              <p className="text-white/90 leading-relaxed font-light">
                {vehicle.documentEquipment || vehicle.features.join(' • ')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
              <div className="text-[11px] uppercase tracking-widest text-emerald-400 font-semibold">
                Garantías de Transparencia SAY Autos:
              </div>
              <ul className="space-y-1.5 text-white/70">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Kilometraje Real:</strong> {formatKm(vehicle.mileageKm)} certificados sin manipulación.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Ubicación Vitrina:</strong> {vehicle.location || 'Suba - Bogotá D.C.'}, disponible para prueba física inmediata.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Historial RUNT y Traspaso:</strong> Sin embargos, sin reservas de dominio y listo para radicación inmediata en Tránsito.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Ultra-Zoom Inspection Tool Modal */}
      {isFullscreenZoom && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col">
          {/* Top Bar */}
          <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-neutral-950">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-[#dfb692]">
                Inspección Ultra HD
              </span>
              <span className="text-white/40">|</span>
              <span className="text-xs text-white/80">
                {vehicle.brand} {vehicle.model} ({vehicle.year})
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFullscreenScale((s) => Math.max(1, s - 0.5))}
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white/80 transition-colors"
                title="Reducir Zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-white/80 w-14 text-center">
                {Math.round(fullscreenScale * 100)}%
              </span>
              <button
                onClick={() => setFullscreenScale((s) => Math.min(3.5, s + 0.5))}
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white/80 transition-colors"
                title="Aumentar Zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setFullscreenScale(1)}
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white/80 transition-colors"
                title="Restablecer a 100%"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsFullscreenZoom(false)}
                className="p-2 rounded-full bg-[#dfb692]/20 hover:bg-[#dfb692]/40 text-[#dfb692] transition-colors ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Scaled Canvas */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <div
              className="relative transition-transform duration-200"
              style={{ transform: `scale(${fullscreenScale})` }}
            >
              <img
                src={currentImage}
                alt="Fullscreen HD Inspection"
                className="max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="h-20 bg-neutral-950 border-t border-white/10 px-6 flex items-center justify-center gap-3">
            {vehicle.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border transition-all ${
                  activeImageIndex === idx ? 'border-[#dfb692] ring-2 ring-[#dfb692]' : 'border-white/20 opacity-50'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
