// Basic options
const options = {

    // Entry points and a path to a final bundle
    entryPoints: ['src/index.ts'],
    outdir: 'dist',

    // Whether to bundle together, minify and add a source map
    bundle: true,
    minify: true,
    sourcemap: true,

    // A target environment (esbuild doesn’t support this option specified in tsconfig.json)
    target: 'es6',

    // Log level is specified in order to print basic information even when launched as an npm script from package.json
    logLevel: 'info'
}

// Different types of builds
const builds = {

    // The default one. Contains only the options listed above
    'build': () => options,

    // The watching one. Contains additional flag asking esbuild to watch for changes
    'watch': () => ({ ...options, watch: true })
}

/* 
Run the config. A command of type `node esbuild.js watch` should be used. The third element of the command will be used as a build name
*/
require('esbuild')
    .build(builds[process.argv[2]]())
    .catch(e => {
        console.error(e)
        process.exit(1)
    })