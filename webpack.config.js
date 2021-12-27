const path = require('path')

module.exports = {
    // Output production-ready code with all the optimizations (see https://webpack.js.org/configuration/mode/)
    mode: 'production',

    // Consider index.ts as an entry point
    entry: './src/index.ts',

    // Specify rules for handling different file types
    module: {
        rules: [
            {
                // Find all .tsx files except those in /node_modules/ folder. Process them using ts-loader
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        // If multiple files share the same name but have different extensions, webpack will resolve the one with
        // the extension listed first in the array and skip the rest:
        // https://webpack.js.org/configuration/resolve/#resolveextensions. This list will enable us to leave off an extension when importing
        extensions: ['.ts', '.tsx', '.js']
    },

    // Save results in index.js file located in /dist
    output: {
        filename: 'index.js',
        path: path.resolve('dist')
    }
};