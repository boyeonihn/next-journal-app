'use client'

import { ChangeEvent, FC, FormEvent, useState } from 'react'

export const NewEntryForm: FC<{ onInsert: (content: string) => void }> = ({
  onInsert,
}) => {
  const [content, setContent] = useState('')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    onInsert(content)
  }

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <textarea value={content} onChange={onChange}></textarea>
      <button>Submit</button>
    </form>
  )
}
