//var gridCoordinates = [];

var image = {
	render: function (ctx, entity) {
		// Draw the player entity
		switch (entity._id)
		{
			case "Scarlet":
				if (entity.initialize)
				{
					entity._bounds2d.x2 = 120;
					entity._bounds2d.y2 = -200;
				}
				color = 'rgba(255, 36, 0, 1)';
				break;
			case "Mustard":
				if (entity.initialize)
				{
					entity._bounds2d.x2 = 260;
					entity._bounds2d.y2 = -100;
				}
				color = 'rgba(255, 219, 88, 1)';
				break;
			case "White":
				if (entity.initialize)
				{
					entity._bounds2d.x2 = 120;
					entity._bounds2d.y2 = 200;
				}
				color = 'rgba(0, 0, 0, 1)';
				break;
			case  "Green":
				if (entity.initialize)
				{
					entity._bounds2d.x2 = -130;
					entity._bounds2d.y2 = 200;
				}
				color = 'rgba(0, 255, 0, 1)';
				break;
			case "Peacock":
				if (entity.initialize)
				{
					entity._bounds2d.x2 = -230;
					entity._bounds2d.y2 = 100;
				}
				color = 'rgba(255, 0, 0, 1)';
				break;
			case "Plum":
				if (entity.initialize)
				{
					entity._bounds2d.x2 = -230;
					entity._bounds2d.y2 = -100;
				}
				color = 'rgba(142, 69, 133, 1)';
				break;
			default:
				color = 'rgba(0, 0, 0, 1)';
				break;
		}

		if (entity.initialize)
		{
			entity.initialize = false;
		}

		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.font = "20px Arial";
		ctx.fillStyle = color;
		ctx.fillText(entity._id,40+entity._bounds2d.x2, 5+entity._bounds2d.y2);
		ctx.arc(30+entity._bounds2d.x2,entity._bounds2d.y2,5,0,2*Math.PI);
		/*
		ctx.moveTo(0, -entity._bounds2d.y2);
		ctx.lineTo(entity._bounds2d.x2, entity._bounds2d.y2);
		ctx.lineTo(0, entity._bounds2d.y2 - 5);
		ctx.lineTo(-entity._bounds2d.x2, entity._bounds2d.y2);
		ctx.lineTo(0, -entity._bounds2d.y2);*/
		ctx.stroke();
	}
};