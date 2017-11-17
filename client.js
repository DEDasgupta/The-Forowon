var Client = IgeClass.extend({
	classId: 'Client',

	init: function () {
		//ige.timeScale(0.1);
		ige.addComponent(IgeEditorComponent);

		// Load our textures
		var self = this;

		// Enable networking
		ige.addComponent(IgeNetIoComponent);

		// Implement our game methods
		this.implement(ClientNetworkEvents);

		// Create the HTML canvas
		ige.createFrontBuffer(true);

		// Load the textures we want to use
		this.textures = {
			ship: new IgeTexture('./assets/PlayerTexture.js'),
			gameGrid: new IgeTexture('./assets/GameGridTexture.js')
		};

		ige.on('texturesLoaded', function () {
			// Ask the engine to start
			ige.start(function (success) {
				// Check if the engine started successfully
				if (success) {
					// Start the networking (you can do this elsewhere if it
					// makes sense to connect to the server later on rather
					// than before the scene etc are created... maybe you want
					// a splash screen or a menu first? Then connect after you've
					// got a username or something?
					ige.network.start('http://localhost:2000', function () {
						// Setup the network command listeners
						ige.network.define('playerEntity', self._onPlayerEntity); // Defined in ./gameClasses/ClientNetworkEvents.js

						// Setup the network stream handler
						ige.network.addComponent(IgeStreamComponent)
							.stream.renderLatency(80) // Render the simulation 160 milliseconds in the past
							// Create a listener that will fire whenever an entity
							// is created because of the incoming stream data
							.stream.on('entityCreated', function (entity) {
								self.log('Stream entity created with ID: ' + entity.id());

							});

						ige.addGraph('IgeBaseScene');
						var baseScene = ige.$('baseScene')
						
						self.mainScene = new IgeScene2d()
							.id('mainScene')
							.mount(baseScene);


						// Create the scene
						self.scene1 = new IgeScene2d()
							.id('scene1')
							.mount(self.mainScene);

						self.uiScene = new IgeScene2d()
							.id('uiScene')
							.depth(1)
							.ignoreCamera(true)
							.mount(self.mainScene);

				
						ige.ui.style('#topNav', {
							'backgroundColor': '#212121',
							'top': 0,
							'left': 0,
							'right': 0,
							'height': 42
						});
						
						ige.ui.style('#leftNav', {
							'backgroundColor': '#3d3d3d',
							'top': 42,
							'left': 0,
							'width': 225,
							'bottom': 0
						});
						
						
						ige.ui.style('#button1', {
							'width': 80,
							'height': 30,
							'top': 220,
							'left': 15,
							'backgroundColor': '#ccc'
						});
						ige.ui.style('#button2', {
							'width': 80,
							'height': 30,
							'top': 260,
							'left': 15,
							'backgroundColor': '#ccc'
						});
						
						var topNav = new IgeUiElement()
							.id('topNav')
							.mount(self.uiScene);
						
						var leftNav = new IgeUiElement()
							.id('leftNav')
							.mount(self.uiScene);
						
						new IgeUiDropDown()
							.id('optionsDropDown')
							.top(10)
							.left(10)
							.right(10)
							.options([{
								text: 'Test 1',
								value: 'test1'
							}, {
								text: 'Test 2',
								value: 'test2'
							}, {
								text: 'Test 3',
								value: 'test3'
							}])
							.mount(leftNav);

						var upButton = new IgeUiButton()
							.id('button1')
							.value('moveUp')
							.mount(leftNav);
							upButton._mouseUp = function(){
								ige.network.send('moveUp', {data:"hihi"})
							}

						var downButton = new IgeUiButton()
							.id('button2')
							.value('moveDown')
							.mount(leftNav);
							downButton._mouseUp = function(){
								ige.network.send('moveDown', {data:"hihi"})
							}

						

						// Create the main viewport and set the scene
						// it will "look" at as the new scene1 we just
						// created above
						/*self.vp2 = new IgeViewport()
							.id('vp2')
							.autoSize(true)
							.scene(baseScene)
							.drawBounds(true)
							.mount(ige);*/

						// Define our player controls
						ige.input.mapAction('left', ige.input.key.left);
						ige.input.mapAction('right', ige.input.key.right);
						ige.input.mapAction('thrust', ige.input.key.up);

						// Ask the server to create an entity for us
						ige.network.send('playerEntity');

						// We don't create any entities here because in this example the entities
						// are created server-side and then streamed to the clients. If an entity
						// is streamed to a client and the client doesn't have the entity in
						// memory, the entity is automatically created. Woohoo!

						// Enable console logging of network messages but only show 10 of them and
						// then stop logging them. This is a demo of how to help you debug network
						// data messages.
						//ige.network.debugMax(10);
						//ige.network.debug(true);

						// Create an IgeUiTimeStream entity that will allow us to "visualise" the
						// timestream data being interpolated by the player entity
						self.tsVis = new IgeUiTimeStream()
							.height(140)
							.width(400)
							.top(0)
							.center(0)
							//.mount(self.uiScene);

						self.custom1 = {
							name: 'Delta',
							value: 0
						};

						self.custom2 = {
							name: 'Data Delta',
							value: 0
						};

						self.custom3 = {
							name: 'Offset Delta',
							value: 0
						};

						self.custom4 = {
							name: 'Interpolate Time',
							value: 0
						};

						ige.watchStart(self.custom1);
						ige.watchStart(self.custom2);
						ige.watchStart(self.custom3);
						ige.watchStart(self.custom4);
						
						var playerMessage = function(data){
							ige.log("log")
							console.log(data)
						}

						ige.network.define('moveUp', playerMessage);
						ige.network.define('moveDown', playerMessage);
						ige.network.define('moveLeft', playerMessage);
						ige.network.define('moveDown', playerMessage);

						//ige.network.send('player_message', {data:"hihi"})
					});
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }