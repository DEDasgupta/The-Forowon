var GameGrid = IgeEntity.extend({
	classId: 'GameGrid',
	
	init: function () {
		IgeEntity.prototype.init.call(this);
		if (!ige.isServer) {
			this.texture(ige.client.textures.gameGrid)
				.width(500)
				.height(500);
		}
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = GameGrid; }