// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Prefer Expo runtime env (works in dev/build)
const url =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  (global as any).expo?.expoPublicSupabaseUrl ||
  '';
const anon =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  (global as any).expo?.expoPublicSupabaseAnonKey ||
  '';

if (!url || !anon) {
  console.warn(
    '[Supabase] Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY'
  );
}

export const supabase = createClient(url, anon);