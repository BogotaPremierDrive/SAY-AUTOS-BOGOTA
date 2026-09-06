export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatShortCOP(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(0)}M COP`;
  }
  return formatCOP(amount);
}

export function formatKm(km: number): string {
  return `${new Intl.NumberFormat('es-CO').format(km)} km`;
}

export function generateWhatsAppLink(phoneNumber: string, message: string): string {
  // Clean phone number of any non-digit chars
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function getInstagramUrl(handle: string): string {
  const cleanHandle = handle.replace('@', '').trim();
  return `https://instagram.com/${cleanHandle}`;
}

export function calculateMonthlyPayment(
  vehiclePrice: number,
  downPaymentPercent: number,
  termMonths: number,
  monthlyInterestRatePercent: number = 1.35
): {
  downPaymentAmount: number;
  financedAmount: number;
  monthlyPayment: number;
} {
  const downPaymentAmount = Math.round(vehiclePrice * (downPaymentPercent / 100));
  const financedAmount = vehiclePrice - downPaymentAmount;

  if (financedAmount <= 0) {
    return { downPaymentAmount, financedAmount: 0, monthlyPayment: 0 };
  }

  const r = monthlyInterestRatePercent / 100;
  const n = termMonths;
  // Formula: P * [ r(1+r)^n ] / [ (1+r)^n - 1 ]
  const monthlyPayment = Math.round(
    financedAmount * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
  );

  return {
    downPaymentAmount,
    financedAmount,
    monthlyPayment
  };
}
