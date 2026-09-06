import React from 'react';
import { BusinessConfig } from '../types';
import { generateWhatsAppLink, getInstagramUrl } from '../utils/formatters';
import { 
  MapPin, 
  Clock, 
  MessageSquare, 
  Instagram, 
  Phone, 
  Navigation, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface LocationAndContactProps {
  config: BusinessConfig;
}

export const LocationAndContact: React.FC<LocationAndContactProps> = ({ config }) => {
  const whatsAppVisitUrl = generateWhatsAppLink(
    config.whatsappNumber,
    'Hola SAY Autos Bogotá, deseo agendar una visita a su showroom en Usaquén para conocer los vehículos y recibir asesoría personalizada.'
  );

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${config.address}, ${config.city}`
  )}`;

  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(
    `${config.address}, Bogotá`
  )}`;

  return (
    <section id="contacto-section" className="py-20 md:py-28 border-b border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 text-white/70 text-[10px] uppercase tracking-widest font-light">
            <MapPin className="w-3.5 h-3.5 text-white/60" />
            <span>Showroom & Vitrina Privada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white font-serif">
            Visítanos en Bogotá
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
            Ubicados en el exclusivo sector norte de Bogotá. Conoce personalmente cada unidad, revisa la documentación de peritaje y realiza una prueba de ruta bajo cita previa.
          </p>
        </div>

        {/* Grid Location Info & Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1 font-light">
                  Dirección Showroom
                </span>
                <h3 className="text-xl font-light text-white mb-2 font-serif">
                  {config.address}
                </h3>
                <p className="text-xs text-white/50 font-light">
                  {config.neighborhood} • {config.city} (Sector Calle 127 y Carrera 7ma)
                </p>
              </div>

              {/* Schedules */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs font-normal text-white flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-white/50" />
                  <span>Horarios de Atención:</span>
                </span>
                <div className="text-xs text-white/50 space-y-1 font-light pl-5.5">
                  <p>{config.scheduleWeekdays}</p>
                  <p>{config.scheduleWeekend}</p>
                </div>
              </div>

              {/* Direct Route Buttons */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
                <a
                  id="link-google-maps-showroom"
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-full border border-white/15 bg-white/[0.02] hover:border-white/30 text-[10px] uppercase tracking-wider text-white/70 hover:text-white flex items-center justify-center gap-2 transition-colors font-light"
                >
                  <Navigation className="w-3 h-3 text-white/60" />
                  <span>Google Maps</span>
                </a>

                <a
                  id="link-waze-showroom"
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-full border border-white/15 bg-white/[0.02] hover:border-white/30 text-[10px] uppercase tracking-wider text-white/70 hover:text-white flex items-center justify-center gap-2 transition-colors font-light"
                >
                  <Navigation className="w-3 h-3 text-white/60" />
                  <span>Waze</span>
                </a>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3 pt-2">
                <a
                  id="btn-agenda-cita-whatsapp"
                  href={whatsAppVisitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-full border border-white bg-white text-black hover:bg-white/90 text-[10px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Agendar Cita en Showroom</span>
                </a>

                <a
                  id="btn-instagram-perfil"
                  href={getInstagramUrl(config.instagramHandle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full border border-white/15 bg-white/[0.02] hover:border-white/30 text-white/70 hover:text-white text-[10px] uppercase tracking-wider font-light flex items-center justify-center gap-2 transition-all"
                >
                  <Instagram className="w-3.5 h-3.5 text-white/60" />
                  <span>Instagram @{config.instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual & FAQ */}
          <div className="lg:col-span-7 space-y-6">
            {/* Dark Styled Map Box */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-[10px] uppercase tracking-widest text-white/70 font-light">
                    SAY Autos Bogotá • Showroom Norte
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-light">Bogotá D.C.</span>
              </div>

              {/* Stylized Visual Mockup of Studio Showroom */}
              <div className="relative h-64 rounded-xl overflow-hidden border border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80"
                  alt="Showroom SAY Autos Bogotá"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-4">
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.05] flex items-center justify-center text-white mb-2">
                    <MapPin className="w-5 h-5 text-white/80" />
                  </div>
                  <h4 className="text-base font-light text-white font-serif">Sede Usaquén - Bogotá</h4>
                  <p className="text-xs text-white/60 mt-1 max-w-sm font-light">
                    {config.address} • Parqueadero privado para clientes
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 px-4 py-2 rounded-full border border-white/30 bg-black/70 hover:border-white text-[10px] uppercase tracking-widest font-light text-white transition-all flex items-center gap-1.5"
                  >
                    <span>Ver en Mapa</span>
                    <Navigation className="w-3 h-3 text-white/70" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Accordion FAQs */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-white/60 font-light">
                Preguntas Frecuentes
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/10 space-y-1">
                  <span className="text-white font-normal block text-xs">
                    ¿Puedo llevar el vehículo a peritar con mi propio mecánico?
                  </span>
                  <p className="text-white/50 font-light leading-relaxed text-[11px]">
                    Sí, con total apertura. Aunque todos nuestros autos cuentan con certificación vigente en Colserautos o Automas, te acompañamos al centro de peritaje de tu elección en Bogotá.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/10 space-y-1">
                  <span className="text-white font-normal block text-xs">
                    ¿Cómo garantizan la seguridad jurídica del traspaso?
                  </span>
                  <p className="text-white/50 font-light leading-relaxed text-[11px]">
                    Verificamos antecedentes en RUNT, SIMIT, Dijin y ventanilla única de movilidad. El traspaso se formaliza legalmente; no entregamos autos con contratos abiertos o embargos.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/10 space-y-1">
                  <span className="text-white font-normal block text-xs">
                    ¿Qué beneficios tienen los autos Híbridos en Bogotá?
                  </span>
                  <p className="text-white/50 font-light leading-relaxed text-[11px]">
                    Los vehículos híbridos y eléctricos en vitrina gozan de exención absoluta de la medida de Pico y Placa en Bogotá, además de descuentos en impuestos y tarifas preferenciales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
