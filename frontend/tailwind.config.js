/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
        'enterprise-white': 'var(--enterprise-white)',
        'enterprise-blue': 'var(--enterprise-blue)',
        'enterprise-grey': 'var(--enterprise-grey)',
        'royal-teal': 'var(--royal-teal)',
        'royal-white': 'var(--royal-white)',
        'garden-sky': 'var(--garden-sky)',
        'garden-light': 'var(--garden-light)',
        'garden-meadow': 'var(--garden-meadow)',
        'garden-green-light': 'var(--garden-green-light)',
        'garden-green-medium': 'var(--garden-green-medium)',
        'garden-green-dark': 'var(--garden-green-dark)',
        'garden-brown-trunk': 'var(--garden-brown-trunk)',
        'garden-leaf-accent': 'var(--garden-leaf-accent)',
        'garden-dark': 'var(--garden-dark)',
        'garden-text': 'var(--garden-text)',
        'garden-aqua': {
          50: 'var(--garden-aqua-50)',
          100: 'var(--garden-aqua-100)',
          200: 'var(--garden-aqua-200)',
          300: 'var(--garden-aqua-300)',
          400: 'var(--garden-aqua-400)',
          500: 'var(--garden-aqua-500)',
          600: 'var(--garden-aqua-600)',
          700: 'var(--garden-aqua-700)',
          800: 'var(--garden-aqua-800)',
          900: 'var(--garden-aqua-900)',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
