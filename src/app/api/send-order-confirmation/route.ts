/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { ConfirmationEmailPayload } from '@/app/types';

const resend = new Resend(process.env.RESEND_API_KEY);

const storeEmail = "haloowebsite@gmail.com"


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

async function sendEmail(payload: ConfirmationEmailPayload) {
  const {
    contactInfo: { fullName, email, phone, street, city, state, zipCode },
    product: { category = 'N/A', subcategory = 'N/A', size = 'N/A', color = 'N/A' },
    order: { price = 0, image = '', quantity = 1, orderId = 'N/A' },
  } = payload;
  console.log('Sending confirmation email with payload:');
  const { isValid, content, mimeType } = validateBase64Image(image);

  const attachments = isValid
    ? [
      {
        filename: `order-image-${orderId}.${mimeType.split('/')[1]}`,
        content: content,
        contentType: mimeType,
      },
    ]
    : [];
    // return null
  return await resend.emails.send({
    from: process.env.NEXT_PUBLIC_SHOP_EMAIL || 'onboarding@resend.dev',
    to: [email, storeEmail],
    subject: `Order Confirmation - ${orderId}`,
    html: `
      <h1>Order Confirmation</h1>
      <p>Hi ${fullName}, Thank you for your order!</p>
      <p>Order ID: ${orderId}</p>
      <p>Details:</p>
      <ul>
        <li>Category: ${category}</li>
        <li>Item: ${subcategory}</li>
        <li>Size: ${size}</li>
        ${color !== 'N/A' ? `<li>Color: ${color}</li>` : ''}
        <li>Quantity: ${quantity}</li>
        <li>Price: $${price.toFixed(2)}</li>
        <li>Phone: ${phone}</li>
        <li>Address: ${street}, ${city}, ${state} ${zipCode}</li>
      </ul>
      ${isValid ? `<p>Order image is attached for your reference.</p>` : ''}
      <p>If you have any questions, feel free to contact us.</p>
    `,
    attachments: attachments.length > 0 ? attachments : undefined,
  });
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json() as ConfirmationEmailPayload;
    const data = await sendEmail(payload);
    console.log('Email sent successfully to:', payload.contactInfo.email, data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}