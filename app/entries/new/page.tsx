import { Database } from '@/lib/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NewEntryForm } from './NewEntryForm'

export default async function NewEntry() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Not Logged In</div>
  }

  return <NewEntryForm userId={user.id} />
}
