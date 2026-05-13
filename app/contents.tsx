'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider, Themes, UXBaseline, Toast } from '@esmalley/react-material-ui';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Style } from '@esmalley/ts-utils';

const localStorageKey = 'theme';

const getInitialMode = (): Themes => {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem(localStorageKey);
  if (stored) return stored as Themes;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

let setTheme_: ((mode: Themes) => void) | null = null;

export const set_theme_mode = (mode: Themes) => {
  localStorage.setItem(localStorageKey, mode);
  setTheme_?.(mode);
};

export default function Contents({ children }: { children: React.ReactNode }) {
  const [themeMode, setTheme] = useState<Themes>(getInitialMode);
  const [mounted, setMounted] = useState(false);
  
  // Register/unregister the setter on mount/unmount
  useEffect(() => {
    setTheme_ = setTheme;
    return () => { setTheme_ = null; };
  }, [setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent ANY rendering until the client is ready
  if (!mounted) return null;

  return (
    <ThemeProvider theme={themeMode}>
      <UXBaseline />
      <Header />
      <div className={Style.getStyleClassName({
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden', 
        paddingTop: '64px' // Match your header height
      })}>
        <div className={Style.getStyleClassName({ display: 'flex', flex: 1, overflow: 'hidden' })}>
          <Sidebar />
          <main className={Style.getStyleClassName({ width: '100%', flexShrink: 1, overflowY: 'auto', padding: '10px' })}>
            {children}
          </main>
        </div>
      </div>
      <Toast />
    </ThemeProvider>
  );
}