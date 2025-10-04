export function dateFormat(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export function formatDateRange(fromDate, toDate) {
  const from = dateFormat(fromDate);
  const to = toDate === 'Present' ? 'Present' : dateFormat(toDate);
  
  // Calculate duration
  const fromDateObj = new Date(fromDate);
  const toDateObj = toDate === 'Present' ? new Date() : new Date(toDate);
  const diffInMonths = Math.ceil((toDateObj - fromDateObj) / (1000 * 60 * 60 * 24 * 30));
  
  let duration = '';
  if (diffInMonths >= 12) {
    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;
    duration = `${years}y${months > 0 ? ` ${months}m` : ''}`;
  } else {
    duration = `${diffInMonths}m`;
  }
  
  return `${from} - ${to} · ${duration}`;
}

export default dateFormat;
