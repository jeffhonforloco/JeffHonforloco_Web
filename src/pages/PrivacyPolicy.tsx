
import React from 'react';
import Layout from '../components/layout/Layout';
import SEO from '../components/shared/SEO';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEO 
        title="Privacy Policy" 
        description="Privacy policy for Jeff HonForLoco's blog - how we collect, use, and protect your information."
        type="website"
      />
      
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-4">Last updated: April 6, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">Introduction</h2>
            <p>
              This Privacy Policy describes how Jeff HonForLoco ("we", "us", or "our") collects, uses, and discloses your personal information when you visit our website 
              <a href="https://www.jeffhonforloco.com" className="text-gold hover:underline mx-1">jeffhonforloco.com</a>
               (the "Website"), including any other media form, media channel, mobile website, or mobile application related or connected thereto.
            </p>
            <p className="mt-4">
              We respect your privacy and are committed to protecting your personal information. This Privacy Policy will inform you about what information we collect, how we use it, and what choices you have regarding your personal information.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Subscribe to our newsletter</li>
              <li>Fill out a contact form</li>
              <li>Leave comments on blog posts</li>
              <li>Register for an account (if applicable)</li>
            </ul>
            <p>
              This information may include your name, email address, and any other information you choose to provide.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Automatically Collected Information</h3>
            <p>
              When you visit our Website, our servers may automatically log standard data provided by your web browser. This may include:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Your device's IP address</li>
              <li>Your browser type and version</li>
              <li>Pages you visit and time spent on those pages</li>
              <li>Referral source</li>
              <li>Device information (such as device type, operating system)</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Provide, operate, and maintain our Website</li>
              <li>Send you the newsletter you've subscribed to</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Improve our Website and your experience</li>
              <li>Monitor and analyze usage trends and preferences</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">Cookies and Similar Technologies</h2>
            <p>
              We may use cookies, web beacons, and similar tracking technologies to collect information about how you use our Website. You can set your browser to refuse all or some browser cookies, but this may affect your ability to access or use certain features of our Website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">Third-Party Services</h2>
            <p>
              We may use third-party services, such as Google Analytics, to help us understand how visitors interact with our Website. These third-party service providers have their own privacy policies addressing how they use your information.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing of your personal information</li>
              <li>Data portability</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at <a href="mailto:info@jeffhonforloco.com" className="text-gold hover:underline">info@jeffhonforloco.com</a>.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">Children's Privacy</h2>
            <p>
              Our Website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong> <a href="mailto:info@jeffhonforloco.com" className="text-gold hover:underline">info@jeffhonforloco.com</a>
            </p>
          </section>
          
          <div className="mt-12">
            <Link to="/contact" className="bg-gold text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors inline-flex items-center">
              Contact Us With Questions
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
