import type { Metadata, Viewport } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Toaster } from 'sonner';
import { SEO_CONFIG, CLUB_INFO } from '@/constants';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#10b981' },
    { media: '(prefers-color-scheme: dark)', color: '#065f46' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.url),
  title: {
    default: SEO_CONFIG.titleDefault,
    template: SEO_CONFIG.titleTemplate,
  },
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  authors: [{ name: CLUB_INFO.name, url: SEO_CONFIG.url }],
  creator: CLUB_INFO.name,
  publisher: CLUB_INFO.name,
  openGraph: {
    type: 'website',
    locale: 'ar_DZ',
    url: SEO_CONFIG.url,
    title: SEO_CONFIG.titleDefault,
    description: SEO_CONFIG.description,
    siteName: CLUB_INFO.name,
    images: [
      {
        url: SEO_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: CLUB_INFO.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.titleDefault,
    description: SEO_CONFIG.description,
    images: [SEO_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: CLUB_INFO.name,
    alternateName: CLUB_INFO.nameEn,
    url: SEO_CONFIG.url,
    logo: `${SEO_CONFIG.url}/assets/logo.png`,
    description: CLUB_INFO.description,
    email: CLUB_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tlemcen',
      addressCountry: 'DZ',
    },
  };

  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-sans antialiased selection:bg-emerald-500 selection:text-white flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            richColors
            closeButton
            dir="rtl"
            toastOptions={{
              style: {
                fontFamily: 'var(--font-cairo), sans-serif',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
