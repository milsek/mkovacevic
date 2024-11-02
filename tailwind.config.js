tailwind.config = {
  content: ['./src/**/*.{html,js}'],
	theme: {
		extend: {
			fontFamily: {
					sans: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
			},
			spacing: {
					'84': '21rem',
					'88': '22rem',
			},
			colors: {
				background: '#F5F5F5'
			},
		}
	},
}