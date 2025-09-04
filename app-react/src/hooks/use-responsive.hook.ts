import { useEffect, useState } from 'react';

// Breakpoints based on Tailwind CSS defaults
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

export interface UseResponsiveReturn {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  currentBreakpoint: BreakpointKey | 'xs';
  isBreakpoint: (breakpoint: BreakpointKey) => boolean;
  isAboveBreakpoint: (breakpoint: BreakpointKey) => boolean;
  isBelowBreakpoint: (breakpoint: BreakpointKey) => boolean;
}

export const useResponsive = (): UseResponsiveReturn => {
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: 1024, height: 768 }; // Default for SSR
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width, height } = windowSize;

  // Helper functions
  const isMobile = width < BREAKPOINTS.md;
  const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
  const isDesktop = width >= BREAKPOINTS.lg;

  const getCurrentBreakpoint = (): BreakpointKey | 'xs' => {
    if (width >= BREAKPOINTS['2xl']) return '2xl';
    if (width >= BREAKPOINTS.xl) return 'xl';
    if (width >= BREAKPOINTS.lg) return 'lg';
    if (width >= BREAKPOINTS.md) return 'md';
    if (width >= BREAKPOINTS.sm) return 'sm';
    return 'xs';
  };

  const isBreakpoint = (breakpoint: BreakpointKey): boolean => {
    return getCurrentBreakpoint() === breakpoint;
  };

  const isAboveBreakpoint = (breakpoint: BreakpointKey): boolean => {
    return width >= BREAKPOINTS[breakpoint];
  };

  const isBelowBreakpoint = (breakpoint: BreakpointKey): boolean => {
    return width < BREAKPOINTS[breakpoint];
  };

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    currentBreakpoint: getCurrentBreakpoint(),
    isBreakpoint,
    isAboveBreakpoint,
    isBelowBreakpoint,
  };
};
