var image = {
	render: function (ctx, entity) {
		// Draw the player entity
		ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
		size = 100;
		numy = 5;
		numx = 5;

		xoffset = -1*size*numx/2;
		yoffset = -1*size*numy/2;

		numx = 3;
		numy = 3;
		
		var board = new Image();
		board.src = 'board.png';
		ctx.drawImage(board, xoffset, yoffset);

		/*
		ctx.beginPath();
		jumpx = 100;
		for (var x= 0; x < numx; x++) {
			jumpy = 100;
			for (var y= 0; y < numy; y++) {
				ctx.rect(x*jumpx+xoffset, y*jumpy+yoffset, 100, 100);
				jumpy += 100;
			}
			jumpx += 100;
		}
		ctx.stroke();
		ctx.font = "20px Arial";
		ctx.fillStyle = 'black';
		ctx.fillText("Room1",xoffset+10,yoffset+(size/2));
		ctx.fillText("Hall1",size + xoffset+10,yoffset+(size/2));*/
	}
};