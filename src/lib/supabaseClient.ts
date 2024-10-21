import { createClient } from "@supabase/supabase-js";
import { Database } from "../Types/supabase";

const supabaseURL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabaseClient = createClient<Database>(supabaseURL, supabaseAnonKey);