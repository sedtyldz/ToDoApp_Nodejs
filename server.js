const express = require('express');// fronend kısmı için framework nesnesi oluşturma
const bodyParser = require('body-parser'); // html sayfasından gelen parametrelere ulaşmak ve kullanmak için gerekli

const my_app = express();


my_app.set('view engine', 'ejs');
my_app.set('views', __dirname + '/View');


my_app.get("/",(req,res)=>{
    res.render('main');
})


// server 3000 portunda çalışıyor
my_app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});