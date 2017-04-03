var sudo = require('sudo');
var options = {
    cachePassword: true,
    prompt: 'Password, yo? ',
    spawnOptions: { /* other options for spawn */ }
};
var child = sudo([ 'ls', '-l', '/tmp' ], options);
child.stdout.on('data', function (data) {
    console.log(data.toString());
});
console.log('uju');