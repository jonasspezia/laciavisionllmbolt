// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pvfrynqcarvlorflzdqi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2ZnJ5bnFjYXJ2bG9yZmx6ZHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNDU3MTEsImV4cCI6MjA1NTYyMTcxMX0.M6-Bkab0MhY6SRzjQebkMfSfD39O6SBhL3AfWuW5q-w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
