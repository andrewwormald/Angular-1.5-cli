var cmd = require('node-cmd');
console.log('serving angular 1.5 app...');
cmd.get(
    `
            webpack && webpack-dev-server --content-base client/
        `,
    function(data){

    }
);
