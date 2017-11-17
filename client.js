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
			ship: new IgeTexture('./assets/PlayerTexture.js')
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

						self.mainScene = new IgeScene2d()
							.id('mainScene');

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
						
						ige.ui.style('#main', {
							'backgroundColor': '#ffffff',
							'left': 225,
							'right': 0,
							'top': 42,
							'bottom': 0
						});
						
						ige.ui.style('#logo', {
							'backgroundRepeat': 'no-repeat',
							'middle': 0,
							'left': 20,
							'width': 86,
							'height': 14
						});
						
						ige.ui.style('.title', {
							'font': '3em Open Sans',
							'color': '#666666',
							'width': 200,
							'height': 40,
							'top': 10,
							'left': 10
						});
						
						ige.ui.style('.subTitle', {
							'font': 'lighter 16px Open Sans',
							'color': '#666666',
							'width': 400,
							'height': 40,
							'top': 40,
							'left': 11
						});
						
						ige.ui.style('IgeUiTextBox', {
							'backgroundColor': '#ffffff',
							'borderColor': '#212121',
							'borderWidth': 1,
							'bottom': null,
							'right': null,
							'width': 300,
							'height': 30,
							'left': 15,
							'font': '12px Open Sans',
							'color': '#000000'
						});
						
						ige.ui.style('#textBox1', {
							'top': 140
						});
						
						ige.ui.style('#textBox2', {
							'top': 180
						});
						
						ige.ui.style('#textBox1:focus', {
							'borderColor': '#00ff00'
						});
						
						ige.ui.style('#textBox2:focus', {
							'borderColor': '#00ff00'
						});
						
						ige.ui.style('#dashBar', {
							'backgroundColor': '#eeeeee',
							'top': 80,
							'left': 15,
							'right': 15,
							'height': 40
						});
						
						ige.ui.style('IgeUiLabel', {
							'font': '12px Open Sans',
							'color': '#000000'
						});
						
						ige.ui.style('#homeLabel', {
							'font': '14px Open Sans',
							'color': '#333333'
						});
						
						ige.ui.style('#button1', {
							'width': 80,
							'height': 30,
							'top': 220,
							'left': 15,
							'backgroundColor': '#ccc'
						});
						
						var topNav = new IgeUiElement()
							.id('topNav')
							.mount(self.uiScene);
						
						new IgeUiElement()
							.id('logo')
							.mount(topNav);
						
						var leftNav = new IgeUiElement()
							.id('leftNav')
							.mount(self.uiScene);
						
						var main = new IgeUiElement()
							.id('main');
						
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

						new IgeUiLabel()
							.value('Dashboard')
							.styleClass('title')
							.mount(main);
						
						new IgeUiLabel()
							.value('Login with your username and password')
							.styleClass('subTitle')
							.mount(main);
						
						var dashBar = new IgeUiElement()
							.id('dashBar')
							.mount(main);
						
						new IgeUiLabel()
							.id('homeLabel')
							.value('Home')
							.width(100)
							.height(40)
							.left(0)
							.top(0)
							.mount(dashBar);
						
						new IgeUiTextBox()
							.id('textBox1')
							.value('')
							.placeHolder('Username')
							.placeHolderColor('#989898')
							.mount(main);
						
						new IgeUiTextBox()
							.id('textBox2')
							.value('')
							.mask('*')
							.placeHolder('Password')
							.placeHolderColor('#989898')
							.mount(main);
						
						var button = new IgeUiButton()
							.id('button1')
							.value('throw alert')
							.mount(leftNav);
							button._mouseUp = function(){alert("hi");}

						self.grid = new IgeTileMap2d()
							.id('tilegrid')
							.gridSize(5,5)
							.drawGrid(true)
							.tileHeight(80)
							.tileWidth(80)
							.translateTo(-300,-300,0)
							.drawBounds(true)
							.mount(self.scene1)

						// Create the main viewport and set the scene
						// it will "look" at as the new scene1 we just
						// created above
						self.vp1 = new IgeViewport()
							.id('vp1')
							.autoSize(true)
							.scene(self.mainScene)
							.drawBounds(true)
							.mount(ige);

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
						ige.network.define('player_message', playerMessage);

						ige.network.send('player_message', {data:"hihi"})
					});
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }