import React, { useState, useEffect } from 'react';
import { Vehicle, BusinessConfig } from '../types';
import { formatCOP, generateWhatsAppLink, calculateMonthlyPayment } from '../utils/formatters';
import { 
  Calculator, 
  MessageSquare, 
  BadgePercent, 
  CheckCircle2, 
  HelpCircle, 
  Building2,
  TrendingDown
} from 'lucide-react';

interface FinanceCalculatorProps {
  vehicles: Vehicle[];
  selectedVehicle?: Vehicle | null;
  config: BusinessConfig;
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({
  vehicles,
  selectedVehicle,
  config
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    selectedVehicle ? selectedVehicle.id : vehicles[0]?.id || ''
  );
  const [customPrice, setCustomPrice] = useState<number>(
    selectedVehicle ? selectedVehicle.priceCOP : vehicles[0]?.priceCOP || 100000000
  );
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [termMonths, setTermMonths] = useState<number>(60);
  const [interestRateMonthly, setInterestRateMonthly] = useState<number>(1.35); // 1.35% MV

  useEffect(() => {
    if (selectedVehicle) {
      setSelectedVehicleId(selectedVehicle.id);
      setCustomPrice(selectedVehicle.priceCOP);
    }
  }, [selectedVehicle]);

  const handleVehicleChange = (id: string) => {
    setSelectedVehicleId(id);
    const found = vehicles.find((v) => v.id === id);
    if (found) {
      setCustomPrice(found.priceCOP);
    }
  };

  const calculation = calculateMonthlyPayment(
    customPrice,
    downPaymentPercent,
    termMonths,
    interestRateMonthly
  );

  const activeVehicle = vehicles.find((v) => v.id === selectedVehicleId);
  const vehicleLabel = activeVehicle
    ? `${activeVehicle.brand} ${activeVehicle.model} ${activeVehicle.year} (${activeVehicle.version})`
    : 'Vehículo Seleccionado';

  const financeWhatsAppMessage = `Hola SAY Autos Bogotá, realicé la simulación de crédito vehicular para el ${vehicleLabel}:
- Valor vehículo: ${formatCOP(customPrice)}
- Cuota inicial (${downPaymentPercent}%): ${formatCOP(calculation.downPaymentAmount)}
- Monto a financiar: ${formatCOP(calculation.financedAmount)}
- Plazo: ${termMonths} meses
- Cuota mensual estimada: ~${formatCOP(calculation.monthlyPayment)}/mes
¿Qué documentos necesito para radicar la solicitud con sus bancos aliados?`;

  const financeWhatsAppUrl = generateWhatsAppLink(config.whatsappNumber, financeWhatsAppMessage);

  return (
    <section id="financiacion-section" className="py-20 md:py-28 border-b border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 text-white/70 text-[10px] uppercase tracking-widest font-light">
            <Calculator className="w-3.5 h-3.5 text-white/60" />
            <span>Financiación & Crédito Vehicular</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white font-serif">
            Simulador de Financiación
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
            Planes a tu medida con convenios directos junto a Bancolombia, Banco Santander, Davivienda y Finandina. Financiación de hasta el 90% con aprobación ágil.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Vehicle Selector */}
            <div>
              <label className="block text-[10px] font-light text-white/50 uppercase tracking-widest mb-2">
                Selecciona un Vehículo del Catálogo
              </label>
              <select
                id="finance-vehicle-select"
                value={selectedVehicleId}
                onChange={(e) => handleVehicleChange(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-full px-5 py-3 text-xs text-white focus:outline-none focus:border-white/40 cursor-pointer font-light"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.brand} {v.model} {v.year} — {formatCOP(v.priceCOP)}
                  </option>
                ))}
              </select>
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-light">
                <span className="text-white/60">Cuota Inicial ({downPaymentPercent}%)</span>
                <span className="text-white font-normal text-sm tracking-tight">
                  {formatCOP(calculation.downPaymentAmount)}
                </span>
              </div>
              <input
                id="finance-down-payment-slider"
                type="range"
                min="10"
                max="70"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-white bg-white/10 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                <span>10% (Mínimo)</span>
                <span>30% (Recomendado)</span>
                <span>70%</span>
              </div>
            </div>

            {/* Term Months Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-light">
                <span className="text-white/60">Plazo en Meses</span>
                <span className="text-white font-normal text-sm">
                  {termMonths} meses ({(termMonths / 12).toFixed(0)} años)
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[24, 36, 48, 60, 72].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setTermMonths(months)}
                    className={`py-2.5 text-[10px] uppercase tracking-widest rounded-full transition-all cursor-pointer ${
                      termMonths === months
                        ? 'border border-white bg-white text-black font-medium shadow-sm'
                        : 'border border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {months}m
                  </button>
                ))}
              </div>
            </div>

            {/* Allied Banks Logos / Badges */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-3">
                Bancos y Entidades Aliadas:
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-widest text-white/60 font-light">
                <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">Bancolombia</span>
                <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">Banco Santander</span>
                <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">Finandina</span>
                <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">Davivienda</span>
                <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">Sufi</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="border-b border-white/10 pb-5">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-light">Cuota Mensual Estimada</span>
              <div className="text-3xl sm:text-4xl font-light text-white tracking-tight mt-1">
                {formatCOP(calculation.monthlyPayment)}
                <span className="text-xs text-white/40 font-light"> / mes*</span>
              </div>
              <p className="text-[11px] text-white/40 mt-2 font-light leading-relaxed">
                *Cálculo indicativo con tasa estimada del {interestRateMonthly}% M.V. Sujeto a perfilamiento crediticio en Datacrédito y TransUnion.
              </p>
            </div>

            <div className="space-y-3 text-xs font-light">
              <div className="flex justify-between text-white/60">
                <span>Valor del vehículo:</span>
                <span className="text-white font-normal">{formatCOP(customPrice)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Cuota inicial ({downPaymentPercent}%):</span>
                <span className="text-white font-normal">{formatCOP(calculation.downPaymentAmount)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Monto financiado:</span>
                <span className="text-white font-normal">{formatCOP(calculation.financedAmount)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Plazo:</span>
                <span className="text-white font-normal">{termMonths} meses</span>
              </div>
            </div>

            {/* Basic Requirements Checklist */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5">
              <span className="text-[10px] uppercase tracking-widest text-white/60 block">Documentos para Radicación:</span>
              <ul className="text-[11px] text-white/50 space-y-1.5 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>Cédula de ciudadanía vigente</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>Extractos bancarios de los últimos 3 meses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>Certificación laboral o RUT para independientes</span>
                </li>
              </ul>
            </div>

            {/* Direct WhatsApp Pre-approval CTA */}
            <a
              id="finance-solicitar-whatsapp-btn"
              href={financeWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-full border border-white bg-white text-black hover:bg-white/90 text-[10px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Solicitar Pre-Aprobación</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
