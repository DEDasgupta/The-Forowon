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
			var index = ige.server.playersMap[clientId];

			// reset the character
			//ige.server.players[clientId] = null;
			ige.server.characterSet[index] = false;
			// Remove the player from the game
			//ige.server.players[clientId].destroy();

			// Remove the reference to the player entity
			// so that we don't leak memory
			delete ige.server.players[clientId];
		}
	},
	_moveUp: function(data, clientId){
		ige.server.players[clientId]._translate.tween().stepBy({x:0,y:-100},2000).start();
		ige.log("log")
		console.log(clientId)
		console.log(data)
	},
	_moveDown: function(data, clientId){
		ige.server.players[clientId]._translate.tween().stepBy({x:0,y:100},2000).start();
		ige.log("log")
		console.log(clientId)
		console.log(data)
	},
	_moveLeft: function(data, clientId){
		ige.server.players[clientId]._translate.tween().stepBy({x:-100,y:0},2000).start();
		ige.log("log")
		console.log(clientId)
		console.log(data)
	},
	_moveRight: function(data, clientId){
		ige.server.players[clientId]._translate.tween().stepBy({x:100,y:-100},2000).start();
		ige.log("log")
		console.log(clientId)
		console.log(data)
	},

	_onPlayerEntity: function (data, clientId, requestId) {
		var index = 0;
		console.log("_onPlayerEntity ", data);
		for (index = 0; index < 6; index++)
		{
			if (data == ige.server.characterNames[index] || data == ige.server.characterShortNames[index])
			{
				ige.server.playersMap[clientId] = index;
				if (!ige.server.players[clientId]) 
				{
				console.log("_onPlayerEntity ", clientId);
				ige.server.players[clientId] = ige.server.playerList[index];

				// Tell the client to track their player entity
				ige.network.response(requestId, ige.server.players[clientId].id());
				}
				break;
			}
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

	_onPlayerAvailable: function (data, clientId, requestId) {
		var result = "";
		for (i = 0; i < 6; i++)
		{
			if (!ige.server.characterSet[i])
			{
				result = result + ige.server.characterNames[i] + "\n";
			}
		}

		ige.network.response(requestId, result);
	},

	_onPlayerRegister: function (data, clientId, requestId) {
		var success = false;
		switch (data)
		{
			case "Scarlet":
			case "Miss Scarlet":
				if (ige.server.characterSet[0] == false)
				{
					success = true;
					ige.server.characterSet[0] = true;
				}
				break;
			case "Mustard":
			case "Col. Mustard":
				if (ige.server.characterSet[1] == false)
				{
					success = true;
					ige.server.characterSet[1] = true;
				}
				break;
			case "White":
			case "Mrs. White":
				if (ige.server.characterSet[2] == false)
				{
					success = true;
					ige.server.characterSet[2] = true;
				}
				break;
			case "Green":
			case  "Mr. Green":
				if (ige.server.characterSet[3] == false)
				{
					success = true;
					ige.server.characterSet[3] = true;
				}
				break;
			case "Peacock":
			case "Mrs. Peacock":
				if (ige.server.characterSet[4] == false)
				{
					success = true;
					ige.server.characterSet[4] = true;
				}
				break;
			case "Plum":
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
			console.log('_onPlayerRegister', "character available");
			ige.network.response(requestId, 'True');
		}
		else
		{
			console.log('_onPlayerRegister', "character taken");
			var result = "";
			for (i = 0; i < 6; i++)
			{
				if (!ige.server.characterSet[i])
				{
					result = result + ige.server.characterNames[i] + "\n";
				}
			}
			ige.network.response(requestId, result);
		}
		console.log("_onPlayerRegister", "Register " + data);
	}
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ServerNetworkEvents; }