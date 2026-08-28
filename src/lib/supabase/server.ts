import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { isSupabaseConfigured } from '../blog';

export async function createServerSupabaseClient() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(values) { try { values.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {} },
    },
  });
}

export function isStudioAdmin(email?: string | null) {
  return email?.toLowerCase() === (process.env.CMS_ADMIN_EMAIL || 'dk557876@gmail.com').toLowerCase();
}
