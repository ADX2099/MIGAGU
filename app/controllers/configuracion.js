/*
* Pantalla encargada de mostrar las opciones de configuracion del usuario. la pantalla funciona mediante una animacios
* en donde al presionar una de las views, esta desplega una animacion la cual presenta la informacion a consultar
* Los menus principales son los  siguientes:
* BANNERS
* Acerca de AguMovil
* Mi Cuenta
* Login
* Mis tickets
*
* version 1.0
* Autor: Moobzen
*
*/
//var activiInd = Alloy.createWidget("activityIndicatorCustom").getView("actIndWin");
var texto1 = "Los datos personales recabados serán protegidos, incorporados y tratados en el Sistema de datos Personales del Programa 072 Atención Ciudadana";
var texto2 = "para mayor información puedes consultar la página:";
var texto3 = " http://www.agu.df.gob.mx/ley-de-proteccion-de-datos-personales-para-el-df/";
var terminosTxt = texto1 + "            " + texto2 + "                   " + texto3;
var idGet = Ti.App.Properties.getString("id");
var LOG_TAG = "CONFIGURACIONES Window";
var peticion;
var ticketsCollection = Alloy.Collections.tickets;
var tipoLogg;
//alert("mi id es:::" + idGet);
var win_loading = Ti.UI.createView({
	width : Ti.UI.FILL,
	height : Ti.UI.FILL,
	backgroundColor : "transparent"
});
var desplegado = 0;
var DEBUG_ALERT = Ti.UI.createAlertDialog({
	title : "Atencion",
	message : "",
	buttonNames : ["@ADX2099"]
});
var imagenLogin = $.imagenLogin;
var indicator = Ti.UI.createActivityIndicator({
	right : 2,
	color : "white",
	font : {
		fontFamily : 'Helvetica Neue',
		fontSize : "20sp",
		fontWeight : 'bold'
	},
	style : Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE
});

var blockView = Ti.UI.createView({
	width : "100%",
	height : "100%",
	backgroundColor : "#000",
	opacity : "0.6"
});

/*
 * En esta seccion de codigo, se dan los valores en la posicion de la pantalla
 */
$.scrollableViewBanners.top = 42;
var bannerHeight = 151;
$.scrollableViewBanners.height = bannerHeight;
var opcTop0 = bannerHeight + 42;
var opcTop1 = opcTop0 + (Alloy.Globals.height * 0.08);
var opcTop2 = opcTop1 + (Alloy.Globals.height * 0.08);
var opcTop3 = opcTop2 + (Alloy.Globals.height * 0.08);
var opcTop4 = opcTop3 + (Alloy.Globals.height * 0.08);
var opcTop5 = opcTop4 + (Alloy.Globals.height * 0.08);

//
//acerca de
$.infoViewText.top = Alloy.Globals.height * 0.10;

$.terminos.top = Alloy.Globals.height * 0.55;
$.prueba.top = Alloy.Globals.height * 0.63;

//LOGIN
$.logoDF.top = 20;
$.logoDF.right = "15%";
$.logoAGU.top = 20;
$.logoAGU.left = "15%";
$.usuario.top = 140;
$.twitter.top = 185;
$.password.top = 230;
$.btnEntrar.top = 280;
$.recuerdaView.top = 330;

$.opc0.top = opcTop0;
$.opc1.top = opcTop1;
$.opc2.top = opcTop2;
$.opc3.top = opcTop3;
$.opc4.top = opcTop4;
$.opc5.top = opcTop5;


$.closeConfig.addEventListener("click", function() {
	$.windowConf.close();
});

/*
 * Seccion de Listeners que realizarn la animacion al dar click sobre el el boton correspondiente
 */
//ADX2099:LISTENERS MENU
$.opcTab0.addEventListener("click", function() {
	if (desplegado == 0) {
		var a1 = Titanium.UI.createAnimation();
		a1.top = 35;
		a1.duration = 300;
		$.opc0.animate(a1);
		var ao1 = Titanium.UI.createAnimation();
		ao1.top = Alloy.Globals.height;
		ao1.duration = 300;
		$.opc1.animate(ao1);
		$.opc2.animate(ao1);
		$.opc3.animate(ao1);
		$.opc4.animate(ao1);
		$.opc5.animate(ao1);
		desplegado = 1;
	} else {
		retry();
	}
});

