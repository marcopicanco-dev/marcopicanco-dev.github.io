import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import expressiveCode from 'astro-expressive-code'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.marcopicanco.com',
  markdown: {
    syntaxHighlight: false,
  },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data:",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self'",
      ],
      styleDirective: {
        resources: [
          { resource: "'self'", kind: 'element' },
          { resource: 'https://fonts.googleapis.com', kind: 'element' },
          { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
    },
  },
  integrations: [
    expressiveCode({
      themes: ['dracula', 'github-dark', 'github-light'],
      styleOverrides: {
        frames: {
          editorActiveTabIndicatorTopColor: 'transparent',
          editorActiveTabBorderColor: '#80808080',
          editorTabBarBorderBottomColor: '#80808080',
        },
        uiFontFamily: 'inherit',
        borderColor: '#80808080',
      },
    }),
    mdx(),
    react(),
  ],
})
