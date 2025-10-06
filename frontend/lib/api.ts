const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://strapi:1337/api';

export async function getAlbums() {
  try {
    const res = await fetch(`${API_URL}/albums?sort=releaseDate:desc&populate=*`, {
      cache: 'no-store',
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch albums');
    }
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching albums:', error);
    return [];
  }
}

export async function getAlbum(slug: string) {
  try {
    const res = await fetch(
      `${API_URL}/albums?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      const idRes = await fetch(`${API_URL}/albums/${slug}?populate=*`, {
        cache: 'no-store'
      });
      if (!idRes.ok) return null;
      const idData = await idRes.json();
      return idData.data?.[0] || idData.data;
    }
    
    const data = await res.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching album:', error);
    return null;
  }
}

export async function getArticles() {
  try {
    const res = await fetch(`${API_URL}/articles?sort=publishedDate:desc&populate=*`, {
      cache: 'no-store',
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticle(slug: string) {
  try {
    const res = await fetch(
      `${API_URL}/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      const idRes = await fetch(`${API_URL}/articles/${slug}?populate=*`, {
        cache: 'no-store'
      });
      if (!idRes.ok) return null;
      const idData = await idRes.json();
      return idData.data?.[0] || idData.data;
    }
    
    const data = await res.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function getEvents() {
  try {
    const res = await fetch(`${API_URL}/events?sort=date:desc&populate=*`, {
      cache: 'no-store',
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch events');
    }
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}
