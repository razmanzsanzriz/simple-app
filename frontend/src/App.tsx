import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

type Note = {
  id: number
  text: string
}

const apiUrl = 'http://localhost:5100/api/notes'

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  async function loadNotes() {
    try {
      const response = await fetch(apiUrl)
      if (!response.ok) throw new Error()
      setNotes(await response.json())
      setError('')
    } catch {
      setError('Could not reach the backend. Is it running?')
    }
  }

  useEffect(() => {
    loadNotes()
  }, [])

  async function addNote(event: FormEvent) {
    event.preventDefault()
    if (!text.trim()) return

    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.trim() }),
    })
    setText('')
    loadNotes()
  }

  async function deleteNote(id: number) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    loadNotes()
  }

  return (
    <main>
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Write a note"
          aria-label="Note text"
        />
        <button type="submit">Add</button>
      </form>

      {error && <p role="alert">{error}</p>}

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <span>{note.text}</span>
            <button type="button" onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
