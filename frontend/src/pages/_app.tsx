import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { theme } from '@/styles/theme';
import { Footer } from '@/components/Footer';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ pb: { xs: 6, sm: 8 } }}>
        <Component {...pageProps} />
      </Box>
      <Footer />
      <Toaster position="top-right" />
    </ThemeProvider>
  );
} 