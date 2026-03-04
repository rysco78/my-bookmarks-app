import { useState, useEffect, useRef } from 'react'

export default function BookmarkCard({ bookmark, isEditing, onEdit, onSave, onCancel, onDelete }) {
  const [fields, setFields] = useState({
    title: bookmark.title,
    url: bookmark.url,
    category: bookmark.category || '',
    notes: bookmark.notes || '',
  })
  const titleRef = useRef(null)

  useEffect(() => {
    if (isEditing) {
      setFields({
        title: bookmark.title,
        url: bookmark.url,
        category: bookmark.category || '',
        notes: bookmark.notes || '',
      })
      setTimeout(() => titleRef.current?.focus(), 0)
    }
  }, [isEditing, bookmark])

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSave() {
    if (!fields.title.trim()) return
    onSave(bookmark.id, {
      title: fields.title.trim(),
      url: fields.url.trim(),
      category: fields.category.trim(),
      notes: fields.notes.trim(),
    })
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') onCancel()
    if (e.key === 'Enter') { e.preventDefault(); handleSave() }
  }

  const domain = (() => { try { return new URL(bookmark.url).hostname } catch { return bookmark.url } })()

  if (isEditing) {
    return (
      <div className="card">
        <div className="card-edit-form" onKeyDown={handleKeyDown}>
          <input ref={titleRef} type="text" name="title" value={fields.title} onChange={handleChange} placeholder="Title" required />
          <input type="url" name="url" value={fields.url} onChange={handleChange} placeholder="https://..." />
          <input type="text" name="category" value={fields.category} onChange={handleChange} placeholder="Category" list="category-list" />
          <input type="text" name="notes" value={fields.notes} onChange={handleChange} placeholder="Notes" />
          <div className="card-edit-actions">
            <button className="btn-save" onClick={handleSave}>Save</button>
            <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">{bookmark.title}</div>
        <div className="card-actions">
          <button className="card-btn edit" onClick={() => onEdit(bookmark.id)} title="Edit bookmark" aria-label={`Edit ${bookmark.title}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button className="card-btn delete" onClick={() => onDelete(bookmark.id)} title="Delete bookmark" aria-label={`Delete ${bookmark.title}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="card-url">
        <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          {domain}
        </a>
      </div>
      {bookmark.category && <div><span className="card-badge">{bookmark.category}</span></div>}
      {bookmark.notes && <div className="card-notes">{bookmark.notes}</div>}
    </div>
  )
}
