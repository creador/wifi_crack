/* uses 'node-torrent': wordlist are no reliable as torrent files.
var fs 		= 	require('fs'),
	path 	=	require('path'),
	cur		= 	process.cwd()

var Client = require('node-torrent');
var client = new Client({logLevel: 'DEBUG', downloadPath: path.join(cur,'') });
var torrent = client.addTorrent('magnet:?xt=urn:btih:fd62cc1d79f595cbe1de6356fb13c2165994e469&dn=CrackStation.Password.Cracking.Dictionary&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80'); //path.join(__dirname,'crackstation-human-only.txt.gz.torrent')

torrent.on('info_hash', function(data) {
	console.log('INFO_HASH!');
	console.log(data);
});

torrent.on('progress', function(data) {
	console.log('En progreso');
	console.log(data);
});

torrent.on('complete', function() {
	console.log('complete!');
	console.log(torrent.files);
});*/
//	path: path.join(cur,'')