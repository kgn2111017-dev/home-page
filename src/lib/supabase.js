import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ejskbqvbnwkshpkpwsux.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqc2ticXZibndrc2hwa3B3c3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MjU5MDksImV4cCI6MjEwMjAwMTkwOX0.vm7CxG0uaOP-Oi9zuq0rwyNUNBBmDkhRtm_hFsGT_zs';
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqc2ticXZibndrc2hwa3B3c3V4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjQyNTkwOSwiZXhwIjoyMTAyMDAxOTA5fQ.fcsoVCyGjUJhAdwawEhwBsPRk0U8Cig5vK1E6YobcXI';

// Standard Supabase client (Anon Key) for frontend client calls
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin Supabase client (Service Role Key) for privileged backend/admin calls
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
