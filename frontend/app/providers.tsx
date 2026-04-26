'use client';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { PropsWithChildren, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/lib/theme-types';
import { SUBMISSION_COLOR_MAPPINGS } from '@/lib/theme-types';

function useTheme() {
  return useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#0f62fe',
          },
          background: {
            default: '#f5f7fb',
          },
        },
        shape: { borderRadius: 8 },
        submissionColorMappings: SUBMISSION_COLOR_MAPPINGS,
        heroGradient: 'linear-gradient(160deg, rgba(15,98,254,0.06) 0%, #ffffff 55%)',
        customShadows: {
          card: '0 1px 3px rgba(0,0,0,0.04)',
          cardElevated: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
          cardHover: '0 4px 12px rgba(0,0,0,0.07)',
          heroHover: '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)',
          noteHover: '0 3px 12px rgba(0,0,0,0.07)',
        },
        customGradients: {
          heroHeader: 'linear-gradient(160deg, rgba(15,98,254,0.06) 0%, rgba(255,255,255,0) 60%)',
          avatar: 'linear-gradient(135deg, #0f62fe 0%, #0043ce 100%)',
        },
        customBgColors: {
          infoStrip: 'rgba(0,0,0,0.015)',
          documentHover: 'rgba(15,98,254,0.03)',
        },
      }),
    [],
  );
}

export default function Providers({ children }: PropsWithChildren) {
  const theme = useTheme();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
