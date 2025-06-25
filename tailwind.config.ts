// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['VT323', 'monospace'], // Torna VT323 a fonte padrão
        mono: ['VT323', 'monospace'], // Para classes font-mono também
      },
      colors: {
        // Cores personalizadas para o Nokia (opcional)
        nokia: {
          blue: '#1e3a8a',
          green: '#166534',
          screen: '#dcfce7',
        }
      },
      spacing: {
        // Espaçamentos personalizados (opcional)
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        // Bordas arredondadas personalizadas (opcional)
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        // Sombras personalizadas para o efeito 3D (opcional)
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
        'nokia': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
