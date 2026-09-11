import React, { useState, useMemo, useEffect } from 'react';
import { Vehicle, VehicleFilter, BusinessConfig } from './types';
import { INITIAL_VEHICLES, DEFAULT_BUSINESS_CONFIG } from './data/vehicles';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IdentityAndCardSection } from './components/IdentityAndCardSection';
import { AppointmentSchedulingSection } from './components/AppointmentSchedulingSection';
import { VehicleDetailPage } from './components/VehicleDetailPage';
import { InventoryFilterBar } from './components/InventoryFilterBar';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { PeritajeSection } from './components/PeritajeSection';
import { FinanceCalculator } from './components/FinanceCalculator';
import { SellCarSection } from './components/SellCarSection';
import { LocationAndContact } from './components/LocationAndContact';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { WhatsAppConfigModal } from './components/WhatsAppConfigModal';
import { Footer } from './components/Footer';
import { generateWhatsAppLink, formatCOP } from './utils/formatters';
import { 
  Sparkles, 
  Car, 
  ShieldCheck, 
  MessageSquare, 
  SearchX, 
  CheckCircle2, 
  BadgePercent,
  CalendarCheck,
  QrCode
} from 'lucide-react';

const INITIAL_FILTER: VehicleFilter = {
  search: '',
  brand: 'Todos',
  bodyType: 'Todos',
  fuelType: 'Todos',
  transmission: 'Todos',
  plateEvenOdd: 'all',
  minPrice: 0,
  maxPrice: 500000000,
  minYear: 2005,
  maxYear: 2026,
  sortBy: 'price-asc'
};

