# Figma Plugin Boilerplate

This is a small template that can be used to create a Figma plugin. It relies on Webpack to compile TypeScript code 
into `.js`-files and currently doesn't provide the ability to create a GUI (probably will add an `ui.html` later). Suits well to quickly create simple plugins. 

## How to use
1. Install developer dependencies using `npm install -D` command.
2. In Figma, go to `Plugins` → `Development` → `New Plugin…` and enter your plugin name (here you can type an arbitary title, it won’t be used anywhere). 
3. On the same screen, choose the type of the plugin: it could be either `Figma design + FigJam` or just `Figma design`. After that, click “Next“.
4. Figma suggests different templates depending on which plugin you want to create: `Empty`, `Run once`, `With UI & browser APIs`. Since we’re gonna write our plugin from scratch, you can select any of the three options. 
5. Click “Save as“ and specify a temporary folder where you'd want to save Figma's output.
6. Open that folder, find `manifest.json` and copy the values of the properties called `id` and `editorType`. Paste these values to the `manifest.json` stored in this project.
7. Back in Figma, go to `Plugins` → `Manage Plugins…`, find the plugin you’ve created and remove it. 
8. Then, go to `Plugins` → `Development` → `Import plugin from manifest…` and select `manifest.json` *stored in this project*.
9.  Write some code, save and build it using either `npm run build` or `npm run watch` command.

## References
1. [Figma's introduction to plugin development](https://www.figma.com/plugin-docs/intro/)
2. [API Reference](https://www.figma.com/plugin-docs/api/api-overview/)
