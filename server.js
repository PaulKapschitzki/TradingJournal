const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// basic get function
app.get("/", (req, res) => {
    res.send("Hello Trading Journal");
});

// setup listener
app.listen(port, () => {
    console.log("listening on " + port);
});