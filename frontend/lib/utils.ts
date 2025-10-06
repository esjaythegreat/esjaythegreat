/**
 * Format datetime to Korean local time (UTC+9) in YYYY-MM-DD HH:mm format
 * @param utcString - UTC datetime string
 * @returns Formatted string in YYYY-MM-DD HH:mm format
 */
export function formatKoreanDateTime(utcString: string): string {
  const date = new Date(utcString);
  // Add 9 hours for Korean timezone (UTC+9)
  const koreanDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
  
  const year = koreanDate.getUTCFullYear();
  const month = String(koreanDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(koreanDate.getUTCDate()).padStart(2, '0');
  const hours = String(koreanDate.getUTCHours()).padStart(2, '0');
  const minutes = String(koreanDate.getUTCMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * Get Strapi media URL
 * Uses browser URL for client-side, server URL for server-side
 */
export function getStrapiMediaUrl(path?: string): string {
  if (!path) return '';

  const browserUrl = process.env.NEXT_PUBLIC_STRAPI_BROWSER_URL || 'http://localhost:1337';
  return `${browserUrl}${path}`;
}
