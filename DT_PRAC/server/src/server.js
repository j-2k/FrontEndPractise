const express = require('express');
const server = express();

let transactionsNum = 0;

// routes
server.get('/api/log', (request, response) => {
    //response.send('<h1> Hi, you requested me? What would you like help with? Test</h1>');
    console.log("test   " + GetRandom),
    transactionsNum++;
    GetRandom = Randomise(),
    transaction = {
        num: transactionsNum,
        user: GetRandom[0],
        price: GetRandom[1],
        entity: GetRandom[2]
    };
    response.send(
        //UPE: ["user", "price", "entity"]
        {transaction}
    )
});

const randomNumber = Math.floor(Math.random() * 10) + 1;
let GetRandom = Randomise();
let transaction = {
    num: transactionsNum,
    user: GetRandom[0],
    price: GetRandom[1],
    entity: GetRandom[2]
};

function Randomise()
{
    const randomUser = ["BackendMan", "Jake", "TestUser90", "Admin", "Boro"];
    const randomComp = ["BackCompany", "ABCinc", "ClosedAI", "Co-driver", "Github"];
    return [randomUser[Math.floor(Math.random() * 5)],
    (10 + 10 * (1+ Math.floor(Math.random() * 5)) * (1+ Math.floor(Math.random() * 5))),
    randomComp[Math.floor(Math.random() * 5)]];
}

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