$.opcTab1.addEventListener("click", function() {
	var formView = Alloy.createController("formView");
	formView.getView('formVista');
	if (desplegado == 0) {
		var a1 = Titanium.UI.createAnimation();
		a1.top = 35;
		a1.duration = 300;
		$.opc1.animate(a1);
		var ao1 = Titanium.UI.createAnimation();
		ao1.top = Alloy.Globals.height;
		ao1.duration = 300;
		$.opc0.animate(ao1);
		$.opc2.animate(ao1);
		$.opc3.animate(ao1);
		$.opc4.animate(ao1);
		$.opc5.animate(ao1);

		desplegado = 1;
	} else {
		retry();
	}
});
$.opcTab2.addEventListener("click", function() {
	if (desplegado == 0) {
		var a1 = Titanium.UI.createAnimation();
		a1.top = 35;
		a1.duration = 300;
		$.opc2.animate(a1);
		var ao1 = Titanium.UI.createAnimation();
		ao1.top = Alloy.Globals.height;
		ao1.duration = 300;
		$.opc0.animate(ao1);
		$.opc1.animate(ao1);
		$.opc3.animate(ao1);
		$.opc4.animate(ao1);
		$.opc5.animate(ao1);
		desplegado = 1;
	} else {
		retry();
	}
});

$.tableTicket.data = [];
$.opcTab3.addEventListener("click", function() {
	peticion = 0;
	if (Ti.App.Properties.getBool("session")) {
		
		if (desplegado == 0) {
			tickets(peticion);
			$.activityIndicatorTicket.show();
			$.tableTicket.visible = true;
			$.tableFavoritos.visible = false;
			$.tableHistorial.visible = false;
			
			var a1 = Titanium.UI.createAnimation();
			a1.top = 35;
			a1.duration = 300;
			$.opc3.animate(a1);
			var ao1 = Titanium.UI.createAnimation();
			ao1.top = Alloy.Globals.height;
			ao1.duration = 300;
			$.opc0.animate(ao1);
			$.opc2.animate(ao1);
			$.opc1.animate(ao1);
			$.opc4.animate(ao1);
			$.opc5.animate(ao1);
			
			
			desplegado = 1;
		} else {
			retry();
			$.tableTicket.data = [];
			$.tableTicket.visible = false;
			$.imagenLogin.visible = true;
			

			
		}
	} else {
		var a = Ti.UI.createAlertDialog({
			title : "Atención",
			message : "Necesitas iniciar sesión para poder obtener tus reportes",
			buttonNames : ["OK"]
		}).show();
	}
});


$.tableFavoritos.data = [];
$.opcTab4.addEventListener("click", function() {
	peticion = 1;
	if (Ti.App.Properties.getBool("session")) {
		if (desplegado == 0) {
			tickets(peticion);
			$.activityIndicatorTicket.show();
			$.tableFavoritos.visible = true;
			$.tableTicket.visible = false;
			$.tableHistorial.visible = false;
			var a1 = Titanium.UI.createAnimation();
			a1.top = 35;
			a1.duration = 300;
			$.opc4.animate(a1);
			var ao1 = Titanium.UI.createAnimation();
			ao1.top = Alloy.Globals.height;
			ao1.duration = 300;
			$.opc0.animate(ao1);
			$.opc2.animate(ao1);
			$.opc1.animate(ao1);
			$.opc3.animate(ao1);
			$.opc5.animate(ao1);
			$.imagenLogin.visible = false;
			desplegado = 1;

		} else {

			retry();
			$.tableFavoritos.data = [];
			$.tableFavoritos.visible = false;
			$.imagenLogin.visible = true;	
		}
	} else {
		var a = Ti.UI.createAlertDialog({
			title : "Atención",
			message : "Necesitas iniciar sesión para generar tus favoritos",
			buttonNames : ["OK"]
		}).show();
	}

});

