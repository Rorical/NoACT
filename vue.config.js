const path = require("path");

module.exports = {
  productionSourceMap: false,
  configureWebpack: () => ({
    devtool: "source-map",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }),
  pwa: {
    name: "NoACT",
    themeColor: "#00e2bc",
    msTileColor: "#000000",
    manifestOptions: {
      "name": "NoACT",
      "short_name": "NoACT",
      "theme_color": "#00e2bc",
      "background_color": "#fafafa",
      "display": "standalone",
      "scope": "./",
      "start_url": "./",
      "id": "/",
    },
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#00cea8",
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      importWorkboxFrom: 'local',
      importsDirectory: 'js',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/noact\.rorical\.blue(\/.*\.(html|js|css))?$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'static-files',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxAgeSeconds: 86400 * 7,
            },
            networkTimeoutSeconds: 10,
          },
        },
        {
            urlPattern: /^https:\/\/noact\.rorical\.blue(\/.*\.(jpg|jpeg|png|webp|svg))?$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-imgs',
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxAgeSeconds: 86400 * 3,
              },
            },
        },
        {
            urlPattern: /^https:\/\/noact\.rorical\.blue(\/.*\.(json))?$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'DataFiles',
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxAgeSeconds: 86400 * 30,
                maxEntries: 1000,
              },
              fetchOptions: {
                credentials: 'omit',
                mode: 'cors',
              },
            },
        },
      ]
    }
  }
};