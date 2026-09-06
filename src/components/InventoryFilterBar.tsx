import React from 'react';
import { VehicleFilter } from '../types';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';

interface InventoryFilterBarProps {
  filter: VehicleFilter;
  onChangeFilter: (newFilter: VehicleFilter) => void;
  onResetFilter: () => void;
  totalResults: number;
  totalVehicles: number;
}

const BODY_TYPES = ['Todos', 'SUV', 'Sedán', 'Hatchback', 'Pickup'];
const FUEL_TYPES = ['Todos', 'Gasolina', 'Híbrido', 'Diésel'];

export const InventoryFilterBar: React.FC<InventoryFilterBarProps> = ({
  filter,
  onChangeFilter,
  onResetFilter,
  totalResults,
  totalVehicles
}) => {
  const isFiltered = 
    filter.search !== '' ||
    filter.bodyType !== 'Todos' ||
    filter.fuelType !== 'Todos' ||
    filter.plateEvenOdd !== 'all' ||
    filter.sortBy !== 'price-asc';

  return (
    <div id="inventory-filter-bar" className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 mb-8 space-y-5">
      {/* Search and Sort row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-3 text-white/40" />
          <input
            id="inventory-search-input"
            type="text"
            value={filter.search}
            onChange={(e) => onChangeFilter({ ...filter, search: e.target.value })}
            placeholder="Buscar por marca, modelo, versión (ej: CX-30, Fortuner, BMW, Híbrido)..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-light transition-colors"
          />
          {filter.search && (
            <button
              onClick={() => onChangeFilter({ ...filter, search: '' })}
              className="absolute right-4 top-3 text-white/40 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] uppercase tracking-widest text-white/40 hidden sm:inline">Ordenar:</span>
          <select
            id="inventory-sort-select"
            value={filter.sortBy}
            onChange={(e) => onChangeFilter({ ...filter, sortBy: e.target.value as VehicleFilter['sortBy'] })}
            className="bg-black border border-white/20 rounded-full px-4 py-2 text-xs font-light text-white focus:outline-none focus:border-white/40 cursor-pointer"
          >
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="year-desc">Año: Más reciente</option>
            <option value="mileage-asc">Kilometraje: Menor a Mayor</option>
          </select>
        </div>
      </div>

      {/* Body Types and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
        {/* Body Type Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-white/40 mr-1 hidden sm:inline">Carrocería:</span>
          {BODY_TYPES.map((type) => (
            <button
              key={type}
              id={`filter-body-${type.toLowerCase()}`}
              onClick={() => onChangeFilter({ ...filter, bodyType: type })}
              className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                filter.bodyType === type
                  ? 'border border-white bg-white text-black font-medium shadow-sm'
                  : 'border border-white/10 bg-white/[0.02] hover:border-white/30 text-white/60 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Fuel Type Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-white/40 mr-1 hidden sm:inline">Motor:</span>
          {FUEL_TYPES.map((fuel) => (
            <button
              key={fuel}
              id={`filter-fuel-${fuel.toLowerCase()}`}
              onClick={() => onChangeFilter({ ...filter, fuelType: fuel })}
              className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                filter.fuelType === fuel
                  ? 'border border-white bg-white text-black font-medium shadow-sm'
                  : 'border border-white/10 bg-white/[0.02] hover:border-white/30 text-white/60 hover:text-white'
              }`}
            >
              {fuel}
            </button>
          ))}
        </div>

        {/* Pico y Placa filter for Bogotá */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-white/40 hidden sm:inline">Pico y Placa:</span>
          <select
            id="filter-pico-placa-select"
            value={filter.plateEvenOdd}
            onChange={(e) => onChangeFilter({ ...filter, plateEvenOdd: e.target.value as 'all' | 'even' | 'odd' })}
            className="bg-black border border-white/20 rounded-full px-3.5 py-1.5 text-xs text-white/80 focus:outline-none focus:border-white/40 cursor-pointer"
          >
            <option value="all">Todas las placas</option>
            <option value="even">Pares (0,2,4,6,8)</option>
            <option value="odd">Impares (1,3,5,7,9)</option>
          </select>
        </div>
      </div>

      {/* Results Bar */}
      <div className="flex items-center justify-between text-[11px] text-white/40 pt-1 font-light">
        <span>
          Mostrando <strong className="text-white font-normal">{totalResults}</strong> de {totalVehicles} vehículos verificados en Bogotá
        </span>
        {isFiltered && (
          <button
            id="reset-filters-btn"
            onClick={onResetFilter}
            className="text-white hover:underline text-[10px] uppercase tracking-widest cursor-pointer flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Limpiar filtros</span>
          </button>
        )}
      </div>
    </div>
  );
};
