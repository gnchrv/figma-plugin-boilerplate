# Figma Plugin Boilerplate

> A template for creating Figma plugins using React and TypeScript and building them with [Vite](https://vitejs.dev) and [esbuild](https://esbuild.github.io). Contains the code of a sample plugin that creates rectangles on the canvas when user clicks a button.

![A demo of the sample plugin](https://github.com/gnchrv/figma-plugin-boilerplate/assets/10423326/ca1cfdf6-a2fa-4e72-998d-299b3384496c)

This is a boilerplate that helps to quickly start Figma plugin development without the need to configure compilers and bundlers, assuming you are familiar with React and TypeScript.

The template provides two separate folders to work independently on the backend logic and UI. The folders contain their own `tsconfig.json` files and provide additional configs for the respective bundlers. The `/plugin` folder includes the esbuild configuration file, while the `/ui` folder contains Vite settings.

In the `/plugin` folder, `index.ts` serves as an entry point for the backend logic, and in the `ui/` folder `main.tsx` serves the same purpose for the UI. Feel free to move things around and add additional structures inside these folders as needed. Don’t forget to adjust the config files in case the entry points are changed.

```
figma-plugin-boilerplate/
├─ plugin/
│  ├─ tsconfig.json
│  ├─ esbuild.msj
│  ├─ index.ts
│  ├─ …
├─ ui/
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  ├─ vite-env.d.ts
│  ├─ vite.config.ts
│  ├─ main.tsx
│  ├─ …
```

## Scripts from `package.json`
There are two sets of commands: one for working on the plugin logic and the other for building the UI. During the development process, run `plugin:dev` and `ui:dev` in parallel to track changes from both sides. To build the code, execute `plugin:build` followed by `ui:build`.

```json
"scripts": {
    "plugin:tsc": "tsc -p plugin/tsconfig.json",
    "plugin:esbuild": "node plugin/esbuild.mjs",
    "plugin:dev": "npm run plugin:esbuild -- watch",
    "plugin:build": "npm run plugin:tsc && npm run plugin:esbuild -- build",

    "ui:tsc": "tsc -p ui/tsconfig.json",
    "ui:vite": "vite --config ui/vite.config.ts",
    "ui:dev": "npm run ui:vite -- build --watch",
    "ui:build": "npm run ui:vite && npm run ui:tsc"
}
```

## How to create a new plugin
1. Clone this repository and install developer dependencies using `npm install -D` command.
2. In Figma, go to `Plugins` → `Development` → `New Plugin…` and enter your plugin name (it can be an arbitary string, it won’t be used anywhere). 
3. On the same screen, choose the type of the plugin: it could be either `Figma design + FigJam` or just `Figma design`. After that, click “Next“.
4. Figma suggests different templates depending on which plugin you want to create: `Empty`, `Run once`, `With UI & browser APIs`. Since we’re gonna write our plugin from scratch, you can select any of the three options. 
5. Click “Save as“ and specify a temporary folder where you'd want to save Figma’s output.
6. Open that folder, find `manifest.json` and copy the values of the properties called `id` and `editorType`. Paste these values to the `manifest.json` stored in the cloned repository.
7. Back in Figma, go to `Plugins` → `Manage Plugins…`, find the plugin you’ve created and remove it. 
8. Then, go to `Plugins` → `Development` → `Import plugin from manifest…` and select `manifest.json` *stored in this repository*.
9. Write some code, save and build it.

## References
1. [Figma's introduction to plugin development](https://www.figma.com/plugin-docs/intro/)
2. [API Reference](https://www.figma.com/plugin-docs/api/api-overview/)
