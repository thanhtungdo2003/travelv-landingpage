export let endTime = null;


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


export function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
            .join('')
    );

    return JSON.parse(jsonPayload);
}


export function setEndTime(timestamp) {
    endTime = timestamp;
}

export function getTimeLeft() {
    if (!endTime) return 0;
    const now = Date.now();
    const diff = Math.max(0, Math.floor((endTime - now) / 1000));
    return diff;
}

export function isEndTimeLeft() {
    if (!endTime) return true; 
    return Date.now() >= endTime;
}