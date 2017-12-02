
var GameBoard = require('./gameState/gameboard');

var Server = IgeClass.extend({
	classId: 'Server',
	Server: true,

	init: function (options) {
		var self = this;
		ige.timeScale(1);

		// Define an object to hold references to our player entities
		this.players = {};
		this.playersMap = {};
		this.playersNameMap = {}
		this.playerList= {};
		this.characterSet = new Array(6).fill(false);
		this.numOfPlayers = 0;
		this.characterShortNames = ["Scarlet", "Plum", "Peacock", "Green", "White", "Mustard"];
		this.characterNames = ["Miss Scarlet", "Prof Plum", "Mrs. Peacock", "Mr. Green", "Mrs. White", "Col. Mustard"];

		// Add the server-side game methods / event handlers
		this.implement(ServerNetworkEvents);
		
		//function to be called by client
		/*
		var playerMessage = function(data, clientid){
			console.log(self.exampleEntity)
			self.exampleEntity._translate.tween().stepBy({x:100,y:100},1000)
			ige.log("log")
			console.log(clientid)
			console.log(data)
		}*/

		// Add the networking component
		ige.addComponent(IgeNetIoComponent)

			//define function called by player
			

			// Start the network server
			.network.start(2000, function () {
				// Networking has started so start the game engine
				ige.start(function (success) {
					// Check if the engine started successfully
					if (success) {
						//ige.chat.createRoom('The Lobby', {}, 'lobby');
						ige.network.define('player_message', self._playerMessage)
						ige.network.define('action', self._onPlayerAction)
						// Create some network commands we will need
						ige.network.define('playerEntity', self._onPlayerEntity);

						ige.network.define('Register', self._onPlayerRegister);
						ige.network.define('Available', self._onPlayerAvailable);

						ige.network.on('connect', self._onPlayerConnect); // Defined in ./gameClasses/ServerNetworkEvents.js
						ige.network.on('disconnect', self._onPlayerDisconnect); // Defined in ./gameClasses/ServerNetworkEvents.js
						ige.network.define('Notification', self._onNotification);
						ige.network.define('Alert', self._onNotification);

						// Add the network stream component
						ige.network.addComponent(IgeStreamComponent)
							.stream.sendInterval(30) // Send a stream update once every 30 milliseconds
							.stream.start(); // Start the stream

							

						// Accept incoming network connections
						ige.network.acceptConnections(true);



						ige.addGraph('IgeBaseScene')
						var baseScene = ige.$('baseScene')

						

						self.gameGrid = new GameGrid()
							.id('game-grid')
							.streamMode(1)
							.mount(baseScene);

						self.GameBoard = new GameBoard();
							
						// Scarlet
						self.playerList[0] = new Player()
							.id('Scarlet')
							.streamMode(1)
							.mount(baseScene);
						self.playersNameMap['Scarlet'] = self.playerList[0];
								
						// Mustard					
						self.playerList[1] = new Player()
							.id('Mustard')
							.streamMode(1)
							.mount(baseScene);
						self.playersNameMap['Mustard'] = self.playerList[1];	

						// White
						self.playerList[2] = new Player()
							.id('White')
							.streamMode(1)
							.mount(baseScene);		
						self.playersNameMap['White'] = self.playerList[2];		

						// Green
						self.playerList[3] = new Player()
							.id('Green')
							.streamMode(1)
							.mount(baseScene);		
						self.playersNameMap['Green'] = self.playerList[3];		

						// Peacock
						self.playerList[4] = new Player()
							.id('Peacock')
							.streamMode(1)
							.mount(baseScene);				
						self.playersNameMap['Peacock'] = self.playerList[4];

						// Plum
						self.playerList[5] = new Player()
							.id('Plum')
							.streamMode(1)
							.mount(baseScene);
						self.playersNameMap['Plum'] = self.playerList[5];

						// Create the scene
						self.mainScene = new IgeScene2d()
							.id('mainScene')
							.mount(baseScene);

						// Create the scene
						self.scene1 = new IgeScene2d()
							.id('scene1')
							.mount(self.mainScene);  

						

						// Create the main viewport and set the scene
						// it will "look" at as the new scene1 we just
						// created above
						/*self.vp1 = new IgeViewport()
							.id('vp1')
							.autoSize(true)
							.scene(self.mainScene)
							.drawBounds(true)
							.mount(ige);*/
						
						
							
					}
				});
			});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Server; }