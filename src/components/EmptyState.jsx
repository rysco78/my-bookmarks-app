import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

export default function EmptyState({ hasBookmarks }) {
  return (
    <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 10, color: 'text.secondary' }}>
      <BookmarkBorderIcon sx={{ fontSize: 64, mb: 2, opacity: 0.4 }} />
      <Typography variant="h6" gutterBottom>
        {hasBookmarks ? 'No results found' : 'No bookmarks yet'}
      </Typography>
      <Typography variant="body2">
        {hasBookmarks ? 'Try a different search or category.' : 'Add your first bookmark above.'}
      </Typography>
    </Box>
  )
}
