const path = require('path');
const express = require('express'); //express is the function and not object
const hbs = require('hbs')
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname,'../public')) // Navigating to correct path for html

// Define Paths for Express Config
const app = express();
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views') //creating explicit directory for views 
const partials = path.join(__dirname,'../templates/partials') 

//below line is to setup view engine(hbs) set up .
// Steps app.set() uses 2 arguments. a) key (setting name) b) value (value want to set)

// Setup Handlebars, Views and Partials Location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partials);

// Setup Static Directory to Serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => { 
    res.render('index',{
        title:'Weather App',
        description:'This website give complete details on Temp across the world'
    })
})

app.get('/about',(req,res) => { 
    res.render('about',{
        title:'About Page',
        description:'This is About Page'
    })
})

app.get('/help',(req,res) => { 
    res.render('help',{
        title:'Help Page',
        description:'This is Help Page'
    })
})
// get() defines what the server should do when someone request a specific resource. It takes 2 arguments
// a) requested url b) response function

// app.get('/help' , (req,res)=> {
//     res.send('Help Page is up now...')
// })   

// app.get('/about' , (req,res)=> {
//     res.send({
//         name:'Abhinav',
//         Occupation: 'DBA',
//         Employer:'TD Bank'
//     })
// })   
app.get('/weather' , (req,res)=> {
    if (!req.query.address) {
        return res.send({
            error:'No Address Provided'
        })
    }

    geocode(req.query.address , (error,{latitude , longitude , location}) =>{
        if (error){
            return res.send({error});
        }

        forecast(latitude,longitude,(error,forecastData) => {
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
 
})   

// app.get('/product',(req,res) => {
//     if (!req.query.search) {
//         return res.send({
//             error:'You must provide the search Term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({  
//         products:[]
//     })
// })




app.get('/help/*',(req,res) => { 
    res.render('404',{
        title:'Help Page not found',
        description:'404 Error'
    })
})

app.get('*',(req,res) => { 
    res.render('404',{
        title:'404 Page Not Found!!',
        description:'Error 404'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});