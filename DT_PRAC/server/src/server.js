const express = require('express');
const server = express();

// routes
server.get('/api/log', (request, response) => {
    //response.send('<h1> Hi, you requested me? What would you like help with? Test</h1>');
    response.send({
        "log": ["user", "entity"]
    })
});





const port = 5000;

server.listen(port, () => 
console.log('App is listening on http://localhost:5000') );//(process.env.PORT || 3000)