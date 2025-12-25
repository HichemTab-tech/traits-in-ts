import { defineConfig } from 'vite';
import { resolve } from 'path';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    root: 'demo', // Set the root directory to the demo folder
    build: {
        outDir: resolve(__dirname, 'dist-demo'), // Output for the demo build (optional)
    },
    resolve: {
        alias: {
            // Allow your demo to resolve your library directly
            'traits-in-ts': resolve(__dirname, '../src'),
        },
    },
    server: {
        port: 5021
    },
    plugins: [],
});
