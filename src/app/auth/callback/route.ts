import { NextResponse } from 'next/server';
import { createServerSupabaseClient, isStudioAdmin } from '../../../lib/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') || '/studio';
  const supabase = await createServerSupabaseClient();
  if (!supabase || !code) return NextResponse.redirect(new URL('/studio?error=setup', url.origin));
  await supabase.auth.exchangeCodeForSession(code);
  const { data: { user } } = await supabase.auth.getUser();
  if (!isStudioAdmin(user?.email)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL('/studio?error=denied', url.origin));
  }
  return NextResponse.redirect(new URL(next, url.origin));
}
