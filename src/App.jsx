import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header.jsx'
import AddBookmarkForm from './components/AddBookmarkForm.jsx'
import Toolbar from './components/Toolbar.jsx'
import BookmarkCard from './components/BookmarkCard.jsx'
import EmptyState from './components/EmptyState.jsx'

const STORAGE_KEY = 'bookmarks_v1'
const THEME_KEY = 'bookmarks_theme'

const SAMPLES = [
  { id: 1, title: 'GitHub', url: 'https://github.com', category: 'Dev Tools', notes: 'Code hosting and collaboration platform' },
  { id: 2, title: 'MDN Web Docs', url: 'https://developer.mozilla.org', category: 'Dev Tools', notes: 'Comprehensive web development documentation' },
  { id: 3, title: 'Hacker News', url: 'https://news.ycombinator.com', category: 'News', notes: 'Tech news and startup discussions' },
  { id: 4, title: 'CSS-Tricks', url: 'https://css-tricks.com', category: 'Design', notes: 'Tips and tricks for modern CSS' },
  { id: 5, title: 'OpenAI ChatGPT', url: 'https://chat.openai.com', category: 'AI', notes: 'Conversational AI assistant' },
  { id: 6, title: 'Excalidraw', url: 'https://excalidraw.com', category: 'Design', notes: 'Virtual whiteboard for sketching diagrams' },
]

function loadBookmarks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return null
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function App() {
  const [bookmarks, setBookmarks] = useState(() => loadBookmarks() ?? SAMPLES)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [isDark, setIsDark] = useState(() => loadTheme())

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
  }, [bookmarks])

  // Persist + apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  const categories = useMemo(() => {
    const cats = [...new Set(bookmarks.map(b => b.category).filter(Boolean))].sort()
    return ['All', ...cats]
  }, [bookmarks])

  const filteredBookmarks = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return bookmarks.filter(b => {
      const matchesSearch = !q ||
        b.title.toLowerCase().includes(q) ||
        (b.category || '').toLowerCase().includes(q) ||
        (b.notes || '').toLowerCase().includes(q)
      const matchesCat = activeCategory === 'All' || b.category === activeCategory
      return matchesSearch && matchesCat
    })
  }, [bookmarks, searchQuery, activeCategory])

  function handleAdd({ title, url, category, notes }) {
    setBookmarks(prev => [{ id: Date.now(), title, url, category, notes }, ...prev])
    if (activeCategory !== 'All' && category !== activeCategory) setActiveCategory('All')
  }

  function handleEdit(id) {
    setEditingId(id)
  }

  function handleSave(id, updated) {
    setBookmarks(prev => prev.map(b => b.id === id ? { ...b, ...updated } : b))
    setEditingId(null)
  }

  function handleCancel() {
    setEditingId(null)
  }

  function handleDelete(id) {
    setBookmarks(prev => prev.filter(b => b.id !== id))
    if (editingId === id) setEditingId(null)
  }

  const nonAllCategories = categories.filter(c => c !== 'All')

  return (
    <>
      <Header isDark={isDark} onToggleDark={() => setIsDark(d => !d)} />
      <main>
        <AddBookmarkForm categories={nonAllCategories} onAdd={handleAdd} />
        <Toolbar
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="stats-bar">
          Showing <span>{filteredBookmarks.length}</span> of <span>{bookmarks.length}</span> bookmark{bookmarks.length !== 1 ? 's' : ''}
        </div>
        <div className="cards-grid">
          {filteredBookmarks.length === 0 ? (
            <EmptyState hasBookmarks={bookmarks.length > 0} />
          ) : (
            filteredBookmarks.map(b => (
              <BookmarkCard
                key={b.id}
                bookmark={b}
                isEditing={editingId === b.id}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </main>
    </>
  )
}
