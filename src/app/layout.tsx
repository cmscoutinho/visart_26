
import type {Metadata} from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/language-context';

export const metadata: Metadata = {
  title: 'VISART - Gaze Drawing Art Platform',
  description: 'An artistic experience where your gaze draws over the image.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 stroke=%22%2300f486%22 stroke-width=%2210%22 fill=%22none%22 /><circle cx=%2250%22 cy=%2250%22 r=%2215%22 fill=%22%2300f486%22 /></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/30 min-h-screen">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
