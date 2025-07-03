// Formats a number as a price string, e.g., 1234.5 -> '$1,234.50'
export function formatPrice(amount) {
  if (isNaN(amount)) return '-';
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
} 