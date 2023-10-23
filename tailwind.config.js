import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                secondary: {
                    DEFAULT: colors.neutral[100],
                    hover: colors.neutral[200],
                    border: colors.neutral[400],
                    text: colors.zinc[500],
                    dark: colors.zinc[900],
                    ['dark-hover']: colors.zinc[950],
                },
            },
        },
    },
    plugins: [],
};
