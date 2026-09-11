import React, { useState } from 'react';
import { BusinessConfig } from '../types';
import { generateWhatsAppLink } from '../utils/formatters';
import { 
  Flame, 
  MessageSquare, 
  BadgeDollarSign, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Send 
} from 'lucide-react';

interface SellCarSectionProps {
  config: BusinessConfig;
}

export const SellCarSection: React.FC<SellCarSectionProps> = ({ config }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    plateCity: 'Bogotá D.C.',
    plateLastDigit: '',
    expectedPrice: '',
    transmission: 'Automática',
    conditionNotes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `¡Hola SAY Autos Bogotá! Deseo cotizar la venta/consignación de mi vehículo:
- Vehículo: ${formData.brand} ${formData.model}
- Año: ${formData.year}
- Kilometraje: ${formData.mileage} km
- Placa: Terminada en ${formData.plateLastDigit} (${formData.plateCity})
- Caja: ${formData.transmission}
- Precio pretendido: $${formData.expectedPrice} COP
- Detalles: ${formData.conditionNotes || 'En excelente estado con peritaje disponible'}
¿Podemos agendar una inspección en su showroom de Bogotá?`;

    const url = generateWhatsAppLink(config.whatsappNumber, message);
    window.open(url, '_blank');
  };

  return (
    <section id="vender-section" className="py-20 md:py-28 border-b border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 text-white/70 text-[10px] uppercase tracking-widest font-light">
            <Flame className="w-3.5 h-3.5 text-white/60" />
            <span>Venta & Consignación de Autor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white font-serif">
            Vende o Consigna tu Auto
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
            Privacidad, seguridad y respaldo contractual en Bogotá. Compramos de contado tu vehículo o gestionamos su consignación con difusión de alta categoría y clientes precalificados.
          </p>
        </div>

        {/* 2 Modalities + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Modalities Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.03] flex items-center justify-center text-white/80">
                <BadgeDollarSign className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-sm font-light uppercase tracking-wider text-white">Modalidad 1: Compra de Contado</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Inspección express en nuestra sala de exhibición y desembolso bancario inmediato tras comprobación de antecedentes RUNT y peritaje.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.03] flex items-center justify-center text-white/80">
                <Sparkles className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-sm font-light uppercase tracking-wider text-white">Modalidad 2: Consignación Premium</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Producción audiovisual con estética de estudio, publicación destacada en @sayautosbogota, filtro de prospectos y gestión integral del traspaso.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3 text-xs text-white/70 font-light">
              <ShieldCheck className="w-5 h-5 shrink-0 text-green-400" />
              <span>Contrato formal de consignación con póliza de custodia y garantías legales plenas.</span>
            </div>
          </div>

          {/* Quick Valuation Form */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-sm font-light uppercase tracking-wider text-white flex items-center gap-2">
                <span>Formulario de Valoración Rápida</span>
              </h3>
              <p className="text-[11px] text-white/40 font-light mt-1">Respuesta y cotización directa por WhatsApp</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 font-light mb-1.5">
                    Marca (ej: Mazda, Toyota, BMW)
                  </label>
                  <input
                    id="sell-brand-input"
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-light"
                    placeholder="Toyota"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 font-light mb-1.5">
                    Línea / Modelo (ej: Fortuner, CX-30)
                  </label>
                  <input
                    id="sell-model-input"
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-light"
                    placeholder="Fortuner SW4"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 font-light mb-1.5">
                    Año Modelo
                  </label>
                  <input
                    id="sell-year-input"
                    type="number"
                    min="2010"
                    max="2027"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-light"
                    placeholder="2022"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 font-light mb-1.5">
                    Kilometraje
                  </label>
                  <input
                    id="sell-mileage-input"
                    type="number"
                    required
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-light"
                    placeholder="35000"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 font-light mb-1.5">
                    Último dígito placa
                  </label>
                  <input
                    id="sell-plate-input"
                    type="number"
                    min="0"
                    max="9"
                    required
                    value={formData.plateLastDigit}
                    onChange={(e) => setFormData({ ...formData, plateLastDigit: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-light"
                    placeholder="7"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 font-light mb-1.5">
                    Ciudad de Matrícula
                  </label>
                  <select
                    id="sell-city-select"
                    value={formData.plateCity}
                    onChange={(e) => setFormData({ ...formData, plateCity: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 font-light"
                  >
                    <option value="Bogotá D.C.">Bogotá D.C.</option>
                    <option value="Chía">Chía (Cundinamarca)</option>
                    <option value="Cota">Cota</option>
                    <option value="Envigado">Envigado</option>
                    <option value="Otra ciudad">Otra ciudad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 font-light mb-1.5">
                    Precio Estimado Pretendido (COP)
                  </label>
                  <input
                    id="sell-price-input"
                    type="text"
                    required
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-light"
                    placeholder="Ej: 120.000.000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/50 font-light mb-1.5">
                  Observaciones adicionales (Opcional)
                </label>
                <textarea
                  id="sell-notes-textarea"
                  rows={2}
                  value={formData.conditionNotes}
                  onChange={(e) => setFormData({ ...formData, conditionNotes: e.target.value })}
                  className="w-full bg-black border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 resize-none font-light"
                  placeholder="Único dueño, mantenimientos en concesionario, llantas nuevas..."
                />
              </div>

              <button
                type="submit"
                id="submit-sell-form-btn"
                className="w-full py-3.5 px-6 rounded-full border border-white bg-white text-black hover:bg-white/90 text-[10px] uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enviar Datos para Valoración Inmediata</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
