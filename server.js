const express = require('express');
const bodyParser = require('body-parser');

const my_app = express();

my_app.set('view engine', 'ejs');
my_app.set('views', __dirname + "/views");


my_app.use(express.static(__dirname + "/public"));

my_app.get("/", (req, res) => {
    res.render('main');
});

my_app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
