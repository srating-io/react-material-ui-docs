export const dynamic = 'force-dynamic';

import '../styles/global.css';
import 'typeface-roboto';

import Contents from './contents';

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'sRating | Material UI',
  description: 'React material ui components',
  openGraph: {
    title: 'ux.srating.io',
    description: 'React material ui components',
  },
  twitter: {
    card: 'summary',
    title: 'React material ui components',
  },
};

export default async function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <div id = 'menu-root'></div>
        <Contents>{children}</Contents>
      </body>
    </html>
  );
}

