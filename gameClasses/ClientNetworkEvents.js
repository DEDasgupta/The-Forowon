var ClientNetworkEvents = {
	/**
	 * Is called when a network packet with the "playerEntity" command
	 * is received by the client from the server. This is the server telling
	 * us which entity is our player entity so that we can track it with
	 * the main camera!
	 * @param data The data object that contains any data sent from the server.
	 * @private
	 */
	_onPlayerEntity: function (cmd, data) {
		// The client has not yet received the entity via the network
		// stream so lets ask the stream to tell us when it creates a
		// new entity and then check if that entity is the one we
		// should be tracking!
		console.log(data);
		if (data.hand) {
			ige.client.card1.value(data.hand[0])
			ige.client.card2.value(data.hand[1])
			ige.client.card3.value(data.hand[2])
		}
		ige.client.characterName.value(data.id);
		var self = this;
		self._eventListener = ige.network.stream.on('entityCreated', function (entity) {
			if (entity.id() === data.id) {
				

				// Turn off the listener for this event now that we
				// have found and started tracking our player entity
				ige.network.stream.off('entityCreated', self._eventListener, function (result) {
					if (!result) {
						this.log('Could not disable event listener!', 'warning');
					}
				});
			}
		});
	},

	_onRegisterCharacter: function (cmd, data) {
		if (data != "True")
		{
			var name = "";
			do {
		    	name = prompt("The character is invalid or already taken. Please choose another one.\nThe list of characters:\n " + data,"");
		    } while (name ==null || name == "" || name == undefined);

			/*Register for character name here */
			ige.network.request('Register', name, this._onRegisterCharacter);
			ige.client.clientCharacter = name;
		}
		else
		{
			// Ask the server to create an entity for us
			ige.network.request('playerEntity', ige.client.clientCharacter, self.ClientNetworkEvents._onPlayerEntity);
		}
	},

	_onNotification: function (cmd, data) {
		ige.client.notificationText.value(cmd.data);
	},

	_onServerAlert: function (data) {
		alert(data);
	},
	
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ClientNetworkEvents; }