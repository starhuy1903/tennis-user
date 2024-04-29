export function limitString(description: string, limit: number) {
  if (description.split(' ').length <= limit) {
    return description;
  }

  return description.split(' ').slice(0, limit).join(' ') + '...';
}

export function displayCurrency(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
}
