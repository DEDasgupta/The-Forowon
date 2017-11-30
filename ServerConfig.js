var config = {
	include: [
		{name: 'ServerNetworkEvents', path: './gameClasses/ServerNetworkEvents'},
		{name: 'Player', path: './gameClasses/Player'},
		{name: 'ExampleEntity', path: './gameClasses/ExampleEntity'},
		{name: 'GameGrid', path: './gameClasses/GameGrid'},
		{name: 'CluelessPlayer', path: './gameState/CluelessPlayer'},
		{name: 'CaseFile', path: './gameState/CaseFile'},
		{name: 'gameboard', path: './gameState/gameboard'}
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = config; }