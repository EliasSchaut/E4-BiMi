# E4-BiMi (WIP)
A Telegram Bot as Interface for a ['Getränkeliste App'](https://iqmeta.com/gliste/) Instance

## Set Up
1. You need node installed (current LTS version or newer)
2. Download the newest version of the code
3. Rename the [configuration file](https://github.com/EliasSchaut/e4-bimi/blob/main/config/config-tmp.json) from ```config-tmp.json``` to ```config.json```
4. Open the configuration file (now ```config.json```) and set values.
5. Optional: Configure [`package.json`](https://github.com/EliasSchaut/e4-bimi/blob/main/package.json)
6. Run `npm install`.

## Run
Run `app.js` with `node src/index.js` or `npm start`. \
Alternative you can use `npm run pm`, `npm run pm-restart` and `npm run pm-stop`.
This will use [pm2](https://www.npmjs.com/package/pm2) for executing
