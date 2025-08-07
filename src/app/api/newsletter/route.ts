import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send notification email to newsletter@novit.com.ar
    const subject = 'Nueva suscripción al newsletter';
    const html = `
      <h2>Nueva suscripción al newsletter</h2>
      <p>Se ha recibido una nueva suscripción al newsletter de Novit Software.</p>
      <p><strong>Email del suscriptor:</strong> ${email}</p>
      <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
    `;

    await sendEmail({
      to: 'newsletter@novit.com.ar',
      subject,
      html,
    });

    return NextResponse.json(
      { message: 'Newsletter subscription successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process newsletter subscription' },
      { status: 500 }
    );
  }
}
