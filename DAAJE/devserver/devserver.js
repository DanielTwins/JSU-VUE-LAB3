// === This is the index-file and entry point for all server-side scripts ===

require('dotenv').config();
//const env = dotenv.config(); if (env.error) { throw env.error; }
const app = require('./server.js');

const port = process.env.PORT || 8080;

app.listen(port, () => { console.log(`Running on port: ${port}`); });
