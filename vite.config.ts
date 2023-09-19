import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src')
      }
    },
    plugins: [
      vue(),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        exclude: [
          '**/components/**/*.{vue,ts,js}',
          '**/composables/**/*.{vue,ts,js}',
          '**/hooks/**/*.{vue,ts,js}'
        ]
      }),
      Layouts(),
      // https://github.com/unplugin/unplugin-auto-import
      AutoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue\??/ // .vue
        ],
        // global imports to register
        imports: [
          // presets
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core'
        ] as any
      }),
      // https://github.com/unplugin/unplugin-vue-components
      Components({
        dts: true,
        resolvers: [
          name => {
            // where `name` is always CapitalCase
            if (name.startsWith('App')) {
              return { importName: 'default', from: `./components/${kebabCase(name)}/index.vue` }
            }
          }
        ]
      })
    ]
  }
})
