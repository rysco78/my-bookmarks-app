import { useState } from 'react'

export default function AddBookmarkForm({ categories, onAdd }) {
  const [isOpen, setIsOpen] = useState(false)
  const [fields, setFields] = useState({ title: '', url: '', category: '', notes: '' })

  function handleSubmit(e) {
    e.preventDefault()
    const { title, url, category, notes } = fields
    if (!title.trim() || !url.trim()) return
    onAdd({ title: title.trim(), url: url.trim(), category: category.trim(), notes: notes.trim() })
    setFields({ title: '', url: '', category: '', notes: '' })
  }

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  return (
    <div className="add-form-panel">
      <div
        className={`add-form-header${isOpen ? ' open' : ''}`}
        onClick={() => setIsOpen(o => !o)}
      >
        <div className="add-form-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Bookmark
        </div>
        <svg className={`chevron${isOpen ? ' open' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      <div className={`add-form-body${isOpen ? ' open' : ''}`}>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="f-title">Title *</label>
              <input
                type="text"
                id="f-title"
                name="title"
                placeholder="e.g. GitHub"
                value={fields.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="f-url">URL *</label>
              <input
                type="url"
                id="f-url"
                name="url"
                placeholder="https://..."
                value={fields.url}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="f-category">Category</label>
              <input
                type="text"
                id="f-category"
                name="category"
                placeholder="e.g. Dev Tools"
                value={fields.category}
                onChange={handleChange}
                list="category-list"
              />
              <datalist id="category-list">
                {categories.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div className="form-group">
              <label htmlFor="f-notes">Notes (optional)</label>
              <input
                type="text"
                id="f-notes"
                name="notes"
                placeholder="Short description..."
                value={fields.notes}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Add Bookmark</button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setFields({ title: '', url: '', category: '', notes: '' })}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
