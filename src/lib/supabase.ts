import { createClient } from "@supabase/supabase-js";

// 클라이언트사이드용 (브라우저에서 사용)
export const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key are required");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

// 서버사이드용 (API Routes에서 사용)
export const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Supabase URL and Service Role Key are required for admin client"
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
};
