import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Vehicle, BusinessConfig, AppointmentRequest } from '../types';
import { SayAutosLogo } from './SayAutosLogo';
import { formatCOP } from '../utils/formatters';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Car, 
  ShieldCheck, 
  Handshake, 
  BadgePercent, 
  Check, 
  Sparkles, 
  MapPin, 
  Download, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  CalendarCheck,
  Send,
  Share2,
  Lock
} from 'lucide-react';

interface AppointmentSchedulingProps {
  vehicles: Vehicle[];
  config: BusinessConfig;
  preselectedVehicle?: Vehicle | null;
  onVehicleSelected?: (vehicle: Vehicle) => void;
}

export const AppointmentSchedulingSection: React.FC<AppointmentSchedulingProps> = ({
  vehicles,
  config,
  preselectedVehicle
}) => {
  const [step, setStep] = useState<number>(1);
  const [serviceType, setServiceType] = useState<'test_drive' | 'peritaje' | 'retoma' | 'financiacion'>('test_drive');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(preselectedVehicle?.id || 'general');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM');
  
  // Guest Information
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Generated Invitation state
  const [confirmedInvitation, setConfirmedInvitation] = useState<AppointmentRequest | null>(null);
  const [invitationQrUrl, setInvitationQrUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync preselected vehicle if provided
  useEffect(() => {
    if (preselectedVehicle) {
      setSelectedVehicleId(preselectedVehicle.id);
    }
  }, [preselectedVehicle]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setSelectedDate(dateStr);
  }, []);

  const services = [
    {
      id: 'test_drive' as const,
      title: 'Prueba de Ruta VIP (Test Drive)',
      subtitle: 'Conducción en ruta norte de Bogotá y evaluación dinámica',
      icon: Car,
      duration: '45 minutos',
      includes: 'Combustible, acompañamiento técnico y ruta en autopista/cerros'
    },
    {
      id: 'peritaje' as const,
      title: 'Peritaje Técnico Presencial Acompañado',
      subtitle: 'Revisión en rampa con escáner OBD2 y medidor electromagnético',
      icon: ShieldCheck,
      duration: '60 minutos',
      includes: 'Certificación Colserautos/Automas y diagnóstico legal RUNT'
    },
    {
      id: 'retoma' as const,
      title: 'Avalúo de Retoma o Consignación',
      subtitle: 'Inspección comercial para recibir tu vehículo como parte de pago',
      icon: Handshake,
      duration: '30 minutos',
      includes: 'Oferta económica en firme y liquidación de diferencia'
    },
    {
      id: 'financiacion' as const,
      title: 'Asesoría Financiera y de Crédito',
      subtitle: 'Estructuración personalizada con bancos aliados (Banco de Bogotá, BBVA, Sufi)',
      icon: BadgePercent,
      duration: '30 minutos',
      includes: 'Pre-aprobación en línea y cálculo de cuotas a medida'
    }
  ];

  const timeSlots = [
    { label: '09:00 AM', period: 'Mañana' },
    { label: '10:30 AM', period: 'Mañana' },
    { label: '11:45 AM', period: 'Mañana' },
    { label: '02:00 PM', period: 'Tarde' },
    { label: '03:30 PM', period: 'Tarde' },
    { label: '05:00 PM', period: 'Tarde' }
  ];

  // Helper to get selected vehicle object
  const chosenVehicle = vehicles.find((v) => v.id === selectedVehicleId);
  const chosenService = services.find((s) => s.id === serviceType)!;

  // Handle Invitation Generation
  const handleGenerateInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    setIsSubmitting(true);

    const randomCode = `VIP-SAY-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInvitation: AppointmentRequest = {
      id: `apt-${Date.now()}`,
      invitationCode: randomCode,
      serviceType: serviceType,
      serviceTitle: chosenService.title,
      vehicleId: selectedVehicleId,
      vehicleName: chosenVehicle ? `${chosenVehicle.brand} ${chosenVehicle.model} ${chosenVehicle.year}` : 'Asesoría General Showroom',
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      status: 'Confirmada'
    };

    // Save to LocalStorage for Admin Notifications/Records
    try {
      const existing = localStorage.getItem('say_autos_appointments');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newInvitation);
      localStorage.setItem('say_autos_appointments', JSON.stringify(list));
    } catch {
      // ignore
    }

    // Generate Invitation QR Code
    const qrPayload = `SAY AUTOS VIP PASS: ${randomCode} | Invitado: ${newInvitation.customerName} | Servicio: ${newInvitation.serviceTitle} | Fecha: ${newInvitation.date} ${newInvitation.timeSlot} | Showroom Usaquén Bogotá`;
    QRCode.toDataURL(qrPayload, {
      width: 300,
      margin: 1,
      color: {
        dark: '#dfb692',
        light: '#071220'
      }
    }).then((url) => {
      setInvitationQrUrl(url);
    });

    setConfirmedInvitation(newInvitation);
    setIsSubmitting(false);
    setStep(5);
  };

  // Build WhatsApp Admin Notification link to Sayda Riscanevo
  const getAdminWhatsAppNotifyUrl = (invitation: AppointmentRequest) => {
    const text = `¡Hola ${config.advisorName}! 🌟 Acabo de generar mi INVITACIÓN VIP para cita en SAY Autos Bogotá:\n\n` +
      `🔖 *Código de Pase:* ${invitation.invitationCode}\n` +
      `👤 *Invitado:* ${invitation.customerName}\n` +
      `📱 *Teléfono:* ${invitation.customerPhone}\n` +
      `🏎️ *Servicio:* ${invitation.serviceTitle}\n` +
      `🚘 *Vehículo:* ${invitation.vehicleName}\n` +
      `📅 *Fecha:* ${invitation.date}\n` +
      `⏰ *Horario:* ${invitation.timeSlot}\n` +
      (invitation.notes ? `📝 *Nota:* ${invitation.notes}\n\n` : '\n') +
      `Quedo atento a la confirmación en showroom de Usaquén. ¡Muchas gracias!`;

    return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  // Add to Google Calendar Link
  const getGoogleCalendarUrl = (invitation: AppointmentRequest) => {
    const startDateTime = `${invitation.date.replace(/-/g, '')}T150000Z`;
    const endDateTime = `${invitation.date.replace(/-/g, '')}T160000Z`;
    const title = encodeURIComponent(`Cita VIP SAY Autos Bogotá: ${invitation.serviceTitle}`);
    const details = encodeURIComponent(
      `Pase de Invitación ${invitation.invitationCode}.\nAtiende: Sayda Riscanevo (Gerente de Ventas Especializadas).\nVehículo: ${invitation.vehicleName}.\nTeléfono showroom: +57 318 2363018`
    );
    const location = encodeURIComponent(`${config.address}, Bogotá, Colombia`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateTime}/${endDateTime}&details=${details}&location=${location}`;
  };

  return (
    <section id="citas-section" className="py-20 bg-gradient-to-b from-[#050c17] via-[#081424] to-[#050c17] text-white relative overflow-hidden border-b border-[#dfb692]/20">
      {/* Background Art Deco Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#dfb692]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#dfb692]/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#dfb692]/10 border border-[#dfb692]/40 text-[#dfb692] text-xs uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atención Privada Showroom</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif tracking-tight text-white">
            Invitación de Honor • <span className="text-[#dfb692] font-normal">Agenda tu Cita</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light mt-2 leading-relaxed">
            Una experiencia privada y confidencial en nuestra vitrina de Usaquén. Reserva tu prueba de ruta, peritaje acompañado o avalúo con Sayda Riscanevo.
          </p>
        </div>

        {/* Multi-step Invitation Builder */}
        {!confirmedInvitation ? (
          <div className="rounded-3xl bg-[#08162a] border border-[#dfb692]/30 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
            {/* Step Indicator Bar */}
            <div className="flex items-center justify-between border-b border-[#dfb692]/20 pb-6 mb-8">
              {[
                { num: 1, label: 'Servicio' },
                { num: 2, label: 'Vehículo' },
                { num: 3, label: 'Fecha y Hora' },
                { num: 4, label: 'Tus Datos' }
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold font-mono transition-all ${
                      step === s.num
                        ? 'bg-gradient-to-r from-[#dfb692] to-[#c5926b] text-[#071220] shadow-md shadow-[#dfb692]/30 scale-110'
                        : step > s.num
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40'
                        : 'bg-white/5 text-white/40 border border-white/10'
                    }`}
                  >
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`hidden sm:inline text-xs uppercase tracking-wider font-light ${
                      step === s.num ? 'text-[#dfb692] font-medium' : 'text-white/40'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP 1: Select Service */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-light font-serif text-white mb-1">
                    1. Selecciona el Tipo de Experiencia
                  </h3>
                  <p className="text-xs text-white/50">
                    Elige el servicio especializado que deseas realizar en el showroom o en ruta de prueba.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((srv) => {
                    const Icon = srv.icon;
                    const isSelected = serviceType === srv.id;
                    return (
                      <div
                        key={srv.id}
                        id={`service-card-${srv.id}`}
                        onClick={() => setServiceType(srv.id)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#0f233f] border-[#dfb692] shadow-[0_0_20px_rgba(223,182,146,0.15)] ring-1 ring-[#dfb692]'
                            : 'bg-[#060f1c] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start gap-3.5 mb-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-[#dfb692] text-[#071220]'
                                : 'bg-white/5 text-[#dfb692] border border-white/10'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white">{srv.title}</h4>
                            <p className="text-xs text-white/60 mt-0.5">{srv.subtitle}</p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#dfb692]" />
                            {srv.duration}
                          </span>
                          <span className="text-[#dfb692]/90 italic">{srv.includes}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    id="step1-next-btn"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] to-[#c5926b] text-[#071220] font-medium text-xs uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-[#dfb692]/20 hover:brightness-105 transition-all cursor-pointer"
                  >
                    <span>Continuar al Vehículo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Select Vehicle */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-light font-serif text-white mb-1">
                    2. ¿Qué Vehículo Deseas Conocer?
                  </h3>
                  <p className="text-xs text-white/50">
                    Puedes elegir un vehículo puntual de la vitrina actual o agendar una asesoría de compra general.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* General Showroom Option */}
                  <div
                    onClick={() => setSelectedVehicleId('general')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      selectedVehicleId === 'general'
                        ? 'bg-[#0f233f] border-[#dfb692] ring-1 ring-[#dfb692]'
                        : 'bg-[#060f1c] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#dfb692]/10 border border-[#dfb692]/30 flex items-center justify-center text-[#dfb692] shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Visita General / Por Definir</div>
                      <div className="text-[11px] text-white/50">Asesoría abierta en sala</div>
                    </div>
                  </div>

                  {/* Specific Vehicles from showroom */}
                  {vehicles.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                        selectedVehicleId === v.id
                          ? 'bg-[#0f233f] border-[#dfb692] ring-1 ring-[#dfb692]'
                          : 'bg-[#060f1c] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <img
                        src={v.images[0]}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold text-white truncate">
                          {v.brand} {v.model} ({v.year})
                        </div>
                        <div className="text-[11px] text-[#dfb692] font-mono">
                          {formatCOP(v.priceCOP)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white/70 text-xs tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Atrás</span>
                  </button>

                  <button
                    id="step2-next-btn"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] to-[#c5926b] text-[#071220] font-medium text-xs uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-[#dfb692]/20 hover:brightness-105 transition-all cursor-pointer"
                  >
                    <span>Continuar al Horario</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Choose Date and Time */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-light font-serif text-white mb-1">
                    3. Selecciona la Fecha y Hora de tu Visita
                  </h3>
                  <p className="text-xs text-white/50">
                    Atención exclusiva con aforo limitado para garantizar privacidad en el showroom.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div className="p-5 rounded-2xl bg-[#060f1c] border border-white/10 space-y-3">
                    <label className="block text-xs uppercase tracking-widest text-[#dfb692] font-medium flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Fecha deseada</span>
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-[#09172a] border border-[#dfb692]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#dfb692]"
                    />
                    <p className="text-[11px] text-white/40">
                      Showroom abierto Lunes a Sábado de 8:30 AM a 6:30 PM. Domingos 10:00 AM a 3:00 PM.
                    </p>
                  </div>

                  {/* Time Slots */}
                  <div className="p-5 rounded-2xl bg-[#060f1c] border border-white/10 space-y-3">
                    <label className="block text-xs uppercase tracking-widest text-[#dfb692] font-medium flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>Horario disponible</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.label}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.label)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer ${
                            selectedTimeSlot === slot.label
                              ? 'bg-[#dfb692] text-[#071220] border-[#dfb692] shadow-md'
                              : 'bg-[#09172a] border-white/10 text-white/70 hover:border-white/30'
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white/70 text-xs tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Atrás</span>
                  </button>

                  <button
                    id="step3-next-btn"
                    onClick={() => setStep(4)}
                    className="px-6 py-3 rounded-xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] to-[#c5926b] text-[#071220] font-medium text-xs uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-[#dfb692]/20 hover:brightness-105 transition-all cursor-pointer"
                  >
                    <span>Completar Datos</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Guest Contact Information */}
            {step === 4 && (
              <form onSubmit={handleGenerateInvitation} className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-light font-serif text-white mb-1">
                    4. Datos para Personalizar tu Invitación
                  </h3>
                  <p className="text-xs text-white/50">
                    Generaremos tu pase de acceso VIP y notificaremos a Sayda Riscanevo para recibirte.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-white/70 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#dfb692]" />
                      <span>Nombre y Apellido *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Méndez"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#060f1c] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfb692]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-white/70 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#dfb692]" />
                      <span>Número de WhatsApp / Teléfono *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 310 123 4567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#060f1c] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfb692]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-white/70 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#dfb692]" />
                      <span>Correo Electrónico (Opcional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="carlos@ejemplo.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#060f1c] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfb692]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-white/70 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#dfb692]" />
                      <span>Sede Showroom</span>
                    </label>
                    <div className="w-full bg-[#060f1c] border border-white/10 rounded-xl px-4 py-3 text-xs text-white/70 flex items-center justify-between">
                      <span>{config.address}</span>
                      <span className="text-[#dfb692] font-mono text-[10px]">Usaquén</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-white/70">
                    Comentarios o Requerimientos Especiales (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="¿Deseas evaluar tu vehículo actual en retoma o solicitar un plan de crédito específico?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#060f1c] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfb692]"
                  />
                </div>

                {/* Summary Box */}
                <div className="p-4 rounded-xl bg-[#060e1b] border border-[#dfb692]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-white/80">
                    <Sparkles className="w-4 h-4 text-[#dfb692]" />
                    <span>
                      {chosenService.title} • {chosenVehicle ? `${chosenVehicle.brand} ${chosenVehicle.model}` : 'Visita General'}
                    </span>
                  </div>
                  <div className="text-[#dfb692] font-mono">
                    {selectedDate} a las {selectedTimeSlot}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white/70 text-xs tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Atrás</span>
                  </button>

                  <button
                    id="submit-generate-invitation-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-3 rounded-xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] via-[#f3d5bd] to-[#c5926b] text-[#071220] font-semibold text-xs uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl shadow-[#dfb692]/20 hover:brightness-105 transition-all cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>{isSubmitting ? 'Generando Pase...' : 'Generar Pase de Invitación VIP'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* STEP 5: Formal VIP Invitation Pass Display & Admin Notification */
          <div className="max-w-2xl mx-auto space-y-6">
            {/* VIP Pass Card in Midnight Navy and Rose Gold */}
            <div className="rounded-3xl p-6 sm:p-9 bg-gradient-to-b from-[#0d1e34] via-[#091526] to-[#050c18] border-2 border-[#dfb692] shadow-2xl relative overflow-hidden">
              {/* Art Deco Geometric Corner Lines */}
              <div className="absolute inset-2 border border-[#dfb692]/40 rounded-2xl pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#dfb692]"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#dfb692]"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#dfb692]"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#dfb692]"></div>
              </div>

              {/* Pass Header */}
              <div className="relative z-10 flex flex-col items-center text-center border-b border-[#dfb692]/30 pb-5 mb-5">
                <SayAutosLogo size="md" showSubtitle={true} />
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfb692]/10 border border-[#dfb692]/30 text-[#dfb692] text-[10px] uppercase tracking-[0.25em] font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>Pase de Invitación Exclusivo</span>
                </div>
                <span className="font-mono text-xs text-white/50 mt-1">
                  Código: <strong className="text-white">{confirmedInvitation.invitationCode}</strong>
                </span>
              </div>

              {/* Pass Body */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-5 items-center my-4">
                {/* QR Code */}
                <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#060e1c] border border-[#dfb692]/30">
                  {invitationQrUrl ? (
                    <img
                      src={invitationQrUrl}
                      alt="Pase VIP"
                      className="w-32 h-32 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-neutral-900 rounded-lg animate-pulse" />
                  )}
                  <span className="text-[9px] uppercase tracking-widest text-[#dfb692] mt-1">
                    Validación Showroom
                  </span>
                </div>

                {/* Details */}
                <div className="sm:col-span-2 space-y-2.5 text-left">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block">
                      Invitado(a) de Honor:
                    </span>
                    <span className="text-base sm:text-lg font-serif font-light text-white">
                      {confirmedInvitation.customerName}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block">
                      Experiencia Agendada:
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#dfb692]">
                      {confirmedInvitation.serviceTitle}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 block">Fecha:</span>
                      <span className="text-white font-mono">{confirmedInvitation.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 block">Horario:</span>
                      <span className="text-white font-mono">{confirmedInvitation.timeSlot}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block">Vehículo:</span>
                    <span className="text-xs text-white/80 truncate block">
                      {confirmedInvitation.vehicleName}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#dfb692]/20 flex items-center justify-between text-[11px] text-white/60">
                    <span>Especialista asignada:</span>
                    <span className="text-[#dfb692] font-semibold">{config.advisorName}</span>
                  </div>
                </div>
              </div>

              {/* Pass Footer */}
              <div className="relative z-10 pt-4 border-t border-[#dfb692]/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/50 text-center sm:text-left">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#dfb692]" />
                  {config.address} • Bogotá
                </span>
                <span>Tel: {config.phoneCall}</span>
              </div>
            </div>

            {/* Admin Notification & Follow-up Actions */}
            <div className="space-y-3">
              {/* Send Notification to Admin via WhatsApp */}
              <a
                id="btn-notify-admin-whatsapp"
                href={getAdminWhatsAppNotifyUrl(confirmedInvitation)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl border border-[#dfb692] bg-gradient-to-r from-[#dfb692] via-[#f3d5bd] to-[#c5926b] text-[#071220] font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-[#dfb692]/20 hover:brightness-105 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Notificar y Confirmar con Sayda por WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getGoogleCalendarUrl(confirmedInvitation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl border border-[#dfb692]/40 bg-[#09182c] hover:bg-[#0f2442] text-white text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#dfb692]" />
                  <span>Guardar en Google Calendar</span>
                </a>

                <button
                  onClick={() => {
                    setConfirmedInvitation(null);
                    setStep(1);
                  }}
                  className="py-2.5 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-white/70 text-xs text-center transition-colors cursor-pointer"
                >
                  <span>Agendar Otra Cita</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
