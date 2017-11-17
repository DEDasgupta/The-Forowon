var image = {
	render: function (ctx, entity) {
		// Draw the player entity
		ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
		size = 100;
		numy = 5;
		numx = 5;
		ctx.beginPath();
		xoffset = -1*size*numx/2;
		yoffset = -1*size*numy/2;
		for (var x= 0; x <= numx; x++) {
			ctx.moveTo(x*size+xoffset, yoffset);
			ctx.lineTo(x*size+xoffset, -1*yoffset);
		}
		for (var y= 0; y <= numy; y++) {
			ctx.moveTo(xoffset, y*size+yoffset);
			ctx.lineTo(-1*xoffset, y*size+yoffset);
		}
		ctx.stroke();
		ctx.font = "20px Arial";
		ctx.fillStyle = 'white';
		ctx.fillText("Room1",xoffset+10,yoffset+(size/2));
		ctx.fillText("Hall1",size + xoffset+10,yoffset+(size/2));
	}
};