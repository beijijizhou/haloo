import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        // console.log('Sending test email...');
        // console.log(resend, process.env.NEXT_PUBLIC_SHOP_EMAIL)
        // const data = await resend.emails.send({
        //   from:  'onboarding@resend.dev',
        //   to: ['haloowebsite@gmail.com'],
        //   subject: 'Simple Test Email',
        //   html: `
        //     <h1>Test Email</h1>
        //     <p>Hello, this is a test email from your Next.js application!</p>
        //     <p><small>Sent to verify email functionality.</small></p>
        //   `,
        // });
        // console.log('Test email sent successfully:', data);


        const resend = new Resend(process.env.RESEND_API_KEY);
        console.log(process.env.RESEND_API_KEY)
        const data = await resend.emails.send({
            from: 'support@haloopod.com',
            to: ['haloowebsite@gmail.com'],
            subject: 'hello world',
            html: '<p>it works!</p>',
        });
        console.log('Test email sent successfully:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error sending test email:', error);
        return NextResponse.json({ error: 'Failed to send test email' }, { status: 500 });
    }
}