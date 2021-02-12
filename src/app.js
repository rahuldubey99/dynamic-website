const express = require('express');
const path = require('path');
require("./db/conn");
const User = require("./models/usermessage")
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const {registerPartials} = require('hbs');


// setting path 
const staticpath = path.join(__dirname, '../public');
const templatepath = path.join(__dirname, '../templates/views');
const partialpath = path.join(__dirname, '../templates/partials');
// middleware

app.use(express.static(staticpath))
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'hbs');
app.set("views", templatepath);                 
hbs.registerPartials(partialpath);

// routing
// app.get(path, callback);
app.get('/', (req, res)=>{
    res.render('index.hbs');
})
// contact page
app.get('/contact',(req, res)=>{
    res.render('contact.hbs');
})
app.post('/contact', async(req, res)=>{
    try {
        // res.send(req.body)
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render('index');
    } catch (error) {
        res.status(505).send(error);
    }
})
// server create 
app.listen(port,()=>{
    console.log('listening on port',port);
});