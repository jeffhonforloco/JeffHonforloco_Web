
// Track user engagement to determine when to show popups
export interface EngagementMetrics {
  timeOnPage: number;
  scrollPercentage: number;
  interactionCount: number;
}

const DEFAULT_METRICS: EngagementMetrics = {
  timeOnPage: 0,
  scrollPercentage: 0,
  interactionCount: 0,
};

// Load metrics from localStorage or use defaults
const loadMetrics = (): EngagementMetrics => {
  const saved = localStorage.getItem('user-engagement');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading engagement metrics:', e);
    }
  }
  return { ...DEFAULT_METRICS };
};

// Save metrics to localStorage
const saveMetrics = (metrics: EngagementMetrics): void => {
  localStorage.setItem('user-engagement', JSON.stringify(metrics));
};

// Get current metrics
export const getEngagementMetrics = (): EngagementMetrics => {
  return loadMetrics();
};

// Update a specific metric
export const updateMetric = (metric: keyof EngagementMetrics, value: number): void => {
  const metrics = loadMetrics();
  metrics[metric] = value;
  saveMetrics(metrics);
};

// Increment a metric by a given amount (default: 1)
export const incrementMetric = (metric: keyof EngagementMetrics, amount: number = 1): void => {
  const metrics = loadMetrics();
  metrics[metric] += amount;
  saveMetrics(metrics);
};

// Check if user is sufficiently engaged based on criteria
export const isUserEngaged = (requiredMetrics: Partial<EngagementMetrics>): boolean => {
  const currentMetrics = loadMetrics();
  
  // Check if all required metrics are met
  return Object.entries(requiredMetrics).every(
    ([key, requiredValue]) => {
      const metricKey = key as keyof EngagementMetrics;
      return currentMetrics[metricKey] >= requiredValue;
    }
  );
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
  
  // Return cleanup function
  return () => {
    clearInterval(timeInterval);
    window.removeEventListener('scroll', scrollHandler);
    interactionEvents.forEach(event => {
      document.removeEventListener(event, interactionHandler);
    });
  };
};
