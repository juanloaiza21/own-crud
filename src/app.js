const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const indexRoutes = require('./routes/index')

//settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
//

//middleware
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
//
app.use('/', indexRoutes)

app.listen(app.get('port'), ()=>{
    console.log('Ready to use');
})

module.exports = app;