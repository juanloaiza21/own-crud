const express = require('express');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

//hbs settings
exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./libs/handlebar.lib')
  })

//

//settings
app.set ('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine)
app.set('view engine', '.hbs');
//

//middleware
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
//

//global variables
app.use((req, res, next) =>{
    next()
})

//routes
app.use('/', require('./routes/index.routes'))
app.use('/auth',require('./routes/authentication.routes'))
//

//Public
app.use(express.static(path.join(__dirname, 'public')))
//

//starting server
app.listen(app.get('port'), ()=>{
    console.log('Ready to use');
})

module.exports = app;