require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const port = process.env.PORT;
const key = process.env.KEY;
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', async function (req, res) {
    res.render('home', {noticias: await def()});
});

app.get('/:everything', async function (req, res) {
    let tema = req.params.everything
    res.render('home', {noticias: await theme(tema)});
});

async function theme(tema){
    return await axios.get("https://newsapi.org/v2/everything?q="+tema+"&sortBy=popularity&apiKey="+key)
    .then(function(response){
        return response.data.articles
    })
}

async function def(){
    return await axios.get("https://newsapi.org/v2/everything?q=world&sortBy=popularity&apiKey="+key)
    .then(function(response){
        return response.data.articles
    })
}

async function click(){
    app.get('/', async function (req, res) {
        const tema = document.getElementById("barra").value;
        res.render('home', {noticias: await theme(tema)});
    });
}

app.get('/:everything', async function (req, res) {
    res.render('home',{noticias: await theme(tema)});
});

app.listen(port,()=>{
    console.log('App is listening in port '+port)
})
