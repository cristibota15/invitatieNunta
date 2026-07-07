/**
 * lib/supabase.ts
 *
 * Client Supabase. Necesită variabilele de mediu din .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'

/** Verifică dacă Supabase este configurat corect */
export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Client Supabase – disponibil doar dacă variabilele de mediu sunt configurate.
 * Fără ele, aplicația funcționează în modul demo (RSVP simulat).
 */
let supabaseInstance: SupabaseClient | null = null

if (isSupabaseConfigured) {
  supabaseInstance = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

export const supabase = supabaseInstance!
