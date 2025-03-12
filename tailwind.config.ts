
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Cyberpunk specific colors
				cyber: {
					black: '#0a0a0f',
					darkgray: '#121222',
					blue: '#0df',
					pink: '#f0c',
					purple: '#93f',
					red: '#f55',
					green: '#0fa',
					yellow: '#ff0'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				cyber: ['JetBrains Mono', 'monospace'],
				sans: ['Inter', 'sans-serif'],
			},
			boxShadow: {
				'neon-blue': '0 0 5px #0df, 0 0 10px #0df',
				'neon-pink': '0 0 5px #f0c, 0 0 10px #f0c',
				'neon-purple': '0 0 5px #93f, 0 0 10px #93f',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'text-glitch': {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-3px, 2px)' },
					'40%': { transform: 'translate(-3px, -2px)' },
					'60%': { transform: 'translate(3px, 2px)' },
					'80%': { transform: 'translate(3px, -2px)' },
				},
				'glow-pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
				'hacker-text': {
					'0%': { color: '#0fa' },
					'50%': { color: '#0df' },
					'100%': { color: '#f0c' },
				},
				'scanline': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(100vh)' },
				},
				'flicker': {
					'0%, 100%': { opacity: '1' },
					'10%, 30%, 50%, 70%, 90%': { opacity: '0.8' },
					'20%, 40%, 60%, 80%': { opacity: '0.5' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'text-glitch': 'text-glitch 0.5s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'hacker-text': 'hacker-text 5s ease infinite',
				'scanline': 'scanline 8s linear infinite',
				'flicker': 'flicker 1s ease-in-out infinite',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
