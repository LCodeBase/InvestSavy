import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zpfuapesqlnyutpdcglx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwZnVhcGVzcWxueXV0cGRjZ2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NDU0MTksImV4cCI6MjA2NDIyMTQxOX0.Frh2zWkQq1uj56Js9oWKOpVJajAtfqwPcu6hoC-mOFg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);