import esbuild from 'esbuild'

/**
 * Common configuration options for several esbuild configs defined below
 * @type {import('esbuild').BuildOptions}
 */
const options = {

    // Entry points and the path to the final bundle
    entryPoints: ['plugin/index.ts'],
    outdir: 'dist/plugin',

    /* Point esbuild at the sandbox config explicitly. The neighbouring `tsconfig.json` is a solution file that holds no compiler options, so without this esbuild would find nothing and silently drop the `use strict` directive that `strict: true` implies */
    tsconfig: 'plugin/tsconfig.plugin.json',

    // Whether to bundle together, minify and add a source map
    bundle: true,
    minify: true,
    sourcemap: true,

    // A target environment (esbuild doesn’t support this option specified in tsconfig.json)
    target: 'es2020',

    // Log level is specified to print basic information even when esbuild launched as an npm script from package.json
    logLevel: 'info',

    define: {
        'process.env.EXAMPLE_API_KEY': JSON.stringify(process.env.EXAMPLE_API_KEY)
    }
}

/**
 * Different types of builds. Typing the map as a record allows it to be indexed by an arbitrary string that comes from the command line
 * @type {Record<string, () => Promise<unknown>>}
 */
const configs = {

    // The default one. Builds right away
    'build': () => esbuild.build(options),

    // The watching one. Sets the context first and starts the watch process later
    'watch': () => esbuild.context(options).then(r => r.watch())
}

/* 
Run the config. A command of the type `node esbuild.js watch` should be used. The third element of the command will be treated as a config name
*/
const name = process.argv[2]
const config = configs[name]

// Check if the specified config exists
if (!config) {
    const names = Object.keys(configs).join(', ')
    console.error(`Unknown config: ${name}. Expected: ${names}`)
    process.exit(1)
}

// Run the config
await config().catch(e => {
    console.error(e)
    process.exit(1)
})