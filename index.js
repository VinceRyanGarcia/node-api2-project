// require your server and launch it here
const server = require ('./api/server');
const port = 4000
server.listen(port, () => {
    console.log('listening to port 4000')
})