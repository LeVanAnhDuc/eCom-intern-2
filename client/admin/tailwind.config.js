/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e9f9fc',
                    100: '#c1ecf4',
                    200: '#99dae5',
                    300: '#66bbca',
                    400: '#1f91a5',
                    500: '#0d535f',
                    600: '#094651',
                    700: '#063b44',
                    800: '#042f37',
                    900: '#022126',
                },
                grey: {
                    50: '#f3f6f9',
                    100: '#e5eaf2',
                    200: '#dae2ed',
                    300: '#c7d0dd',
                    400: '#b0b8c4',
                    500: '#9da8b7',
                    600: '#6b7a90',
                    700: '#434d5b',
                    800: '#303740',
                    900: '#1c2025',
                },
            },
            keyframes: {},
            animation: {
                'spin-slow': 'spin 3s linear infinite',
            },
            backgroundImage: {
                'login-banner': "url('./src/assets/img/banner-login.gif')",
                'register-banner': "url('./src/assets/img/banner-register.gif')",
                'icon-rotate': "url('./src/assets/img/icon-rotate.gif')",
                'homepage-banner': "url('./src/assets/img/home-page/bg-banner.png')",
                'shop-banner': "url('./src/assets/img/shop/banner.png')",
            },
        },
    },
    plugins: [],
};
