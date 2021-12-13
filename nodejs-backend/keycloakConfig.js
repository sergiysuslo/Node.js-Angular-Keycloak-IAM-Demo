var session = require('express-session');
var Keycloak = require('keycloak-connect');

var keycloak;
var memoryStore;

function setKeycloak(){
    if(keycloak) {
        return keycloak;
    } else {
        memoryStore = new session.MemoryStore();
        keycloak = new Keycloak({ store: memoryStore});
        return keycloak;
    }    
}

function getKeycloak() {
    return keycloak;
}
function getMemoryStore(){
    return memoryStore;
}



module.exports = {setKeycloak, getKeycloak, getMemoryStore};
