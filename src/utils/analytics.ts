// Types for GA4 events and parameters
export interface GtagParams {
  [key: string]: string | number | boolean | null | undefined | Record<string, string>;
}

interface GtagConfigParams extends GtagParams {
  custom_map?: {
    [key: string]: string;
  };
}

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string,
      params?: GtagParams | GtagConfigParams
    ) => void;
  }
}

// Custom dimensions indices (configure these in GA4 admin)
export const CUSTOM_DIMENSIONS = {
  TAB_NAME: 'tab_name',
  PLATFORM: 'platform',
  SCROLL_DEPTH: 'scroll_depth',
  USER_TYPE: 'user_type',
  CONTENT_CATEGORY: 'content_category'
} as const;

// Conversion events
export const CONVERSION_EVENTS = {
  EMAIL_CLICK: 'email_click',
  GITHUB_VISIT: 'github_visit',
  DEEP_SCROLL: 'deep_scroll',
  LONG_ENGAGEMENT: 'long_engagement'
} as const;

// Audience definitions
export const AUDIENCE_THRESHOLDS = {
  HIGHLY_ENGAGED_TIME: 300, // 5 minutes
  DEEP_SCROLL_THRESHOLD: 90, // 90% scroll depth
  RETURN_VISIT_COUNT: 3
} as const;

// Initialize enhanced measurement
export const initializeAnalytics = () => {
  if (typeof window.gtag !== 'undefined') {
    // Configure custom dimensions
    window.gtag('config', 'G-5CJBYB3H5K', {
      custom_map: {
        dimension1: CUSTOM_DIMENSIONS.TAB_NAME,
        dimension2: CUSTOM_DIMENSIONS.PLATFORM,
        dimension3: CUSTOM_DIMENSIONS.SCROLL_DEPTH,
        dimension4: CUSTOM_DIMENSIONS.USER_TYPE,
        dimension5: CUSTOM_DIMENSIONS.CONTENT_CATEGORY
      },
      send_page_view: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: true
    });
  }
};

// Track user engagement level
export const trackEngagementLevel = (timeSpentSeconds: number, scrollDepth: number) => {
  if (timeSpentSeconds >= AUDIENCE_THRESHOLDS.HIGHLY_ENGAGED_TIME) {
    window.gtag?.('event', CONVERSION_EVENTS.LONG_ENGAGEMENT, {
      engagement_time: timeSpentSeconds,
      [CUSTOM_DIMENSIONS.USER_TYPE]: 'highly_engaged'
    });
  }

  if (scrollDepth >= AUDIENCE_THRESHOLDS.DEEP_SCROLL_THRESHOLD) {
    window.gtag?.('event', CONVERSION_EVENTS.DEEP_SCROLL, {
      scroll_depth: scrollDepth,
      [CUSTOM_DIMENSIONS.USER_TYPE]: 'content_explorer'
    });
  }
};

// Track external link clicks with enhanced data
export const trackExternalLink = (platform: string, url: string) => {
  const isConversion = platform === 'github' || platform === 'email';
  const eventName = platform === 'email' 
    ? CONVERSION_EVENTS.EMAIL_CLICK 
    : platform === 'github' 
      ? CONVERSION_EVENTS.GITHUB_VISIT 
      : 'external_link_click';

  window.gtag?.('event', eventName, {
    [CUSTOM_DIMENSIONS.PLATFORM]: platform,
    outbound_url: url,
    is_conversion: isConversion
  });
};

// Track page/tab views with enhanced data
export const trackPageView = (tabName: string, contentCategory?: string) => {
  window.gtag?.('event', 'page_view', {
    page_title: `${tabName} Tab`,
    [CUSTOM_DIMENSIONS.TAB_NAME]: tabName,
    [CUSTOM_DIMENSIONS.CONTENT_CATEGORY]: contentCategory || tabName
  });
};

// Track scroll depth with enhanced data
export const trackScrollDepth = (depth: number, tabName: string) => {
  window.gtag?.('event', 'scroll_depth', {
    [CUSTOM_DIMENSIONS.SCROLL_DEPTH]: depth,
    [CUSTOM_DIMENSIONS.TAB_NAME]: tabName,
    is_milestone: depth >= AUDIENCE_THRESHOLDS.DEEP_SCROLL_THRESHOLD
  });
};

// Track time spent with enhanced data
export const trackTimeSpent = (tabName: string, timeSpentSeconds: number) => {
  window.gtag?.('event', 'tab_time', {
    [CUSTOM_DIMENSIONS.TAB_NAME]: tabName,
    time_seconds: timeSpentSeconds,
    is_engaged: timeSpentSeconds >= AUDIENCE_THRESHOLDS.HIGHLY_ENGAGED_TIME
  });
}; 