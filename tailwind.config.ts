import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: "#254849",
          50: "#f0f7f7",
          100: "#d9ebeb",
          200: "#b3d7d8",
          300: "#8dc3c4",
          400: "#4a8a8c",
          500: "#254849",
          600: "#1e3a3b",
          700: "#172c2d",
          800: "#101e1e",
          900: "#091010",
        },
        secondary: {
          DEFAULT: "#DABABA",
          50: "#F7EBEB",
          100: "#f9eded",
          200: "#f3dbdb",
          300: "#DABABA",
          400: "#c9a0a0",
          500: "#b88686",
          600: "#9a6868",
          700: "#7c5050",
          800: "#5e3838",
          900: "#402020",
        },
        "light-pink": {
          DEFAULT: "#F7EBEB",
        },
        carbon: {
          DEFAULT: "#616171",
        },
        accent: {
          DEFAULT: "#4495B2",
          50: "#f0f8fb",
          100: "#d9edf4",
          200: "#b3dbe9",
          300: "#8dc9de",
          400: "#67b7d3",
          500: "#4495B2",
          600: "#36778e",
          700: "#29596b",
          800: "#1b3b47",
          900: "#0e1e24",
        },
        gold: {
          DEFAULT: "#D4AF37",
          50: "#fdfbf0",
          100: "#f9f3d4",
          200: "#f2e6a9",
          300: "#ebd97e",
          400: "#e0c45a",
          500: "#D4AF37",
          600: "#aa8c2c",
          700: "#806921",
          800: "#554616",
          900: "#2b230b",
        },
        "rose-gold": {
          DEFAULT: "#B76E79",
          50: "#faf5f6",
          100: "#f2e4e6",
          200: "#e5c9cd",
          300: "#d8aeb4",
          400: "#c78e96",
          500: "#B76E79",
          600: "#925861",
          700: "#6e4249",
          800: "#492c30",
          900: "#251618",
        },
        // UI Colors (from brand guidelines)
        background: "#FAFAFA",
        foreground: "#616171",
        muted: {
          DEFAULT: "#F7EBEB",
          foreground: "#616171",
        },
        border: "#e5e5e5",
        input: "#e5e5e5",
        ring: "#254849",
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#16a34a",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#f59e0b",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        heading: ['"Antic Didone"', 'Georgia', 'serif'],
        body: ['Jost', '"Futura PT"', 'Futura', 'Trebuchet MS', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['2.25rem', { lineHeight: '1.25' }],
        'h3': ['1.5rem', { lineHeight: '1.3' }],
        'h4': ['1.25rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'elegant': '0 10px 40px -10px rgba(37, 72, 73, 0.15)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      aspectRatio: {
        'product': '3/4',
        'hero': '16/9',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
export default config;
