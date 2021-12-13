const express = require('express');
const axios = require('axios');
const qs = require('qs');
const { response } = require('express');
const router = express.Router();

const keycloak = require('../keycloakConfig.js').getKeycloak();




router.get('/',keycloak.protect(), async (req, res)=>{
   
   var accessToken = req.headers.authorization;

   const apiCall = await axios.get('http://localhost:8080/auth/realms/Test-Realm/protocol/openid-connect/userinfo', {
        headers:{
            'Authorization' : accessToken,
            'cache_control' : 'no-cache'
        }
    });

   res.send(apiCall.data);


})


module.exports = router;