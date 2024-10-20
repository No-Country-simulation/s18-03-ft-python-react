import { createClient } from '@supabase/supabase-js'

import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPERBASE_URL
const supabaseKey = process.env.SUPERBASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

