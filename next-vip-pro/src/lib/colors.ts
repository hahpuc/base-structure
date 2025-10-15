// Color Palette Reference for VIP Pro Next.js
// This file documents the complete color system used throughout the application

export const colorPalette = {
  // Light Mode Colors
  light: {
    // Base colors
    background: "hsl(0, 0%, 100%)", // White
    foreground: "hsl(0, 0%, 9%)", // Near black

    // Surface colors
    muted: "hsl(210, 40%, 96%)", // Light gray
    mutedForeground: "hsl(215, 16%, 47%)", // Medium gray

    // Interactive surfaces
    popover: "hsl(0, 0%, 100%)", // White
    popoverForeground: "hsl(0, 0%, 9%)", // Near black
    card: "hsl(0, 0%, 100%)", // White
    cardForeground: "hsl(0, 0%, 9%)", // Near black

    // Borders and inputs
    border: "hsl(214, 32%, 91%)", // Light border
    input: "hsl(214, 32%, 91%)", // Input border

    // Brand colors
    primary: "hsl(221, 83%, 53%)", // Blue
    primaryForeground: "hsl(0, 0%, 100%)", // White

    // Secondary colors
    secondary: "hsl(210, 40%, 96%)", // Light gray
    secondaryForeground: "hsl(222, 84%, 5%)", // Dark

    // Accent colors
    accent: "hsl(210, 40%, 96%)", // Light gray
    accentForeground: "hsl(222, 84%, 5%)", // Dark

    // Semantic colors
    destructive: "hsl(0, 84%, 60%)", // Red
    destructiveForeground: "hsl(0, 0%, 100%)", // White
    success: "hsl(142, 76%, 36%)", // Green
    successForeground: "hsl(0, 0%, 100%)", // White
    warning: "hsl(38, 92%, 50%)", // Orange
    warningForeground: "hsl(0, 0%, 100%)", // White
    info: "hsl(221, 83%, 53%)", // Blue
    infoForeground: "hsl(0, 0%, 100%)", // White

    // Focus ring
    ring: "hsl(221, 83%, 53%)", // Blue
  },

  // Dark Mode Colors
  dark: {
    // Base colors
    background: "hsl(0, 0%, 4%)", // Very dark
    foreground: "hsl(0, 0%, 93%)", // Light gray

    // Surface colors
    muted: "hsl(217, 33%, 17%)", // Dark gray
    mutedForeground: "hsl(215, 20%, 65%)", // Medium gray

    // Interactive surfaces
    popover: "hsl(0, 0%, 4%)", // Very dark
    popoverForeground: "hsl(0, 0%, 93%)", // Light gray
    card: "hsl(0, 0%, 4%)", // Very dark
    cardForeground: "hsl(0, 0%, 93%)", // Light gray

    // Borders and inputs
    border: "hsl(217, 33%, 17%)", // Dark border
    input: "hsl(217, 33%, 17%)", // Input border

    // Brand colors
    primary: "hsl(217, 91%, 60%)", // Lighter blue
    primaryForeground: "hsl(222, 84%, 5%)", // Very dark

    // Secondary colors
    secondary: "hsl(217, 33%, 17%)", // Dark gray
    secondaryForeground: "hsl(210, 40%, 98%)", // Very light

    // Accent colors
    accent: "hsl(217, 33%, 17%)", // Dark gray
    accentForeground: "hsl(210, 40%, 98%)", // Very light

    // Semantic colors
    destructive: "hsl(0, 63%, 31%)", // Dark red
    destructiveForeground: "hsl(0, 0%, 93%)", // Light gray
    success: "hsl(142, 76%, 36%)", // Green (same as light)
    successForeground: "hsl(0, 0%, 93%)", // Light gray
    warning: "hsl(38, 92%, 50%)", // Orange (same as light)
    warningForeground: "hsl(222, 84%, 5%)", // Very dark
    info: "hsl(217, 91%, 60%)", // Lighter blue
    infoForeground: "hsl(222, 84%, 5%)", // Very dark

    // Focus ring
    ring: "hsl(217, 91%, 60%)", // Lighter blue
  },
};

// Utility functions for color usage
export const getColorValue = (
  color: string,
  mode: "light" | "dark" = "light"
) => {
  return colorPalette[mode][color as keyof typeof colorPalette.light];
};

// CSS Custom Properties Map
export const cssVariables = {
  light: {
    "--background": "0 0% 100%",
    "--foreground": "0 0% 9%",
    "--muted": "210 40% 96%",
    "--muted-foreground": "215 16% 47%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "0 0% 9%",
    "--card": "0 0% 100%",
    "--card-foreground": "0 0% 9%",
    "--border": "214 32% 91%",
    "--input": "214 32% 91%",
    "--primary": "221 83% 53%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "210 40% 96%",
    "--secondary-foreground": "222 84% 5%",
    "--accent": "210 40% 96%",
    "--accent-foreground": "222 84% 5%",
    "--destructive": "0 84% 60%",
    "--destructive-foreground": "0 0% 100%",
    "--success": "142 76% 36%",
    "--success-foreground": "0 0% 100%",
    "--warning": "38 92% 50%",
    "--warning-foreground": "0 0% 100%",
    "--info": "221 83% 53%",
    "--info-foreground": "0 0% 100%",
    "--ring": "221 83% 53%",
  },
  dark: {
    "--background": "0 0% 4%",
    "--foreground": "0 0% 93%",
    "--muted": "217 33% 17%",
    "--muted-foreground": "215 20% 65%",
    "--popover": "0 0% 4%",
    "--popover-foreground": "0 0% 93%",
    "--card": "0 0% 4%",
    "--card-foreground": "0 0% 93%",
    "--border": "217 33% 17%",
    "--input": "217 33% 17%",
    "--primary": "217 91% 60%",
    "--primary-foreground": "222 84% 5%",
    "--secondary": "217 33% 17%",
    "--secondary-foreground": "210 40% 98%",
    "--accent": "217 33% 17%",
    "--accent-foreground": "210 40% 98%",
    "--destructive": "0 63% 31%",
    "--destructive-foreground": "0 0% 93%",
    "--success": "142 76% 36%",
    "--success-foreground": "0 0% 93%",
    "--warning": "38 92% 50%",
    "--warning-foreground": "222 84% 5%",
    "--info": "217 91% 60%",
    "--info-foreground": "222 84% 5%",
    "--ring": "217 91% 60%",
  },
};

export default colorPalette;
