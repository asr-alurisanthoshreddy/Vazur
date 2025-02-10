// privacy.tsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="mb-4">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
          </p>
          <p className="mb-4">
            We may collect personal information such as name, email, and usage data. This information will be used only for providing better services and improving our application.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Information Collection</h2>
          <p className="mb-4">
            We collect data through the following means:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>When you sign up or log in to our service</li>
            <li>When you interact with our content and services</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Information Usage</h2>
          <p className="mb-4">
            The information we collect will be used to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and personalize content</li>
            <li>Improve our services and features</li>
            <li>Send you updates and promotional content (if you've opted in)</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Security</h2>
          <p className="mb-4">
            We take the security of your personal data seriously and implement appropriate security measures.
          </p>
          <p className="mb-4">
            For any questions or concerns regarding this policy, please contact us at support@mlbfanfeed.com.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
