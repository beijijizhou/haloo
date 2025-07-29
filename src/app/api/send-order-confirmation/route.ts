/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailPayload {
  email: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  category?: string;
  subcategory?: string;
  sizeOrModel?: string;
  price?: number;
  image?: string;
}

function validateBase64Image(image: string): { isValid: boolean; content: string; mimeType: string } {
  if (!image) {
    return { isValid: false, content: '', mimeType: '' };
  }

  // Check for valid Base64 image format
  const base64Regex = /^data:image\/(png|jpeg|jpg);base64,/;
  if (!base64Regex.test(image)) {
    return { isValid: false, content: '', mimeType: '' };
  }

  // Extract MIME type and content
  const mimeType = image.match(base64Regex)?.[1] || '';
  const content = image.replace(base64Regex, '');

  // Check size (Base64 is ~1.33x larger than binary, 5MB limit)
  const sizeInBytes = (content.length * 3) / 4;
  if (sizeInBytes > 5 * 1024 * 1024) {
    throw new Error('Image size exceeds 5MB limit');
  }

  return { isValid: true, content, mimeType: `image/${mimeType}` };
}

async function sendEmail(payload: EmailPayload) {
  const {
    email,
    phone = 'Not provided',
    street = 'Not provided',
    city = 'Not provided',
    state = 'Not provided',
    zipCode = 'Not provided',
    country = 'Not provided',
    category = 'Not provided',
    subcategory = 'Not provided',
    sizeOrModel = 'Not provided',
    price = 0,
    image = '',
  } = payload;

  const { isValid, content, mimeType } = validateBase64Image(image);

  // Prepare attachment if image is valid
  const attachments = isValid
    ? [
        {
          filename: `order-image.${mimeType.split('/')[1]}`,
          content: content,
          contentType: mimeType,
        },
      ]
    : [];

  return await resend.emails.send({
    from: process.env.NEXT_PUBLIC_SHOP_EMAIL || 'onboarding@resend.dev',
    to: [email],
    subject: 'Order Confirmation',
    html: `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>
      <p>Details:</p>
      <ul>
        <li>Category: ${category}</li>
        <li>Item: ${subcategory}</li>
        <li>Size/Model: ${sizeOrModel}</li>
        <li>Price: $${price.toFixed(2)}</li>
        <li>Phone: ${phone}</li>
        <li>Address: ${street}, ${city}, ${state} ${zipCode}, ${country}</li>
      </ul>
      ${isValid ? `<p>Order image is attached for your reference.</p>` : ''}
      <p>If you have any questions, feel free to contact us.</p>
    `,
    attachments: attachments.length > 0 ? attachments : undefined,
  });
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json() as EmailPayload;

    if (!payload.email) {
      throw new Error('Email is required');
    }

    const data = await sendEmail(payload);

    console.log('Email sent successfully to:', payload.email, data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}