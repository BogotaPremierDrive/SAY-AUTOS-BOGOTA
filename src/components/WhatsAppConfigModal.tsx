import React, { useState } from 'react';
import { BusinessConfig } from '../types';
import { X, Phone, MessageSquare, Instagram, MapPin, Check } from 'lucide-react';

interface WhatsAppConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BusinessConfig;
  onSave: (newConfig: BusinessConfig) => void;
}

export const WhatsAppConfigModal: React.FC<WhatsAppConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave
}) => {
  const [formData, setFormData] = useState<BusinessConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div 
        id="whatsapp-config-modal-container" 
        className="w-full max-w-lg bg-[#0a0a0a] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative text-white"
      >
        <button
          id="close-config-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-white/40 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/80">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-light text-white font-serif">Configuración de Contacto Concierge</h3>
            <p className="text-[11px] text-white/40 font-light">Actualiza los datos de WhatsApp y ubicación de showroom</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/50 font-light mb-1.5">
              Número de WhatsApp (con indicativo de país 57, sin +)
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 absolute left-3.5 top-3 text-white/40" />
              <input
                id="config-whatsapp-number-input"
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value.replace(/\D/g, '') })}
                className="w-full bg-black border border-white/15 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-light"
                placeholder="573142859420"
                required
              />
            </div>
            <p className="text-[10px] text-white/40 font-light mt-1">
              Las consultas de la vitrina y cotizaciones se canalizarán a este número.
            </p>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/50 font-light mb-1.5">
              Texto Visible del Teléfono
            </label>
            <input
              id="config-whatsapp-display-input"
              type="text"
              value={formData.whatsappDisplay}
              onChange={(e) => setFormData({ ...formData, whatsappDisplay: e.target.value })}
              className="w-full bg-black border border-white/15 rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 font-light"
              placeholder="+57 (314) 285-9420"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/50 font-light mb-1.5">
              Usuario de Instagram (sin @)
            </label>
            <div className="relative">
              <Instagram className="w-3.5 h-3.5 absolute left-3.5 top-3 text-white/40" />
              <input
                id="config-instagram-handle-input"
                type="text"
                value={formData.instagramHandle}
                onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value.replace('@', '') })}
                className="w-full bg-black border border-white/15 rounded-full pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 font-light"
                placeholder="sayautosbogota"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/50 font-light mb-1.5">
              Dirección Showroom Bogotá
            </label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 absolute left-3.5 top-3 text-white/40" />
              <input
                id="config-address-input"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-black border border-white/15 rounded-full pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 font-light"
                placeholder="Cra. 7 # 127 - 48, Bella Suiza / Usaquén"
                required
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              id="cancel-config-btn"
              onClick={onClose}
              className="px-4 py-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              id="save-config-btn"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium border border-white bg-white text-black hover:bg-white/90 transition-all cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span>Guardado</span>
                </>
              ) : (
                <span>Guardar Cambios</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
