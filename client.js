var net = require('net');
const readline = require('readline');

const HOST = 'localhost';
const PORT = 3000;

var client = new net.Socket();
client.connect(PORT, HOST, () => {
	console.log('Connected');
});

client.on('data', (data) => {
  console.log('Received: ' + data);
});

client.on('close', () => {
	console.log('Connection closed');
});

client.on('error', () => {
	console.log("Error Occured! Could not connect.");
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
	if (input == "q") {
		client.end();
		return rl.close();
	}
	console.log(`Sending: ${input}`);
	client.write(input);
});
