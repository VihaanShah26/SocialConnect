import { createClient } from '@supabase/supabase-js';

// const supabaseURL = process.env.SUPABASE_URL; 
const supabaseURL = "https://muuesssfrskyfkyalwzt.supabase.co";
// const supabase_anon_key = process.env.SUPABASE_ANON_KEY; 
const supabase_anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11dWVzc3NmcnNreWZreWFsd3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NDk0NTIsImV4cCI6MjA2MjMyNTQ1Mn0.8PInkxBL0HSzf_KQAqQADI2K7Akqe1mjgbt4L0sgJZ0"

export const supabase = createClient(supabaseURL, supabase_anon_key); 