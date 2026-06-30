import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['Karla', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['Karla', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        sm: "0 1px 2px 0 hsla(var(--shadow-color) / 0.10)",
        DEFAULT: "0 8px 24px hsla(var(--shadow-color) / 0.12)",
        md: "0 10px 30px hsla(var(--shadow-color) / 0.14)",
        lg: "0 12px 45px hsla(var(--shadow-color) / 0.16)",
        xl: "0 16px 70px hsla(var(--shadow-color) / 0.18)",
        "2xl": "0 24px 90px hsla(var(--shadow-color) / 0.20)",
      },
      colors: {
        border: "hsl(var(--border))",
        "icon-neutral": "hsl(var(--icon-neutral))",
        "icon-hover": "hsl(var(--icon-hover))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        live: "hsl(var(--live))",
        rule: "hsl(var(--rule))",
        "rule-strong": "hsl(var(--rule-strong))",
        surface: {
          DEFAULT: "hsl(var(--background))",
          raised: "hsl(var(--surface-raised))",
          sunk: "hsl(var(--surface-sunk))",
        },
        scope: {
          fullstack: "hsl(var(--scope-fs))",
          frontend: "hsl(var(--scope-fe))",
          backend: "hsl(var(--scope-be))",
          data: "hsl(var(--scope-da))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pulse-live": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--live) / 0.5)" },
          "50%": { boxShadow: "0 0 0 6px hsl(var(--live) / 0)" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-live": "pulse-live 2.4s ease-in-out infinite",
        "rise-in": "rise-in 600ms cubic-bezier(0.33,1,0.68,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
