function formatPriceForTheBRLCurrency(price: number) {
  const symbol = 'R$';
  const priceWithComma = price.toFixed(2).replace('.', ',');
  const formattedPrice = `${symbol} ${priceWithComma}`;
  return formattedPrice;
}

export default formatPriceForTheBRLCurrency;
