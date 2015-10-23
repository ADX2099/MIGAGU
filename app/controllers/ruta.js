/*
 * CLASE ENCARGADA DE GENERAR UNA RUTA DEPENDIENDO DE LA PETICION DEL USUARIO, ESTA RUTA ES GENERADA EN 
 * SISTEMA WEB, UNA VEZ GENERADA ESTA SE PRESENTA EN UNA PATNTALLA POPUP LA CUAL DESPLIEGA UN MAPA
 * CON LA RUTA A TOMAR.
 * adx2099 5 DE JUNIO MODIFICACION DE LA INTERAZ
 * Se quitaron los campos de afectacion y Afectacion con alternativas y se agregaron las nuevas lineas
 * con lo cual se eliminaron los pickers
 * 
 */
Alloy.multimedia.gpsInit();
Alloy.multimedia.gpsGetPosition();
var numTicket = "";
//var servicioBack = Ti.App.iOS.registerBackgroundService({url:"libs/bgServices.js"}); 
var urlGeneratedMap;
var win = $.rutaWin;
//var opcionElegida = "Ruta";
var apoyoView = $.apoyo;
var origenButton = $.origenDestno;
//var wildlifeValue = "Ruta";
var status;
var errorMsg = "";
var transporte = "Metro";
var mapa = $.mapWebView;
mapa.scalesPageToFit = false;
var lat = null;
var lon = null;
var altoP =  Ti.Platform.displayCaps.platformWidth;
var anchoP = Ti.Platform.displayCaps.platformHeight;
var scrollBackView = $.view;
function isLargeScreen() {
		var screenSize;
		if(altoP >= 600 && anchoP >= 600){
			
			screenSize = "large";
		}else{
			screenSize = "small";
		}
			
		return screenSize;	
			
};

win.addEventListener("open",function(){
	var size = isLargeScreen();
	if(size == "large"){
		scrollBackView.width = 1450;
	}
});


//Botones
//var apoyoVialButton = $.rutaApoyoVial;
var rutaButton = $.apoyoRuta;
var apoyoRuta = $.rutaApoyo;

//Labels
//var ubicacionLabel = $.ubicacion;
//var origenLabel = $.origen;
//var destinoLabel = $.destino;

//Campos  Fields
var ubicacionField = $.ubicacionField;
var descrField = $.descrField;
var destino = $.destinoField;
var origen = $.origenField;
//Campos pertenecientes a la primera view del scrollView
var rutaDesc = $.descripRuta;
var rutaOrigen = $.origenRuta;
var rutaDestino = $.destinoRuta;
var rutaImg = $.imgRutas;
var textoRuta;
var againTexto;
var otroTicket = false;
var ticketActual;




/*
 * ORDENAMIENTO DEL CODIGO 
 */

/*
 * Popup con descripcion de camino a tomar
 */
var popUp = Alloy.createController('popup').getView('popupWin');


function crearDetail(description){
	var popupView = Ti.UI.createView({
		backgroundColor:"transparent",
		height:"80%", 
		width:"80%"
	});
	var opacidad = Ti.UI.createView({
		backgroundColor:"black", 
		opacity:1.0,
		height:"100%", 
		width:"100%"
	});
	var fondo = Ti.UI.createView({
		backgroundImage:"/images/base-detalle-noticias.jpg",  
		height:"100%", 
		width:"100%"
	});
	
	var consulta =Ti.UI.createTextArea({
		top:"16%",
		color: 'black', 
		editable:"false", 
		width : "80%", 
		height : "80%", 
		scrollable : "true", 
		wordWrap : "true", 
		backgroundColor:"transparent"
	});
		
    var aceptar = Ti.UI.createView({
    	bottom:0, 
    	width:Ti.UI.FILL,
    	right:0,
		backgroundImage:"/images/btn-listo.jpg", 
		height:"10%" 
    });
    
    aceptar.addEventListener("click",function(){
    	win.remove(popupView);
    });
   
    consulta.value = description;
	
	
	
    fondo.add(consulta);
    fondo.add(aceptar);
    popupView.add(fondo);	
    	
    		
	return popupView;
}

$.getDescripcion.addEventListener("click", function() {
	//Ti.API.info("El texto que regreso:.." + textoRuta);
	//var pop = popUp.mostrarData(textoRuta);
	
	var miDescripcion = crearDetail(textoRuta);
	win.add(miDescripcion);
	
});

