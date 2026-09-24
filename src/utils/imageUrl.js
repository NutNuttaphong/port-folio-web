export const getImageUrl = (url) => {
  if (!url) return '';
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  if (url.startsWith('http://localhost:3000')) {
    return url.replace('http://localhost:3000', baseUrl);
  }
  if (url.startsWith('/uploads/')) {
    return `${baseUrl}${url}`;
  }
  return url;
};
