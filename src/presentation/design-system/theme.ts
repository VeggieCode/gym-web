export const theme = {
    colors: {
        // Primitives
        orange: {
            500: '#FF5722',
            600: '#E64A19'
        },
        gray: {
            400: '#B0BEC5',
            800: '#1E1E1E',
            900: '#121212'
        },
        red: {
            500: '#EF4444'
        },
        white: '#FFFFFF',

        // Semantics (Los que usaremos en los componentes)
        primary: {
            main: '#FF5722',   // primary-main
            hover: '#E64A19'   // primary-hover
        },
        background: {
            base: '#121212',   // bg-base (Fondo principal)
            surface: '#1E1E1E' // bg-surface (Tarjetas, Inputs, NavBar)
        },
        text: {
            primary: '#FFFFFF', // text-primary
            secondary: '#B0BEC5'// text-secondary
        },
        error: {
            main: '#EF4444'     // error-main
        },
        border: 'rgba(176, 190, 197, 0.15)' // Borde sutil para tarjetas
    },
    spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px'
    },
    borderRadius: {
        md: '8px',
        full: '999px'
    },
    elevation: {
        level1: '0 4px 8px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)',
        level2: '0 8px 16px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.1)'
    }
};