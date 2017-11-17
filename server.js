var Server = IgeClass.extend({
	classId: 'Server',
	Server: true,

	init: function (options) {
		var self = this;
		ige.timeScale(1);

		// Define an object to hold references to our player entities
		this.players = {};

		// Add the server-side game methods / event handlers
		this.implement(ServerNetworkEvents);

		//function to be called by client
		var playerMessage = function(data, clientid){
			console.log(self.exampleEntity)
			self.exampleEntity._translate.tween().stepBy({x:100,y:100},1000)
			ige.log("log")
			console.log(clientid)
			console.log(data)
		}
		

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
						ige.network.define('moveUp', self._moveUp)
						ige.network.define('moveDown', self._moveDown)
						ige.network.define('moveLeft', self._moveLeft)
						ige.network.define('moveRight', self._moveRight)
						// Create some network commands we will need
						ige.network.define('playerEntity', self._onPlayerEntity);

						ige.network.define('playerControlLeftDown', self._onPlayerLeftDown);
						ige.network.define('playerControlRightDown', self._onPlayerRightDown);
						ige.network.define('playerControlThrustDown', self._onPlayerThrustDown);

						ige.network.define('playerControlLeftUp', self._onPlayerLeftUp);
						ige.network.define('playerControlRightUp', self._onPlayerRightUp);
						ige.network.define('playerControlThrustUp', self._onPlayerThrustUp);

						ige.network.on('connect', self._onPlayerConnect); // Defined in ./gameClasses/ServerNetworkEvents.js
						ige.network.on('disconnect', self._onPlayerDisconnect); // Defined in ./gameClasses/ServerNetworkEvents.js

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
							
						self.exampleEntity = new ExampleEntity()
							.id('example1')
							.streamMode(1)
							.mount(baseScene);
						
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