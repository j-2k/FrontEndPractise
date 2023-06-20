const express = require("express");

const app = express();

app.get('/', (request, response) => {
    response.send('<div> Hi, you requested me? What would you like help with? </div>');
});

app.listen(3000, () => console.log('App is running on http://localhost:3000') );//(process.env.PORT || 3000)