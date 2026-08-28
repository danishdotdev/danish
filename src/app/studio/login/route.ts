import { NextResponse } from 'next/server';
import { cognitoLoginUrl } from '../../../lib/cms-auth';
import { isAwsCmsConfigured } from '../../../lib/cms';

export async function GET(request: Request) {
  if (!isAwsCmsConfigured) return NextResponse.redirect(new URL('/', request.url));
  const state = crypto.randomUUID();
  const response = NextResponse.redirect(cognitoLoginUrl(state));
  response.cookies.set('danish_studio_state', state, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 600, path: '/' });
  return response;
}