//IMAGENES DE ICONOS
METRO_IMAGE_COLOR = "/images/btn_metro1.png";
METROBUS_IMAGE_COLOR = "/images/btn_metrobus1.png";
TROLE_IMAGE_COLOR = "/images/btn_trolebus1.png";
RTP_IMAGE_COLOR = "/images/btn_rtp1.png";
ECOBICI_IMAGE_COLOR = "/images/btn_ecobici1.png";
TRANSITO_IMAGE_COLOR = "/images/btn_transito1.png";
//29 MAYO 2014 SE AGREGAN LOS NUEVOS TRANSPORTES
NOCHEBUS_IMAGE_COLOR = "/images/btn_nochebus.png";
TURIBUS_IMAGE_COLOR = "/images/btn_turibus.png";

SUBURBANO_IMAGE_COLOR = "/images/btn_suburbano.png";

//FUNCION ENCARGADA DE GENERAR EL BOTON DE TRANSPORTE PRESIONADO EN EL SCROLL
function pressed(e) {
	//Ti.API.info("datos:.." + e.source);
	switch(e.source.id) {
		case "Metro":
			$.Metro.backgroundImage = "/images/btn_metro_on.png";
			$.MetroBus.backgroundImage = METROBUS_IMAGE_COLOR;
			$.TroleBus.backgroundImage = TROLE_IMAGE_COLOR;
			$.RTP.backgroundImage = RTP_IMAGE_COLOR;
			$.EcoBici.backgroundImage = ECOBICI_IMAGE_COLOR;
			$.Transito.backgroundImage = TRANSITO_IMAGE_COLOR;
			$.Nochebus.backgroundImage = NOCHEBUS_IMAGE_COLOR;
			$.Turibus.backgroundImage = TURIBUS_IMAGE_COLOR;
			$.Suburbano.backgroundImage = SUBURBANO_IMAGE_COLOR;
			rutaDesc.value = "";
			rutaOrigen.value = "";
			rutaDestino.value = "";
			$.verMapa.visible = false;

		break;
		case "MetroBus":
			$.Metro.backgroundImage = METRO_IMAGE_COLOR;
			$.MetroBus.backgroundImage = "/images/btn_metrobus_on.png";
			$.TroleBus.backgroundImage = TROLE_IMAGE_COLOR;
			$.RTP.backgroundImage = RTP_IMAGE_COLOR;
			$.EcoBici.backgroundImage = ECOBICI_IMAGE_COLOR;
			$.Transito.backgroundImage = TRANSITO_IMAGE_COLOR;
			$.Nochebus.backgroundImage = NOCHEBUS_IMAGE_COLOR;
			$.Turibus.backgroundImage = TURIBUS_IMAGE_COLOR;
			
			$.Suburbano.backgroundImage = SUBURBANO_IMAGE_COLOR;
			rutaDesc.value = "";
			rutaOrigen.value = "";
			rutaDestino.value = "";
			$.verMapa.visible = false;
			break;
		case "TroleBus":
			$.Metro.backgroundImage = METRO_IMAGE_COLOR;
			$.MetroBus.backgroundImage = METROBUS_IMAGE_COLOR;
			$.TroleBus.backgroundImage = "/images/btn_trolebus_on.png";
			$.RTP.backgroundImage = RTP_IMAGE_COLOR;
			$.EcoBici.backgroundImage = ECOBICI_IMAGE_COLOR;
			$.Transito.backgroundImage = TRANSITO_IMAGE_COLOR;
			$.Nochebus.backgroundImage = NOCHEBUS_IMAGE_COLOR;
			$.Turibus.backgroundImage = TURIBUS_IMAGE_COLOR;
			
			$.Suburbano.backgroundImage = SUBURBANO_IMAGE_COLOR;
			rutaDesc.value = "";
			rutaOrigen.value = "";
			rutaDestino.value = "";
			$.verMapa.visible = false;

			break;
		case "RTP":
			$.Metro.backgroundImage = METRO_IMAGE_COLOR;
			$.MetroBus.backgroundImage = METROBUS_IMAGE_COLOR;
			$.TroleBus.backgroundImage = TROLE_IMAGE_COLOR;
			$.RTP.backgroundImage = "/images/btn_rtp_on.png";
			$.EcoBici.backgroundImage = ECOBICI_IMAGE_COLOR;
			$.Transito.backgroundImage = TRANSITO_IMAGE_COLOR;
			$.Nochebus.backgroundImage = NOCHEBUS_IMAGE_COLOR;
			$.Turibus.backgroundImage = TURIBUS_IMAGE_COLOR;
			
			$.Suburbano.backgroundImage = SUBURBANO_IMAGE_COLOR;
			rutaDesc.value = "";
			rutaOrigen.value = "";
			rutaDestino.value = "";
			$.verMapa.visible = false;

			break;
		case "EcoBici":
			$.Metro.backgroundImage = METRO_IMAGE_COLOR;
			$.MetroBus.backgroundImage = METROBUS_IMAGE_COLOR;
			$.TroleBus.backgroundImage = TROLE_IMAGE_COLOR;
			$.RTP.backgroundImage = RTP_IMAGE_COLOR;
			$.EcoBici.backgroundImage = "/images/btn_ecobici_on.png";
			$.Transito.backgroundImage = TRANSITO_IMAGE_COLOR;
			$.Nochebus.backgroundImage = NOCHEBUS_IMAGE_COLOR;
			$.Turibus.backgroundImage = TURIBUS_IMAGE_COLOR;
			
			$.Suburbano.backgroundImage = SUBURBANO_IMAGE_COLOR;
			rutaDesc.value = "";
			rutaOrigen.value = "";
			rutaDestino.value = "";
			$.verMapa.visible = false;

		break;
		case "Nochebus":
			$.Metro.backgroundImage = METRO_IMAGE_COLOR;
			$.MetroBus.backgroundImage = METROBUS_IMAGE_COLOR;
			$.TroleBus.backgroundImage = TROLE_IMAGE_COLOR;
			$.RTP.backgroundImage = RTP_IMAGE_COLOR;
			$.EcoBici.backgroundImage = ECOBICI_IMAGE_COLOR;
			$.Transito.backgroundImage = TRANSITO_IMAGE_COLOR;
			$.Nochebus.backgroundImage = "/images/btn_nochebus_on.png";
			$.Turibus.backgroundImage = TURIBUS_IMAGE_COLOR;
			
			$.Suburbano.backgroundImage = SUBURBANO_IMAGE_COLOR;
			rutaDesc.value = "";
			rutaOrigen.value = "";
			rutaDestino.value = "";
			$.verMapa.visible = false;

		break;
		case "Turibus":
			$.Metro.backgroundImage = METRO_IMAGE_COLOR;
			$.MetroBus.backgroundImage = METROBUS_IMAGE_COLOR;
			$.TroleBus.backgroundImage = TROLE_IMAGE_COLOR;
			$.RTP.backgroundImage = RTP_IMAGE_COLOR;
			$.EcoBici.backgroundImage = ECOBICI_IMAGE_COLOR;
			$.Transito.backgroundImage = TRANSITO_IMAGE_COLOR;
			$.Nochebus.backgroundImage = NOCHEBUS_IMAGE_COLOR;
			$.Turibus.backgroundImage = "/images/btn_turibus_on.png";
			
			$.Suburbano.backgroundImage = SUBURBANO_IMAGE_COLOR;
			rutaDesc.value = "";
			rutaOrigen.value = "";
			rutaDestino.value = "";
			$.verMapa.visible = false;

		break;
		
		case "Transito":

			$.Metro.backgroundImage = METRO_IMAGE_COLOR;
			$.MetroBus.backgroundImage = METROBUS_IMAGE_COLOR;
			$.TroleBus.backgroundImage = TROLE_IMAGE_COLOR;
			$.RTP.backgroundImage = RTP_IMAGE_COLOR;
			$.EcoBici.backgroundImage = ECOBICI_IMAGE_COLOR;
			$.Transito.backgroundImage = "/images/btn_transito_on.png";
			$.Nochebus.backgroundImage = NOCHEBUS_IMAGE_COLOR;
			$.Turibus.backgroundImage = TURIBUS_IMAGE_COLOR;
			
			$.Suburbano.backgroundImage = SUBURBANO_IMAGE_COLOR;
			rutaDesc.value = "";
			rutaOrigen.value = "";
			rutaDestino.value = "";
			$.verMapa.visible = false;
		break;
		
		case "Suburbano":
			$.Metro.backgroundImage = METRO_IMAGE_COLOR;
			$.MetroBus.backgroundImage = METROBUS_IMAGE_COLOR;
			$.TroleBus.backgroundImage = TROLE_IMAGE_COLOR;
			$.RTP.backgroundImage = RTP_IMAGE_COLOR;
			$.EcoBici.backgroundImage = ECOBICI_IMAGE_COLOR;
			$.Transito.backgroundImage = TRANSITO_IMAGE_COLOR;
			$.Nochebus.backgroundImage = NOCHEBUS_IMAGE_COLOR;
			$.Turibus.backgroundImage = TURIBUS_IMAGE_COLOR;
			
			$.Suburbano.backgroundImage = "/images/btn_suburbano_on.png";
			rutaDesc.value = "";
			rutaOrigen.value = "";
			rutaDestino.value = "";
			$.verMapa.visible = false;

		break;

	}
}
//FUNCION QUE VUELEVE A MANDAR A LLAMAR EL MAPA
function getMapAgain() {
	updateWebView(urlGeneratedMap, againTexto);
}
//FUNCION QUE ACTUALIZA EL MAPA CUANDO OBTIENE LA URL
function updateWebView(link, texto) {
	//Ti.API.info("YA LLEGUE HASTA AQUI ::::.. A UPDATE WEB VIEW");
	//Variable que mantiene la url globalmente
	urlGeneratedMap = link;
	//var buildMapAlert = Alloy.Indicator("Construyendo mapa");
	//bbuildMapAlert
	//buildMapAlert.open();
	rutaImg.visible = false;
	mapa.visible = true;
	mapa.url = link;
	mapa.addEventListener("load", function() {
		alerta.close();
	});
	$.cerrarMapa.visible = true;
	$.getDescripcion.visible = true;
}





