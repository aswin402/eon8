import { useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CaptureModal } from '@/components/CaptureModal';
import { FloatingWidgets } from '@/components/FloatingWidgets';
import { NeonCursor } from '@/components/NeonCursor';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-12 pt-36">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-3 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
        <div className="absolute w-6 h-6 bg-gradient-to-tr from-orange-500 to-blue-500 rounded-full blur-md opacity-40 animate-pulse" />
      </div>
    </div>
  );
}

export function RootLayout() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true, // Let Lenis handle its own RAF
    });

    // Synchronize ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <CaptureModal />
        <FloatingWidgets />
        <NeonCursor />
      </div>
    </ThemeProvider>
  );
}
