import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface Props {
  userId: string
}
export const NewEntryForm = ({ userId }: Props) => {
  console.log('$$$$$', userId)
  async function insertEntry(formData: FormData) {
    'use server'

    const supabase = createServerComponentClient<Database>({ cookies })

    const usernumber = userId
    console.log('attempt to add something')
    const insertEntry = async (content: string) => {
      await supabase.from('entries').insert({ content, user_id: usernumber })
    }

    const content = formData.get('content')?.toString()
    insertEntry(content)
    redirect('/entries')
  }

  return (
    <form action={insertEntry}>
      <label>Content</label>
      <textarea
        style={{ border: `1px solid pink` }}
        name="content"
        placeholder="TEXT HERE"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  )
}
