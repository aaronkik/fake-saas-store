const GBPCurrencyFormat = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

export const formatValueToGBP = (
  value: Parameters<Intl.NumberFormat['format']>[0]
) => GBPCurrencyFormat.format(value);
