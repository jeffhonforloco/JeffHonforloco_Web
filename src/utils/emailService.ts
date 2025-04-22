
interface EmailSubscription {
  email: string;
  name?: string;
  source: string;
  timestamp: string;
  tags?: string[];
}

// In-memory storage (in a real app, this would be a database)
let subscribersList: EmailSubscription[] = [];

// Load any existing subscribers from localStorage
const loadSubscribers = (): void => {
  const saved = localStorage.getItem('email-subscribers');
  if (saved) {
    try {
      subscribersList = JSON.parse(saved);
    } catch (e) {
      console.error('Error loading subscribers from localStorage:', e);
    }
  }
};

// Save subscribers to localStorage
const saveSubscribers = (): void => {
  localStorage.setItem('email-subscribers', JSON.stringify(subscribersList));
};

// Initialize on load
loadSubscribers();

export const subscribeEmail = async (
  email: string, 
  source: string, 
  name?: string, 
  tags?: string[]
): Promise<boolean> => {
  try {
    // Check if email already exists
    const existingSubscriber = subscribersList.find(sub => sub.email === email);
    
    if (existingSubscriber) {
      // Update existing subscriber with new tags if provided
      if (tags && tags.length > 0) {
        existingSubscriber.tags = [...new Set([...(existingSubscriber.tags || []), ...tags])];
        saveSubscribers();
      }
      return true;
    }
    
    // Add new subscriber
    const newSubscription: EmailSubscription = {
      email,
      name,
      source,
      timestamp: new Date().toISOString(),
      tags
    };
    
    subscribersList.push(newSubscription);
    saveSubscribers();
    
    // Send notification email to admin
    await sendNotificationEmail(newSubscription);
    
    return true;
  } catch (error) {
    console.error('Error subscribing email:', error);
    return false;
  }
};

export const getSubscribers = (): EmailSubscription[] => {
  return [...subscribersList];
};

export const exportSubscribersCSV = (): string => {
  // Create CSV header
  let csv = 'Email,Name,Source,Date Subscribed,Tags\n';
  
  // Add each subscriber as a row
  subscribersList.forEach(sub => {
    const row = [
      sub.email,
      sub.name || '',
      sub.source,
      new Date(sub.timestamp).toLocaleDateString(),
      (sub.tags || []).join(';')
    ].map(field => `"${field}"`).join(',');
    
    csv += row + '\n';
  });
  
  return csv;
};

// Function to send notification email to admin
const sendNotificationEmail = async (subscription: EmailSubscription): Promise<void> => {
  console.log(`New subscriber notification to info@jeffhonforloco.com:
    Email: ${subscription.email}
    Name: ${subscription.name || 'Not provided'}
    Source: ${subscription.source}
    Date: ${new Date(subscription.timestamp).toLocaleString()}
    Tags: ${subscription.tags?.join(', ') || 'None'}
  `);
  
  // In a real application, this would use an email API service like SendGrid, Mailchimp, etc.
  // Example:
  /*
  await fetch('https://api.youremailservice.com/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      to: 'info@jeffhonforloco.com',
      subject: 'New Email Subscriber',
      text: `New subscriber: ${subscription.email} from ${subscription.source}`,
      html: `
        <h1>New Subscriber</h1>
        <p><strong>Email:</strong> ${subscription.email}</p>
        <p><strong>Name:</strong> ${subscription.name || 'Not provided'}</p>
        <p><strong>Source:</strong> ${subscription.source}</p>
        <p><strong>Date:</strong> ${new Date(subscription.timestamp).toLocaleString()}</p>
        <p><strong>Tags:</strong> ${subscription.tags?.join(', ') || 'None'}</p>
      `
    })
  });
  */
};
