import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                secondary: {
                    // DEFAULT: colors.neutral[100],
                    DEFAULT: '#ffffff',
                    normal: '#1D1E24',
                    // hover: colors.neutral[200],
                    hot: colors.red[700],
                    hover: colors.neutral[100],
                    ['hot-hover']: colors.red[800],
                    ['hover-hover']: colors.neutral[300],
                    border: colors.neutral[400],
                    text: colors.zinc[500],
                    dark: colors.zinc[900],
                    ['dark-hover']: colors.zinc[950],
                },
            },
            fontFamily: {
                plusJakarta: ['Plus Jakarta Sans', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            screens: {
                xxs: '323px',
                xs: '390px',
            },
        },
    },
    plugins: [],
};
