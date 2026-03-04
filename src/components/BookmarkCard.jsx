import { useState, useEffect, useRef } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const fadeIn = {
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(6px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  animation: 'fadeIn 0.2s ease',
}

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
      <Card sx={fadeIn} onKeyDown={handleKeyDown}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <TextField
            inputRef={titleRef}
            size="small"
            fullWidth
            label="Title"
            name="title"
            value={fields.title}
            onChange={handleChange}
            required
          />
          <TextField
            size="small"
            fullWidth
            label="URL"
            name="url"
            type="url"
            value={fields.url}
            onChange={handleChange}
          />
          <TextField
            size="small"
            fullWidth
            label="Category"
            name="category"
            value={fields.category}
            onChange={handleChange}
            inputProps={{ list: 'category-list' }}
          />
          <TextField
            size="small"
            fullWidth
            label="Notes"
            name="notes"
            value={fields.notes}
            onChange={handleChange}
          />
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button variant="contained" size="small" onClick={handleSave}>Save</Button>
          <Button variant="outlined" color="inherit" size="small" onClick={onCancel}>Cancel</Button>
        </CardActions>
      </Card>
    )
  }

  return (
    <Card
      sx={{
        ...fadeIn,
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ flexGrow: 1, mr: 1 }}>
            {bookmark.title}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit(bookmark.id)} aria-label={`Edit ${bookmark.title}`}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => onDelete(bookmark.id)} aria-label={`Delete ${bookmark.title}`}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Link
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: bookmark.category || bookmark.notes ? 1.5 : 0 }}
        >
          <OpenInNewIcon sx={{ fontSize: 13 }} />
          {domain}
        </Link>
        {(bookmark.category || bookmark.notes) && <Divider sx={{ mb: 1.5 }} />}
        {bookmark.category && (
          <Chip label={bookmark.category} variant="outlined" size="small" sx={{ mb: bookmark.notes ? 1 : 0 }} />
        )}
        {bookmark.notes && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: bookmark.category ? 1 : 0 }}>
            {bookmark.notes}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
