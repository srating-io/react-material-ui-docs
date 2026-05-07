export const dynamic = 'force-dynamic';

import '../styles/global.css';
import 'typeface-roboto';

import React from 'react';

export default async function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <div id = 'menu-root'></div>
        {children}
      </body>
    </html>
  );
}

