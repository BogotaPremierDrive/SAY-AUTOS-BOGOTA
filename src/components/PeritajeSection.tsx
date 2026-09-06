import React from 'react';
import { BusinessConfig } from '../types';
import { generateWhatsAppLink } from '../utils/formatters';
import { 
  ShieldCheck, 
  Search, 
  Cpu, 
  Layers, 
  FileCheck, 
  CheckCircle, 
  MessageSquare,
  Award,
  AlertTriangle,
  BadgeCheck
} from 'lucide-react';

interface PeritajeSectionProps {
  config: BusinessConfig;
}

export const PeritajeSection: React.FC<PeritajeSectionProps> = ({ config }) => {
  const peritajeWhatsAppUrl = generateWhatsAppLink(
    config.whatsappNumber,
    'Hola SAY Autos Bogotá, deseo conocer más sobre su peritaje certificado y solicitar la hoja técnica de un vehículo.'
  );

  return (
    <section id="peritaje-section" className="py-20 md:py-28 border-b border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 text-white/70 text-[10px] uppercase tracking-widest font-light">
            <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
            <span>Transparencia Mecánica de Autor</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white font-serif">
            Peritaje Certificado & Verificación
          </h2>

          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
            En Bogotá la confianza se fundamenta en datos verificables. Cada vehículo atraviesa una rigurosa inspección física, mecánica, estructural y legal respaldada por peritajes Colserautos y Automas.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all space-y-4">
            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.03] flex items-center justify-center text-white/80">
              <ShieldCheck className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-sm font-light uppercase tracking-wider text-white">1. Estructura y Chasis</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Verificación milimétrica de puntas de chasis, largueros, parales A-B-C y piso. Ausencia absoluta de volcamiento o soldaduras no autorizadas.
            </p>
            <ul className="text-xs text-white/70 space-y-1.5 pt-3 border-t border-white/10 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                <span>Puntas y costados originales</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                <span>Cero afectación estructural</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all space-y-4">
            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.03] flex items-center justify-center text-white/80">
              <Cpu className="w-5 h-5 text-white/80" />
            </div>
            <h3 className="text-sm font-light uppercase tracking-wider text-white">2. Motor & Escáner OBD-II</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Prueba de compresión de cilindros en frío y caliente. Diagnóstico computarizado de módulos de motor, transmisión, Airbags y frenos ABS.
            </p>
            <ul className="text-xs text-white/70 space-y-1.5 pt-3 border-t border-white/10 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                <span>Compresión superior al 95%</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                <span>Cero códigos de avería</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all space-y-4">
            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.03] flex items-center justify-center text-white/80">
              <Layers className="w-5 h-5 text-white/80" />
            </div>
            <h3 className="text-sm font-light uppercase tracking-wider text-white">3. Micraje de Pintura</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Medición de espesor de pintura con profundímetro magnético en cada pánel para certificar pintura original o detectar reparaciones.
            </p>
            <ul className="text-xs text-white/70 space-y-1.5 pt-3 border-t border-white/10 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                <span>Rango de fábrica: 90 - 130 µm</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                <span>Latonería sin rellenos sintéticos</span>
              </li>
            </ul>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all space-y-4">
            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.03] flex items-center justify-center text-white/80">
              <FileCheck className="w-5 h-5 text-white/80" />
            </div>
            <h3 className="text-sm font-light uppercase tracking-wider text-white">4. Blindaje Legal RUNT</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Estudio de títulos y antecedentes. Verificación de historial de propietarios, gravámenes, reservas de dominio, embargos y SIMIT.
            </p>
            <ul className="text-xs text-white/70 space-y-1.5 pt-3 border-t border-white/10 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                <span>Traspaso 100% garantizado</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                <span>Historial limpio en Fasecolda</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Reassurance Callout Box */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full border border-white/20 bg-white/[0.04] flex items-center justify-center text-white shrink-0">
              <BadgeCheck className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-light text-white">
                ¿Deseas peritar el vehículo en el centro de tu preferencia?
              </h4>
              <p className="text-xs sm:text-sm text-white/50 font-light mt-1">
                Fomentamos total transparencia: coordinamos la visita a Colserautos, Automas o el concesionario oficial de la marca.
              </p>
            </div>
          </div>

          <a
            id="peritaje-whatsapp-cta-btn"
            href={peritajeWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-3.5 rounded-full border border-white bg-white text-black hover:bg-white/90 text-[10px] uppercase tracking-[0.2em] font-medium transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Consultar Peritaje</span>
          </a>
        </div>
      </div>
    </section>
  );
};