/*
 * LISTENERS 
 */
//Cierra el mapa que despliega la info
$.cerrarMapa.addEventListener("click", function() {
	//ubicacionField.value = "";
	//descrField.value = "";
	mapa.visible = false;
	$.cerrarMapa.visible = false;
	$.getDescripcion.visible = false;
	$.imgRutas.visible = true;
	
});



function callAlerta(message){
	var win_loading = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		
	});
	var view_base = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FIll,
		backgroundColor : "black",
		opacity : "0.5"
	});
	
	var view_loading = Ti.UI.createView({
		backgroundColor : "#585858",
		borderColor : "#eeeeee",
		borderWidth : 5,
		height : "30%",
		width : "80%"
	});
	var mensajeLabel = Ti.UI.createLabel({
		text:"Estamos generando tu ruta en breve te llegará a la sección Mis Reportes",
		width:"70%",
		color:"#f9b200",
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
				fontFamily : 'Helvetica Neue',
				fontSize : "18",
				fontWeight : 'bold',
			},
	});
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
			top:10
		});
	indicator.show();
	view_loading.add(indicator);
	view_loading.add(mensajeLabel);
	win_loading.add(view_loading);
	win_loading.add(view_base);
	return win_loading;
}





var numberAsk = 1;

function ask(objeto, mensaje) {
	getRespuesta(objeto, mensaje);

}