$.tableHistorial.data = [];
$.opcTab5.addEventListener("click", function() {
	peticion = 2;
	if (Ti.App.Properties.getBool("session")) {
		if (desplegado == 0) {
			tickets(peticion);
			$.activityIndicatorTicket.show();
			$.tableHistorial.visible = true;
			$.tableFavoritos.visible = false;
			$.tableTicket.visible = false;
			$.imagenLogin.visible = false;
			var a1 = Titanium.UI.createAnimation();
			a1.top = 35;
			a1.duration = 300;
			$.opc5.animate(a1);
			var ao1 = Titanium.UI.createAnimation();
			ao1.top = Alloy.Globals.height;
			ao1.duration = 300;
			$.opc0.animate(ao1);
			$.opc2.animate(ao1);
			$.opc1.animate(ao1);
			$.opc3.animate(ao1);
			$.opc4.animate(ao1);
			desplegado = 1;
			
		} else {

			retry();
			$.imagenLogin.visible = true;
			$.tableHistorial.data = [];
			$.tableHistorial.visible = false;
			
		}
	} else {
		var a = Ti.UI.createAlertDialog({
			title : "Atención",
			message : "Necesitas iniciar sesión para obtener tu historial",
			buttonNames : ["OK"]
		}).show();
	}

});

/*
 * Regresa el menu a su posicion, accediendo a los valores asignados en la variable opTop
 */
function retry() {
	var ao0 = Titanium.UI.createAnimation();
	ao0.top = opcTop0;
	ao0.duration = 300;
	$.opc0.animate(ao0);
	var a2 = Titanium.UI.createAnimation();
	a2.top = opcTop1;
	a2.duration = 300;
	$.opc1.animate(a2);
	desplegado = 0;
	var ao2 = Titanium.UI.createAnimation();
	ao2.top = opcTop2;
	ao2.duration = 300;
	$.opc2.animate(ao2);
	var ao3 = Titanium.UI.createAnimation();
	ao3.top = opcTop3;
	ao3.duration = 300;
	$.opc3.animate(ao3);
	desplegado = 0;
	var ao4 = Titanium.UI.createAnimation();
	ao4.top = opcTop4;
	ao4.duration = 300;
	$.opc4.animate(ao4);
	desplegado = 0;
	var ao5 = Titanium.UI.createAnimation();
	ao5.top = opcTop5;
	ao5.duration = 300;
	$.opc5.animate(ao5);
	desplegado = 0;
};
//Al dar click en el boton prueba se manda a llamar al controlador que despliega el tutorial

$.prueba.addEventListener("click", function() {
	var tutorial = Alloy.createController('info').getView('popupWin');
	tutorial.open({
		modal : true
	});

});

/*
 * Evento que comienza con la validacion del flujo para poder ingresar a la app
 *
 */

/*
 * tipoLogg: 0 = email : 1 = twitter
 */
function loggIn(tipoLogg){
	$.windowConf.add(blockView);
	$.btnEntrar.add(indicator);
	indicator.show();
	switch(tipoLogg){
		case 0:
			var params = {
				email : $.usuario.value,
				password : $.password.value,
				twitter : $.twitter.value
			};
		break;
		case 1:
			var params = {
				email : $.usuario.value,
				password : $.password.value,
				twitter : $.twitter.value
			};
		break;
	}
	
	//WEBSERVICE CALL
	Ti.API.info(JSON.stringify(params));
	Alloy.network.callService('apexrest/login', params, function(responseObj) {
		Ti.API.info(JSON.stringify(responseObj));
		if (responseObj.error == 'false') {
			$.windowConf.remove(blockView);
			indicator.hide();
			var datos = {
				nombre : responseObj.nombre,
				apaterno : responseObj.apaterno,
				amaterno : responseObj.amaterno,
				email : responseObj.email,
				telefono : responseObj.telefono,
			};

			Ti.App.Properties.setString("id", responseObj.idCiudadano);
			Ti.App.Properties.setString("datos", JSON.stringify(datos));
			Ti.App.Properties.setBool("configurado", true);
			Ti.App.Properties.setBool("session", true);
			//Ti.API.info("id: " + Ti.App.Properties.getString("id"));

			$.windowConf.close();
			indicator.hide();

		} else {
			$.windowConf.remove(blockView);
			Ti.UI.createAlertDialog({
				title : "Aviso",
				message : "Error al iniciar sesión. \n" + responseObj.Mensaeje,
				buttonNames : ["Ok"]
			}).show();
			$.password.value = "";
			indicator.hide();
		}

	});

}

