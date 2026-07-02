/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backdropBlur: {
				sm: '4px',
			},
			colors: {
				primary: {
					DEFAULT: '#4F46E5',
					light: '#6366F1',
					dark: '#4338CA',
				},
				secondary: {
					DEFAULT: '#06B6D4',
					light: '#22D3EE',
					dark: '#0891B2',
				},
				accent: {
					DEFAULT: '#8B5CF6',
					light: '#A78BFA',
					dark: '#7C3AED',
				},
				background: {
					DEFAULT: '#09090B',
					light: '#18181B',
				},
				surface: {
					DEFAULT: '#18181B',
					light: '#27272A',
					dark: '#0F0F11',
				},
				text: {
					DEFAULT: '#FFFFFF',
					secondary: '#A1A1AA',
					muted: '#71717A',
				},
			},
			fontFamily: {
				geist: ['Geist', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
				satoshi: ['Satoshi', 'sans-serif'],
				manrope: ['Manrope', 'sans-serif'],
			},
			borderRadius: {
				'2xl': '1rem',
				'3xl': '1.5rem',
				'4xl': '2rem',
			},
			boxShadow: {
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				'glow': '0 0 20px rgba(79, 70, 229, 0.5)',
				'glow-sm': '0 0 10px rgba(79, 70, 229, 0.3)',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'spin-slow': 'spin 3s linear infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
			},
		},
	},
	plugins: [],
}
