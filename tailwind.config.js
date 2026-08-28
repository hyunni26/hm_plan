/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 메인 네이비 톤 (신뢰감, 프리미엄 느낌)
        navy: {
          50: '#eef2f8',
          100: '#d7e0ee',
          200: '#b0c1dd',
          300: '#89a3cc',
          400: '#5c7fb3',
          500: '#3a5f96',
          600: '#2a4a78',
          700: '#1f3a60', // 주 브랜드 컬러
          800: '#162a47',
          850: '#101f36',
          900: '#0b1626',
          950: '#060d17'
        },
        // 포르투갈: 테라코타/골드 계열, 이탈리아: 딥레드/올리브 계열을
        // 국가 배지·태그 등 포인트 컬러로 사용
        portugal: {
          light: '#f2c14e',
          DEFAULT: '#d99a2b',
          dark: '#a8721c'
        },
        italy: {
          light: '#e07a5f',
          DEFAULT: '#c1502f',
          dark: '#8f3a22'
        },
        gold: {
          light: '#f0d68a',
          DEFAULT: '#c9a45c',
          dark: '#9c7d3f'
        }
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif'
        ]
      },
      boxShadow: {
        card: '0 2px 12px -2px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 8px 24px -4px rgba(15, 23, 42, 0.14)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
}
