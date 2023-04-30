import { defineConfig } from "cypress";

export default defineConfig({

    defaultCommandTimeout: 5000,

    viewportWidth: 1280,

    viewportHeight: 720,

e2e: {

    setupNodeEvents(on, config) {
},

    supportFile: false,

    baseUrl: 'http://localhost:4200'
},
});