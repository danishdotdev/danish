import { NextResponse } from 'next/server';
import { cognitoLoginUrl, SESSION_COOKIE, STATE_COOKIE } from '../../../lib/cms-auth';
import { isAwsCmsConfigured } from '../../../lib/cms';

export async function GET(request: Request) {
  if (!isAwsCmsConfigured) return NextResponse.redirect(new URL('/', request.url));
  const state = crypto.randomUUID();
  const response = NextResponse.redirect(cognitoLoginUrl(state));
  // Each sign-in starts from a clean session, preventing an earlier failed
  // callback from affecting a later attempt.
  response.cookies.delete(SESSION_COOKIE);
  response.cookies.delete(STATE_COOKIE);
  response.cookies.set(STATE_COOKIE, state, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 600, path: '/' });
  return response;
}
