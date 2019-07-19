var kingbot = require('./dist').default;

var gameworld = 'com4';
var email = 'greghi.fumagalli@gmail.com';
var password = 'Gregorio1';
// only change if needed
var sitter_type = ''; // 'sitter' or 'duals'
var sitter_name = ''; // ingame avatar name
var port = $PORT;

function main() {
	kingbot.start_server(gameworld, email, password, sitter_type, sitter_name, port);
}

if (process.argv[2] == '--gui') kingbot.start_server(gameworld, email, password, sitter_type, sitter_name, port);
else main();
