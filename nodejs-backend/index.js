var express = require('express');
var cors = require('cors');
var session = require('express-session');
var path = require('path');

var app = express();  //get express running

const keycloak = require('./keycloakConfig.js').setKeycloak();
const memoryStore = require('./keycloakConfig.js').getMemoryStore();

app.use(cors());
/* app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept' );
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    next();
  }) */

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));


app.use(keycloak.middleware());

app.use(keycloak.middleware( {logout: '/logout'}));



// app.get('/logout' ,(req, res) => {
//     res.redirect('/home');
// });


const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);


app.listen(3000, () => {
    console.log("Listening on port 3000!")
})