function getRespuesta(obj, mensaje) {	 
	var paramStatus = {
		"numeroTicket" : obj.NumeroTicket,
		"blackberry" : ""
	};
	//alert("El numero de itcket" + obj.NumeroTicket);
	//Envio de OS
	if (Ti.Platform.osname == "iphone" || Ti.Platform.osname == "android") {
		paramStatus.blackberry = "false";
	} else {
		paramStatus.blackberry = "true";
	}

	//alert("...:::Datos a enviar:::..."+ JSON.stringify(paramStatus));

	Alloy.network.callService('apexrest/avresp', paramStatus, function(responseObj) {

		//alert("Mensaje de respuesta de asesor..." + JSON.stringify(responseObj));

		var response = responseObj;
		var texto = response.Descripción;
		var ticketNumero = response.NumeroTicket;
		var Status = response.Status;

		if (texto != "undefined") {
			textoRuta = texto;
			againTexto = textoRuta;
		}
		//Ti.API.info("EL  TEXTO A VER SI VIENE :::..." + texto);
		//var descripcion = "Lo que puedes hacer para llegar a tu destino es dar vuetas en circuo hasta que te canses.";
		var Url = response.URL;
		//var Url = "http://www.thinkgeek.com/product/ead0/?cpg=cj&ref=&CJURL=&CJID=2470763"
		if (Status != "OK") {
			switch(numberAsk) {
				case 1 :
					Ti.API.info("Entro 1");
					setTimeout(function() {
						numberAsk = 2;
						ask(obj, mensaje);

					}, 30000);

					break;
				case 2 :
				Ti.API.info("Entro 2");
					setTimeout(function() {
						
						numberAsk = 3;
						ask(obj, mensaje);

					}, 30000);

					break;
				case 3 :
				Ti.API.info("Entro 3");
					setTimeout(function() {
						numberAsk = 4;
						ask(obj, mensaje);

					}, 30000);
					break;
				case 4 :
				Ti.API.info("Entro 4");
					setTimeout(function() {
						
						numberAsk = 5;
						ask(obj, mensaje);

					}, 30000);
				break;
				case 5 :
				Ti.API.info("Entro 5");
					setTimeout(function() {
						numberAsk = 6;
						ask(obj, mensaje);

					}, 10000);
					break;
				case 6 :
				Ti.API.info("Entro 6");
					setTimeout(function() {
						var cancelProcess = Ti.UI.createAlertDialog({
							title : "Atención",
							message : "El proceso ha demorado un poco en su tiempo de  respuesta, pero sin duda usted podrá consultar su solicitud en la sección de Mis Reportes en unos momentos. Gracias por su confianza ",
							buttonNames : ["OK"],
						});
						cancelProcess.show();
						cancelProcess.addEventListener("click", function(e) {
							alerta.close();
							numberAsk = 1;
						});

					}, 1000);
					break;

			}

		} else {
			
			
			updateWebView(Url, texto);
			//popgenerandoAlert.close();
		}

	});
}

