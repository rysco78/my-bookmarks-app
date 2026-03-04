import { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'

export default function AddBookmarkForm({ categories, onAdd }) {
  const [expanded, setExpanded] = useState(false)
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
    <Accordion expanded={expanded} onChange={(_, v) => setExpanded(v)} sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddIcon fontSize="small" />
          <Typography fontWeight={500}>Add Bookmark</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit}>
          <datalist id="category-list">
            {categories.map(c => <option key={c} value={c} />)}
          </datalist>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                fullWidth
                label="Title *"
                name="title"
                placeholder="e.g. GitHub"
                value={fields.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                fullWidth
                label="URL *"
                name="url"
                type="url"
                placeholder="https://..."
                value={fields.url}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                fullWidth
                label="Category"
                name="category"
                placeholder="e.g. Dev Tools"
                value={fields.category}
                onChange={handleChange}
                inputProps={{ list: 'category-list' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                fullWidth
                label="Notes (optional)"
                name="notes"
                placeholder="Short description..."
                value={fields.notes}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button type="submit" variant="contained">Add Bookmark</Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="inherit"
                  onClick={() => setFields({ title: '', url: '', category: '', notes: '' })}
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </AccordionDetails>
    </Accordion>
  )
}
