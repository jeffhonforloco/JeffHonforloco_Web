
import React from 'react';
import Layout from '@/components/layout/Layout';
import EmailList from '@/components/admin/EmailList';
import { Separator } from '@/components/ui/separator';
import SEO from '@/components/shared/SEO';

const EmailSubscribers = () => {
  return (
    <Layout>
      <SEO
        title="Email Subscribers | Admin"
        description="Manage email subscribers"
        keywords="admin, email subscribers, email list"
        type="website"
      />
      <div className="container-lg py-12">
        <h1 className="text-3xl font-bold mb-2">Email Subscribers</h1>
        <p className="text-gray-500 mb-6">
          Manage your email subscribers and export subscriber data
        </p>
        <Separator className="mb-8" />
        
        <EmailList />
        
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">About Email Collection</h2>
          <p className="mb-3">
            All emails collected through the website forms (newsletter signup, popup forms, and ebook downloads) 
            are stored here and automatically sent to <strong>info@jeffhonforloco.com</strong>.
          </p>
          <p className="mb-3">
            You can export the subscriber list as a CSV file to import into email marketing platforms like:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Mailchimp</li>
            <li>ConvertKit</li>
            <li>ActiveCampaign</li>
            <li>MailerLite</li>
          </ul>
          <p className="text-sm text-gray-500">
            Note: In this demo version, emails are stored in the browser's localStorage. 
            In a production environment, these would be stored in a database with proper 
            security and connected to an actual email service provider.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default EmailSubscribers;
