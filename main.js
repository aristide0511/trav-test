var kingbot = require('./dist').default;

var gameworld = 'com4';
var email = 'greghi.fumagalli@gmail.com';
var password = 'Gregorio1';
// only change if needed
var sitter_type = ''; // 'sitter' or 'duals'
var sitter_name = ''; // ingame avatar name
var port = process.env.PORT || 8080;

var http = require("http");
setInterval(function() {
    http.get("http://<your app name>.herokuapp.com");
}, 300000); // every 5 minutes (300000)

function main() {
	kingbot.start_server(gameworld, email, password, sitter_type, sitter_name, port);
}

if (process.argv[2] == '--gui') kingbot.start_server(gameworld, email, password, sitter_type, sitter_name, port);
else main();
