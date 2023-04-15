import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import reactSvgPlugin from 'vite-plugin-react-svg'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default ({ command }) => {
    const isDev = command === 'serve'

    return defineConfig({
        base: '',
        css: {
            modules: {
                generateScopedName: isDev ? '[name]__[local]___[hash:base64:5]' : undefined,
            },
        },
        plugins: [
            react(),
            reactSvgPlugin({
                defaultExport: 'component',
                expandProps: 'end',
            }),
            tsconfigPaths(),
        ],
    })
}
