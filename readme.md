# Figma Plugin Boilerplate

This is a small template that can be used to create a Figma plugin. It relies on Webpack to compile TypeScript code 
into `.js`-files and currently doesn't provide the ability to create a GUI (probably will add an `ui.html` later). Suits very well to quickly create some simple plugins. 

## How to use
1. Install developer dependencies using `npm install -D` command.
2. In Figma, go to `Plugins` → `Development` → `New Plugin…`. Enter your plugin's name, click “Continue“, choose any of the three options and specify a temporary folder where you'd want to save Figma's output.
3. Open this folder, find `manifest.json` and copy the `id` value. Put it in the `manifest.json` stored in this project.
4. In Figma, go to `Plugins` → `Manage Plugins…`, find the plugin you created and remove it. Then, open once again `New Plugin…` window, click somewhere in the dashed area below the “Link existing plugin“ label and specify `manifest.json` *stored in this project*.
5. Write some code, save it and build using either `npm run build` or `npm run watch` command.

## References
1. [Figma's introduction to plugin development](https://www.figma.com/plugin-docs/intro/)
2. [API Reference](https://www.figma.com/plugin-docs/api/api-overview/)