import React, { useState } from 'react';
import { BusinessConfig } from '../types';
import { SayAutosLogo } from './SayAutosLogo';
import { generateWhatsAppLink, getInstagramUrl } from '../utils/formatters';
import { 
  ShieldCheck, 
  MessageSquare, 
  Instagram, 
  Phone, 
  Settings, 
  Menu, 
  X, 
  Car, 
  MapPin, 
  Calculator,
  CalendarCheck,
  QrCode,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  config: BusinessConfig;
  onOpenConfig: () => void;
  inventoryCount: number;
  onSelectTab: (tabId: string) => void;
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onOpenConfig,
  inventoryCount,
  onSelectTab,
  activeTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  const navWhatsAppUrl = generateWhatsAppLink(
    config.whatsappNumber,
    `¡Hola ${config.advisorName}! Deseo recibir información sobre los vehículos disponibles en SAY Autos Bogotá y agendar una prueba de ruta.`
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#dfb692]/20 bg-[#071220]/95 backdrop-blur-md">
      {/* Top micro bar with city badge & hours */}
      <div className="hidden md:flex items-center justify-between px-8 py-2 text-[11px] uppercase tracking-[0.15em] text-white/50 border-b border-[#dfb692]/10 bg-[#050d18]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-white/70">
            <MapPin className="w-3.5 h-3.5 text-[#dfb692]" />
            <span>Showroom Bogotá • Usaquén (Cra 7 # 127)</span>
          </span>
          <span className="text-[#dfb692]/30">|</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {config.advisorName} ({config.advisorRole || 'Gerente de Ventas'})
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/60">{config.scheduleWeekdays}</span>
          <span className="text-[#dfb692]/30">|</span>
          <button
            id="nav-edit-contact-settings-btn"
            onClick={onOpenConfig}
            className="flex items-center gap-1 text-[#dfb692] hover:text-white transition-colors cursor-pointer text-[10px] tracking-[0.2em]"
            title="Editar teléfono de WhatsApp o datos de contacto"
          >
            <Settings className="w-3 h-3 text-[#dfb692]/70" />
            <span>WhatsApp {config.whatsappDisplay}</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo matching the card emblem */}
        <div 
          id="navbar-brand-logo"
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <SayAutosLogo size="sm" showSubtitle={true} />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] font-medium text-white/70">
          <button
            id="nav-item-inventory"
            onClick={() => handleNavClick('inventario')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'inventario' ? 'text-[#dfb692] border-b-2 border-[#dfb692] pb-1' : 'hover:text-white'
            }`}
          >
            Vitrina ({inventoryCount})
          </button>
          <button
            id="nav-item-tarjeta"
            onClick={() => handleNavClick('tarjeta')}
            className={`transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === 'tarjeta' ? 'text-[#dfb692] border-b-2 border-[#dfb692] pb-1' : 'hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-[#dfb692]" />
            <span>Tarjeta VIP & QR</span>
          </button>
          <button
            id="nav-item-citas"
            onClick={() => handleNavClick('citas')}
            className={`transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === 'citas' ? 'text-[#dfb692] border-b-2 border-[#dfb692] pb-1' : 'hover:text-white'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5 text-[#dfb692]" />
            <span>Agendar Cita</span>
          </button>
          <button
            id="nav-item-peritaje"
            onClick={() => handleNavClick('peritaje')}
            className={`transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === 'peritaje' ? 'text-[#dfb692] border-b-2 border-[#dfb692] pb-1' : 'hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Peritaje</span>
          </button>
          <button
            id="nav-item-finanzas"
            onClick={() => handleNavClick('financiacion')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'financiacion' ? 'text-[#dfb692] border-b-2 border-[#dfb692] pb-1' : 'hover:text-white'
            }`}
          >
            Financiación
          </button>
          <button
            id="nav-item-contacto"
            onClick={() => handleNavClick('contacto')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'contacto' ? 'text-[#dfb692] border-b-2 border-[#dfb692] pb-1' : 'hover:text-white'
            }`}
          >
            Showroom
          </button>
        </nav>

        {/* Action Buttons: WhatsApp & Instagram */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            id="nav-instagram-link"
            href={getInstagramUrl(config.instagramHandle)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#dfb692]/30 flex items-center justify-center text-[#dfb692] hover:text-white hover:border-[#dfb692] transition-all bg-[#0b1b30]"
            title={`Instagram @${config.instagramHandle}`}
          >
            <Instagram className="w-4 h-4" />
          </a>

          <a
            id="nav-whatsapp-cta-btn"
            href={navWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-[#dfb692] bg-gradient-to-r from-[#dfb692] via-[#f3d5bd] to-[#c5926b] text-[#071220] font-medium text-[11px] uppercase tracking-[0.15em] flex items-center gap-2 hover:brightness-105 transition-all shadow-md shadow-[#dfb692]/20 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp {config.whatsappDisplay}</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            id="mobile-nav-whatsapp-btn"
            href={navWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-[#dfb692]/40 bg-[#dfb692]/10 text-[#dfb692]"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-white/70 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="sm:hidden border-t border-[#dfb692]/20 bg-[#071220] px-6 py-6 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#dfb692]/15 text-[10px] uppercase tracking-widest text-white/50">
            <span>Usaquén, Bogotá • {config.advisorName}</span>
            <button
              id="mobile-config-settings-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfig();
              }}
              className="text-[#dfb692] hover:underline flex items-center gap-1"
            >
              <Settings className="w-3 h-3" />
              <span>Configurar</span>
            </button>
          </div>

          <button
            onClick={() => handleNavClick('inventario')}
            className="w-full text-left py-2 text-xs uppercase tracking-[0.2em] text-white flex items-center justify-between"
          >
            <span>Vitrina de Vehículos</span>
            <span className="text-[10px] border border-[#dfb692]/40 text-[#dfb692] px-2 py-0.5 rounded-full">
              {inventoryCount} autos
            </span>
          </button>
          <button
            onClick={() => handleNavClick('tarjeta')}
            className="w-full text-left py-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white flex items-center gap-2"
          >
            <QrCode className="w-3.5 h-3.5 text-[#dfb692]" />
            <span>Tarjeta Digital & QR</span>
          </button>
          <button
            onClick={() => handleNavClick('citas')}
            className="w-full text-left py-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white flex items-center gap-2"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-[#dfb692]" />
            <span>Agendar Cita VIP</span>
          </button>
          <button
            onClick={() => handleNavClick('peritaje')}
            className="w-full text-left py-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white flex items-center gap-2"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Peritaje & Certificación</span>
          </button>
          <button
            onClick={() => handleNavClick('financiacion')}
            className="w-full text-left py-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white flex items-center gap-2"
          >
            <Calculator className="w-3.5 h-3.5 text-white/50" />
            <span>Simulador de Crédito</span>
          </button>
          <button
            onClick={() => handleNavClick('contacto')}
            className="w-full text-left py-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white flex items-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5 text-white/50" />
            <span>Showroom Bogotá</span>
          </button>

          <div className="pt-4 border-t border-[#dfb692]/20 flex gap-3">
            <a
              href={navWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-[#dfb692] bg-gradient-to-r from-[#dfb692] to-[#c5926b] text-[#071220] font-medium text-[11px] uppercase tracking-[0.18em]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Directo</span>
            </a>
            <a
              href={getInstagramUrl(config.instagramHandle)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full border border-[#dfb692]/30 bg-[#09192c] text-[#dfb692] text-[11px] uppercase tracking-[0.2em] flex items-center justify-center"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
