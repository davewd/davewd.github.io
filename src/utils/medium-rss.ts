// Utility for fetching Medium posts via RSS feed
// Using multiple CORS proxy options for reliability

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
  contentEncoded?: string;
  guid?: string;
}

export interface MediumRSSResponse {
  items: MediumPost[];
}

// Multiple CORS proxy services for fallback
const CORS_PROXIES = [
  'https://api.allorigins.win/get?url=',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.codetabs.com/v1/proxy?quest='
];

// Extract text content and strip HTML tags
function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

// Estimate reading time based on content length
function estimateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
}

export async function fetchMediumPosts(username: string): Promise<MediumPost[]> {
  const rssUrl = `https://medium.com/feed/@${username}`;
  
  // Try each CORS proxy until one works
  for (const proxy of CORS_PROXIES) {
    try {
      let proxyUrl: string;
      let response: Response;
      
      if (proxy.includes('allorigins')) {
        proxyUrl = `${proxy}${encodeURIComponent(rssUrl)}`;
        response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (!data.contents) {
          throw new Error('No content received from proxy');
        }
        
        return parseRSSFeed(data.contents);
      } else {
        proxyUrl = `${proxy}${rssUrl}`;
        response = await fetch(proxyUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const xmlText = await response.text();
        return parseRSSFeed(xmlText);
      }
    } catch (error) {
      console.warn(`Proxy ${proxy} failed:`, error);
      continue;
    }
  }
  
  console.error('All CORS proxies failed');
  return [];
}

function parseRSSFeed(xmlText: string): MediumPost[] {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    // Check for parsing errors
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('XML parsing error');
    }
    
    const items = xmlDoc.querySelectorAll('item');
    const posts: MediumPost[] = [];
    
    items.forEach((item, index) => {
      const title = item.querySelector('title')?.textContent?.trim() || '';
      const link = item.querySelector('link')?.textContent?.trim() || '';
      const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
      const description = item.querySelector('description')?.textContent?.trim() || '';
      
      // Try different selectors for content:encoded
      let contentEncoded = '';
      const contentEncodedElement = item.querySelector('content\\:encoded') || 
                                   item.querySelector('encoded') ||
                                   item.querySelector('[xmlns\\:content] encoded') ||
                                   Array.from(item.children).find(child => child.tagName === 'encoded');
      
      if (contentEncodedElement) {
        contentEncoded = contentEncodedElement.textContent?.trim() || '';
      }
      
      const guid = item.querySelector('guid')?.textContent?.trim() || '';
      
      if (title && link) {
        posts.push({
          title,
          link,
          pubDate,
          description: stripHtml(description),
          contentEncoded,
          guid: guid || `medium-${index}`,
        });
      }
    });
    
    return posts;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
}

// Convert Medium posts to thoughts format
export function convertMediumPostsToThoughts(posts: MediumPost[], thoughtTitle: string = "Medium Posts"): any {
  const sections = posts.slice(0, 10).map((post, index) => ({
    id: `medium-section-${post.guid || index}`,
    title: post.title,
    content: post.description.substring(0, 300) + (post.description.length > 300 ? '...' : ''),
    contentEncoded: post.contentEncoded,
    mediumUrl: post.link,
    publishedDate: new Date(post.pubDate).toISOString().split('T')[0],
    readTime: estimateReadTime(post.contentEncoded || post.description),
  }));

  return {
    id: 'medium-thoughts',
    title: thoughtTitle,
    sections,
  };
}

// Fetch and convert Medium posts in one function
export async function fetchAndConvertMediumPosts(username: string, thoughtTitle: string = "Latest Medium Posts"): Promise<any> {
  const posts = await fetchMediumPosts(username);
  return convertMediumPostsToThoughts(posts, thoughtTitle);
}
