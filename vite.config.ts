import { defineConfig } from 'vite'
import { resolve } from 'path'

const lib = process.env.LIBRARY ? {
    entry: resolve(__dirname, 'src/index.tsx'),
    name: 'Formial',
} : undefined

export default defineConfig({
    server: {
        port: 7711,
    },
    build: {
        lib,
        emptyOutDir: true,
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                'react',

            ],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'react',

                },
            },
        },
    },
})
