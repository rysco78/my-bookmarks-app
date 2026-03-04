export default function EmptyState({ hasBookmarks }) {
  return (
    <div className="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      </svg>
      <h3>{hasBookmarks ? 'No results found' : 'No bookmarks yet'}</h3>
      <p>{hasBookmarks ? 'Try a different search or category.' : 'Add your first bookmark above.'}</p>
    </div>
  )
}
