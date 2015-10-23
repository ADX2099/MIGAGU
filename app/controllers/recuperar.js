var win = $.winRecuperar;

var indicator = Ti.UI.createActivityIndicator({
	right:2,
	color: "white",
	font: {
		fontFamily: 'Helvetica Neue',
		fontSize: "20sp",
		fontWeight: 'bold'
	},
	style: Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
	height: Ti.UI.SIZE,
	width: Ti.UI.SIZE
});

var blockView = Ti.UI.createView({
	width:"100%",
	height:"100%",
	backgroundColor:"#000",
	opacity:"0.6"
});

$.btnEnviar.addEventListener('click', function(e) {
	if (Alloy.network.isAvailable()) {
			win.add(blockView);
			$.btnEnviar.add(indicator);
			indicator.show();
		if (Alloy.data.validateExpression(Alloy.data.expression.EMAIL, $.tfCorreo.value, false)) {
			Alloy.network.callService('apexrest/enviapass', {email : $.tfCorreo.value}, function(responseObj) {
				win.remove(blockView);
				indicator.remove();
				var alert = Ti.UI.createAlertDialog({
					message : responseObj.mensaje,
					buttonNames : ['OK']
				});
				alert.show();

				alert.addEventListener("click", function() {
					if (responseObj.error == 'false') {
						win.close();
				}
				});
			});

		} else {
			win.remove(blockView);
			indicator.remove();
		
			Ti.UI.createAlertDialog({
				message : 'Formato incorrecto del email',
				buttonNames : ['OK']
			}).show();

			$.tfCorreo.focus();
		}
	}	
});
		
$.cerrarButton.addEventListener("click", function() {
	win.close();
});


