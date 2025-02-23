// src/app/api/auth/[...auth0]/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');

  const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN!;
  const CLIENT_ID = process.env.AUTH0_CLIENT_ID!;
  const CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET!;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/[...auth0]?action=callback`;

  if (action === 'login') {
    const authUrl = `https://${AUTH0_DOMAIN}/authorize?` +
      new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        scope: 'openid profile email',
      });

    return NextResponse.redirect(authUrl);
  }

  if (action === 'callback') {
    const code = url.searchParams.get('code');
    if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

    try {
      const tokenResponse = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
          redirect_uri: REDIRECT_URI,
        }),
      });

      const data = await tokenResponse.json();
      if (!tokenResponse.ok) throw new Error(data.error_description || 'Failed to exchange token');

      return NextResponse.json({ success: true, token: data.id_token });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  if (action === 'logout') {
    const logoutUrl = `https://${AUTH0_DOMAIN}/v2/logout?` +
      new URLSearchParams({
        client_id: CLIENT_ID,
        returnTo: process.env.NEXT_PUBLIC_APP_URL || '/',
      });

    return NextResponse.redirect(logoutUrl);
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
