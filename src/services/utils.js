export function formatNumber(num) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'b';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

export function getPassDateByYear(year) {
  const today = new Date();
  const thirteenYearsAgo = new Date(today);
  thirteenYearsAgo.setFullYear(today.getFullYear() - year);
  const formatted = thirteenYearsAgo.toISOString().split('T')[0];
  return formatted;
}

export function formatEstimatedTime(value) {
  try {
    const arr = value.split(',');
    return `${arr[0]} Day ${arr[1]} Night`
  } catch {
    return ''
  }
}
export function formatDate(raw) {
    try {
        return new Date(raw).toISOString().split('T')[0];
    } catch {
        return new Date().toISOString().split('T')[0];
    }
}