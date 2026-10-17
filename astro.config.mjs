import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import expressiveCode from 'astro-expressive-code'
import { unified } from '@astrojs/markdown-remark'
import tailwindcss from '@tailwindcss/vite'

// Keep wide article tables reachable for keyboard scrolling, even without JS.
function focusableTables() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'element' && node.tagName === 'table') {
        node.properties ??= {}
        node.properties.tabIndex = 0
      }
      node.children?.forEach(visit)
    }
    visit(tree)
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.marcopicanco.com',
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: false,
    processor: unified({ rehypePlugins: [focusableTables] }),
  },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data:",
        "connect-src 'self' https://cloudflareinsights.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: {
        resources: [
          { resource: "'self'", kind: 'element' },
          {
            resource: 'https://static.cloudflareinsights.com',
            kind: 'element',
          },
        ],
      },
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
      plugins: [
        {
          name: 'Keyboard-accessible code blocks',
          hooks: {
            postprocessRenderedBlock: ({ renderData }) => {
              const visit = (node) => {
                if (node.tagName === 'pre') node.properties.tabIndex = 0
                node.children?.forEach(visit)
              }
              visit(renderData.blockAst)
            },
          },
        },
      ],
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
