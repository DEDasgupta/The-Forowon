var Client = IgeClass.extend({
	classId: 'Client',

	init: function () {
		//ige.timeScale(0.1);
		ige.addComponent(IgeEditorComponent);

		// Load our textures
		var self = this;

		this.clientCharacter = "";

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

						ige.network.request("Available", name, self._onCharacterAvailable);


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
						
						
						ige.ui.style('#button3', {
							'width': 80,
							'height': 30,
							'top': 180,
							'left': 15,
							'backgroundColor': '#ccc'
						});
						ige.ui.style('#up-button', {
							'width': 50,
							'height': 30,
							'backgroundColor': '#ccc'
						});
						ige.ui.style('#down-button', {
							'width': 50,
							'height': 30,
							'backgroundColor': '#ccc'
						});
						ige.ui.style('#left-button', {
							'width': 50,
							'height': 30,
							'backgroundColor': '#ccc'
						});
						ige.ui.style('#right-button', {
							'width': 50,
							'height': 30,
							'backgroundColor': '#ccc'
						});

						ige.ui.style('IgeUiTextBox', {
							'backgroundColor': '#ffffff',
							'borderColor': '#212121',
							'borderWidth': 1,
							'bottom': null,
							'right': null,
							'width': 200,
							'height': 30,
							'left': 15,
							'font': '12px Open Sans',
							'color': '#000000'
						});
						ige.ui.style('#textBox1', {
							'top': 140
						});
						
						ige.ui.style('#textBox1:focus', {
							'borderColor': '#00ff00'
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
							.id('up-button')
							.top(260)
							.value('Up')
							.mount(leftNav);
						upButton._mouseUp = function(){
							ige.network.send('moveUp', {data:"hihi"})
						}
						
						var leftButton = new IgeUiButton()
							.id('left-button')
							.top(300)
							.left(50)
							.value('Left')
							.mount(leftNav);
						leftButton._mouseUp = function(){
							ige.network.send('moveLeft', {data:"hihi"})
						}

						var rightButton = new IgeUiButton()
							.id('right-button')
							.top(300)
							.right(50)
							.value('Right')
							.mount(leftNav);
						rightButton._mouseUp = function(){
							ige.network.send('moveRight', {data:"hihi"})
						}

						var downButton = new IgeUiButton()
							.id('down-button')
							.top(340)
							.value('Down')
							.mount(leftNav);
						downButton._mouseUp = function(){
								ige.network.send('moveDown', {data:"hihi"})
							}

						var commandText = new IgeUiTextBox()
							.id('textBox1')
							.value('')
							.mount(leftNav);

						/* This Button send the command to the server */
						var sendButton = new IgeUiButton()
							.id('button3')
							.value('Send')
							.mount(leftNav);
							sendButton._mouseUp = function(){
								ige.network.send(commandText.value, {data:"hihi"})
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
						ige.network.define('moveRight', playerMessage);
						ige.network.define('moveLeft', playerMessage);
						ige.network.define('moveDown', playerMessage);

						//ige.network.send('player_message', {data:"hihi"})
					});
				}
			});
		});
	},

	_onCharacterAvailable: function (cmd, data) {
		var name = "";
		//name=prompt("Please enter your character. The list of characters:\n" + data,"");

		do {
			name = prompt("Please enter your character. The list of characters:\n" + data,"");
	    } while (name == null || name == "" || name == undefined);

		/*Register for character name here */
		ige.network.request('Register', name, self.ClientNetworkEvents._onRegisterCharacter);
		ige.client.clientCharacter = name;
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }