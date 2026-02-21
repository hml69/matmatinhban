import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'; // Global styles
import Navigation from '@/components/Navigation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata = {
  title: 'Ngôn ngữ Tình Bạn - Emoji Translator',
  description: 'Dịch văn bản thành emoji và ngược lại',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="font-sans bg-[#fdfcfb] text-slate-900">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