function checkFields(campos, caso) {
	var flag = true;
	//Ti.API.info("EL CASO ES ..." + caso);
	if (caso == 0) {
		//Alternativa
		for (prop in campos) {
			//Ti.API.info("Los campos" + prop);
			switch(prop) {
				case "ubicacion":
					if (campos.ubicacion == "") {
						errorMsg = "Ubicación" + "\n";
						flag = false;
					}
					break;
				case "descripcion":
					if (campos.descripcion == "") {
						errorMsg = errorMsg + "Descripción" + "\n";
						flag = false;
					}
					break;
			}
		}
	} else {
		//Ruta
		for (prop in campos) {
			//Ti.API.info("Los campos del caso 1" + prop);
			switch(prop) {
				case "descripcion":
					if (campos.descripcion == "") {
						errorMsg = errorMsg + "Descripción" + "\n";
						flag = false;
					}
					break;
				case "origen":
					if (campos.origen == "") {
						errorMsg = "Origen" + "\n";
						flag = false;
					}
					break;
				case "destino":
					if (campos.destino == "") {
						errorMsg = "Destino" + "\n";
						flag = false;
					}
					break;
			}

		}

	}
	return flag;
}


$.Metro.addEventListener("click", function() {
	transporte = "Metro";
});

$.MetroBus.addEventListener("click", function() {
	transporte = "MetroBus";
});

$.TroleBus.addEventListener("click", function() {
	transporte = "TroleBus";
});

$.RTP.addEventListener("click", function() {
	transporte = "RTP";
});

$.EcoBici.addEventListener("click", function() {
	transporte = "EcoBici";
});

$.Transito.addEventListener("click", function() {
	transporte = "transito";
});
$.Nochebus.addEventListener("click",function(){
	transporte = "Nochebus";
});
$.Turibus.addEventListener("click",function(){
	transporte = "Turibus";
});

$.Suburbano.addEventListener("click",function(){
	transporte = "Suburbano";
});

var campos = {};
var caso;
var myId = Ti.App.Properties.getString("id");
lon = Ti.App.Properties.getString("longitud");
lat = Ti.App.Properties.getString("latitud");
//alert("Latitudes etc:..." +lon +"::::"+ lat);

