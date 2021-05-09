console.log("[INFO]: The Server is starting!");

const express = require('express');

const port = 3000;
const app = express();

app.use(express.static('.'));

app.listen(port, () => {
    console.log('[INFO]: Done!');
    console.log(`[INFO]: Server is running on port ${port} (http://localhost:${port}/ )`);
})