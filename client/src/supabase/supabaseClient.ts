import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPERBASEURL as string 
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string 


if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPERBASEURL y SUPABASE_SERVICE_ROLE_KEY son requeridas y no están definidas')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

