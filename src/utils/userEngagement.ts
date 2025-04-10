
// Track user engagement to determine when to show popups
export interface EngagementMetrics {
  timeOnPage: number;
  scrollPercentage: number;
  interactionCount: number;
  sectionViews: {
    stories: number;
    affiliate: number;
    recommendations: number;
    resources: number;
  };
}

const DEFAULT_METRICS: EngagementMetrics = {
  timeOnPage: 0,
  scrollPercentage: 0,
  interactionCount: 0,
  sectionViews: {
    stories: 0,
    affiliate: 0,
    recommendations: 0,
    resources: 0
  }
};

// Load metrics from localStorage or use defaults
const loadMetrics = (): EngagementMetrics => {
  const saved = localStorage.getItem('user-engagement');
  if (saved) {
    try {
      const parsedMetrics = JSON.parse(saved);
      
      // Ensure the metrics object has all required properties
      // This handles cases where the saved metrics might be missing properties
      return {
        timeOnPage: parsedMetrics.timeOnPage || 0,
        scrollPercentage: parsedMetrics.scrollPercentage || 0,
        interactionCount: parsedMetrics.interactionCount || 0,
        sectionViews: {
          stories: parsedMetrics.sectionViews?.stories || 0,
          affiliate: parsedMetrics.sectionViews?.affiliate || 0,
          recommendations: parsedMetrics.sectionViews?.recommendations || 0,
          resources: parsedMetrics.sectionViews?.resources || 0
        }
      };
    } catch (e) {
      console.error('Error loading engagement metrics:', e);
    }
  }
  return { ...DEFAULT_METRICS };
};

// Save metrics to localStorage
const saveMetrics = (metrics: EngagementMetrics): void => {
  localStorage.setItem('user-engagement', JSON.stringify(metrics));
  console.log('Updated engagement metrics:', metrics);
};

// Get current metrics
export const getEngagementMetrics = (): EngagementMetrics => {
  return loadMetrics();
};

// Update a specific metric
export const updateMetric = (metric: keyof EngagementMetrics, value: number | object): void => {
  const metrics = loadMetrics();
  if (metric === 'sectionViews' && typeof value === 'object') {
    metrics.sectionViews = { ...metrics.sectionViews, ...value };
  } else if (typeof value === 'number') {
    (metrics[metric] as number) = value;
  }
  saveMetrics(metrics);
};

// Track section view
export const trackSectionView = (section: keyof EngagementMetrics['sectionViews']): void => {
  try {
    const metrics = loadMetrics();
    
    // Make sure sectionViews exists and has the right structure
    if (!metrics.sectionViews) {
      metrics.sectionViews = { ...DEFAULT_METRICS.sectionViews };
    }
    
    // Ensure the specific section counter exists
    if (typeof metrics.sectionViews[section] !== 'number') {
      metrics.sectionViews[section] = 0;
    }
    
    metrics.sectionViews[section]++;
    saveMetrics(metrics);
    console.log(`Tracked view of ${section} section`);
  } catch (error) {
    console.error(`Error tracking section view for ${section}:`, error);
    // Reset the metrics to resolve persistent errors
    localStorage.removeItem('user-engagement');
    saveMetrics({ ...DEFAULT_METRICS });
  }
};

// Increment a metric by a given amount (default: 1)
export const incrementMetric = (metric: keyof EngagementMetrics, amount: number = 1): void => {
  const metrics = loadMetrics();
  if (typeof metrics[metric] === 'number') {
    (metrics[metric] as number) += amount;
    saveMetrics(metrics);
  }
};

// Check if user is sufficiently engaged based on criteria
export const isUserEngaged = (requiredMetrics: Partial<EngagementMetrics>): boolean => {
  // For testing purposes, always return true to ensure popups show
  return true;
  
  // In production, uncomment the code below
  /*
  const currentMetrics = loadMetrics();
  
  // Check if all required metrics are met
  return Object.entries(requiredMetrics).every(
    ([key, requiredValue]) => {
      const metricKey = key as keyof EngagementMetrics;
      return currentMetrics[metricKey] >= requiredValue;
    }
  );
  */
};

// Initialize engagement tracking
export const initEngagementTracking = (): () => void => {
  // Track time on page
  const startTime = Date.now();
  const timeInterval = setInterval(() => {
    const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
    updateMetric('timeOnPage', timeOnPage);
  }, 5000);
  
  // Track scroll percentage
  const scrollHandler = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);
    updateMetric('scrollPercentage', scrollPercentage);
  };
  window.addEventListener('scroll', scrollHandler);
  
  // Track user interactions
  const interactionHandler = () => {
    incrementMetric('interactionCount');
  };
  
  // Events that count as interactions
  const interactionEvents = ['click', 'keydown', 'touchstart'];
  interactionEvents.forEach(event => {
    document.addEventListener(event, interactionHandler);
  });
  
  console.log('Engagement tracking initialized');
  
  // Return cleanup function
  return () => {
    clearInterval(timeInterval);
    window.removeEventListener('scroll', scrollHandler);
    interactionEvents.forEach(event => {
      document.removeEventListener(event, interactionHandler);
    });
  };
};
