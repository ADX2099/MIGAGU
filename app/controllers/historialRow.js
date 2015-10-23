var ticketsCollection = Alloy.Collections.tickets;
var ticketsUser = {
	
	descripcion : "",
	numTicket : "",
	status : "",
	numeroCase :"",
	origen : "",
	destino :""
	
};
var winTicketsDetail = Ti.UI.createWindow({navBarHidden : true,backgroundColor : "#eeeeee",});
var aceptarBtn = Ti.UI.createView({backgroundImage : "/images/btn-listo.jpg",height : "10%",width : Ti.UI.FILL,bottom : 0});
var estimadoLbl = Ti.UI.createLabel({color : '#666666',font : {fontSize : "16sp",fontWeight : 'bold'},top : Alloy.Globals.height * 0.06,left : Alloy.Globals.width * 0.1});
var textoLbl = Ti.UI.createLabel({color : '#666666',font : {fontSize : "14sp",},top : Alloy.Globals.height * 0.2,left : Alloy.Globals.width * 0.1,width : "80%",});


/*
 * Funcion encargada de presentar los caseos de los tickets dependiendo del estado en el que se enceuntran
 * @param {String} getDatostickets
 * return window
 */
function getDatosTickets(numTicket) {
	var paramStatus = {
		"numeroTicket" : numTicket

	};
	Ti.API.info("el ticket :::.." + numTicket);
		if (Alloy.network.isAvailable()) {
				Alloy.network.callService('apexrest/avinfo', paramStatus, function(responseObj) {
					Ti.API.info("El ticket trae" + JSON.stringify(responseObj));
					if (responseObj.error == "false") {
						switch(responseObj.Etapa) {
							case "Ingreso":
								var plantilla = "Su reporte con número: " + responseObj.NumeroTicket + " será gestionada a través de la Agencia de Gestión Urbana de la Ciudad de México, en cuanto tengamos más información al respecto, con gusto los podrá visualizar en este mismo apartado de Mis Reportes.";
							break;
						
							case "Supervisión":
							var plantilla = "Su reporte con número: " + responseObj.NumeroTicket + " se está verificando, estamos en espera de una descripción más detallada por parte del área de Supervisión de la Agencia de Gestión Urbana de la Ciudad de México, en cuanto tengamos más avances al respecto, con gusto los podrá visualizar en este mismo apartado de Mis Reportes.";
							break;
							case "Notificación":
							var plantilla = "Su reporte con número:" + responseObj.NumeroTicket + " fue canalizado por parte de Agencia de Gestión Urbana de la Ciudad de México,  a la " + responseObj.Dependencia + "  para su atención en cuanto tengamos más avances al respecto, con gusto los podrá visualizar en este mismo apartado de Mis Reportes.";
							break;
							case "Operación":
							var plantilla = "Su reporte con número:" + responseObj.NumeroTicket + " se encuentra en la " + responseObj.Dependencia + " quien será la encargada de darle atención, actualmente esta en espera de ser programada. En cuanto tengamos más información, con gusto los podrá visualizar en este mismo apartado de Mis Reportes";
							break;
							case "Operativo":
							var plantilla = "Su reporte con número:" + responseObj.NumeroTicket + " se encuentra en la " + responseObj.Dependencia + " quien será la encargada de darle atención, actualmente esta en espera de ser programada. En cuanto tengamos más información, con gusto los podrá visualizar en este mismo apartado de Mis Reportess";
							break;
							case "Concluido":
							var plantilla = "Por parte de la Agencia de Gestión Urbana de la Ciudad de México, se está llevando a cabo la verificación final de su reporte con número:" + responseObj.NumeroTicket + ", a fin de poderle informar a usted  los trabajos realizados por parte del área operativa de la " + responseObj.Dependencia + ".";
							break;
							case "Finalizado":
							var plantilla = "Le informa la Agencia de Gestión Urbana de la Ciudad de México, que en base a su reporte  con número: " + responseObj.NumeroTicket + " la " + responseObj.Dependencia + " llevo a cabo los trabajos necesarios para la atención a su solicitud. Gracias por su confianza";
							break;
							case "No Procede":
							var plantilla = "Le informamos que su reporte con número:  " + responseObj.NumeroTicket + " No Procede debido a que la información proporcionada no es suficiente, por lo que le solicitamos amablemente nos proporcione mayor información a través del correo electrónico  072@df.gob.mx o al número telefónico 072 y continuar con su solicitud. Gracias por su confianza.";
							break;
							case "Reasignado":
							var plantilla = "Su reporte con número:" + responseObj.NumeroTicket + " sera Reasignado a la " + responseObj.Dependencia + " quien llevara a cabo los trabajos necesarios para la atención a su solicitud. Gracias por su confianza.";
							break;
							case "Cancelado":
							var plantilla = "Le informamos que su reporte con número: " + responseObj.NumeroTicket + " se ha cancelado, ya que la ubicación de su reporte no se encuentra dentro de los límites del Distrito Federal o bien se encuentra duplicada su petición. Gracias por su confianza.";
							break;
						}
						
						estimadoLbl.text = "Estimado: " + responseObj.Ciudadano ;
						textoLbl.text = plantilla;
						aceptarBtn.addEventListener("click", function() {
							winTicketsDetail.close();
						});
						winTicketsDetail.add(textoLbl);
						winTicketsDetail.add(estimadoLbl);
						winTicketsDetail.add(aceptarBtn);
						winTicketsDetail.open({
							modal : true,
							navbarHidden : true
						});	
					}else{
						var alert = Ti.UI.createAlertDialog({
							title : "Atención",
							message : "No ha sido posible obtener el estado de tu Reporte intenta nuevamente",
							buttonNames : ["Aceptar"]
						});
		
						alert.show(); 
					}					
				});			
		}else{
			
			var alert = Ti.UI.createAlertDialog({
				title : "Atención",
				message : "Tu dispositivo no cuenta con internet, es necesario estar conectado a internet para hacer uso de la aplicación.",
				buttonNames : ["Aceptar"]
			});
	
			alert.show(); 	
		}
}
function delTicket(param){
	if (Alloy.network.isAvailable()) {
		var params = {
			"numTicket" : param,
			"bFav" : "false",
			"eliminar":"true"
		};
		var obj = JSON.stringify(params);
		Ti.API.info("Envio:...." + obj);
		
		//MANDAR ALERTA DE BLOQUEO
		Alloy.network.callService('apexrest/AMFavorito', params, function(response) {
			var resp = JSON.stringify(response);
			Ti.API.info("Holas:::.." + resp);
			if (response.Error == "false") {
				//Ti.API.info("RESPONDIOS");
				
				
				var alert = Ti.UI.createAlertDialog({
					title : "Atención",
					message : "Tu Reporte se ha eliminado exitosamente",
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
	} else {
		var alert = Ti.UI.createAlertDialog({
			title : "Atención",
			message : "Tu dispositivo no cuenta con internet, es necesario estar conectado a internet para hacer uso de la aplicación.",
			buttonNames : ["Ok"]
		});

		alert.show();
	}

}

$.historialRow.addEventListener("click",function(e){
	indice = e.index;
	var obj = e.source;
	var seleccion = e.source;
	Ti.API.info("es..." + seleccion.id);
	
	for(i in seleccion){
		Ti.API.info("LA SELECCION..::" + seleccion[i]);
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
				message : "¿Deseas eliminar este reporte de tu historial ?",
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
   		case "historialRow":
   		getDatosTickets(numTicketo);
   		break;
   		
   		
   		
   	}
	
		
	

   
   
});