// app/contact/page.tsx
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="space-y-4 text-lg text-gray-700">
        <div>
          <strong>Phone:</strong>{' '}
          <a href="tel:6319829988" className="text-blue-600 hover:underline">
            631-982-9988
          </a>
        </div>

        <div>
          <strong>Email:</strong>{' '}
          <a href="mailto:haloo.order@gmail.com" className="text-blue-600 hover:underline">
            haloo.order@gmail.com
          </a>
        </div>

        <div>
          <strong>Address:</strong><br />
          55 Kennedy Dr, Suite D,<br />
          Hauppauge, NY 11788
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