export default function App() {
  const [vehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [filter, setFilter] = useState<VehicleFilter>(INITIAL_FILTER);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [viewingVehiclePage, setViewingVehiclePage] = useState<Vehicle | null>(null);
  const [scheduleVehicle, setScheduleVehicle] = useState<Vehicle | null>(null);
  const [financeTargetVehicle, setFinanceTargetVehicle] = useState<Vehicle | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('inventario');

  // Load and persist business config from localStorage
  const [config, setConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem('say_autos_business_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_BUSINESS_CONFIG;
  });

  const handleSaveConfig = (newConfig: BusinessConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('say_autos_business_config', JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  // Check URL hash for dedicated vehicle pages
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#vehiculo/')) {
        const id = hash.replace('#vehiculo/', '');
        const found = vehicles.find((v) => v.id === id);
        if (found) {
          setViewingVehiclePage(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (!hash) {
        setViewingVehiclePage(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [vehicles]);

  // Open dedicated vehicle page
  const handleOpenVehicleDetail = (v: Vehicle) => {
    setViewingVehiclePage(v);
    window.location.hash = `vehiculo/${v.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close dedicated vehicle page
  const handleBackToInventory = () => {
    setViewingVehiclePage(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    if (viewingVehiclePage) {
      setViewingVehiclePage(null);
      window.location.hash = '';
    }
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTimeout(() => {
      const elem = document.getElementById(`${sectionId}-section`);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleOpenFinanceForVehicle = (vehicle: Vehicle) => {
    setFinanceTargetVehicle(vehicle);
    scrollToSection('financiacion');
  };

  const handleOpenScheduleForVehicle = (vehicle: Vehicle) => {
    setScheduleVehicle(vehicle);
    scrollToSection('citas');
  };

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Search text
        if (filter.search) {
          const q = filter.search.toLowerCase();
          const matchBrand = v.brand.toLowerCase().includes(q);
          const matchModel = v.model.toLowerCase().includes(q);
          const matchVersion = v.version.toLowerCase().includes(q);
          const matchFuel = v.fuelType.toLowerCase().includes(q);
          const matchColor = v.color.toLowerCase().includes(q);
          const matchFeatures = v.features.some((f) => f.toLowerCase().includes(q));
          if (!matchBrand && !matchModel && !matchVersion && !matchFuel && !matchColor && !matchFeatures) {
            return false;
          }
        }

        // Body type
        if (filter.bodyType !== 'Todos') {
          const bt = v.bodyType.toLowerCase();
          const target = filter.bodyType.toLowerCase();
          if (target === 'coupe' && (bt.includes('coupé') || bt.includes('coupe'))) {
            // matches Gran Coupé
          } else if (!bt.includes(target)) {
            return false;
          }
        }

        // Fuel type
        if (filter.fuelType !== 'Todos') {
          const ft = v.fuelType.toLowerCase();
          const target = filter.fuelType.toLowerCase();
          if (target === 'híbrido' && !ft.includes('híbrido') && !ft.includes('hibrido')) {
            return false;
          } else if (target === 'diésel' && !ft.includes('diésel') && !ft.includes('diesel')) {
            return false;
          } else if (target === 'gasolina' && !ft.includes('gasolina')) {
            return false;
          }
        }

        // Plate Even/Odd (Pico y Placa Bogotá)
        if (filter.plateEvenOdd === 'even' && v.plateLastDigit % 2 !== 0) {
          return false;
        }
        if (filter.plateEvenOdd === 'odd' && v.plateLastDigit % 2 === 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filter.sortBy === 'price-asc') {
          return a.priceCOP - b.priceCOP;
        }
        if (filter.sortBy === 'price-desc') {
          return b.priceCOP - a.priceCOP;
        }
        if (filter.sortBy === 'year-desc') {
          return b.year - a.year;
        }
        if (filter.sortBy === 'mileage-asc') {
          return a.mileageKm - b.mileageKm;
        }
        return 0;
      });
  }, [vehicles, filter]);

  // Quick Preset Filters
  const applyPreset = (preset: 'all' | 'hybrid' | 'under120m' | 'suvs') => {
    if (preset === 'all') {
      setFilter(INITIAL_FILTER);
    } else if (preset === 'hybrid') {
      setFilter({ ...INITIAL_FILTER, fuelType: 'Híbrido' });
    } else if (preset === 'under120m') {
      setFilter({ ...INITIAL_FILTER, sortBy: 'price-asc' });
    } else if (preset === 'suvs') {
      setFilter({ ...INITIAL_FILTER, bodyType: 'SUV' });
    }
  };

  const requestCarWhatsAppUrl = generateWhatsAppLink(
    config.whatsappNumber,
    `¡Hola ${config.advisorName}! Estoy buscando un vehículo específico que no encontré en el inventario actual: "${filter.search}". ¿Tienen alguno similar por ingresar a vitrina?`
  );

  // If viewing a Dedicated Vehicle Page with Zoom and HD Inspection:
  if (viewingVehiclePage) {
    return (
      <div className="min-h-screen bg-[#071220] text-neutral-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        <VehicleDetailPage
          vehicle={viewingVehiclePage}
          config={config}
          onBack={handleBackToInventory}
          onOpenSchedule={(v) => {
            setViewingVehiclePage(null);
            handleOpenScheduleForVehicle(v);
          }}
          onOpenFinance={(v) => {
            setViewingVehiclePage(null);
            handleOpenFinanceForVehicle(v);
          }}
        />

        <Footer
          config={config}
          onSelectTab={scrollToSection}
          onOpenConfig={() => setIsConfigModalOpen(true)}
        />

        <FloatingWhatsApp
          config={config}
          onOpenConfig={() => setIsConfigModalOpen(true)}
          onOpenCard={() => scrollToSection('tarjeta')}
        />

        <WhatsAppConfigModal
          isOpen={isConfigModalOpen}
          onClose={() => setIsConfigModalOpen(false)}
          config={config}
          onSave={handleSaveConfig}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071220] text-neutral-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation */}
      <Navbar
        config={config}
        onOpenConfig={() => setIsConfigModalOpen(true)}
        inventoryCount={vehicles.length}
        onSelectTab={scrollToSection}
        activeTab={activeTab}
      />

      {/* Hero Presentation */}
      <Hero
        config={config}
        onExploreClick={() => scrollToSection('inventario')}
        onOpenPeritaje={() => scrollToSection('peritaje')}
        onOpenFinance={() => scrollToSection('financiacion')}
        onOpenSchedule={() => scrollToSection('citas')}
        onOpenCard={() => scrollToSection('tarjeta')}
      />

      {/* Visual Identity & Physical Business Card Showcase with Exact QR */}
      <IdentityAndCardSection
        config={config}
        onOpenSchedule={() => scrollToSection('citas')}
      />

      {/* Main Inventory Section */}
      <main id="inventario-section" className="py-16 border-b border-[#dfb692]/20 flex-1 bg-[#050d18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfb692]/10 border border-[#dfb692]/30 text-[#dfb692] text-xs font-semibold mb-2">
                <Car className="w-3.5 h-3.5" />
                <span>Vitrina Bogotá • Usaquén</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-white">
                Inventario Disponible • <span className="text-[#dfb692] font-normal">Peritaje 100% Certificado</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Autos inspeccionados con hoja técnica Colserautos/Automas, libres de prendas y listos para traspaso inmediato en SIM Bogotá.
              </p>
            </div>

            {/* Quick shortcuts */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="btn-quick-filter-all"
                onClick={() => applyPreset('all')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#09182c] hover:bg-[#0f2442] border border-white/10 text-white transition-colors cursor-pointer"
              >
                Ver Todos ({vehicles.length})
              </button>
              <button
                id="btn-quick-filter-hybrid"
                onClick={() => applyPreset('hybrid')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0d2745] hover:bg-[#123660] border border-[#dfb692]/40 text-[#dfb692] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#dfb692]" />
                <span>Híbridos (Sin Pico y Placa)</span>
              </button>
              <button
                id="btn-quick-filter-suvs"
                onClick={() => applyPreset('suvs')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#09182c] hover:bg-[#0f2442] border border-white/10 text-white/80 transition-colors cursor-pointer"
              >
                SUVs Familiares
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <InventoryFilterBar
            filter={filter}
            onChangeFilter={setFilter}
            onResetFilter={() => setFilter(INITIAL_FILTER)}
            totalResults={filteredVehicles.length}
            totalVehicles={vehicles.length}
          />

          {/* Vehicle Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  config={config}
                  onSelectVehicle={handleOpenVehicleDetail}
                  onOpenFinance={handleOpenFinanceForVehicle}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-3xl bg-[#081525] border border-white/10 max-w-xl mx-auto space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#dfb692] mx-auto border border-white/10">
                <SearchX className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-light font-serif text-white">
                No encontramos vehículos con esos criterios
              </h3>
              <p className="text-xs text-white/60">
                Prueba ajustando los filtros o consúltanos directamente a WhatsApp; ingresan unidades a vitrina constantemente.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setFilter(INITIAL_FILTER)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                >
                  Restablecer Filtros
                </button>
                <a
                  href={requestCarWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] to-[#c5926b] text-[#071220] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Preguntar a Sayda por WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Appointment Scheduling System (Framed Intuitively as a VIP Invitation) */}
      <AppointmentSchedulingSection
        vehicles={vehicles}
        config={config}
        preselectedVehicle={scheduleVehicle}
      />

      {/* Peritaje Section */}
      <PeritajeSection config={config} />

      {/* Finance Calculator */}
      <FinanceCalculator
        vehicles={vehicles}
        selectedVehicle={financeTargetVehicle}
        config={config}
      />

      {/* Sell or Consign Car */}
      <SellCarSection config={config} />

      {/* Location & Showroom Contact */}
      <LocationAndContact config={config} />

      {/* Footer */}
      <Footer
        config={config}
        onSelectTab={scrollToSection}
        onOpenConfig={() => setIsConfigModalOpen(true)}
      />

      {/* Floating WhatsApp Action Widget */}
      <FloatingWhatsApp
        config={config}
        onOpenConfig={() => setIsConfigModalOpen(true)}
        onOpenCard={() => scrollToSection('tarjeta')}
      />

      {/* Vehicle Detail & Peritaje Modal (Fallback / Direct Quick View) */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        config={config}
        onClose={() => setSelectedVehicle(null)}
        onOpenFinance={handleOpenFinanceForVehicle}
      />

      {/* WhatsApp & Business Contact Config Modal */}
      <WhatsAppConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
