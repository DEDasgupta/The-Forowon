var actions = {
	_moveUp: function(data, clientId, requestId){
		
				var player = ige.server.GameBoard.allPlayers.filter(user => user.playerId == clientId)[0];
		
				//if (player.character == ige.server.GameBoard.playerTurn)
				//{
				console.log("_moveUp ", player.character);
				console.log("_moveUp ", player.position[0]);
				console.log("_moveUp ", player.position[1]);
				var destX = player.position[0]-1;
				var destY = player.position[1];
				console.log("_moveUp ", destX);
				console.log("_moveUp ", destY);
				var result = {valid:false,message:"you can't move up from here"};
				//Player is in a room
				if(player.isInRoom)
				{
					console.log("_moveUp ", "In Room");
					if (ige.server.GameBoard.canPlayerMoveFromRoom(player.playerId, destX, destY))
					{
						console.log("_moveUp ", "success");
						result.valid = true;
						ige.server.GameBoard.movePlayerFromRoom(player.playerId, destX, destY);
						ige.server.players[clientId]._translate.tween().stepBy({x:0,y:-120},1000).start();
						ige.network.send('Notification', {data: player.character + " move from Room to Up"});
					}
				}
				else // or in hall
				{
					console.log("_moveUp ", "In Hall");
					if (ige.server.GameBoard.canPlayerMoveFromHall(player.playerId, destX, destY))
					{
						console.log("_moveUp ", "success");
						result.valid = true;
						ige.server.GameBoard.movePlayerFromHall(player.playerId, destX, destY);
						ige.server.players[clientId]._translate.tween().stepBy({x:0,y:-120},1000).start();
						ige.network.send('Notification', {data: player.character + " move from Hall to Up"});
					}
				}
				ige.network.response(requestId, result);
				ige.log("log")
				console.log(clientId)
				console.log(data)
				//}
			},
			_moveDown: function(data, clientId, requestId){
		
				var player = ige.server.GameBoard.allPlayers.filter(user => user.playerId == clientId)[0];
		
				//if (player.character == ige.server.GameBoard.playerTurn)
				//{
				console.log("_moveDown ", player.character);
				console.log("_moveDown ", player.position[0]);
				console.log("_moveDown ", player.position[1]);
				var destX = player.position[0]+1;
				var destY = player.position[1];
				console.log("_moveDown ", destX);
				console.log("_moveDown ", destY);
				var result = {valid:false,message:"you can't move down from here"};
		
				//Player is in a room
				if(player.isInRoom)
				{
					console.log("_moveDown ", "In Room");
					if (ige.server.GameBoard.canPlayerMoveFromRoom(player.playerId, destX, destY))
					{
						console.log("_moveDown ", "success");
						result.valid = true;
						ige.server.GameBoard.movePlayerFromRoom(player.playerId, destX, destY);
						ige.server.players[clientId]._translate.tween().stepBy({x:0,y:120},1000).start();
						ige.network.send('Notification', {data: player.character + " move from Room to Down"});
					}
				}
				else // or in hall
				{
					console.log("_moveDown ", "In Hall");
					if (ige.server.GameBoard.canPlayerMoveFromHall(player.playerId, destX, destY))
					{
						console.log("_moveDown ", "success");
						result.valid = true;
						ige.server.GameBoard.movePlayerFromHall(player.playerId, destX, destY);
						ige.server.players[clientId]._translate.tween().stepBy({x:0,y:120},1000).start();
						ige.network.send('Notification', {data: player.character + " move from Hall to Down"});
					}
				}
				ige.network.response(requestId, result);
		
				ige.log("log")
				console.log(clientId)
				console.log(data)
				//}
			},
			_moveLeft: function(data, clientId, requestId){
		
				var player = ige.server.GameBoard.allPlayers.filter(user => user.playerId == clientId)[0];
		
				//if (player.character == ige.server.GameBoard.playerTurn)
				//{
				console.log("_moveLeft ", player.character);
				console.log("_moveLeft ", player.position[0]);
				console.log("_moveLeft ", player.position[1]);
				var destX = player.position[0];
				var destY = player.position[1]-1;
				console.log("_moveLeft ", destX);
				console.log("_moveLeft ", destY);
				var result = {valid:false,message:"you can't move left from here"};
		
				//Player is in a room
				if(player.isInRoom)
				{
					console.log("_moveLeft ", "In Room");
					if (ige.server.GameBoard.canPlayerMoveFromRoom(player.playerId, destX, destY))
					{
						console.log("_moveLeft ", "success");
						result.valid = true;
						ige.server.GameBoard.movePlayerFromRoom(player.playerId, destX, destY);
						ige.server.players[clientId]._translate.tween().stepBy({x:-120,y:0},1000).start();
						ige.network.send('Notification', {data: player.character + " move from Room to Left"});
					}
				}
				else // or in hall
				{
					console.log("_moveLeft ", "In Hall");
					if (ige.server.GameBoard.canPlayerMoveFromHall(player.playerId, destX, destY))
					{
						console.log("_moveLeft ", "success");
						result.valid = true;
						ige.server.GameBoard.movePlayerFromHall(player.playerId, destX, destY);
						ige.server.players[clientId]._translate.tween().stepBy({x:-120,y:0},1000).start();
						ige.network.send('Notification', {data: player.character + " move from Hall to Left"});
					}
				}
				ige.network.response(requestId, result);
		
				ige.log("log")
				console.log(clientId)
				console.log(data)
				//}
			},
			_moveRight: function(data, clientId, requestId){
		
				var player = ige.server.GameBoard.allPlayers.filter(user => user.playerId == clientId)[0];
		
				//if (player.character == ige.server.GameBoard.playerTurn)
				//{
				console.log("_moveRight ", player.character);
				console.log("_moveRight ", player.position[0]);
				console.log("_moveRight ", player.position[1]);
				var destX = player.position[0];
				var destY = player.position[1]+1;
				console.log("_moveRight ", destX);
				console.log("_moveRight ", destY);
				var result = {valid:false,message:"you can't move right from here"};
		
				//Player is in a room
				if(player.isInRoom)
				{
					console.log("_moveRight ", "In Hall");
					if (ige.server.GameBoard.canPlayerMoveFromRoom(player.playerId, destX, destY))
					{
						console.log("_moveRight ", "success");
						result.valid = true;
						ige.server.GameBoard.movePlayerFromRoom(player.playerId, destX, destY);
						ige.server.players[clientId]._translate.tween().stepBy({x:120,y:0},1000).start();
						ige.network.send('Notification', {data: player.character + " move from Room to Right"});
					}
				}
				else // or in hall
				{
					console.log("_moveRight ", "In Hall");
					if (ige.server.GameBoard.canPlayerMoveFromHall(player.playerId, destX, destY))
					{
						console.log("_moveRight ", "success");
						result.valid = true;
						ige.server.GameBoard.movePlayerFromHall(player.playerId, destX, destY);
						ige.server.players[clientId]._translate.tween().stepBy({x:120,y:0},1000).start();
						ige.network.send('Notification', {data: player.character + " move from Hall to Right"});
					}
				}
				ige.network.response(requestId, result);
		
				ige.log("log")
				console.log(clientId)
				console.log(data)
				//}
			},

			_secretPassage: function (data, clientId, requestId) {
				var player = ige.server.GameBoard.allPlayers.filter(user => user.playerId == clientId)[0];
				var result = {valid:false,message:"there is no secret passage here"};
				var px = player.position[0];
				var py = player.position[1];

				if (px == 0 && py == 0) {
					ige.server.GameBoard.movePlayerFromHall(player.playerId, 4, 4);
					ige.server.players[clientId]._translate.tween().stepBy({x:480,y:480},1000).start();
					result.valid = true;
				} else if (px == 0 && py == 4) {
					ige.server.GameBoard.movePlayerFromHall(player.playerId, 4, 0);
					ige.server.players[clientId]._translate.tween().stepBy({x:-480,y:480},1000).start();
					result.valid = true;
				} else if (px == 4 && py == 0) {
					ige.server.GameBoard.movePlayerFromHall(player.playerId, 0, 4);
					ige.server.players[clientId]._translate.tween().stepBy({x:480,y:-480},1000).start();
					result.valid = true;
				} else if (px == 4 && py == 4) {
					ige.server.GameBoard.movePlayerFromHall(player.playerId, 0, 0);
					ige.server.players[clientId]._translate.tween().stepBy({x:-480,y:-480},1000).start();
					result.valid = true;
				}
				ige.network.response(requestId, result);
		
				ige.log("log")
				console.log(clientId)
				console.log(data)
			},
		
			_suggest: function (data, clientId, requestId) {
				var player = ige.server.GameBoard.allPlayers.filter(user => user.playerId == clientId)[0];
				var result = {valid:false, message:"you are not in a room"};
				var room = ige.server.GameBoard.roomGrid[player.position[0]][player.position[1]]
				data.room = room;
				if (player.isInRoom) {
					result.valid = true;
					var alert = ige.server.GameBoard.validateSuggestion(player, data);
					ige.network.send('Alert', alert);
				}
				ige.network.response(requestId, result);
			},
		
			_accuse: function (data, clientId, requestId) {
				var player = ige.server.GameBoard.allPlayers.filter(user => user.playerId == clientId)[0];
				var result = {valid:true, message:""};
				var message = "accused " + data.suspect + " of using " + data.weapon + " in " + data.room;
				result.valid = true;
				var victory = ige.server.GameBoard.validateAccusation(player, data);

				if (victory) {
					ige.network.send('Alert', player.character + " CORRECTLY " + message);
				} else {
					ige.network.send('Alert', player.character + " INCORRECTLY " + message);
				}
				ige.network.response(requestId, result);
			},

			_endTurn: function (data, clientId, requestId) {
				
			},
}

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
	


	_onPlayerAction: function(data, clientId, requestId){
		switch (data.actionType) {
			case 'up':
				actions._moveUp(data, clientId, requestId);
				break;
			case 'down':
				actions._moveDown(data, clientId, requestId);
				break;
			case 'left':
				actions._moveLeft(data, clientId, requestId);
				break;
			case 'right':
				actions._moveRight(data, clientId, requestId);
				break;
			case 'secretPassage':
				actions._secretPassage(data, clientId, requestId);
				break;
			case 'suggest':
				actions._suggest(data, clientId, requestId);
				break;
			case 'accuse':
				actions._accuse(data, clientId, requestId);
				break;
			case 'endTurn':
				actions._endTurn(data, clientId, requestId);
				break;
		}
	},

	_onPlayerEntity: function (data, clientId, requestId) {
		var identity = "";
		var index = 0;
		console.log("_onPlayerEntity ", data);

		// convert to full name
		for (index = 0; index < 6; index++)
		{
			if (data == ige.server.characterShortNames[index] || data == ige.server.characterNames[index])
			{
				identity = ige.server.characterNames[index];
				ige.server.numOfPlayers++;

				// playersMap is the mapping the clientID to the character name
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

		// repeat the search again which is different since the allPlayers is shuffle while
		// the player list is not
		for (index = 0; index < 6; index++)
		{
			if (identity == ige.server.GameBoard.allPlayers[index].character)
			{

				// save the ID to gameboard and active player
				ige.server.GameBoard.allPlayers[index].playerId = clientId;
				ige.server.GameBoard.activePlayers.push(ige.server.GameBoard.allPlayers[index])
				break;
			}
		}

		// If we get at least 4 players, start the game
		if (ige.server.numOfPlayers >= 4)
		{
			// start the game
			for (index = 0; index < 6; index++)
			{
				if (ige.server.characterSet[index])
				{
					ige.server.GameBoard.playerTurn = ige.server.characterNames[index];
					ige.network.send('Notification', {data: ige.server.characterNames[index]+ " player Turn"});
				}
			}
		}
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
			case "Professor Plum":
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
	},

	_onNotification: function (cmd, data) {
	}
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ServerNetworkEvents; }