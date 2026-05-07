'use client';

/* eslint-disable no-underscore-dangle */

import React, { useEffect, useState } from 'react';

import Header from 'components/Header';
import { Style } from '@esmalley/ts-utils';

import Sidebar from 'components/Sidebar';
import { ThemeProvider, Themes, useWindowDimensions, UXBaseline } from '@esmalley/react-material-ui';


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


const Template = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowDimensions();

  const [themeMode, setTheme] = useState<Themes>(getInitialMode);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Register/unregister the setter on mount/unmount
  useEffect(() => {
    setTheme_ = setTheme;
    return () => { setTheme_ = null; };
  }, [setTheme]);


  let paddingTop = '64px';

  if (width < 600) {
    paddingTop = '56px';
  }

  return (
    <ThemeProvider theme={themeMode}>
      <UXBaseline />
      {
        isMounted ?
        <>
          <Header />
          <div
            className={Style.getStyleClassName({ paddingTop, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxSizing: 'border-box' })}
          >
            <div className={Style.getStyleClassName({ display: 'flex', flex: 1, overflow: 'hidden' })}>
              <Sidebar />
              <div className={Style.getStyleClassName({ width: '100%', flexShrink: 1, overflowY: 'auto', padding: '10px 10px 56px 10px' })}>
                {children}
              </div>
            </div>
          </div>
        </>
        : ''
      }
    </ThemeProvider>
  );
};

export default Template;
