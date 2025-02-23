// app/api/auth/phone-login/route.ts
// app/api/auth/phone-login/route.ts
import { NextResponse } from 'next/server';
import { AuthenticationClient } from 'auth0'; // Change this import

// Remove the ManagementClient and use AuthenticationClient instead
const auth0 = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!
});

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/passwordless/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        connection: 'sms',
        phone_number: phoneNumber,
        send: 'code',
      }),
    });

    if (!response.ok) throw new Error('Failed to send OTP');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Phone login error:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}

// app/api/auth/verify-otp/route.ts
// export async function POST(request: Request) {
//   try {
//     const { phoneNumber, otp } = await request.json();

//     // Verify OTP with Auth0
//     const response = await auth0.passwordless.verify({
//       client_id: process.env.AUTH0_CLIENT_ID!,
//       connection: 'sms',
//       phone_number: phoneNumber,
//       verification_code: otp,
//     });

//     return NextResponse.json({ success: true, token: response.id_token });
//   } catch (error) {
//     console.error('OTP verification error:', error);
//     return NextResponse.json(
//       { error: 'Invalid OTP' },
//       { status: 400 }
//     );
//   }
// }

// app/api/auth/google/route.ts
const auth0Client = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
});

export async function GET() {
  const authorizeUrl = `https://${process.env.AUTH0_DOMAIN}/authorize?` +
    new URLSearchParams({
      client_id: process.env.AUTH0_CLIENT_ID!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      response_type: 'code',
      scope: 'openid profile email',
      connection: 'google-oauth2',
    });

  return NextResponse.redirect(authorizeUrl);
}
