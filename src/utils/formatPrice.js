export const formatPrice = number => {
  const formatNumber = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);

  return formatNumber;
};
