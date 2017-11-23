var image = {
	render: function (ctx, entity) {
		// Draw the player entity
		switch (entity._id)
		{
			case "Scarlet":
				color = 'rgba(255, 36, 0, 1)';
				break;
			case "Mustard":
				color = 'rgba(255, 219, 88, 1)';
				break;
			case "White":
				color = 'rgba(0, 0, 0, 1)';
				break;
			case  "Green":
				color = 'rgba(0, 255, 0, 1)';
				break;
			case "Peacock":
				color = 'rgba(255, 0, 0, 1)';
				break;
			case "Plum":
				color = 'rgba(142, 69, 133, 1)';
				break;
			default:
				color = 'rgba(0, 0, 0, 1)';
				break;
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