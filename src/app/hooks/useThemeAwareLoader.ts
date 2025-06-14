import { useState, useEffect, useCallback } from 'react';

interface LoadingOptions {
  title?: string;
  text?: string;
  duration?: number;
  showProgress?: boolean;
}

export const useThemeAwareLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingTitle, setLoadingTitle] = useState('Loading');
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [theme, setTheme] = useState('dark');

  const progressTexts = [
    'Initializing...',
    'Loading assets...',
    'Applying theme...',
    'Preparing interface...',
    'Almost ready...',
    'Complete!',
  ];

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-bs-theme', initialTheme);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', newTheme);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animateProgress = useCallback((duration: number) => {
    const steps = 10;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progressValue = (currentStep / steps) * 100;
      setProgress(progressValue);

      const textIndex = Math.floor((currentStep / steps) * progressTexts.length);
      if (textIndex < progressTexts.length) {
        setLoadingText(progressTexts[textIndex]);
      }

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const showLoading = useCallback(
    async ({ title = 'Loading', text = 'Please wait...', duration = 2000, showProgress = true }: LoadingOptions = {}) => {
      setLoadingTitle(title);
      setLoadingText(text);
      setProgress(0);
      setIsLoading(true);

      if (showProgress) {
        animateProgress(duration);
      }

      await new Promise((resolve) => setTimeout(resolve, duration));
      setIsLoading(false);
    },
    [animateProgress]
  );

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  }, [theme]);

  const onDataLoad = async (title: string = 'Data', options: LoadingOptions = {}) => {
    const { duration = 2000, showProgress = true } = options;

    setLoadingTitle(`Loading ${title}`);
    setIsLoading(true);
    setProgress(0);

    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 10;
          const textIndex = Math.floor((newProgress / 100) * (progressTexts.length - 1));
          setLoadingText(progressTexts[textIndex] || progressTexts[progressTexts.length - 1]);

          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsLoading(false);
              resolve();
            }, 500);
          }
          return Math.min(newProgress, 100);
        });
      }, duration / 10);
    });
  };

  return {
    isLoading,
    progress,
    loadingTitle,
    loadingText,
    theme,
    toggleTheme,
    showLoading,
    hideLoading,
    onDataLoad,
  };
};