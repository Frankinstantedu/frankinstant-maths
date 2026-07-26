import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received form body:', body); // Debug 1: See if data reached backend

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('CRITICAL: RESEND_API_KEY is missing from environment variables!');
      return NextResponse.json({ error: 'API key missing on server' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { parentName, parentEmail, parentPhone, childName, curriculumGroup, notes } = body;

    // Send the email to your personal inbox
    const data = await resend.emails.send({
      from: 'Spelling Bee Platform <onboarding@resend.dev>',
      to: ['frankinstantedu@gmail.com'],
      subject: `New Registration: ${childName} (${curriculumGroup})`,
      html: `
        <h2>New Parent & Child Registration</h2>
        <p><strong>Parent Name:</strong> ${parentName}</p>
        <p><strong>Email:</strong> ${parentEmail}</p>
        <p><strong>Phone:</strong> ${parentPhone}</p>
        <hr />
        <p><strong>Child Name:</strong> ${childName}</p>
        <p><strong>Target Group:</strong> ${curriculumGroup}</p>
        <p><strong>Notes:</strong> ${notes || 'None provided'}</p>
      `,
    });

    console.log('Resend success response:', data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    // Debug 2: This will catch and print the exact Resend API error
    console.error('DETAILED REGISTRATION ERROR:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}