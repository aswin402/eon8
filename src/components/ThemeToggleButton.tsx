import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

interface ThemeToggleButtonProps {
  className?: string;
}

export function ThemeToggleButton({ className }: ThemeToggleButtonProps) {
  const { theme, setTheme } = useThemeStore();

  const resolvedTheme =
    theme === 'system'
      ? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
      className={
        className ||
        'relative inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0'
      }
    >
      {resolvedTheme === 'dark' ? (
        <Moon className="h-[1.15rem] w-[1.15rem]" />
      ) : (
        <Sun className="h-[1.15rem] w-[1.15rem]" />
      )}
    </button>
  );
}
