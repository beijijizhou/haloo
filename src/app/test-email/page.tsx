'use client';

import { useEffect } from 'react';
import { useSendEmail } from '../hooks/useSendTestEmail';

export default function TestEmailPage() {
  const { sendTestEmail, isLoading, error, success } = useSendEmail();

  useEffect(() => {
    sendTestEmail();
  }, [sendTestEmail]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Test Email</h1>
      {isLoading && <p className="text-lg text-gray-700">Sending test email...</p>}
      {error && <p className="text-lg text-red-600">Error: {error}</p>}
      {success && <p className="text-lg text-green-600">Test email sent successfully!</p>}
    </div>
  );
}