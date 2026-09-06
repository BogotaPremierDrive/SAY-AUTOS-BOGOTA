import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { SayAutosLogo } from './SayAutosLogo';
import { BusinessConfig } from '../types';
import { 
  Car, 
  Handshake, 
  Settings2, 
  Compass, 
  Instagram, 
  Phone, 
  MessageSquare, 
  RotateCw, 
  Download, 
  Check, 
  Share2,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface DigitalBusinessCardProps {
  config: BusinessConfig;
  className?: string;
}

export const DigitalBusinessCard: React.FC<DigitalBusinessCardProps> = ({
  config,
  className = ''
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Exact WhatsApp link for Sayda Riscanevo
  const whatsAppDirectUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    '¡Hola Sayda Riscanevo! Te contacto desde la tarjeta digital de SAY Autos Bogotá. Deseo recibir asesoría especializada.'
  )}`;

  // Generate QR Code with custom rose-gold/copper metallic palette on dark navy
  useEffect(() => {
    QRCode.toDataURL(whatsAppDirectUrl, {
      width: 400,
      margin: 1,
      color: {
        dark: '#dfb692', // Rose gold metallic
        light: '#071220' // Midnight navy
      },
      errorCorrectionLevel: 'H' // High error correction to allow central WhatsApp logo badge
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR:', err));
  }, [whatsAppDirectUrl]);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(config.phoneCall);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Riscanevo;Sayda;;;
FN:Sayda Riscanevo
ORG:SAY Autos Bogotá
TITLE:Gerente de Ventas Especializadas
TEL;TYPE=CELL,VOICE:${config.phoneCall}
TEL;TYPE=WHATSAPP:${config.phoneCall}
NOTE:Vehículos Usados Seleccionados, Créditos, Retomas, Acompañamiento Profesional.
ADR;TYPE=WORK:;;${config.address};Bogotá;Cundinamarca;110121;Colombia
URL:https://instagram.com/${config.instagramHandle}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Sayda_Riscanevo_SAY_Autos.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* 3D Flip Card Container */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[520px] sm:h-[550px] [perspective:1200px]">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative w-full h-full duration-700 [transform-style:preserve-3d] cursor-pointer transition-transform ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* ==================== CARD FRONT (ANVERSO) ==================== */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl p-5 sm:p-7 bg-gradient-to-b from-[#0e1d32] via-[#091526] to-[#050c17] text-white shadow-2xl border border-[#dfb692]/40 overflow-hidden flex flex-col justify-between">
            {/* Art Deco Geometric Corner Lines & Framing */}
            <div className="absolute inset-2 border border-[#dfb692]/30 rounded-2xl pointer-events-none">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#dfb692]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#dfb692]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#dfb692]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#dfb692]"></div>
            </div>

            {/* Inner secondary Art Deco inset border */}
            <div className="absolute inset-4 border border-[#dfb692]/15 rounded-xl pointer-events-none"></div>

            {/* Top Brand & Emblem Header */}
            <div className="relative z-10 pt-2 flex flex-col items-center">
              <SayAutosLogo size="md" showSubtitle={true} />
            </div>

            {/* Manager Name & Title */}
            <div className="relative z-10 text-center my-auto py-2">
              <h3 className="text-xl sm:text-2xl font-light uppercase tracking-[0.16em] text-white font-serif drop-shadow-md">
                SAYDA RISCANEVO
              </h3>
              <p className="text-xs sm:text-sm text-[#dfb692] tracking-wider font-light mt-0.5">
                (Gerente de Ventas Especializadas)
              </p>
            </div>

            {/* 4 Pillars with Custom Metallic Icons matching Card */}
            <div className="relative z-10 space-y-2.5 px-3 py-2 bg-[#060e1a]/60 rounded-xl border border-[#dfb692]/20 backdrop-blur-xs">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-[#dfb692]/40 bg-[#dfb692]/10 flex items-center justify-center text-[#dfb692] shrink-0">
                  <Car className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-[13px] text-white/90 font-light tracking-wide">
                  Vehículos Usados Seleccionados
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-[#dfb692]/40 bg-[#dfb692]/10 flex items-center justify-center text-[#dfb692] shrink-0">
                  <Handshake className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-[13px] text-white/90 font-light tracking-wide">
                  Asesoría Especializada
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-[#dfb692]/40 bg-[#dfb692]/10 flex items-center justify-center text-[#dfb692] shrink-0">
                  <Settings2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-[13px] text-white/90 font-light tracking-wide">
                  Créditos, Retomas, Cambios
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-[#dfb692]/40 bg-[#dfb692]/10 flex items-center justify-center text-[#dfb692] shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-[13px] text-white/90 font-light tracking-wide">
                  Acompañamiento Profesional
                </span>
              </div>
            </div>

            {/* Bottom Footer: Instagram & Tap to Flip Prompt */}
            <div className="relative z-10 pt-2 flex items-center justify-between border-t border-[#dfb692]/20">
              <a
                href={`https://instagram.com/${config.instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs text-[#dfb692] hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">@{config.instagramHandle}</span>
              </a>

              <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/40">
                <span>Ver QR</span>
                <RotateCw className="w-3 h-3 text-[#dfb692] animate-spin [animation-duration:6s]" />
              </div>
            </div>
          </div>

          {/* ==================== CARD BACK (REVERSO - EXACT QR) ==================== */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl p-5 sm:p-7 bg-gradient-to-b from-[#0e1d32] via-[#091526] to-[#050c17] text-white shadow-2xl border border-[#dfb692]/40 overflow-hidden flex flex-col justify-between items-center text-center">
            {/* Art Deco Geometric Corner Lines */}
            <div className="absolute inset-2 border border-[#dfb692]/30 rounded-2xl pointer-events-none">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#dfb692]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#dfb692]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#dfb692]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#dfb692]"></div>
            </div>
            <div className="absolute inset-4 border border-[#dfb692]/15 rounded-xl pointer-events-none"></div>

            {/* Top Car Silhouette Badge */}
            <div className="relative z-10 pt-2">
              <SayAutosLogo size="sm" showSubtitle={false} />
            </div>

            {/* Exact WhatsApp QR Code with Central Badge */}
            <div className="relative z-10 my-auto p-3 rounded-2xl bg-[#071220] border-2 border-[#dfb692] shadow-[0_0_25px_rgba(223,182,146,0.15)] flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="QR WhatsApp SAY Autos Bogotá"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-[#071220] animate-pulse rounded-lg" />
                )}

                {/* Central WhatsApp Badge Icon exactly matching physical card */}
                <div className="absolute inset-0 m-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#071220] border-2 border-[#dfb692] flex items-center justify-center shadow-lg pointer-events-none">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-[#dfb692] fill-[#dfb692]/20" />
                </div>
              </div>
            </div>

            {/* QR Caption & Phone Number */}
            <div className="relative z-10 pb-2">
              <p className="text-xs sm:text-sm font-light uppercase tracking-[0.2em] text-[#dfb692] mb-1">
                Escanea para WhatsApp
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#060e1a] border border-[#dfb692]/30 text-white font-mono text-xs sm:text-sm font-light">
                <MessageSquare className="w-3.5 h-3.5 text-[#dfb692]" />
                <span>{config.whatsappDisplay}</span>
              </div>
            </div>

            {/* Bottom Flip back prompt */}
            <div className="relative z-10 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/40 border-t border-[#dfb692]/20 pt-2 w-full justify-center">
              <RotateCw className="w-3 h-3 text-[#dfb692]" />
              <span>Toca para ver el frente</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Action Controls Below Card */}
      <div className="w-full max-w-[340px] sm:max-w-[380px] mt-4 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            id="flip-digital-card-btn"
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-3 py-2 rounded-xl border border-[#dfb692]/30 bg-[#0c182b] hover:bg-[#11233d] text-white text-[11px] uppercase tracking-wider font-light flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5 text-[#dfb692]" />
            <span>{isFlipped ? 'Ver Anverso' : 'Ver Código QR'}</span>
          </button>

          <button
            id="copy-card-phone-btn"
            onClick={handleCopyPhone}
            className="px-3 py-2 rounded-xl border border-[#dfb692]/30 bg-[#0c182b] hover:bg-[#11233d] text-white text-[11px] uppercase tracking-wider font-light flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Phone className="w-3.5 h-3.5 text-[#dfb692]" />
                <span>Copiar Teléfono</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            id="direct-whatsapp-card-btn"
            href={whatsAppDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2.5 rounded-xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] via-[#f3d5bd] to-[#c5926b] text-[#071220] font-medium text-[11px] uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 shadow-lg shadow-[#dfb692]/20 transition-all cursor-pointer hover:brightness-105"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chatear Ahora</span>
          </a>

          <button
            id="download-vcard-btn"
            onClick={handleDownloadVCard}
            className="px-3 py-2.5 rounded-xl border border-[#dfb692]/40 bg-[#071220] hover:bg-[#0d1c31] text-[#dfb692] text-[11px] uppercase tracking-wider font-light flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Guardar Contacto</span>
          </button>
        </div>
      </div>
    </div>
  );
};
