var image = {
	render: function (ctx, entity) {
		// Draw the player entity
		color = 'rgba(255, 0, 0, 1)'

		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.font = "20px Arial";
		ctx.fillStyle = color;
		ctx.fillText("Player1",40,5);
		ctx.arc(30,0,5,0,2*Math.PI);
		ctx.stroke();
	}
};