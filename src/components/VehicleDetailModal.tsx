import React, { useState } from 'react';
import { Vehicle, BusinessConfig } from '../types';
import { formatCOP, formatKm, generateWhatsAppLink, calculateMonthlyPayment } from '../utils/formatters';
import { 
  X, 
  ShieldCheck, 
  MessageSquare, 
  CheckCircle2, 
  FileCheck2, 
  Calendar, 
  Gauge, 
  Cpu, 
  Fuel, 
  AlertCircle, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Calculator,
  CarFront,
  ExternalLink
} from 'lucide-react';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  config: BusinessConfig;
  onClose: () => void;
  onOpenFinance: (vehicle: Vehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  config,
  onClose,
  onOpenFinance
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'peritaje' | 'ficha' | 'equipamiento'>('peritaje');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!vehicle) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const whatsAppMessage = `Hola SAY Autos Bogotá, estoy viendo en detalle el ${vehicle.brand} ${vehicle.model} ${vehicle.year} (${vehicle.version}) en ${formatCOP(vehicle.priceCOP)}. Quiero agendar una cita en su sede de Usaquén para verlo y revisar la carpeta de peritaje.`;

  const whatsAppBookingUrl = generateWhatsAppLink(config.whatsappNumber, whatsAppMessage);

  const whatsAppApartarUrl = generateWhatsAppLink(
    config.whatsappNumber,
    `Hola SAY Autos Bogotá, deseo apartar el vehículo ${vehicle.brand} ${vehicle.model} ${vehicle.year} (Placa ${vehicle.plateLastDigit} de ${vehicle.plateCity}). ¿Cuáles son las cuentas bancarias autorizadas para el depósito de reserva?`
  );

  const financeEstimate = calculateMonthlyPayment(vehicle.priceCOP, 20, 60);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        id="vehicle-detail-modal-container"
        className="w-full max-w-4xl bg-[#0a0a0a] border border-white/20 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-white"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-light uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 text-white/70">
              SAY Autos Bogotá
            </span>
            <span className="text-[10px] text-white/40 font-mono">
              Ref: {vehicle.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="share-vehicle-btn"
              onClick={handleShare}
              className="p-2 text-white/40 hover:text-white rounded-full hover:bg-white/10 transition-colors text-[10px] uppercase tracking-wider flex items-center gap-1.5"
              title="Compartir enlace"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copiedLink ? '¡Copiado!' : 'Compartir'}</span>
            </button>
            <button
              id="close-vehicle-detail-modal-btn"
              onClick={onClose}
              className="p-2 text-white/40 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl sm:text-3xl font-light text-white font-serif tracking-tight">
                  {vehicle.brand} {vehicle.model}
                </h2>
                <span className="text-xs font-light px-2.5 py-0.5 rounded-full border border-white/20 text-white/70">
                  {vehicle.year}
                </span>
              </div>
              <p className="text-xs text-white/50 font-light">
                {vehicle.version}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-0.5 font-light">Precio de Venta</span>
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight font-serif">
                {formatCOP(vehicle.priceCOP)}
              </div>
              <p className="text-[11px] text-white/40 font-light mt-0.5">
                Cuota estimada desde {formatCOP(financeEstimate.monthlyPayment)}/mes
              </p>
            </div>
          </div>

          {/* Photo Gallery with Thumbnails */}
          <div className="space-y-3">
            <div className="relative aspect-16/9 sm:aspect-21/9 rounded-xl overflow-hidden bg-black border border-white/10">
              <img
                src={vehicle.images[activeImageIdx]}
                alt={`${vehicle.brand} ${vehicle.model}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {vehicle.images.length > 1 && (
                <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)}
                    className="pointer-events-auto p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 backdrop-blur-sm cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev + 1) % vehicle.images.length)}
                    className="pointer-events-auto p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 backdrop-blur-sm cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-[10px] uppercase tracking-widest text-white font-light">
                Foto {activeImageIdx + 1} de {vehicle.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {vehicle.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      idx === activeImageIdx ? 'border-white ring-1 ring-white/50' : 'border-white/10 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 gap-6">
            <button
              onClick={() => setActiveTab('peritaje')}
              className={`pb-3 text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'peritaje'
                  ? 'border-white text-white font-medium'
                  : 'border-transparent text-white/40 hover:text-white/70 font-light'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certificado de Peritaje ({vehicle.peritaje.score}%)</span>
            </button>
            <button
              onClick={() => setActiveTab('ficha')}
              className={`pb-3 text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'ficha'
                  ? 'border-white text-white font-medium'
                  : 'border-transparent text-white/40 hover:text-white/70 font-light'
              }`}
            >
              <CarFront className="w-3.5 h-3.5" />
              <span>Ficha Técnica & Placa</span>
            </button>
            <button
              onClick={() => setActiveTab('equipamiento')}
              className={`pb-3 text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'equipamiento'
                  ? 'border-white text-white font-medium'
                  : 'border-transparent text-white/40 hover:text-white/70 font-light'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Equipamiento</span>
            </button>
          </div>

          {/* Tab 1: Peritaje Certificado */}
          {activeTab === 'peritaje' && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/30 bg-white/5 flex items-center justify-center text-white font-light text-lg font-serif">
                    {vehicle.peritaje.score}%
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-light text-white flex items-center gap-1.5">
                      <span>Peritaje Técnico Certificado</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                    </h4>
                    <p className="text-xs text-white/50 font-light mt-0.5">
                      Entidad: <strong className="text-white font-normal">{vehicle.peritaje.inspectorEntity}</strong> • Fecha: {vehicle.peritaje.inspectionDate}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.02] text-white/70">
                  {vehicle.peritaje.claimsHistory}
                </div>
              </div>

              {/* Peritaje Inspection Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70 font-light">Chasis y Estructura</span>
                    <span className="text-green-400 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-green-500/20 bg-green-500/5">
                      {vehicle.peritaje.chassisStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 font-light leading-relaxed">
                    {vehicle.peritaje.chassisAndStructure}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70 font-light">Motor y Transmisión</span>
                    <span className="text-green-400 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-green-500/20 bg-green-500/5">
                      {vehicle.peritaje.engineStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 font-light leading-relaxed">
                    {vehicle.peritaje.engineAndTransmission}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70 font-light">Latonería y Pintura (Micraje)</span>
                    <span className="text-white/80 font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.02]">
                      {vehicle.peritaje.paintMicronsRange}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 font-light leading-relaxed">
                    {vehicle.peritaje.paintAndBodywork}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70 font-light">Llantas y Rodamiento</span>
                    <span className="text-green-400 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-green-500/20 bg-green-500/5">
                      {vehicle.peritaje.tiresPercentage}% Vida Útil
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 font-light leading-relaxed">
                    {vehicle.peritaje.tiresStatus}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
                <FileCheck2 className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-white/80 mb-0.5">Certificación Legal RUNT & SIMIT</h5>
                  <p className="text-[11px] text-white/50 font-light">
                    {vehicle.peritaje.legalStatus}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Ficha Técnica */}
          {activeTab === 'ficha' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Kilometraje</span>
                <span className="text-sm font-light text-white">{formatKm(vehicle.mileageKm)}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Transmisión</span>
                <span className="text-sm font-light text-white">{vehicle.transmission}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Combustible</span>
                <span className="text-sm font-light text-white">{vehicle.fuelType}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Motor & Cilindraje</span>
                <span className="text-sm font-light text-white">{vehicle.engineDisplacement}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Tracción</span>
                <span className="text-sm font-light text-white">{vehicle.traction}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Placa y Tránsito</span>
                <span className="text-sm font-light text-white">
                  Termina en {vehicle.plateLastDigit} ({vehicle.plateCity})
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Color de Carrocería</span>
                <span className="text-sm font-light text-white">{vehicle.color}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Historial de Propietarios</span>
                <span className="text-sm font-light text-white">{vehicle.ownersCount} {vehicle.ownersCount === 1 ? 'Único Dueño' : 'Dueños'}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Vigencia SOAT</span>
                <span className="text-sm font-light text-white">{vehicle.soatValidUntil}</span>
              </div>
            </div>
          )}

          {/* Tab 3: Equipamiento */}
          {activeTab === 'equipamiento' && (
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-[10px] uppercase tracking-widest text-white/60 mb-4">
                  Equipamiento de Serie & Accesorios
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicle.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-white/70 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {vehicle.documentEquipment && (
                <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <h4 className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Equipamiento Registrado en Documento Oficial</span>
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed font-light">
                    {vehicle.documentEquipment}
                  </p>
                  <p className="text-[10px] text-white/40 mt-2 font-mono">
                    Ubicación para verificación física: {vehicle.location || 'Suba - Bogotá D.C.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-black flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="modal-open-finance-calc-btn"
              onClick={() => {
                onClose();
                onOpenFinance(vehicle);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/15 bg-white/[0.02] hover:border-white/30 text-white/70 hover:text-white text-[10px] uppercase tracking-wider font-light flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-white/60" />
              <span>Simulador de Crédito</span>
            </button>

            {vehicle.publicationUrl && (
              <a
                id="modal-mercadolibre-btn"
                href={vehicle.publicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3 rounded-full border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 text-[10px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Ver publicación oficial en Mercado Libre"
              >
                <ExternalLink className="w-3.5 h-3.5 text-yellow-400" />
                <span>Mercado Libre</span>
              </a>
            )}
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <a
              id="modal-apartar-whatsapp-btn"
              href={whatsAppApartarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full border border-white/30 bg-white/[0.05] hover:bg-white/[0.1] text-white text-[10px] uppercase tracking-[0.15em] font-light flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Apartar ($2.000.000 COP)</span>
            </a>

            <a
              id="modal-chat-whatsapp-btn"
              href={whatsAppBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-white bg-white text-black hover:bg-white/90 text-[10px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
