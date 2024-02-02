# cf-pages-vite-vue-app
A CF Pages + Vite + Vue App

Demo: [https://cf-pages-vite-vue-app.pages.dev/](https://cf-pages-vite-vue-app.pages.dev/)

## NPM Scripts

### dev
This runs the vite dev server and proxies the files through to the CF Pages app, applying logic from the CF Pages app (like the functions middleware)

### prepreview
This uses the npm scripts `pre` syntax and is not intended to be run standalone. When you run the `preview` script, it will run the `prepreview` first, ensuring that `dist` is built before running the CF Pages app.

### preview
This uses wrangler pages dev command to run the CF Pages app. It loads the static files that are in `dist` directory for the CF Pages app. It supports live-reload on the functions, but not on the files in the `src` directory.

### vite:dev
This runs the vite dev server, however, it does not run the CF Pages part of the app. It is intended to be used when proxying the vite dev server files through to the CF Pages part of the app. No dynamic functionality from the CF Pages app (like the functions middleware) will work when you run this script.

### vite:build
This builds the vite app and outputs the static files into the `dist` directory. The CF Pages app will use the files in the `dist` directory when it runs.

## Difference between the dev and preview npm scripts

## dev
The `dev` script proxies the files from the vite dev server (not the `dist` directory) that are generated when running `vite:dev` and also applies the CF Pages app logic (CF Pages functions). It supports live-reload/updates of both the files in the `src` directory and the `functions` directory.

### preview
The `preview` does not proxy the vite dev server and aligns more with how the app will actually work in prod. It pulls the static built files from `dist` and serves those through the CF pages app and applies the CF functions related to the CF Pages app.

With the `preview`, changes to the CF function files will trigger a live reload in the browser, but changes to the files in `src` will not trigger a live reload/update.

To see changes to the files in `src` directory while using the `preview` script, you would need to rebuild `dist` so the CF pages app can pull in those updates.
