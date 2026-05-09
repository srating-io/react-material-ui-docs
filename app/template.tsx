'use client';

/* eslint-disable no-underscore-dangle */

import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import { Style } from '@esmalley/ts-utils';

import Sidebar from '../components/Sidebar';
import { ThemeProvider, Themes, Toast, UXBaseline } from '@esmalley/react-material-ui';
import dynamic from 'next/dynamic';


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

const Base = ({ children }: { children: React.ReactNode }) => {

  const [themeMode, setTheme] = useState<Themes>(getInitialMode);

  // Register/unregister the setter on mount/unmount
  useEffect(() => {
    setTheme_ = setTheme;
    return () => { setTheme_ = null; };
  }, [setTheme]);



  return (
    <ThemeProvider theme={themeMode}>
      <UXBaseline />
      <Header />
      <div
        className={Style.getStyleClassName({ 
          paddingTop: '64px', // Desktop fallback
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden', 
          boxSizing: 'border-box',
          // Mobile overrides handled instantly by browser CSS
          '@media (max-width: 599px)': {
            paddingTop: '56px'
          }
        })}
      >
        <div className={Style.getStyleClassName({ display: 'flex', flex: 1, overflow: 'hidden' })}>
          <Sidebar key="sidebar" />
          <div className={Style.getStyleClassName({ width: '100%', flexShrink: 1, overflowY: 'auto', padding: '10px 10px 56px 10px' })}>
            {children}
          </div>
        </div>
      </div>
      <Toast />
    </ThemeProvider>
  );
};

const Template = dynamic(() => Promise.resolve(Base), {
  ssr: false,
  loading: () => <div style={{ height: '100vh', backgroundColor: '#121212' }} />
});

export default Template;
