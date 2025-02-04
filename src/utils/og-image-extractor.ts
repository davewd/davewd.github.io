export async function extractOpenGraphImage(url: string): Promise<string | null> {
  try {
    // Use a third-party service to extract Open Graph metadata
    const apiUrl = `https://api.urlmeta.org/?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      console.error('Failed to fetch URL metadata:', response.statusText);
      return null;
    }
    
    const data = await response.json();
    
    // Check for Open Graph image in the response
    if (data.meta && data.meta.image) {
      return data.meta.image;
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting Open Graph image:', error);
    return null;
  }
}

// Helper function to batch process URLs
export async function extractOpenGraphImages(urls: string[]): Promise<(string | null)[]> {
  return Promise.all(urls.map(extractOpenGraphImage));
}
