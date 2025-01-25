'use client';
import { useThemeStore } from 'store';
import { cn } from 'lib/utils';
import { ReactToaster } from 'components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { SonnToaster } from 'components/ui/sonner';
import { useState, createContext, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Inter as customFont } from 'next/font/google';
export const PathContext = createContext();
const myFont = customFont({ subsets: ['latin'] });
const Providers = ({ children }) => {
  const { theme, radius } = useThemeStore();
  const [taskPath, setTaskPath] = useState('');
  useEffect(() => {
    // Function to remove the `data-scroll-locked` attribute
    function preventScrollLock() {
      const body = document.body;
      if (body.hasAttribute('data-scroll-locked')) {
        body.removeAttribute('data-scroll-locked');
      }
    }

    // Set up a MutationObserver to monitor changes to the <body> element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-scroll-locked'
        ) {
          preventScrollLock();
        }
      });
    });

    // Start observing the <body> for attribute changes
    observer.observe(document.body, { attributes: true });

    // Ensure `data-scroll-locked` is removed immediately on load
    preventScrollLock();

    // Cleanup the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <body
      className={cn('hasten-app', myFont.className, 'theme-' + theme)}
      style={{
        '--radius': `${radius}rem`,
      }}
    >
      <NextUIProvider>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <PathContext.Provider value={{ taskPath, setTaskPath }}>
            <div className={cn('h-full')}>
              {children}
              <ReactToaster />
            </div>
            <Toaster />
            <SonnToaster />
          </PathContext.Provider>
        </ThemeProvider>
      </NextUIProvider>
    </body>
  );
};
export default Providers;
