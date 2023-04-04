// === This is the index-file for all server-side scripts ===

const app = require('./server.js');

const port = process.env.PORT || 8080;

app.listen(port, () => { console.log(`Running on port: ${port}`); });
