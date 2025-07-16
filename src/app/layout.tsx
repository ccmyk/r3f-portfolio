// src/app/layout.tsx
import { montreal, montrealbook } from '@/lib/fonts';
import { AnimationProvider } from '@/providers/AnimationProvider';
import { ResponsiveProvider } from '@/providers/ResponsiveProvider';
import { MouseProvider } from '@/providers/MouseProvider';
import { MainCanvas } from '@/webgl/MainCanvas';
import { Footer } from '@/components/Footer';
import { Mouse } from '@/components/Mouse';
import './globals.css';

export const metadata = {
  title: 'Chris Hall | Portfolio',
  description: 'Interactive Designer & Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montreal.variable} ${montrealbook.variable}`}>
      <body id="root">
        <MouseProvider>
          <ResponsiveProvider>
            <AnimationProvider>
              <MainCanvas /> {/* Background WebGL layer */}
              {children}   {/* Main page content */}
              <Footer />     {/* Footer content */}
              <Mouse />      {/* Foreground cursor overlay */}
            </AnimationProvider>
          </ResponsiveProvider>
        </MouseProvider>
      </body>
    </html>
  );
}