$.btnEntrar.addEventListener("click", function() {
	if (Alloy.network.isAvailable()) {
		if (Ti.App.Properties.getBool("session") != true) {
			//VALIDA QUE QUE ESTEN NO ESTEN VACIOS
			if($.usuario.value.length > 0 || $.twitter.value.length > 0){
					if($.usuario.value.length > 0 && Alloy.data.validateExpression(Alloy.data.expression.EMAIL, $.usuario.value, false)){
						//SE VA A LOGGEAR CON EMAIL
						tipoLogg = 0;
						if ($.password.value.length > 0) {
							loggIn(tipoLogg);
						}else{
							Ti.UI.createAlertDialog({
								message : 'Ingresa tu password'
							}).show();
							$.password.focus();
							$.windowConf.remove(blockView); 
						}
					}
					
					if($.twitter.value.length > 0){
						tipoLogg = 1;
						if ($.password.value.length > 0) {
							loggIn(tipoLogg);
						}else{
							Ti.UI.createAlertDialog({
								message : 'Ingresa tu password'
							}).show();
							$.password.focus();
							$.windowConf.remove(blockView); 
						}
					}
				
			}else{
				//ESTAN VACIOS LOS CAMPOS DE EMAIL O TWITTER
				Ti.UI.createAlertDialog({
						message : 'Ingresa tu Correo o Twitter para ingresar'
					}).show();
					$.password.focus();
					$.windowConf.remove(blockView);
			}
		}else{
			Ti.App.Properties.setBool("session", false);
			$.windowConf.close();
		}
	} else {
		var alert = Ti.UI.createAlertDialog({
			title : "Atención",
			message : "Tu dispositivo no se cuenta con internet, es necesario estar conectado a internet para hacer uso de la aplicación.",
			buttonNames : ["Ok"]
		});

		alert.show();

		alert.addEventListener('click', function(e) {
			win.close();
		});
	}

});

//var bearerToken = Ti.App.Properties.setString('TwitterBearerToken', "");

