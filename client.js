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

						// Notification
						ige.ui.style('#textBox2', {
							'top': 5,
							'left': 400,
							'right': 200,
							'font': '24px Open Sans',
							'color': '#DC143C',
							'backgroundColor': '#212121'
						});
						ige.ui.style('#textBox3:focus', {
							'borderColor': '#00ff00'
						});

						var topNav = new IgeUiElement()
							.id('topNav')
							.mount(self.uiScene);

						self.notificationText = new IgeUiTextBox()
							.id('textBox2')
							.value('')
							.mount(topNav);

						
						var leftNav = new IgeUiElement()
							.id('leftNav')
							.mount(self.uiScene);
						
						new IgeUiLabel()
							.id('weaponLabel')
							.top(10)
							.left(10)
							.right(10)
							.color('#FFFFFF')
							.value('Weapon:')
							.mount(leftNav);
							
						var selWep = new IgeUiDropDown()
							.id('weaponsDropDown')
							.top(30)
							.left(10)
							.right(10)
							.options([{
								text: 'Candlestick',
								value: 'Candlestick'
							}, {
								text: 'Knife',
								value: 'Knife'
							}, {
								text: 'Lead Pipe',
								value: 'Lead Pipe'
							}, {
								text: 'Revolver',
								value: 'Revolver'
							}, {
								text: 'Rope',
								value: 'Rope'
							}, {
								text: 'Wrench',
								value: 'Wrench'
							}])
							.mount(leftNav);

						new IgeUiLabel()
							.id('suspectLabel')
							.top(70)
							.left(10)
							.right(10)
							.color('#FFFFFF')
							.value('Suspect:')
							.mount(leftNav);

						var selChar = new IgeUiDropDown()
							.id('CharacterDropDown')
							.top(90)
							.left(10)
							.right(10)
							.options([{
								text: 'Miss Scarlet',
								value: 'Miss Scarlet'
							}, {
								text: 'Prof Plum',
								value: 'Prof Plum'
							}, {
								text: 'Mrs. Peacock',
								value: 'Mrs. Peacock'
							}, {
								text: 'Mr. Green',
								value: 'Mr. Green'
							}, {
								text: 'Mrs. White',
								value: 'Mrs. White'
							}, {
								text: 'Col. Mustard',
								value: 'Col. Mustard'
							}])
							.mount(leftNav);
							selChar._mouseUp = function(){
								console.log(selChar._value.value)
							};

						var upButton = new IgeUiButton()
							.id('up-button')
							.top(260)
							.width(50)
							.height(30)
							.value('Up')
							.backgroundColor('#ccc')
							.mount(leftNav);
						upButton._mouseUp = function(){
							ige.network.send('action', {actionType:"up"})
						}
						
						var leftButton = new IgeUiButton()
							.id('left-button')
							.top(300)
							.left(50)
							.width(50)
							.height(30)
							.backgroundColor('#ccc')
							.value('Left')
							.mount(leftNav);
						leftButton._mouseUp = function(){
							ige.network.send('action', {actionType:"left"})
						}

						var rightButton = new IgeUiButton()
							.id('right-button')
							.top(300)
							.right(50)
							.width(50)
							.height(30)
							.backgroundColor('#ccc')
							.value('Right')
							.mount(leftNav);
						rightButton._mouseUp = function(){
							ige.network.send('action', {actionType:"right"})
						}

						var downButton = new IgeUiButton()
							.id('down-button')
							.top(340)
							.width(50)
							.height(30)
							.backgroundColor('#ccc')
							.value('Down')
							.mount(leftNav);
						downButton._mouseUp = function(){
								ige.network.send('action', {actionType:"down"})
							}

						/* This Button send the command to the server */
						var suggestButton = new IgeUiButton()
							.id('suggest-button')
							.top(150)
							.left(15)
							.width(80)
							.height(30)
							.backgroundColor('#ccc')
							.value('Suggest')
							.mount(leftNav);
						suggestButton._mouseUp = function(){
							ige.network.send('action', {
								actionType:"suggest", 
								suspect: selChar._value.value, 
								weapon: selWep._value.value
							})
						}

						var accuseButton = new IgeUiButton()
							.id('accuse-button')
							.top(150)
							.right(15)
							.width(80)
							.height(30)
							.backgroundColor('#ccc')
							.value('Accuse')
							.mount(leftNav);
						suggestButton._mouseUp = function(){
							ige.network.send('action', {
								actionType:"accuse", 
								suspect: selChar._value.value, 
								weapon: selWep._value.value
							})
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
							console.log(data)
							if (data.valid == false) {
								alert(data.message)
							}
							
						}

						ige.network.define('action', playerMessage);
						ige.network.define('Notification', self._onNotification);

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