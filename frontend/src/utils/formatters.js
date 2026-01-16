// Format date to YYYY-MM-DD for date inputs
export const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format date for display (e.g., "Jan 15, 2024")
export const formatDateForDisplay = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Get status badge color classes
export const getStatusColor = (status) => {
  const colors = {
    Applied: 'bg-blue-100 text-blue-800',
    Interview: 'bg-yellow-100 text-yellow-800',
    Rejected: 'bg-red-100 text-red-800',
    Offer: 'bg-green-100 text-green-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};
