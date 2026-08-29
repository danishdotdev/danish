import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { cookies } from 'next/headers';
import { cmsConfig, isAwsCmsConfigured } from './cms';

const SESSION_COOKIE = 'danish_studio_session';
const STATE_COOKIE = 'danish_studio_state';

function verifier() {
  const config = cmsConfig();
  return CognitoJwtVerifier.create({ userPoolId: config.userPoolId, clientId: config.clientId, tokenUse: 'id' });
}

export async function getStudioUser() {
  if (!isAwsCmsConfigured) return null;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return studioUserFromToken(token);
}

export async function studioUserFromToken(token: string) {
  if (!isAwsCmsConfigured) return null;
  try {
    const payload = await verifier().verify(token);
    const email = typeof payload.email === 'string' ? payload.email.toLowerCase() : '';
    return email === cmsConfig().adminEmail ? { email, sub: payload.sub } : null;
  } catch {
    return null;
  }
}

export function cognitoLoginUrl(state: string) {
  const { domain, clientId, siteUrl } = cmsConfig();
  const params = new URLSearchParams({ response_type: 'code', client_id: clientId, redirect_uri: `${siteUrl}/auth/cognito/callback`, scope: 'openid email profile', state });
  return `https://${domain}/oauth2/authorize?${params}`;
}

export async function exchangeCognitoCode(code: string) {
  const { domain, clientId, siteUrl } = cmsConfig();
  const response = await fetch(`https://${domain}/oauth2/token`, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'authorization_code', client_id: clientId, code, redirect_uri: `${siteUrl}/auth/cognito/callback` }), cache: 'no-store' });
  if (!response.ok) throw new Error('Unable to complete Studio sign-in.');
  const data = await response.json() as { id_token?: string };
  if (!data.id_token) throw new Error('No Studio session was returned.');
  return data.id_token;
}

export { SESSION_COOKIE, STATE_COOKIE };
