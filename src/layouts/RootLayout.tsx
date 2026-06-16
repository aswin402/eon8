import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CaptureModal } from '@/components/CaptureModal';
import { FloatingWidgets } from '@/components/FloatingWidgets';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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
        <main className="pt-16 flex-grow">
          <Outlet />
        </main>
        <Footer />
        <CaptureModal />
        <FloatingWidgets />
      </div>
    </ThemeProvider>
  );
}
