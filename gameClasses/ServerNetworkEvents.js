var ServerNetworkEvents = {
	/**
	 * Is called when the network tells us a new client has connected
	 * to the server. This is the point we can return true to reject
	 * the client connection if we wanted to.
	 * @param data The data object that contains any data sent from the client.
	 * @param clientId The client id of the client that sent the message.
	 * @private
	 */
	_onPlayerConnect: function (socket) {
		// Don't reject the client connection
		return false;
	},

	_onPlayerDisconnect: function (clientId) {
		if (ige.server.players[clientId]) {
			// Remove the player from the game
			ige.server.players[clientId].destroy();

			// Remove the reference to the player entity
			// so that we don't leak memory
			delete ige.server.players[clientId];
		}
	},
	_moveUp: function(data, clientid){
		ige.server.exampleEntity._translate.tween().stepBy({x:0,y:-100},2000).start();
		ige.log("log")
		console.log(clientid)
		console.log(data)
	},
	_moveDown: function(data, clientid){
		ige.server.exampleEntity._translate.tween().stepBy({x:0,y:100},2000).start();
		ige.log("log")
		console.log(clientid)
		console.log(data)
	},
	_moveLeft: function(data, clientid){
		ige.server.exampleEntity._translate.tween().stepBy({x:-100,y:0},2000).start();
		ige.log("log")
		console.log(clientid)
		console.log(data)
	},
	_moveRight: function(data, clientid){
		ige.server.exampleEntity._translate.tween().stepBy({x:100,y:-100},2000).start();
		ige.log("log")
		console.log(clientid)
		console.log(data)
	},

	_onPlayerEntity: function (data, clientId) {
		if (!ige.server.players[clientId]) {
			console.log("_onPlayerEntity ", clientId);
			/*ige.server.players[clientId] = new Player(clientId)
				.streamMode(1)
				.mount(ige.server.scene1);

			// Tell the client to track their player entity
			ige.network.send('playerEntity', ige.server.players[clientId].id(), clientId);*/
		}
	},

	_onPlayerLeftDown: function (data, clientId) {

		console.log("_onPlayerEntity ", clientId);
		ige.server.players[clientId].controls.left = true;
	},

	_onPlayerLeftUp: function (data, clientId) {
		ige.server.players[clientId].controls.left = false;
	},

	_onPlayerRightDown: function (data, clientId) {
		ige.server.players[clientId].controls.right = true;
	},

	_onPlayerRightUp: function (data, clientId) {
		ige.server.players[clientId].controls.right = false;
	},

	_onPlayerThrustDown: function (data, clientId) {
		ige.server.players[clientId].controls.thrust = true;
	},

	_onPlayerThrustUp: function (data, clientId) {
		ige.server.players[clientId].controls.thrust = false;
	},

	_onPlayerRegister: function (data, clientId, requestId) {
		console.log('_onPlayerRegister', "get in");
		var success = false;
		switch (data)
		{
			case "Miss Scarlet":
				if (ige.server.characterSet[0] == false)
				{
					success = true;
					ige.server.characterSet[0] = true;
				}
				break;
			case "Col. Mustard":
				if (ige.server.characterSet[1] == false)
				{
					success = true;
					ige.server.characterSet[1] = true;
				}
				break;
			case "Mrs. White":
				if (ige.server.characterSet[2] == false)
				{
					success = true;
					ige.server.characterSet[2] = true;
				}
				break;
			case  "Mr. Green":
				if (ige.server.characterSet[3] == false)
				{
					success = true;
					ige.server.characterSet[3] = true;
				}
				break;
			case "Mrs. Peacock":
				if (ige.server.characterSet[4] == false)
				{
					success = true;
					ige.server.characterSet[4] = true;
				}
				break;
			case "Prof Plum":
				if (ige.server.characterSet[5] == false)
				{
					success = true;
					ige.server.characterSet[5] = true;
				}
				break;
			default:
				break;
		}
		if (success == true)
		{
			ige.network.response(requestId, 'True');
		}
		else
		{
			ige.network.response(requestId, 'False');
		}
		console.log("_onPlayerRegister", "Register " + data);
	}
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ServerNetworkEvents; }