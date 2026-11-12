import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tqcsgctjcaodppswnffq.supabase.co'
const supabaseKey = 'sb_publishable_gjdLMdiL_ZE3Dwn5GvST9A_9f-UmXI4'

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
)