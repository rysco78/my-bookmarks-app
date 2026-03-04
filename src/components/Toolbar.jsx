import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Chip from '@mui/material/Chip'
import SearchIcon from '@mui/icons-material/Search'

export default function Toolbar({ searchQuery, onSearch, categories, activeCategory, onCategoryChange }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2, alignItems: { sm: 'center' } }}>
      <TextField
        size="small"
        placeholder="Search bookmarks..."
        value={searchQuery}
        onChange={e => onSearch(e.target.value)}
        sx={{ minWidth: 220, flexShrink: 0 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {categories.map(cat => (
          <Chip
            key={cat}
            label={cat}
            color={cat === activeCategory ? 'primary' : 'default'}
            variant={cat === activeCategory ? 'filled' : 'outlined'}
            onClick={() => onCategoryChange(cat)}
            size="small"
          />
        ))}
      </Box>
    </Box>
  )
}
