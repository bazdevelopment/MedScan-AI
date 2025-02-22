export function calculateAnnualDiscount(
  monthlyPrice: number,
  annualPrice: number,
): string {
  const fullYearPrice = monthlyPrice * 12; // Price without discount
  const discount = ((fullYearPrice - annualPrice) / fullYearPrice) * 100; // Discount percentage
  return `${discount.toFixed(0)}%`; // Format as a string with "%" and no decimals
}
