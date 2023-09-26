import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Entries() {
  const supabase = createServerComponentClient({ cookies })

  const { data } = await supabase.from('entries').select()

  console.log('### data', { data })
}
