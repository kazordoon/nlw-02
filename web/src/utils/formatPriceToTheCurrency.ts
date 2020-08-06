function formatPriceToTheCurrency(price: number, currency = 'BRL') {
  const formattedPrice = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(price);

  return formattedPrice;
}

export default formatPriceToTheCurrency;
