var express = require('express');
var cors = require('cors');
var session = require('express-session');
var path = require('path');

var app = express();  //get express running

const keycloak = require('./keycloakConfig.js').setKeycloak();
const memoryStore = require('./keycloakConfig.js').getMemoryStore();

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.use(cors());


app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));


app.use(keycloak.middleware());

app.use(keycloak.middleware( {logout: '/logout'}));

app.use('/api/user', userRoutes);

app.use('/api/admin', adminRoutes);


app.listen(3000, () => {
    console.log("Listening on port 3000!")
})

