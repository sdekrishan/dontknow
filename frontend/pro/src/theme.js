// theme.ts

// 1. import `extendTheme` function
import { extendTheme} from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const breakpoints = {
  sm: '468px',
  md: '769px',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}
// 3. extend the theme
const theme = extendTheme({ config,breakpoints })

export default theme