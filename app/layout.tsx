import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/theme-provider';
import DarkModeButton from './components/Button/DarkModeButton';
import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Admin Youthplus',
  description: 'Admin work for youthplus',
  // icons: {
  //   icon: [
  //     {url: '/favicon.ico'},
  //     {url: '/icon.png', type: 'image/png'}
  //   ],
  //   apple: [
  //     {url: 'apple-icon.png'}
  //   ]
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <DarkModeButton />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
