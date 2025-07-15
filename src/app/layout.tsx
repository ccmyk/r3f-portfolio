// src/app/layout.tsx 
import { ClientLayout } from './ClientLayout';
import { montreal, montrealbook } from '@/lib/fonts';
import './globals.css';

export const metadata = {
  title: 'Chris Hall - Portfolio',
  description: 'Art Director and Designer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montreal.variable} ${montrealbook.variable}`}>
      <body>
        {/* ClientLayout now contains the ScrollProvider and other client components */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
