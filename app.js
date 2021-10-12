const express =  require('express');
const cors =  require('cors');
const morgan =  require('morgan');
require('dotenv').config();
require('./src/api/v1/db/connect'); 

const app = express()
const PORT = process.env.PORT || 4000

// Cors
app.use( cors() )


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// Routes

const UserRoute = require('./src/api/v1/routes/userRoutes');
const CommentsRoute = require('./src/api/v1/routes/commentRoutes');

app.use('/api', UserRoute);
app.use('/api', CommentsRoute);



app.listen(PORT, ()=> console.log(`Servidor en puerto ${ PORT }`))



