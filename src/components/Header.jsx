import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

export default function Header({ isDark, onToggleDark }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <BookmarkIcon sx={{ mr: 1.5 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" lineHeight={1.2}>
            My Bookmarks
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Your personal bookmark dashboard
          </Typography>
        </Box>
        <IconButton color="inherit" onClick={onToggleDark} aria-label="Toggle dark mode">
          {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
