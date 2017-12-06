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

		this.playerMessage = function(type, data){
			console.log(data)
			if (data.valid == false) {
				alert(data.message)
			}
		}
		

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

						ige.ui.style('IgeUiLabel', {
							'font': '18px Open Sans',
						});

						// Turn Notification
						ige.ui.style('#turnText', {
							'font': '24px Open Sans',
							'color': '#DC143C',
							'backgroundColor': '#212121'
						});

						ige.ui.style('#homeLabel', {
							'font': '20px Open Sans',
							'color': '#ffffff'
						});

						var topNav = new IgeUiElement()
							.id('topNav')
							.mount(self.uiScene);

						
						self.leftNav = new IgeUiElement()
							.id('leftNav')
							.mount(self.uiScene);

							var selWep = new IgeUiDropDown()
							.id('weaponsDropDown')
							.top(40)
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
							.mount(self.leftNav);


						var selChar = new IgeUiDropDown()
							.id('CharacterDropDown')
							.top(110)
							.left(10)
							.right(10)
							.options([{
								text: 'Miss Scarlet',
								value: 'Miss Scarlet'
							}, {
								text: 'Professor Plum',
								value: 'Professor Plum'
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
							.mount(self.leftNav);

						var selRoom = new IgeUiDropDown()
							.id('RoomDropDown')
							.top(180)
							.left(10)
							.right(10)
							.options([{
								text: 'Study',
								value: 'Study'
							}, {
								text: 'Hall',
								value: 'Hall'
							}, {
								text: 'Lounge',
								value: 'Lounge'
							}, {
								text: 'Library',
								value: 'Library'
							}, {
								text: 'Billiard Room',
								value: 'Billiard Room'
							}, {
								text: 'Dining Room',
								value: 'Dining Room'
							}, {
								text: 'Conservatory',
								value: 'Conservatory'
							}, {
								text: 'Ballroom',
								value: 'Ballroom'
							}, {
								text: 'Kitchen',
								value: 'Kitchen'
							}])
							.mount(self.leftNav);
						
						self.characterName = new IgeUiLabel()
							.id('charText')
							.top(0)
							.left(15)
							.width(150)
							.color('#DC143C')
							.value('Character')
							.mount(topNav);
						
						self.turnText = new IgeUiLabel()
							.id('turnText')
							.top(0)
							.left(240)
							.width(1000)
							.value('Waiting for Players')
							.mount(topNav);
						
						new IgeUiLabel()
							.id('weaponLabel')
							.top(10)
							.left(10)
							.right(10)
							.color('#FFFFFF')
							.value('Weapon:')
							.mount(self.leftNav);

						new IgeUiLabel()
							.id('suspectLabel')
							.top(80)
							.left(10)
							.right(10)
							.color('#FFFFFF')
							.value('Suspect:')
							.mount(self.leftNav);

						new IgeUiLabel()
							.id('roomLabel')
							.top(150)
							.left(10)
							.right(10)
							.color('#FFFFFF')
							.value('Accusation Room:')
							.mount(self.leftNav);

						/* This Button send the command to the server */
						var suggestButton = new IgeUiButton()
							.id('suggest-button')
							.top(220)
							.left(15)
							.width(80)
							.height(30)
							.backgroundColor('#ccc')
							.value('Suggest')
							.mount(self.leftNav);
						suggestButton._mouseUp = function(){
							ige.network.request('action', {
								actionType:"suggest", 
								suspect: selChar._value.value, 
								weapon: selWep._value.value
							}, self.playerMessage)
						}

						var accuseButton = new IgeUiButton()
							.id('accuse-button')
							.top(220)
							.right(15)
							.width(80)
							.height(30)
							.backgroundColor('#ccc')
							.value('Accuse')
							.mount(self.leftNav);
						accuseButton._mouseUp = function(){
							ige.network.request('action', {
								actionType:"accuse", 
								suspect: selChar._value.value, 
								weapon: selWep._value.value,
								room: selRoom._value.value
							}, self.playerMessage)
						}


						var upButton = new IgeUiButton()
							.id('up-button')
							.top(280)
							.width(50)
							.height(30)
							.value('Up')
							.backgroundColor('#ccc')
							.mount(self.leftNav);
						upButton._mouseUp = function(){
							ige.network.request('action', {actionType:"up"}, self.playerMessage)
						}
						
						var leftButton = new IgeUiButton()
							.id('left-button')
							.top(320)
							.left(25)
							.width(50)
							.height(30)
							.backgroundColor('#ccc')
							.value('Left')
							.mount(self.leftNav);
						leftButton._mouseUp = function(){
							ige.network.request('action', {actionType:"left"}, self.playerMessage)
						}

						var spButton = new IgeUiButton()
							.id('sp-button')
							.top(320)
							.left(87)
							.width(50)
							.height(30)
							.backgroundColor('#ccc')
							.value('Secret')
							.mount(self.leftNav);
						spButton._mouseUp = function(){
							ige.network.request('action', {actionType:"secretPassage"}, self.playerMessage)
						}

						var rightButton = new IgeUiButton()
							.id('right-button')
							.top(320)
							.right(25)
							.width(50)
							.height(30)
							.backgroundColor('#ccc')
							.value('Right')
							.mount(self.leftNav);
						rightButton._mouseUp = function(){
							ige.network.request('action', {actionType:"right"}, self.playerMessage)
						}

						var downButton = new IgeUiButton()
							.id('down-button')
							.top(360)
							.width(50)
							.height(30)
							.backgroundColor('#ccc')
							.value('Down')
							.mount(self.leftNav);
						downButton._mouseUp = function(){
							ige.network.request('action', {actionType:"down"}, self.playerMessage)
						}

					var endButton = new IgeUiButton()
						.id('end-button')
						.top(420)
						.width(50)
						.height(30)
						.backgroundColor('#ccc')
						.value('End Turn')
						.mount(self.leftNav);
					endButton._mouseUp = function(){
						ige.network.request('action', {actionType:"endTurn"}, self.playerMessage)
					}

					new IgeUiLabel()
						.id('handLabel')
						.top(500)
						.left(15)
						.right(10)
						.color('#FFFFFF')
						.value('Hand:')
						.mount(self.leftNav);

					self.card1 = new IgeUiLabel()
						.id('handLabel1')
						.top(520)
						.left(30)
						.right(10)
						.color('#FFFFFF')
						.value('card1')
						.mount(self.leftNav);

					self.card2 = new IgeUiLabel()
						.id('handLabel2')
						.top(540)
						.left(30)
						.right(10)
						.color('#FFFFFF')
						.value('')
						.mount(self.leftNav);

					self.card3 = new IgeUiLabel()
						.id('handLabel3')
						.top(560)
						.left(30)
						.right(10)
						.color('#FFFFFF')
						.value('')
						.mount(self.leftNav);

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
						

						ige.network.define('action', self.playerMessage);
						ige.network.define('Notification', self._onNotification);
						ige.network.define('Alert', self._onServerAlert);
						ige.network.define('Prove', self._onProve);

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
	},
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }