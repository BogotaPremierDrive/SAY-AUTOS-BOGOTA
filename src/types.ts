export type VehicleStatus = 'Disponible' | 'Apartado' | 'Vendido';

export type BodyType = string;

export type FuelType = string;

export type TransmissionType = string;

export interface PeritajeDetails {
  score: number; // 0-100
  inspectorEntity: string;
  inspectionDate: string;
  chassisAndStructure: string;
  chassisStatus: 'Excelente' | 'Bueno' | 'Observación';
  engineAndTransmission: string;
  engineStatus: 'Excelente' | 'Bueno' | 'Observación';
  paintAndBodywork: string;
  paintMicronsRange: string;
  tiresStatus: string;
  tiresPercentage: number;
  legalStatus: string;
  runtSimitVerified: boolean;
  claimsHistory: string; // '0 siniestros / 100% asegurable'
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  priceCOP: number;
  originalPriceCOP?: number;
  mileageKm: number;
  transmission: TransmissionType;
  fuelType: FuelType;
  engineDisplacement: string;
  bodyType: BodyType;
  traction: string;
  color: string;
  plateCity: string;
  plateLastDigit: number;
  ownersCount: number;
  soatValidUntil: string;
  rtmValidUntil: string;
  features: string[];
  documentEquipment?: string;
  peritaje: PeritajeDetails;
  images: string[];
  status: VehicleStatus;
  isFeatured?: boolean;
  description?: string;
  publicationUrl?: string;
  location: string;
  verifiedBadge?: boolean;
}

export interface AppointmentRequest {
  id: string;
  invitationCode: string;
  serviceType: 'test_drive' | 'peritaje' | 'retoma' | 'financiacion';
  serviceTitle: string;
  vehicleId?: string;
  vehicleName?: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  createdAt: string;
  status: 'Confirmada' | 'Pendiente' | 'Completada';
}

export interface VehicleFilter {
  search: string;
  brand: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  plateEvenOdd: 'all' | 'even' | 'odd';
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  sortBy: 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc';
}

export interface BusinessConfig {
  whatsappNumber: string; // international digits e.g. "573182363018"
  whatsappDisplay: string; // formatted e.g. "+57 318 2363018"
  instagramHandle: string; // e.g. "say_autosbogota"
  advisorName: string; // "Sayda Riscanevo"
  advisorRole: string; // "Gerente de Ventas Especializadas"
  phoneCall: string;
  address: string;
  city: string;
  neighborhood: string;
  scheduleWeekdays: string;
  scheduleWeekend: string;
}
