import { createTheme } from '@mui/material/styles'

export function buildTheme(mode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#7c3aed',
      },
      ...(mode === 'dark' && {
        background: {
          default: '#0f172a',
          paper: '#1e293b',
        },
      }),
    },
    shape: {
      borderRadius: 10,
    },
  })
}
