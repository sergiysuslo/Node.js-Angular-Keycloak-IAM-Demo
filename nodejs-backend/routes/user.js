const express = require('express');
const axios = require('axios');
const qs = require('qs');
const { response } = require('express');
const router = express.Router();

const keycloak = require('../keycloakConfig.js').getKeycloak();


//async function getUserInfo() {
   
//     var data = qs.stringify({
//         'client_id' : 'admin-cli',
//         'username' : 'sergiy',
//         'password' : 'password',
//         'grant_type' : 'password'
//     });
//     var config = {
//         headers:{
//             'Accept' : 'application/json',
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'cache_control' : 'no-cache'
//         }
//     };
    
//     const response = await axios.post('http://localhost:8080/auth/realms/master/protocol/openid-connect/token',
//                    data, config );
//     var tok = "Bearer " + response.data.access_token;
    
//     const res = await axios.get('http://localhost:8080/auth/realms/NodeJS-Realm/protocol/openid-connect/userinfo', {
//         headers:{
//             'Authorization' : tok
//         }
//     });
//     console.log(response);
//     return tok;
// }

router.get('/',keycloak.protect(), async (req, res)=>{
   
   const apiCall = await axios.get('http://localhost:8080/auth/realms/Test-Realm/protocol/openid-connect/userinfo', {
        headers:{
            'Authorization' : req.headers.authorization,
            'cache_control' : 'no-cache'
        }
    });

   res.send(apiCall.data);

    

})

// router.get('/logout',keycloak.protect(), async (req, res)=>{

//     refresh_token = req.kauth.grant.refresh_token.token;
//     access_token = req.kauth.grant.access_token.token;
 
//     var data = qs.stringify({
//         'client_id' : 'microservices-demo',
//         'refresh_token' : refresh_token
//     });
//     var config = {
//         headers:{
//            'Authorization' : 'Bearer ' + access_token,
//            'cache_control' : 'no-cache',
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'cache_control' : 'no-cache'
//         }
//     };
//     const response = await axios.post('http://localhost:8080/auth/realms/NodeJS-Realm/protocol/openid-connect/logout',
//                    data, config );
//     console.log(response);
//     res.render('logout');
// })

// router.get('/user',keycloak.protect(), async (req, res) => {
//     const userInfo = await getUserInfo();
//     console.log(userInfo);
//      res.render('user/user_index',{userInfo});
// })

// router.get('/:id', (req, res) => {
//     res.send("User with ID");
// })

// router.get('/:id/edit', (req, res) => {
//     res.send("Edit User with ID");
// })

module.exports = router;