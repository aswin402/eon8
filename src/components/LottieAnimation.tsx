import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  src: string;
  className?: string;
  loop?: boolean;
}

interface LottieComponentType {
  default?: React.ComponentType<{ animationData: unknown; loop?: boolean }>;
}

// Handle Vite ESM/CommonJS default export wrapper mismatch
const LottieComponent = (Lottie as unknown as LottieComponentType).default || (Lottie as unknown as React.ComponentType<{ animationData: unknown; loop?: boolean }>);

export function LottieAnimation({ src, className, loop = true }: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setIsLoading(true);
    setAnimationData(null);
  }

  useEffect(() => {
    let active = true;
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch Lottie JSON: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (active) {
          setAnimationData(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          console.error('Failed to load Lottie animation from URL:', src, err);
          setIsLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [src]);

  if (isLoading || !animationData) {
    return (
      <div 
        className={`w-full h-full min-h-[200px] flex items-center justify-center rounded-2xl bg-muted/20 animate-pulse ${className || ''}`} 
      />
    );
  }

  return (
    <div className={className}>
      <LottieComponent animationData={animationData} loop={loop} />
    </div>
  );
}

