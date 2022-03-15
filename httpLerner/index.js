const http = require('http') //* this module is installed globally so nodemodules is not there

const server = http.createServer((req, res) => {
    //handle every single request with this callback
    
    console.log('hit')
    
  })

  server.listen(3000,"localhost")