function autorizaWebView(_url) {
	Ti.API.info('ADX2099.:::.' + _url);
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
		top : "5%",
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

/*
 * Evento que crea el controlador para iniciar el prpceso de recordar la contraseña
 */

$.recuerdaView.addEventListener("click", function() {
	//Ti.API.info("Diste click....");
	var recuerdaWin = Alloy.createController("recuperar");
	recuerdaWin.getView("winRecuperar").open();
});

//ACTIVITY INDICATOR PARA TRAER LA INFORMACION NUEVAMENTE
//var mapAlert = Alloy.Indicator("Descargando...");

/*
 * Funcion encargada de consultar los tickets asignados al usuario por medio del ID del usuario,
 * una vez descargados los tickets se muestran en una tabla.
 */

function tickets(peticion) {

	var alert = Ti.UI.createAlertDialog({
		title : "Atencion",
		message : "No se han encontrado tickets para tu usuario.",
		buttonName : ["OK"]
	});
	if (Alloy.network.isAvailable()) {
		// var mensaje = "Obteniendo tickets";
		// app.showLoadingMessage(mensaje);
		//CONSTANTES PARA LOS DOS FLUJOS ADX2099

		var favoriteProp;

		switch (peticion) {
		case 0:
			//TODOS LOS REPORTES
			var params = {
				idCiudadano : idGet,
				historial : "false",
				favoritos : "false"
			};
			Alloy.network.callService(Alloy.network.services.status_ticket, params, function(response) {
				alert.message = JSON.stringify(response);
				//alert.show();
				if (response.length > 0) {
					if (response[0].error == 'false') {
						cargaTickets(response);
						$.activityIndicatorTicket.hide();
					} else {
						alert.show();
					}
				} else {
					alert.show();
				}
			});

			break;
		case 1:
			
			//TRAE LOS FAVORITOS
			var params = {
				idCiudadano : idGet,
				historial : "false",
				favoritos : "true"
			};
			var envion = JSON.stringify(params);
			Ti.API.info("EL JSONO..:" + envion);
			Alloy.network.callService(Alloy.network.services.status_ticket, params, function(response) {
				var hola = JSON.stringify(response);
				Ti.API.info("Respuesta..:" + hola);
				if (response.length > 0) {
					if (response[0].error == 'false') {
						cargaTickets(response);
						$.activityIndicatorTicket.hide();
						
					} else {
						alert.show();
					}
				} else {
					alert.show();
				}
			});
			break;
		case 2:
			//TRAE LOS HISTORIAL
			var params = {
				idCiudadano : idGet,
				historial : "true",
				favoritos : "false"
			};
			Alloy.network.callService(Alloy.network.services.status_ticket, params, function(response) {
				if (response.length > 0) {
					if (response[0].error == 'false') {
						cargaTickets(response);
						$.activityIndicatorTicket.hide();
			
					} else {
						alert.show();
					}
				} else {
					alert.show();
				}
			});

			break;

		}

	} else {
		var alert = Ti.UI.createAlertDialog({
			title : "Atención",
			message : "Tu dispositivo cuenta con internet, es necesario estar conectado a internet para hacer uso de la aplicación.",
			buttonNames : ["Ok"]
		});

		alert.show();

	}
}

	
/*
 * Funcion encargada de volver a pedir la afectacion enviando el numero de ticket
 * @param {string}
 * return WebView
 */
function getAfectAgain(numTicket) {

	var paramAfectacion = {
		"numeroTicket" : numTicket,
		"blackberry" : ""
	};

	//Ti.API.info("El stringify es:.." + JSON.stringify(paramAfectacion));
	Alloy.network.callService('apexrest/avresp', paramAfectacion, function(responseObj) {
		$.windowConf.remove(blockView);
		//mapAlert.close();
		//Ti.API.info("El stringify es:.." + JSON.stringify(responseObj));
		var response = responseObj;
		var texto = response.Descripción;
		//var ticketNumero = response.NumeroTicket;
		//var Status = response.Status;
		var miUrl = response.URL;
		createWebView(texto, miUrl);

	});
}

/*
 * Funcion encargada de obtener nuevamente la url y desplegarlo en una webview
 * @param {string} getMapAgain
 * return String
 */
function getMapAgain(numTicket) {
	//Ti.API.info("el numero de ticket:.." + numTicket);
	var paramStatus = {
		"numeroTicket" : numTicket,
		"blackberry" : ""
	};

	if (Ti.Platform.osname == "iphone" || Ti.Platform.osname == "android") {
		paramStatus.blackberry = "false";
	} else {
		paramStatus.blackberry = "true";
	}

	Alloy.network.callService('apexrest/avresp', paramStatus, function(responseObj) {
		//Ti.API.info("El stringify es:.." + JSON.stringify(responseObj));
		if (OS_IOS) {
			$.windowConf.remove(blockView);
			//mapAlert.close();
		} else {

		}

		var response = responseObj;
		var texto = response.Descripción;
		//var ticketNumero = response.NumeroTicket;
		//var Status = response.Status;
		var miUrl = response.URL;
		createWebView(texto, miUrl);

	});

}



/*
 * Funcion encargada de crear la pantalla de webView con los datos proporcionados
 * @param {String,String} createWebView
 * return WebView
 * */
function createWebView(_texto, _url) {
	////----------------------pop up mapa ticket--------------------///
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
	infoField.value = _texto;

	fondoPop.add(infoField);
	fondoPop.add(aceptarBtn);

	popWin.add(transparencia);
	popWin.add(fondoPop);

	winMapa.add(webViewMapa);
	winMapa.add(aceptarTicket);
	winMapa.add(getDescription);
	winMapa.add(popWin);
	winMapa.open({
		modal : true,
		navbarHidden : true
	});
}

if (Ti.App.Properties.getBool("session")) {
	$.usuario.visible = false;
	$.password.visible = false;
	$.recuerdaView.visible = false;
	$.twitter.visible = false;
	$.btnEntrar.top = Alloy.Globals.height * 0.3;
	$.sesionLabel.text = "Cerrar Sesión";
}
/*
 * Evento que despliega una ventana de popup la cual contiene los terminos y condiciones de la app
 */
var popUp = Alloy.createController('popup').getView('popupWin');
popUp.mostrarData(terminosTxt);
$.terminos.addEventListener("click", function() {
	//Ti.API.info('si le doy a terminos');

	$.windowConf.add(popUp);
});

Ti.App.addEventListener("closePop", function() {
	$.windowConf.remove(popUp);
});
/*
 * Funcion que despliega una ventana de alerta para indicar algun procedimiento al usuario
 * @param {string} activityIndicator
 */
function activityIndicator(message) {

	var view_base = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FIll,
		backgroundColor : "black",
		opacity : "0.4"
	});

	var view_loading = Ti.UI.createView({
		backgroundColor : "#585858",
		borderColor : "#eeeeee",
		borderWidth : 5,
		height : "30%",
		width : "80%"
	});
	if (OS_IOS) {
		var indicator = Ti.UI.createActivityIndicator({
			color : "#f9b200",
			font : {
				fontFamily : 'Helvetica Neue',
				fontSize : "auto",
				fontWeight : 'bold',

			},
			style : Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			message : message
		});
	}

	indicator.show();

	view_loading.add(indicator);
	win_loading.add(view_base);
	win_loading.add(view_loading);
	$.windowConf.add(win_loading);
}






