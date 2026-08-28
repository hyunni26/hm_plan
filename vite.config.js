import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/favicon.ico', 'icons/apple-touch-icon.png'],
      manifest: {
        name: '신혼여행 - 포르투갈 & 이탈리아',
        short_name: '신혼여행',
        description: '포르투갈·이탈리아 신혼여행 일정/예약/가계부 관리',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // 여행 중 오프라인에서도 앱 셸이 뜨도록 캐싱
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin.includes('supabase.co'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 } // 1일
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
