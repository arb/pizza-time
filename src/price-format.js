export default (price) => {
  if (typeof price === 'number') {
    const sign = price < 0 ? '-' : '';
    return `${sign}$${(Math.abs(price).toFixed(2))}`;
  } else {
    return '$0.00';
  }
}
