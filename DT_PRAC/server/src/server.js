const express = require('express');
const server = express();

// routes
server.get('/api/log', (request, response) => {
    //response.send('<h1> Hi, you requested me? What would you like help with? Test</h1>');
    response.send(
        //UPE: ["user", "price", "entity"]
        {transaction}
    )
});


let transaction = {
    user: "BackendMan",
    price: 2000,
    entity: "BackCompany"
    };

/*
function RandomTransactionLoader()//UPE: ["user", "price", "entity"]
{
    transaction.user = RANDOM
    transaction.price = RANDOM
    transaction.entity = RANDOM
    return transaction;
}
*/



const port = 5000;

server.listen(port, () => 
console.log('App is listening on http://localhost:5000') );//(process.env.PORT || 3000)