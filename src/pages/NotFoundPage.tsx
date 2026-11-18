import { Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import { PageSeo } from '@/components/sections';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-32 pb-28 text-center animate-in fade-in duration-700">
      <PageSeo
        title="Page Not Found | EON8"
        description="The page you are looking for could not be found."
      />

      <div className="relative mb-8">
        <h1 className="text-[10rem] sm:text-[12rem] font-black leading-none tracking-tighter text-muted-foreground/10 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-3xl sm:text-4xl font-heading font-black tracking-tight">
            PAGE NOT FOUND
          </p>
        </div>
      </div>

      <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold transition-all hover:gap-4 hover:pr-10 hover:shadow-xl active:scale-95 no-underline"
      >
        <MoveLeft className="w-5 h-5" /> Back to Home
      </Link>
    </div>
  );
}