function cargaTickets(response){
	var resp = JSON.stringify(response);
	Ti.API.info(LOG_TAG + " " +resp);
	ticketsCollection.reset();
	for (i in response) {
		//EVALUO QUE NO VENGAN CON LOS SIGUIENTES CASOS ANTES DE METERLOS A LA COLECCION
		switch(response[i].estatus) {
			case "":
				response[i].estatus = "En Proceso";
			break;
			case null:
				response[i].estatus = "En Proceso";
			break;
			case "null":
				response[i].estatus = "En Proceso";
			break;
		}
		
		var miColleccion = Alloy.createModel('tickets', {
			id : i,
			ticketId : response[i].ticketId,
			numeroCase : response[i].numeroCase,
			descripcion : response[i].descripcion,
			origen :response[i].origen,
			destino:response[i].destino,
			status : response[i].estatus

		});

		ticketsCollection.add(miColleccion);

	}
}

var paramsIn = {
	ticketId : "",
	descripcion : "",
	status : "",
	numeroCase :"",
	origen : "",
	destino :""
};


Ti.App.addEventListener("datosTickets",function(params){
	
	paramsIn.descripcionIn = params.descripcion;
	paramsIn.ticketIdIn = params.ticketId;
	paramsIn.statusIn = params.estatus;
	paramsIn.numeroCaseIn = params.numeroCase;
	paramsIn.origenIn = params.origen;
	paramsIn.destinoIn = params.destino;

	var par = JSON.stringify(paramsIn);
	DEBUG_ALERT.message = LOG_TAG + par;
	//DEBUG_ALERT.show();
	
});


Ti.App.addEventListener("refreshTableview",function(){
	tickets(peticion);
	$.activityIndicatorTicket.show();
});

Ti.App.addEventListener("registradoCierra", function() {
	$.windowConf.close();
});
