import React, { useState, useMemo } from 'react';
import { BusinessConfig } from '../types';
import { generateWhatsAppLink, formatCOP } from '../utils/formatters';
import { 
  Calculator,
  Upload,
  MessageSquare,
  BadgeDollarSign,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Car,
  FileCheck,
  X,
  Clock,
  ArrowRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

interface SellCarSectionProps {
  config: BusinessConfig;
}

interface BrandCatalog {
  [brand: string]: { name: string; basePriceM: number }[];
}

const POPULAR_CATALOG: BrandCatalog = {
  'Toyota': [
    { name: 'Fortuner SW4 2.8 Diesel', basePriceM: 275 },
    { name: 'Prado TXL 3.0 / 4.0', basePriceM: 340 },
    { name: 'Hilux SRX 4x4', basePriceM: 225 },
    { name: 'Corolla Cross Híbrida', basePriceM: 128 },
    { name: 'RAV4 Híbrida 4WD', basePriceM: 195 },
    { name: 'Land Cruiser 300', basePriceM: 680 }
  ],
  'Mazda': [
    { name: 'CX-30 Grand Touring', basePriceM: 118 },
    { name: 'CX-5 Grand Touring Signature', basePriceM: 165 },
    { name: 'Mazda 3 Grand Touring LX', basePriceM: 110 },
    { name: 'CX-50 Grand Touring', basePriceM: 185 },
    { name: 'CX-90 Mild-Hybrid', basePriceM: 290 }
  ],
  'BMW': [
    { name: 'Serie 3 320i / 330i M Sport', basePriceM: 220 },
    { name: 'X1 sDrive20i', basePriceM: 185 },
    { name: 'X3 xDrive30i M Sport', basePriceM: 285 },
    { name: 'X5 xDrive40i', basePriceM: 420 },
    { name: 'M340i xDrive', basePriceM: 320 },
    { name: 'M2 Coupé', basePriceM: 360 }
  ],
  'Mercedes-Benz': [
    { name: 'Clase C 200 AMG Line', basePriceM: 215 },
    { name: 'GLA 200 AMG Line', basePriceM: 175 },
    { name: 'GLC 300 4MATIC', basePriceM: 295 },
    { name: 'GLE 450 4MATIC', basePriceM: 440 },
    { name: 'AMG C43 4MATIC', basePriceM: 310 }
  ],
  'Porsche': [
    { name: 'Macan GTS', basePriceM: 420 },
    { name: 'Cayenne Coupé E-Hybrid', basePriceM: 520 },
    { name: '911 Carrera S (992)', basePriceM: 690 },
    { name: 'Taycan 4S Eléctrico', basePriceM: 480 }
  ],
  'Audi': [
    { name: 'Q3 Sportback 45 TFSI', basePriceM: 195 },
    { name: 'Q5 S-Line 45 TFSI', basePriceM: 265 },
    { name: 'A4 40 TFSI S-Line', basePriceM: 175 },
    { name: 'Q7 55 TFSI Quattro', basePriceM: 380 }
  ],
  'Chevrolet': [
    { name: 'Tahoe Z71 4x4', basePriceM: 360 },
    { name: 'Tracker Premier Turbo', basePriceM: 92 },
    { name: 'Blazer RS AWD', basePriceM: 210 },
    { name: 'Colorado High Country', basePriceM: 195 }
  ],
  'Ford': [
    { name: 'F-150 Lariat Híbrida', basePriceM: 310 },
    { name: 'Ranger Raptor 3.0 V6', basePriceM: 280 },
    { name: 'Explorer Limited 4WD', basePriceM: 240 },
    { name: 'Bronco Sport Wildtrak', basePriceM: 175 }
  ],
  'Volvo': [
    { name: 'XC60 Recharge T8 Híbrido', basePriceM: 280 },
    { name: 'XC90 Recharge Ultimate', basePriceM: 410 },
    { name: 'EX30 Ultra Eléctrico', basePriceM: 195 }
  ],
  'Kia': [
    { name: 'Sportage GT-Line', basePriceM: 165 },
    { name: 'Sorento Híbrida 4WD', basePriceM: 240 },
    { name: 'EV6 GT-Line Eléctrico', basePriceM: 250 }
  ]
};

const BRANDS = Object.keys(POPULAR_CATALOG);

export const SellCarSection: React.FC<SellCarSectionProps> = ({ config }) => {
  // Valuation Engine State
  const [selectedBrand, setSelectedBrand] = useState<string>('Toyota');
  const [selectedModel, setSelectedModel] = useState<string>(POPULAR_CATALOG['Toyota'][0].name);
  const [year, setYear] = useState<number>(2022);
  const [mileageKm, setMileageKm] = useState<number>(30000);
  const [plateCity, setPlateCity] = useState<string>('Bogotá D.C.');
  const [plateLastDigit, setPlateLastDigit] = useState<string>('7');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [customModelText, setCustomModelText] = useState<string>('');

  // Uploaded Files State
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string; size: string; preview?: string }[]>([]);

  // Update models when brand changes
  const handleBrandChange = (newBrand: string) => {
    setSelectedBrand(newBrand);
    if (POPULAR_CATALOG[newBrand] && POPULAR_CATALOG[newBrand].length > 0) {
      setSelectedModel(POPULAR_CATALOG[newBrand][0].name);
    } else {
      setSelectedModel('Otro');
    }
  };

  // Calculate market valuation algorithm (in COP Millions)
  const valuation = useMemo(() => {
    const brandModels = POPULAR_CATALOG[selectedBrand] || [];
    const found = brandModels.find((m) => m.name === selectedModel);
    const basePriceM = found ? found.basePriceM : 150;

    // Depreciation by Year: approx 6.5% annually relative to 2026
    const yearsDiff = Math.max(0, 2026 - year);
    const ageFactor = Math.pow(0.935, yearsDiff);

    // Mileage Adjustment: baseline expected is ~15,000 km per year
    const expectedKm = Math.max(10000, yearsDiff * 14000);
    const kmDelta = mileageKm - expectedKm;
    // Every 10,000 km above/below expected adjusts by ~1.5%
    const kmFactor = 1 - (kmDelta / 10000) * 0.015;
    const clampedKmFactor = Math.max(0.78, Math.min(1.15, kmFactor));

    const estimatedCenter = basePriceM * ageFactor * clampedKmFactor;
    const low = Math.round(estimatedCenter * 0.96 * 1000000);
    const high = Math.round(estimatedCenter * 1.04 * 1000000);

    return {
      low,
      high,
      average: Math.round(estimatedCenter * 1000000),
      confidence: '98.6% (Datos Fasecolda + RUNT Bogotá)'
    };
  }, [selectedBrand, selectedModel, year, mileageKm]);

  // Handle local image file upload simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file: File) => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
      }));
      setUploadedFiles((prev) => [...prev, ...filesArray].slice(0, 6));
    }
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Recalculate trigger with brief animation
  const handleRecalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 600);
  };

  // Generate WhatsApp Message with full telemetric breakdown
  const handleContactWhatsApp = () => {
    const modelName = selectedModel === 'Otro' ? (customModelText || 'Personalizado') : selectedModel;
    const message = `¡Hola ${config.advisorName}! Acabo de utilizar el *Tasador Algorítmico de SAY Autos Bogotá* para cotizar mi vehículo:

• *Marca:* ${selectedBrand}
• *Línea / Versión:* ${modelName}
• *Año Modelo:* ${year}
• *Kilometraje:* ${mileageKm.toLocaleString()} KM
• *Placa:* Terminada en ${plateLastDigit || 'X'} (${plateCity})
• *Rango Estimado en Plataforma:* ${formatCOP(valuation.low)} - ${formatCOP(valuation.high)}
• *Documentos / Fotos preparadas:* ${uploadedFiles.length} archivo(s)

¿Podemos coordinar una inspección técnica o peritaje en su sala de Bogotá para confirmar la oferta?`;

    const url = generateWhatsAppLink(config.whatsappNumber, message);
    window.open(url, '_blank');
  };

  return (
    <section id="vender-section" className="py-20 md:py-28 border-b border-[#dfb692]/20 bg-[#050e1a] relative overflow-hidden">
      {/* Background Subtle Tech Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#dfb692]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#dfb692]/30 bg-[#dfb692]/10 text-[#dfb692] text-xs uppercase tracking-[0.2em] font-medium">
            <Calculator className="w-3.5 h-3.5" />
            <span>Herramienta Interactiva • Tasador SAY Autos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif tracking-tight text-white">
            Tasador Algorítmico & <span className="text-[#dfb692] font-normal">Retoma de Vehículos</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
            Calcula en 15 segundos el valor comercial estimado de tu vehículo en Bogotá con datos reales de Fasecolda, RUNT y demanda secundaria de alta gama.
          </p>
        </div>

        {/* Interactive Tasador Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 Cols): The Interactive Valuation Controls */}
          <div className="lg:col-span-7 bg-[#071322] border border-[#dfb692]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#dfb692]/15 pb-4">
              <div className="flex items-center gap-2.5 text-white">
                <Sliders className="w-4 h-4 text-[#dfb692]" />
                <h3 className="text-sm uppercase tracking-[0.16em] font-semibold text-[#dfb692]">
                  Parámetros de tu Vehículo
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Algoritmo Activo 2026
              </span>
            </div>

            <div className="space-y-5">
              {/* Row 1: Brand & Model (Dependent Dropdowns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/60 font-mono mb-1.5">
                    1. Marca del Auto
                  </label>
                  <select
                    id="calc-brand-select"
                    value={selectedBrand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full bg-[#0a192f] border border-[#dfb692]/30 hover:border-[#dfb692]/60 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-[#dfb692] transition-colors cursor-pointer"
                  >
                    {BRANDS.map((brand) => (
                      <option key={brand} value={brand} className="bg-[#071220] text-white">
                        {brand}
                      </option>
                    ))}
                    <option value="Otra" className="bg-[#071220] text-white">Otra Marca...</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/60 font-mono mb-1.5">
                    2. Línea / Referencia
                  </label>
                  {selectedBrand !== 'Otra' ? (
                    <select
                      id="calc-model-select"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-[#0a192f] border border-[#dfb692]/30 hover:border-[#dfb692]/60 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-[#dfb692] transition-colors cursor-pointer"
                    >
                      {(POPULAR_CATALOG[selectedBrand] || []).map((m) => (
                        <option key={m.name} value={m.name} className="bg-[#071220] text-white">
                          {m.name}
                        </option>
                      ))}
                      <option value="Otro" className="bg-[#071220] text-white">Otra versión / modelo</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder="Ej: Audi RSQ3 Sportback"
                      value={customModelText}
                      onChange={(e) => setCustomModelText(e.target.value)}
                      className="w-full bg-[#0a192f] border border-[#dfb692]/30 rounded-xl px-3.5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#dfb692]"
                    />
                  )}
                </div>
              </div>

              {/* Row 2: Year Select & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/60 font-mono mb-1.5">
                    3. Año Modelo
                  </label>
                  <select
                    id="calc-year-select"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full bg-[#0a192f] border border-[#dfb692]/30 hover:border-[#dfb692]/60 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-[#dfb692] transition-colors cursor-pointer"
                  >
                    {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((y) => (
                      <option key={y} value={y} className="bg-[#071220] text-white">
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/60 font-mono mb-1.5">
                    4. Tránsito / Matrícula
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      id="calc-city-select"
                      value={plateCity}
                      onChange={(e) => setPlateCity(e.target.value)}
                      className="col-span-2 bg-[#0a192f] border border-[#dfb692]/30 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-[#dfb692] transition-colors cursor-pointer"
                    >
                      <option value="Bogotá D.C.">Bogotá D.C.</option>
                      <option value="Chía">Chía</option>
                      <option value="Cota">Cota</option>
                      <option value="Envigado">Envigado</option>
                      <option value="Otra">Otra ciudad</option>
                    </select>

                    <input
                      id="calc-plate-input"
                      type="number"
                      min="0"
                      max="9"
                      placeholder="Dígito"
                      value={plateLastDigit}
                      onChange={(e) => setPlateLastDigit(e.target.value.slice(-1))}
                      className="bg-[#0a192f] border border-[#dfb692]/30 rounded-xl px-2 py-3 text-center text-sm font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#dfb692]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Kilometraje Slider (Interactive like BPD) */}
              <div className="p-4 rounded-2xl bg-[#0a192f]/70 border border-[#dfb692]/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/70 uppercase">5. Kilometraje Actual:</span>
                  <span className="text-[#dfb692] font-bold text-sm">
                    {mileageKm.toLocaleString()} KM
                  </span>
                </div>
                <input
                  id="calc-km-slider"
                  type="range"
                  min="0"
                  max="140000"
                  step="2500"
                  value={mileageKm}
                  onChange={(e) => setMileageKm(Number(e.target.value))}
                  className="w-full accent-[#dfb692] bg-[#071220] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-white/40 font-mono">
                  <span>0 KM (Nuevo)</span>
                  <span>70.000 KM</span>
                  <span>140.000+ KM</span>
                </div>
              </div>

              {/* Documentation & Photos Dropzone */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/60 font-mono mb-2">
                  6. Fotos o Tarjeta de Propiedad (Opcional)
                </label>
                <div className="relative border-2 border-dashed border-[#dfb692]/30 hover:border-[#dfb692] rounded-2xl p-4 sm:p-5 text-center transition-colors bg-[#0a192f]/40 group cursor-pointer">
                  <input
                    id="dropzone-file-input"
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-[#dfb692]/10 border border-[#dfb692]/40 flex items-center justify-center text-[#dfb692] group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-white">
                      Arrastra fotos o foto de la tarjeta de propiedad aquí
                    </span>
                    <span className="text-[10px] text-white/40 font-light">
                      JPG, PNG, PDF • Hasta 5 archivos para evaluación instantánea
                    </span>
                  </div>
                </div>

                {/* Upload Previews */}
                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="relative p-2 rounded-xl bg-[#091a30] border border-[#dfb692]/20 flex items-center gap-2 text-xs overflow-hidden"
                      >
                        {file.preview ? (
                          <img src={file.preview} alt="preview" className="w-8 h-8 object-cover rounded-lg shrink-0" />
                        ) : (
                          <FileCheck className="w-5 h-5 text-[#dfb692] shrink-0" />
                        )}
                        <div className="truncate flex-1">
                          <p className="truncate text-white text-[11px] font-mono">{file.name}</p>
                          <p className="text-[9px] text-white/40">{file.size}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(file.id)}
                          className="p-1 text-white/50 hover:text-red-400 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Real-time Result Card & WhatsApp Action */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Result Gauge Card */}
            <div className="bg-gradient-to-b from-[#0a192f] via-[#071322] to-[#040a14] border-2 border-[#dfb692]/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              {/* Corner Watermark */}
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Car className="w-32 h-32 text-[#dfb692]" />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#dfb692]">
                    Rango Estimado de Retoma
                  </span>
                  <button 
                    onClick={handleRecalculate}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#dfb692] transition-transform hover:rotate-180 duration-500 cursor-pointer"
                    title="Recalcular"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isCalculating ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                <h3 className="text-xl font-light text-white font-serif mt-1">
                  {selectedBrand} <span className="font-semibold text-[#dfb692]">{selectedModel === 'Otro' ? (customModelText || 'Tu Vehículo') : selectedModel}</span>
                </h3>
                <p className="text-xs text-white/50 font-mono mt-0.5">
                  Modelo {year} • {mileageKm.toLocaleString()} km • Placa *{plateLastDigit} ({plateCity})
                </p>
              </div>

              {/* Valuation Display Box */}
              <div className="p-6 rounded-2xl bg-[#050e1a]/90 border border-[#dfb692]/30 text-center space-y-2 relative">
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-mono">
                  Valor Comercial Estimado
                </span>

                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f7e4d3] via-[#dfb692] to-[#c5926b] font-mono tracking-tight">
                  {formatCOP(valuation.low)}
                  <div className="text-xs font-light text-white/40 my-0.5 font-sans">hasta</div>
                  {formatCOP(valuation.high)}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Cálculo algorítmico sujeto a peritaje físico</span>
                </div>
              </div>

              {/* Breakdown Metric Rows */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-white/60">Modalidad de Pago:</span>
                  <span className="text-white font-mono font-medium">Contado Inmediato</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-white/60">Tiempo de Inspección:</span>
                  <span className="text-emerald-400 font-mono">35 Minutos en Vitrina</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-white/60">Traspaso SIM / RUNT:</span>
                  <span className="text-[#dfb692] font-mono">100% Gestionado por SAY</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-white/60">Asesora VIP Asignada:</span>
                  <span className="text-white font-serif">{config.advisorName}</span>
                </div>
              </div>

              {/* Main Call to Action Button to WhatsApp */}
              <button
                id="btn-whatsapp-tasador-submit"
                onClick={handleContactWhatsApp}
                className="w-full py-3.5 px-6 rounded-2xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] via-[#faece0] to-[#c5926b] text-[#071220] font-semibold text-xs uppercase tracking-[0.16em] hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#dfb692]/20 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Recibir Oferta Formal con Sayda</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-white/40 font-light leading-relaxed">
                Sin intermediarios ni comisiones ocultas. Respuesta promedio en menos de 20 minutos vía WhatsApp.
              </p>
            </div>

            {/* 2 Modalities Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#071322] border border-[#dfb692]/20 space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#dfb692]/10 border border-[#dfb692]/30 flex items-center justify-center text-[#dfb692]">
                  <BadgeDollarSign className="w-4 h-4" />
                </div>
                <h4 className="text-xs uppercase font-medium text-white tracking-wider">Compra Directa</h4>
                <p className="text-[11px] text-white/50 leading-relaxed font-light">
                  Desembolso bancario el mismo día tras validación documental y peritaje.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#071322] border border-[#dfb692]/20 space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#dfb692]/10 border border-[#dfb692]/30 flex items-center justify-center text-[#dfb692]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-xs uppercase font-medium text-white tracking-wider">Consignación VIP</h4>
                <p className="text-[11px] text-white/50 leading-relaxed font-light">
                  Fotografía de estudio, video reels y exhibición física en Usaquén.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
