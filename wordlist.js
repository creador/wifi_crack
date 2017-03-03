var fs 		= 	require('fs'),
	path 	=	require('path'),
	axel 	= 	require('axel-js'),
	cur		= 	process.cwd()

// https://crackstation.net/files/crackstation.txt.gz
// http://downloads.skullsecurity.org/passwords/rockyou.txt.bz2
axel.download('https://crackstation.net/files/crackstation.txt.gz',{
	output: path.join(cur,'wordlist.txt.gz'),
	quiet: false,
	verbose: false,
	numConnections: 5,
	header: []
}).then((data) => {
	console.log('tenemos los datos',data);
}).catch((error) => {
	console.log('ha ocurrido un error');
});