/*
 * APOYO VIAL RUTA PARA: Boton encargado de interactuar con el webservice de ruta
 *
var alerta = callAlerta("Estamos generando tu ruta en breve te llegará a la sección Mis Reportes");
apoyoRuta.addEventListener("click", function() {
	//if(otroTicket == false){
	campos = {
		"ubicacion" : "text",
		"descripcion" : rutaDesc.value,
		"destino" : rutaDestino.value,
		"origen" : rutaOrigen.value
	};

	if (Alloy.network.isAvailable()) {
		alerta.open();
		if (checkFields(campos, caso)) {
			
			var params = {
				"idCiudadano" : myId,
				"transporte" : transporte,
				"ubicacion" : lat + " - " + lon,
				"motivo" : "Ruta",
				"latitud" : lat,
				"longitud" : lon,
				"descripcion" : rutaDesc.value,
				"origen" : rutaOrigen.value,
				"destino" : rutaDestino.value
			};
			Ti.API.info(JSON.stringify(params));
			Alloy.network.callService('apexrest/asesorvial', params, function(responseObj) {
				
				//Ti.API.info("Mensaje de respuesta de Ruta..." + JSON.stringify(responseObj));
				var message = "alerta";
				otroTicket = true;
				getRespuesta(responseObj, message);
			});

		} else {
			alerta.close();
			var alert = Ti.UI.createAlertDialog({
				title : "Atención",
				message : "Los siguientes campos estan vacios: " + errorMsg,
				buttonNames : ["Aceptar"]
			});
			alert.show();
			errorMsg = "";
		}
	}
	//Ti.API.info("LOS DATOS DE LA:..." + rutaDesc.value + "  " + rutaDestino.value + " " + rutaOrigen.value);
});
*/
$.Cerrar.addEventListener("click", function() {
		win.close();
});



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


/*
 * MODIFICACION AL FLUJO DE RUTA 
 * El nuevo Flujo se encargara de mandar la peticion de la ruta al servidor y posteriormente esperara a recibir una notificacion 
 * de ruta terminada
 */
var OS = Ti.Platform.getOsname();
//var alerta = callAlerta("Estamos generando tu ruta en breve te llegará a la sección Mis Reportes");
apoyoRuta.addEventListener("click",function(){
	
	lon = Ti.App.Properties.getString("longitud");
	lat = Ti.App.Properties.getString("latitud");
	var tok = Ti.App.Properties.getString("TOKEN");
	//Ti.API.info("EL TOKEN ES :::.." + tok);
	//el token es: 8650d81f24e154c9673bd6e53d4efbaf2c37772a04385a361388a016e40daeb6
	//Ti.API.info("COMIENZA LA CODIFICCION DEL NUEVO FLUJO ADX2099");
	//armo el objeto a mandar
	$.rutaWin.add(blockView);
	apoyoRuta.add(indicator);
	indicator.show();
	campos = {
		"ubicacion" : "text",
		"descripcion" : rutaDesc.value,
		"destino" : rutaDestino.value,
		"origen" : rutaOrigen.value
	};
	if (lon == null && lat == null) {
			alert("Aun no obtenemos tu posición geográfica, esto puede tardar unos segundos.Intenta nuevamente ");

	} else {
		if (Alloy.network.isAvailable()){
		//alerta.open();
		if (checkFields(campos, caso)) {
			
			var params = {
				"idCiudadano" : myId,
				"transporte" : transporte,
				"ubicacion" : lon + " - " + lat,
				"motivo" : "Ruta",
				"latitud" : lat,
				"longitud" : lon,
				"descripcion" : rutaDesc.value,
				"origen" : rutaOrigen.value,
				"destino" : rutaDestino.value,
				"OS" : OS,
				"token": Ti.App.Properties.getString("TOKEN"),
				"numTicket":""
			};	
			
			Ti.API.info(JSON.stringify(params));
		
			Alloy.network.callService('apexrest/asesorvial', params, function(responseObj) {
				
				Ti.API.info("Mensaje de respuesta de Ruta..." + JSON.stringify(responseObj));
				var message = "alerta";
				otroTicket = true;
				$.rutaWin.remove(blockView);
				indicator.hide();
				if(responseObj.error == "false"){
					numTicket = responseObj.NumeroTicket;
					var alertaResp = Ti.UI.createAlertDialog({
						title : "Atención",
						message : "Tu ruta ha sido recibida por el sistema, en un momento te avisaremos cuando este lista!::::.." + numTicket,
						buttonNames : ["Aceptar"]
					});
					alertaResp.show();
					
				}
				
			});

		} else {
			$.rutaWin.remove(blockView);
			indicator.hide();
			var alert = Ti.UI.createAlertDialog({
				title : "Atención",
				message : "Los siguientes campos estan vacios: " + errorMsg,
				buttonNames : ["Aceptar"]
			});
			alert.show();
			errorMsg = "";
		}			
	}
	}
	

});





/*
 * jueves 13 de Noviembre
 */

