'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ContactPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="text-lg text-gray-700 mb-6">
        Feel free to contact us if you have any questions about our services or want to learn more!
      </p>

      <div className="space-y-4 text-lg text-gray-700">
        <div className="flex items-center gap-2">
          <div>
            <strong>Phone:</strong>{' '}
            <a href="tel:6319829988" className="text-blue-600 hover:underline">
              631-982-9988
            </a>
          </div>
          <button
            onClick={() => copyToClipboard('631-982-9988', 'phone')}
            className="p-1 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            aria-label="Copy phone number"
            title="Copy phone number"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
          {copiedField === 'phone' && (
            <span className="text-sm text-green-600">Copied!</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div>
            <strong>Email:</strong>{' '}
            <a href="mailto:haloo.order@gmail.com" className="text-blue-600 hover:underline">
              haloo.order@gmail.com
            </a>
          </div>
          <button
            onClick={() => copyToClipboard('haloo.order@gmail.com', 'email')}
            className="p-1 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            aria-label="Copy email address"
            title="Copy email address"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
          {copiedField === 'email' && (
            <span className="text-sm text-green-600">Copied!</span>
          )}
        </div>

        <div className="flex items-start gap-2">
          <div>
            <strong>Address:</strong><br />
            55 Kennedy Dr, Suite D,<br />
            Hauppauge, NY 11788
          </div>
          <button
            onClick={() =>
              copyToClipboard(
                '55 Kennedy Dr, Suite D, Hauppauge, NY 11788',
                'address'
              )
            }
            className="p-1 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            aria-label="Copy address"
            title="Copy address"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
          {copiedField === 'address' && (
            <span className="text-sm text-green-600">Copied!</span>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}