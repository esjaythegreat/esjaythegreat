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
 * Automatically uses correct URL based on environment and context (server vs browser)
 */
export function getStrapiMediaUrl(path?: string): string {
  if (!path) return '';
  
  const isServer = typeof window === 'undefined';
  
  if (isServer) {
    // Server-side: Always use Docker service name for internal communication
    const internalUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://strapi:1337';
    return `${internalUrl}${path}`;
  } else {
    // Client-side: Use the browser-accessible URL
    const browserUrl = process.env.NEXT_PUBLIC_STRAPI_BROWSER_URL || 'http://localhost:1337';
    return `${browserUrl}${path}`;
  }
}
