const express = require('express');
const axios = require('axios');
const qs = require('qs');
const { response } = require('express');
const router = express.Router();

const keycloak = require('../keycloakConfig.js').getKeycloak();

async function getRealmUsers() {
   
    var data = qs.stringify({
        'client_id' : 'admin-cli',
        'username' : 'admin',
        'password' : 'admin',
        'grant_type' : 'password'
    });
    var config = {
        headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'cache_control' : 'no-cache'
        }
    };
    
    const response = await axios.post('http://localhost:8080/auth/realms/master/protocol/openid-connect/token',
                   data, config );
    var tok = "Bearer " + response.data.access_token;
    //console.log(tok);

    const res = await axios.get('http://localhost:8080/auth/admin/realms/Test-Realm/users', {
        headers:{
            'Authorization' : tok,
            'cache_control' : 'no-cache'
        }
    });
    return res.data;
}

async function deleteUserbyId(id) {
    console.log(id)
    var data = qs.stringify({
        'client_id' : 'admin-cli',
        'username' : 'admin',
        'password' : 'admin',
        'grant_type' : 'password'
    });
    var config = {
        headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'cache_control' : 'no-cache'
        }
    };
    
    const response = await axios.post('http://localhost:8080/auth/realms/master/protocol/openid-connect/token',
                   data, config );
    var tok = "Bearer " + response.data.access_token;
    //console.log(tok);

    const res = await axios.delete('http://localhost:8080/auth/admin/realms/Test-Realm/users/'+id, {
        headers:{
            'Authorization' : tok,
            'cache_control' : 'no-cache'
        }
    });
    
}

router.get('/allUser',keycloak.protect('realm:admin'), async (req, res) => {
   const realmUsers = await getRealmUsers();
   
   res.send(realmUsers);
   
})


router.get('/delete/:id', (req, res) => {
    return deleteUserbyId(req.params.id);
    
})

module.exports = router;