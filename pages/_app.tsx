import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Dynamically load Google Fonts
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;700&display=swap';
    document.head.appendChild(linkEl);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(linkEl);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      
      {/* Only include React Query DevTools in development */}
      {process.env.NODE_ENV === 'development' && 
        <ReactQueryDevtools initialIsOpen={false} />
      }
    </QueryClientProvider>
  );
}