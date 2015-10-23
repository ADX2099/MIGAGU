
/*
 * 
 * pushNotification.js
 * Modulo encargado de registrar y generar el token para push notifications
 */

var notificacion = {};


var deviceToken = null;


notificacion.getToken = function(){
	
	if(Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8){
		function registerForPush(){
			Ti.API.info("si entre a register");
			Ti.Network.registerForPushNotifications({
				success : deviceTokenSuccess,
				error : deviceTokenError,
				callback : receivePush 
			});
		
		Ti.App.iOS.removeEventListener("usernotificationsettings", registerForPush);
	};
	
	Ti.App.iOS.addEventListener("usernotificationsettings", registerForPush);
	Ti.App.iOS.registerUserNotificationSettings({
		 types: [
            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
            Ti.App.iOS.UESR_NOTIFICATION_TYPE_BADGE
          ]
      });
	
	}else{
	Ti.Network.registerForPushNotifications({
		 types: [
            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
            Ti.App.iOS.UESR_NOTIFICATION_TYPE_BADGE
        ],
			success: deviceTokenSuccess,
			error: deviceTokenError,
			callback:receivePush 
		});
	}
	function deviceTokenSuccess(e){
	 deviceToken = e.deviceToken;
	 Ti.App.Properties.setString("TOKEN",deviceToken);
	 //alert("EL TOKEs tokes:::" + deviceToken);
	 
	 
}
function displayNotification(params){
	var webview = Titanium.UI.createWebView({url:params.data.mapa});
    var window = Titanium.UI.createWindow();
    window.add(webview);
    window.open({modal:true});
	
}

function receivePush(e){
	//alert('Se recibio una notificación ' + JSON.stringify(e));
	var objectJSON = e.data;
	//alert("el mapa es::.." + JSON.stringify(objectJSON.mapa));
	createWebView(objectJSON.mapa);
}

function deviceTokenError(e){
	alert('No fue posible registrar tu dispositivo, Intentalo nuevamente ' + e.error);
}

};

function createWebView(_url) {
	////----------------------pop up mapa ticket--------------------///
	Ti.API.info('el mapa es: --- ' + _url);
	var winMapa = Ti.UI.createWindow({
		navBarHidden : true,
		backgroundColor : "blue",
	});
	winMapa.navBarHidden = true;
	var webViewMapa = Ti.UI.createWebView({
		scalesPageToFit : false,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});

	var aceptarTicket = Ti.UI.createView({
		backgroundImage : "/images/btn-cerrar-mapa.png",
		top : "10%",
		right : "5%",
		width : Alloy.Globals.height * 0.08,
		height : Alloy.Globals.height * 0.08
	});
	var getDescription = Ti.UI.createView({
		backgroundImage : "/images/btn-texto.png",
		top : "20%",
		right : "5%",
		width : Alloy.Globals.height * 0.08,
		height : Alloy.Globals.height * 0.08
	});
	var popWin = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : "transparent",
		visible : false
	});
	var transparencia = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : "black",
		opacity : 0.4
	});
	var fondoPop = Ti.UI.createView({
		backgroundImage : "/images/base-detalle-noticias.jpg",
		height : "80%",
		width : "80%"
	});
	var infoField = Ti.UI.createTextArea({
		color : 'black',
		editable : "false",
		width : "80%",
		height : "85%",
		scrollable : "true",
		wordWrap : "true",
		backgroundColor : "transparent",
	});
	var aceptarBtn = Ti.UI.createView({
		backgroundImage : "/images/btn-listo.jpg",
		height : "10%",
		width : Ti.UI.FILL,
		bottom : 0
	});
	aceptarTicket.addEventListener("click", function(e) {
		winMapa.close();
	});
	getDescription.addEventListener("click", function() {
		popWin.visible = true;
	});
	aceptarBtn.addEventListener("click", function() {
		popWin.visible = false;
	});

	webViewMapa.url = _url;
	

	fondoPop.add(infoField);
	fondoPop.add(aceptarBtn);

	popWin.add(transparencia);
	popWin.add(fondoPop);

	winMapa.add(webViewMapa);
	winMapa.add(aceptarTicket);
	//winMapa.add(getDescription);
	winMapa.add(popWin);
	winMapa.open({
		modal : true,
		navbarHidden : true
	});
}
module.exports = notificacion;
