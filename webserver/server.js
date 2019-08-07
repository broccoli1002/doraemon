//server.js
const app = require('./app')
const server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});
