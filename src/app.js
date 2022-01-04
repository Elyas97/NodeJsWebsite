const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request=require('request');
const geo=require('./utils/geocode');
const forecast=require('./utils/forecast')
const app = express();
// define paths for express config
const publicdir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicdir))

app.get('', (req, res) => {
    console.log(viewsPath)
    res.render('index', {
        title: 'Weather app',
        name: "Elyas"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        about: 'about Me',
        name: "Elyas"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        help: 'Helping you learn',
        name: "Elyas"
    })
})
app.get('/Weather', (req, res) => {
    if(!req.query.adress){
        return res.send({
            error:"No adress provided"
        })
    }
    
    geo.getGeo(req.query.adress,(error,data)=>{
        if(error) {
            return res.send({
                error:error
            })
         }

       forecast(data.latitude, data.longtidue, (error, data) => {
           if(error){
               return res.send({
                   error:error
               })
           }
            res.send({
               data:data
           })
       })
        
    });

})
app.get('/help/*',(req,res)=>{
    res.render('Error',{
        title:'Error page ',
        error:'Help article not found',
        name:"Elyas"
        
    })
})

app.get('*',(req,res)=>{
    res.render('Error',{
        title:'404 ',
        error:'Page not found',
        name:"Elyas"
        
    })
})

app.listen(3000, () => {
    console.log('Server is up on poer 3000')
})