const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// basic get function
app.get("/", (req, res) => {
    // res.send("Hello Trading Journal");
    // console.log("dirname: " + __dirname);
    res.sendFile(__dirname + "/views/index.html"); //Note: __dirname is the directory you are in.
});

// setup listener
app.listen(port, () => {
    console.log("listening on " + port);
});