import { createClient } from '@supabase/supabase-js';

const supaBaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supaBaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supaBaseURL, supaBaseKey);
