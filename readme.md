# Figma Plugin Boilerplate

> A little template for creating Figma plugins with React and TypeScript, while [Vite](https://vitejs.dev) and [esbuild](https://esbuild.github.io) are used to bundle the code. The code contains an example of the sample plugin that creates rectangles on the canvas when the user clicks a button.

![A demo of the sample plugin](https://github.com/gnchrv/figma-plugin-boilerplate/assets/10423326/ca1cfdf6-a2fa-4e72-998d-299b3384496c)

## Project Structure
The template provides two separate folders to work on the backend logic and the UI independently. Each folder contains its own `tsconfig.json` file and additional configs for the respective bundlers. The `/plugin` folder includes the esbuild configuration file, while the `/ui` folder contains Vite settings.

In the `/plugin` folder, `index.ts` serves as an entry point for the backend logic, while in the `ui/` folder, `main.tsx` serves the same purpose for the UI. Feel free to move things around and add additional structures inside these folders as needed. Don’t forget to adjust the config files in case the entry points are changed.

```
figma-plugin-boilerplate/
├─ plugin/
│  ├─ tsconfig.json
│  ├─ esbuild.mjs
│  ├─ environment.d.ts
│  ├─ index.ts
│  ├─ …
├─ ui/
│  ├─ tsconfig.json
│  ├─ tsconfig.app.json
│  ├─ tsconfig.node.json
│  ├─ vite-env.d.ts
│  ├─ vite.config.ts
│  ├─ main.tsx
│  ├─ …
├─ .env
```

## List of Scripts
There are two sets of commands in `package.json`: one covers the plugin logic and the other is for the UI development. Use `dev` to watch both sides at once and `build` to produce the production code — they are wrappers around the per-side scripts, which can also be run on their own.

```jsonc
"scripts": {
    // Everyday scripts, covering both sides at once
    "dev":            "concurrently --raw \"npm run plugin:dev\" \"npm run ui:dev\"",
    "build":          "npm run lint && npm run plugin:build && npm run ui:build",
    "lint":           "eslint . --max-warnings=0",

    // Plugin (aka backend) related scripts
    "plugin:tsc":     "tsc -b plugin/tsconfig.json",
    "plugin:dev":     "npm run esbuild -- watch",
    "plugin:build":   "npm run plugin:tsc && npm run esbuild -- build",

    // UI scripts
    "ui:tsc":         "tsc -b ui/tsconfig.json",
    "ui:dev":         "npm run vite:build -- --watch",
    "ui:build":       "npm run ui:tsc && npm run vite:build",

    // Technical scripts
    "esbuild":        "node --env-file=.env plugin/esbuild.mjs",
    "vite:build":     "vite build --config ui/vite.config.ts"
}
```

Both sides are type-checked before they are bundled, so a type error stops the build instead of producing artifacts from broken code.

## Environment Variables
Figma’s plugin sandbox has no Node.js runtime, so `process.env` does not exist there. Instead, the values are baked into the bundle at build time: Node reads `.env` via `--env-file`, and esbuild’s `define` option substitutes every `process.env.*` reference with a string literal. `plugin/environment.d.ts` declares a `process` constant so that TypeScript understands those references.

To add a variable, put it in `.env`, list it in the `define` map in `plugin/esbuild.mjs` and add it to `plugin/environment.d.ts`.

Keep in mind that a substituted value ends up in `dist/plugin/index.js` as plain text. This is convenient for configuration, but anyone who downloads the published plugin can read it — so don’t put a genuine secret there.

## Development Process
1. Clone this repository and install the dependencies using the `npm install` command.
2. In Figma, go to `Plugins` → `Development` → `New Plugin…` and enter your plugin name (it can be an arbitrary string, it won’t be used anywhere). 
3. On the same screen, choose the type of the plugin: it could be either `Figma design + FigJam` or just `Figma design`. After that, click “Next”.
4. Figma suggests different templates depending on which plugin you want to create: `Empty`, `Run once`, `With UI & browser APIs`. Since we’re gonna write our plugin from scratch, you can select any of the three options. 
5. Click “Save as” and specify a temporary folder where you'd want to save Figma’s output.
6. Open that folder, find `manifest.json` and copy the values of the properties called `id` and `editorType`. Paste these values to the `manifest.json` stored in the cloned repository.
7. Back in Figma, go to `Plugins` → `Manage Plugins…`, find the plugin you’ve created and remove it. 
8. Then, go to `Plugins` → `Development` → `Import plugin from manifest…` and select `manifest.json` *stored in this repository*.
9. Write some code, then run `npm run dev` to watch it or `npm run build` to produce a production bundle.

The project requires Node.js 24 or newer: `--env-file` and npm’s `min-release-age` setting both depend on it.

## Plugins Built Upon This Template
- [Count Layers](https://www.figma.com/community/plugin/900867721222656652/Count-Layers)
- [Toggle Clip Content](https://www.figma.com/community/plugin/1108861824194364527/Toggle-Clip-Content)
- [Select Siblings in Auto-Layout](https://www.figma.com/community/plugin/1023271295543606907/Select-Siblings-in-Auto-Layout)

## References
1. [Figma's introduction to plugin development](https://www.figma.com/plugin-docs/intro/)
2. [API Reference](https://www.figma.com/plugin-docs/api/api-overview/)
