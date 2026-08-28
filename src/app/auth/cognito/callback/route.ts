import { NextResponse } from 'next/server';
import { isAwsCmsConfigured } from '../../../../lib/cms';
import { exchangeCognitoCode, SESSION_COOKIE, STATE_COOKIE } from '../../../../lib/cms-auth';

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (!isAwsCmsConfigured) return NextResponse.redirect(new URL('/', url));
  const state = url.searchParams.get('state');
  const expected = request.headers.get('cookie')?.match(/(?:^|; )danish_studio_state=([^;]+)/)?.[1];
  const code = url.searchParams.get('code');
  if (!code || !state || !expected || state !== expected) return NextResponse.redirect(new URL('/studio?error=denied', url));
  try {
    const token = await exchangeCognitoCode(code);
    const response = NextResponse.redirect(new URL('/studio', url));
    response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 3600, path: '/' });
    response.cookies.delete(STATE_COOKIE);
    return response;
  } catch {
    return NextResponse.redirect(new URL('/studio?error=denied', url));
  }
}
