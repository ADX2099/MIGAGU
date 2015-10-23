var ticketsCollection = Alloy.Collections.tickets;
var ticketsUser = {
	
	descripcion : "",
	numTicket : "",
	status : "",
	numeroCase :"",
	origen : "",
	destino :""
	
};

var DEBUG_ALERT = Ti.UI.createAlertDialog({
	title:"DEBUG_ALERT",
	message:"",
	buttonNames:["ADX2099"]
});
function getRuta(numTicket){
	
	var params = {
				"idCiudadano" : "",
				"transporte" : "",
				"ubicacion" :"",
				"motivo" : "Ruta",
				"latitud" : "",
				"longitud" : "",
				"descripcion" : "",
				"origen" : "",
				"destino" : "",
				"OS" : "",
				"token": "",
				"numTicket":numTicket
			};	

	//Ti.API.info(JSON.stringify(params));
	
	Alloy.network.callService('apexrest/asesorvial', params, function(responseObj) {
		
		Ti.API.info("El stringify es:.." + JSON.stringify(responseObj));
		var ticketNumero = responseObj.NumeroTicket;
		var alertaResp = Ti.UI.createAlertDialog({
				title : "Atención",
				message : "Tu ruta ha sido recibida por el sistema, en un momento te avisaremos cuando este lista!::::.." + ticketNumero,
				buttonNames : ["Aceptar"]
		});
		alertaResp.show();
		//var response = responseObj;
		//var texto = response.Descripción;
		//var ticketNumero = response.NumeroTicket;
		//var Status = response.Status;
		//var miUrl = response.URL;
		//createWebView(texto, miUrl);

	});
	
	
	
	
}

function getAfectAgain(numTicket) {

	var paramAfectacion = {
		"numeroTicket" : numTicket,
		"blackberry" : "false"
	};

	Ti.API.info("El stringify es:.." + JSON.stringify(paramAfectacion));
	Alloy.network.callService('apexrest/avresp', paramAfectacion, function(responseObj) {
		
		//mapAlert.close();
		Ti.API.info("El stringify es:.." + JSON.stringify(responseObj));
		var response = responseObj;
		var texto = response.Descripción;
		//var ticketNumero = response.NumeroTicket;
		//var Status = response.Status;
		var miUrl = response.URL;
		Ti.API.info("URL...:::" + miUrl);
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
		backgroundColor : "blue"
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
function delTicket(param){
	if (Alloy.network.isAvailable()) {
		var params = {
			"numTicket" : param,
			"bFav" : "false",
			"eliminar":"true"
		};
		var obj = JSON.stringify(params);
		//Ti.API.info("Envio:...." + obj);
		
		//MANDAR ALERTA DE BLOQUEO
		Alloy.network.callService('apexrest/AMFavorito', params, function(response) {
			var resp = JSON.stringify(response);
			//Ti.API.info("Holas:::.." + resp);
			if (response.Error == "false") {
				//Ti.API.info("RESPONDIOS");
				
				
				var alert = Ti.UI.createAlertDialog({
					title : "Atención",
					message : "Tu Ruta se ha eliminado exitosamente",
					buttonNames : ["Ok"]
				});
				alert.show();
				alert.addEventListener("click",function(){
					 Ti.App.fireEvent("refreshTableview",{});
 
				});
			} else {
				var alert = Ti.UI.createAlertDialog({
					title : "Atención",
					message : "No fue posible eliminar tu Reporte" + response.ErrorMsg,
					buttonNames : ["Ok"]
				});
				alert.show();

			}
			
		});
	}

}

$.rowFav.addEventListener("click",function(e){
	indice = e.index;
	var obj = e.source;
	var seleccion = e.source;
	//Ti.API.info("es..." + seleccion.id);
	
	for(i in seleccion){
		//Ti.API.info("LA SELECCION..::" + seleccion[i]);
	}
	
	var myBlockProp = e.source.block;
	
	var ticketDescripcion = ticketsCollection.models[indice].get("descripcion");
    var ticketNum = ticketsCollection.models[indice].get("numTicket");
    var ticketStatus = ticketsCollection.models[indice].get("status");
    var ticketNumCase = ticketsCollection.models[indice].get("numeroCase");
    var ticketOrigen = ticketsCollection.models[indice].get("origen");
    var ticketDestino = ticketsCollection.models[indice].get("destino");
    
   ticketsUser.descripcion = ticketDescripcion;
   ticketsUser.numTicket = ticketNum;
   ticketsUser.status = ticketStatus;
   ticketsUser.numeroCase = ticketNumCase;
   ticketsUser.origen = ticketOrigen;
   ticketsUser.destino = ticketDestino;
   var numTicketo = $.ticket_val.text;
   //Ti.API.info("EL TICKET..::" + numTicketo);
  
   
   
   	switch(seleccion.id){ 		
   		case "eliminar":
   			var alert = Ti.UI.createAlertDialog({
			
				title : "Atención!",
				message : "¿Deseas eliminar esta ruta de tus favoritos ?",
				buttonNames : ["Si", "No"],
				cancel : 1
			});
			
			alert.addEventListener("click", function(e) {
				var userSelection = e.index;
				if (userSelection == 0) {
					delTicket(numTicketo);
				} else {
					alert.hide();
				}
			});

			alert.show(); 
   			
   		break;
   	
		case "rowFav":
			var chooseSelection = Ti.UI.createAlertDialog({
				title : 'Atención',
				message : '¿Quieres pedir tu ruta actualizada o deseas ver tu ruta generada?',
				buttonNames : ['Nueva ruta', 'Ruta generada', 'Cancelar'],
				cancel : 2
			});
			chooseSelection.show();
			chooseSelection.addEventListener("click", function(e) {
				if (e.index == 0) {
					getRuta(numTicketo);
				} else if (e.index == 1) {
					getAfectAgain(numTicketo);
				} else if (e.index == 2) {
					chooseSelection.hide();
				}
		
			});
	
	   		
	   	break;
   		
   		
   		
   	}
	
		
	

   
   
});