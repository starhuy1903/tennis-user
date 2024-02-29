export function limitString(description: string, limit: number) {
  if (description.split(' ').length <= limit) {
    return description;
  }

  return description.split(' ').slice(0, limit).join(' ') + '...';
}
