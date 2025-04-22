
import React from 'react';
import Layout from '../components/layout/Layout';
import SEO from '../components/shared/SEO';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <Layout>
      <SEO 
        title="Terms of Service" 
        description="Terms of service for Jeff HonForLoco's blog - our rules and guidelines for using the website."
        type="website"
      />
      
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-4">Last updated: April 6, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Jeff HonForLoco ("we," "our," or "us"). By accessing or using our website at 
              <a href="https://www.jeffhonforloco.com" className="text-gold hover:underline mx-1">jeffhonforloco.com</a>
               (the "Website"), you agree to be bound by these Terms of Service ("Terms").
            </p>
            <p className="mt-4">
              Please read these Terms carefully. If you do not agree with all of these Terms, you are prohibited from using the Website and must discontinue use immediately.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">2. Use of Website</h2>
            <p>
              The content on our Website is for general information and entertainment purposes only. We reserve the right to modify, suspend, or discontinue any aspect of the Website at any time without notice.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">2.1 User Accounts</h3>
            <p>
              If you create an account on our Website, you are responsible for maintaining the security of your account and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">2.2 Prohibited Uses</h3>
            <p>
              You agree not to use the Website:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>In any way that violates any applicable local, state, national, or international law or regulation</li>
              <li>To transmit any material that is defamatory, offensive, or otherwise objectionable</li>
              <li>To impersonate or attempt to impersonate Jeff HonForLoco, another user, or any other person</li>
              <li>To engage in any activity that interferes with or disrupts the Website</li>
              <li>To attempt to gain unauthorized access to any portion of the Website</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">3. Intellectual Property</h2>
            <p>
              The Website and its original content, features, and functionality are owned by Jeff HonForLoco and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">3.1 Limited License</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Website for personal, non-commercial purposes. This license does not include:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Modifying or copying any materials from the Website</li>
              <li>Using any material for any commercial purpose</li>
              <li>Attempting to reverse engineer any software contained on the Website</li>
              <li>Removing any copyright or other proprietary notations</li>
              <li>Transferring the materials to another person</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">4. User Content</h2>
            <p>
              If you submit, post, or share content on our Website (such as comments, feedback, or suggestions), you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.
            </p>
            <p className="mt-4">
              You represent and warrant that:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>You own or control all rights to the content you post</li>
              <li>The content is accurate and not misleading</li>
              <li>The content does not violate these Terms and will not cause injury to any person or entity</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">5. Third-Party Links</h2>
            <p>
              Our Website may contain links to third-party websites or services that are not owned or controlled by Jeff HonForLoco. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
            <p className="mt-4">
              You acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">6. Disclaimer of Warranties</h2>
            <p>
              The Website is provided "as is" and "as available" without any warranties of any kind, either express or implied. We disclaim all warranties, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p className="mt-4">
              We do not warrant that the Website will be uninterrupted or error-free, that defects will be corrected, or that the Website or the server that makes it available are free of viruses or other harmful components.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">7. Limitation of Liability</h2>
            <p>
              In no event shall Jeff HonForLoco, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Your access to or use of or inability to access or use the Website</li>
              <li>Any conduct or content of any third party on the Website</li>
              <li>Any content obtained from the Website</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">8. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.
            </p>
            <p className="mt-4">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
            </p>
            <p className="mt-4">
              By continuing to access or use our Website after those revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new Terms, please stop using the Website.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif font-semibold mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
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

export default TermsOfService;
