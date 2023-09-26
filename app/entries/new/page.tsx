'use server'
import { Database } from '@/lib/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { NewEntryForm } from './NewEntryForm'

export default async function NewEntry() {
  'use server'
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Not Logged In</div>
  }

  const insertEntry = async (content: string) => {
    'use server'
    await supabase.from('entries').insert({ content, user_id: user.id })
  }

  return <NewEntryForm onInsert={insertEntry} />
}
