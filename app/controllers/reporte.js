 /*
 * Pantalla encargada de generar el reporte de Incidencia donde se toman los siguientes valores
 * -Fotografia
 * -Descripcion
 * -Referencia
 * -Calle
 * -EntreCalle
 * -posicion
 */

//Implementacion de gps
Alloy.multimedia.gpsInit();
Alloy.multimedia.gpsGetPosition();
var interval;

var pBar = $.pb;


//activiInd.message = "Cargando...";


//FUNCION PARA CALCULAR TIEMPO EN MINUTOS Y SEGUNDOS 00:00
var dt = new Date();
var fechaTicker = dt.getMonth()+ "-" + dt.getFullYear();
//Ti.API.info("fecha "+fechaTicker);


function niceTimeFromMilliseconds(ms)
{
    var total_seconds = ms / 1000;
    var minutes = Math.floor(total_seconds / 60);
    var seconds = total_seconds - (minutes * 60) - 0.499;
    //499miliseconds subtracted before rounding up in the interest of accuracy
 
    if (minutes < 10 && seconds < 9) {
        return "0" + minutes + ":" + "0" + Math.round(seconds);
    }
    if (minutes < 10 && seconds > 9) {
        return "0" + minutes + ":" + Math.round(seconds);
    }if (seconds < 9) {
        return minutes + ":" + "0" + Math.round(seconds);
    }  
    return  minutes + ":" + Math.round(seconds);
}



//Variables globales
var imagen1ToBlob=null;
var imagen2ToBlob=null;
var start = null;
var params={};
var distanciaRecorrida = 0;
var wildlifeValue = "Bache";
var lat=null;
var lon= null;
var numeroTicket= null;
var nomFoto1 = null;
//var enviandoAlert = Alloy.Indicator("Enviando...");

/*
 * Seccion de codigo que genera un Picker view en la pantalla, en los dos se implementa mediante un HTML debido a que los picker
 * son diferentes en los OS, y se homologaron para esta app.
 */
if(OS_IOS){
	
	$.webView.top =Ti.Platform.displayCaps.platformHeight * 0.02;
	$.textAreaReporte.top = Ti.Platform.displayCaps.platformHeight * 0.12;	
	$.referenciaText.top = Ti.Platform.displayCaps.platformHeight * 0.22;
	$.calleText.top = Ti.Platform.displayCaps.platformHeight * 0.32;
	$.entreCalleText.top = Ti.Platform.displayCaps.platformHeight * 0.42;
	$.imagenView.top = Ti.Platform.displayCaps.platformHeight * 0.52;
	$.btnEnviar.top = Ti.Platform.displayCaps.platformHeight * 0.75;
	$.texImgReporte.top = Ti.Platform.displayCaps.platformHeight * 0.85;
	
	
	var html = "<html> <body  style='background-color:transparent; width: 270px; height: 32px;' SCROLL=NO>";
	html += "<select id='wildlife_select' style='width: 270px; font-size: 15px; height: 32px; background-color:#eeeeee;'>";
	//html += "<option  disabled=\"disabled\" selected=\"selected\" >Motivo</option>";
	html += "<option value=\"Adopta un área verde\">Adopta un área verde</option>";
	html += "<option value=\"Adopta una banqueta\">Adopta una banqueta</option>";
	html += "<option  value=\"Accesorios de infraestructura\">Accesorios de infraestructura</option>";
	html += "<option value=\"Bacheo\">Bacheo</option>";                       
	html += "<option value=\"Coladeras (colocación y/o mantenimiento)\">Coladeras (colocación y/o mantenimiento)</option>";
	html += "<option value=\"Desazolve\">Desazolve</option>";
	html += "<option value=\"Fuga de agua\">Fuga de agua</option>";
	html += "<option value=\"Limpieza de calles\">Limpieza de calles</option>";
	html += "<option value=\"Luminarias descompuestas\">Luminarias descompuestas</option>";
	html += "<option value=\"Poda de árboles\">Poda de árboles</option>";
	html += "<option value=\"Recolección de basura\">Recolección de basura</option>";
	html += "<option value=\"Semáforos descompuestos\">Semáforos descompuestos</option>";
	html += "</select>";
	html += "<script type='text/javascript'>";
	html += "document.getElementById('wildlife_select').onchange = function(){ Titanium.App.fireEvent('set_wildlife_value',{value:this.value}); };";
	html += "document.addEventListener('touchmove', function(e){e.preventDefault();return false;}, false);";
	html += "</script>";
	html += "</body></html>";

			
	$.webView.html = html;
	$.cerrar.addEventListener("click",function(){
		$.reporteWin.close();
	});
	Ti.App.addEventListener("set_wildlife_value",function(e){
		wildlifeValue = e.value;
	});
		
}
var numPhoto;
//Funciones para la toma de fotografia y guardado temporal
$.imagenReporte1.addEventListener('click', function(e) {
	numPhoto = 1;
	sourcePhoto(numPhoto);	

		
});

$.imagenReporte2.addEventListener('click', function(e) {
	var numPhoto = 2;
	sourcePhoto(numPhoto);	
});

Ti.App.addEventListener("source",function(userSelection){
		var mySelection = userSelection.get;
		var numFoto = userSelection.foto;
		
		switch(mySelection){
		case 0:
		   start = new Date().getTime();
		   Alloy.multimedia.getImageFromCamera(function(e){
				Alloy.multimedia.saveImage(e.media,"photo"+numFoto+".jpg","500px","500px",Ti.Filesystem.tempDirectory);
				nomFoto = "photo"+numFoto+".jpg";
				var prueba = Ti.UI.createImageView({
					image : Ti.Filesystem.tempDirectory+"/"+nomFoto,
					height: "20%",
					width: "20%"
				});
				if(numFoto == 1){
					
					$.imagenReporte1.image = Ti.Filesystem.tempDirectory+nomFoto;	
					imagen1ToBlob = prueba.toBlob();
				}else{
					$.imagenReporte2.image = Ti.Filesystem.tempDirectory+nomFoto;
					imagen2ToBlob = prueba.toBlob();
				}
				
				//alert("Nom:"+$.imagenReporte1.image);
				//Ti.API.info(JSON.stringify($.imagenReporte1));
				//$.imagenReporte2.visible = true;		
				//alert("get image name::..." + prueba.image);	
			
			});
		break;
		case 1:
			Alloy.multimedia.getImageFromGallery(function(e){
				Alloy.multimedia.saveImage(e.media,"photo"+numFoto+".jpg","500px","500px",Ti.Filesystem.tempDirectory);
				nomFoto = "photo"+numFoto+".jpg";
				var prueba = Ti.UI.createImageView({
					image : Ti.Filesystem.tempDirectory+"/"+nomFoto,
					height: "20%",
					width: "20%"
				});
				if(numFoto == 1){
					$.imagenReporte1.image = Ti.Filesystem.tempDirectory+nomFoto;
					imagen1ToBlob = prueba.toBlob();	
				}else{
					$.imagenReporte2.image = Ti.Filesystem.tempDirectory+nomFoto;
					imagen2ToBlob = prueba.toBlob();
				}
				//alert("Nom:"+$.imagenReporte1.image);
				
					
				
			});
		
		break;
		default:
		
	}
});

/*
 * Metodo que determina de donde vendra la fotografia
 */
function sourcePhoto(numFoto){
	
	lon = Ti.App.Properties.getString("longitud");
	lat = Ti.App.Properties.getString("latitud");
	var seleccion;
	var chooseSource = Ti.UI.createAlertDialog({
		title:'Fotografía',
		message:'¿De donde quieres tomar tu fotografía?',
		buttonNames:['Camara', 'Galeria','Cancelar'],
		cancel:2
	});
	chooseSource.show();
	
	chooseSource.addEventListener("click", function(e) {
		if (e.index == 0) {
			seleccion = 0;
			if (lon == null && lat == null) {
				alert("Aun no obtenemos tu posición geográfica, esto puede tardar unos segundos.Intenta nuevamente ");

			} else {
				Ti.App.fireEvent("source", {
					get : seleccion,
					foto : numFoto
				});
			}

		} else if (e.index == 1) {
			seleccion = 1;
			Ti.App.fireEvent("source", {
				get : seleccion,
				foto : numFoto
			});
		} else if (e.index == 2) {
			chooseSource.hide();
		}

	}); 

	
}

function picLat () {
	var latitud;
	var nomFoto = $.imagenReporte1.image;
	//alert("NOOMO:::" + nomFoto);
	var cadena = nomFoto.toString();
	 
	
	return latitud;
}

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
	blockView.add(indicator);


/*
 * Boton de enviar reporte, si se cumplen todas las condiciones requeridas, el reporte se envia.
 */
$.btnEnviar.addEventListener("click", function() {
	
	//CHECA QUE TENGA INTERNET
	if (Alloy.network.isAvailable()) {
		
		var newTime = new Date().getTime();
    	var tiempo = niceTimeFromMilliseconds( newTime - start );
    	//Ti.API.info(tiempo);
		//CHECA QUE EL FURMULARIO ESTE COMPLETO
		var id = Ti.App.Properties.getString("id");
		
		if (validaReporte()) {		
			$.reporteWin.add(blockView);
			$.btnEnviar.add(indicator);
			indicator.show();
			
			
		params = {
				idCiudadano : id,
				descripcion : $.textAreaReporte.value,
				motivo : wildlifeValue,
				latitud : lat,
				longitud : lon,
				urlImagen1 : "",
				urlImagen2 : "",
				referencia : $.referenciaText.value,
				calle : $.calleText.value,
				ycalle : $.entreCalleText.value,
				desplazamiento : tiempo,
				dispositivo : Ti.Platform.osname,
				token: Ti.App.Properties.getString("TOKEN")
		};
			//Ti.API.info('paso 1.1')
			
		    enviarTicket(params);
		
			
		}
	} else {
		$.reporteWin.remove(activiInd);
		Ti.UI.createAlertDialog({
			title : "Atención",
			message : "Tu dispositivo no se encuentra actualmente con internet, es necesario estar conectado a internet para hacer uso de la aplicación.",
			buttonNames : ["Ok"]
		}).show();
	}
});



//Validacion de formulario del reporte
function validaReporte(){
		if (imagen1ToBlob){
			if($.textAreaReporte.value != ""){
				if($.referenciaText.value != ""){
					if($.calleText.value != ""){
						if($.entreCalleText.value != ""){
							return true;
						}else{
							Ti.UI.createAlertDialog({
								title:"Atención",
								message:"Entre que calle es necesaria para enviar el reporte",
								buttonNames:["OK"]
							}).show();
						}	
					}else{
						Ti.UI.createAlertDialog({
							title:"Atención",
							message:"La referencia es necesaria para enviar el reporte",
							buttonNames:["OK"]
						}).show();
					}
				}else{
					Ti.UI.createAlertDialog({
						title:"Atención",
						message:"La referencia es necesaria para enviar el reporte",
						buttonNames:["OK"]
					}).show();
				}
			}else{
				Ti.UI.createAlertDialog({
					title:"Atención",
					message:"La descripción es necesaria para enviar el reporte",
					buttonNames:["OK"]
				}).show();
			}	
		}else{
			Ti.UI.createAlertDialog({
				title:"Atención",
				message:"La foto es necesaria para enviar el reporte",
				buttonNames:["OK"]
			}).show();
			
		}
	}

var pBar = Titanium.UI.createProgressBar({
	id:"pb",
	bottom:"15%",
	width:"60%",
	height:"15%",
	min:"0", 
	max:"10",
	value:"0",
	color:"#333",
}) ;


function image2Up(imagenToBlob, NoTicket) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(20000);
	var nom = "in"+NoTicket+"-2"+ ".jpg";
	xhr.onload = function(e) {
		if (this.readyState == 4) {
			if (this.responseText != 'false') {
				
				Ti.API.info(this.responseText);
				ticketEnviado();
			} else {
				alert('Error : La imagen no pudo ser cargada. Intente nuevamente.');
				
			}
		}
	};
	xhr.onerror = function(e) {
		alert("Error(TimeOut) : La imagen no pudo ser cargada. Intente nuevamente." + e.error);
		$.reporteWin.remove(blockView);
	
	};
	
	xhr.onsendstream = function(e)
    {
       var progreso = e.progress ;
       Ti.API.info("progreso: "+ progreso);
    };
	
	//xhr.open('POST', 'http://189.254.14.169/Imagen/AGENCIA%20DE%20GESTI%C3%93N%20URBANA/Ingreso/imagesmovil/upload.php');
	xhr.open('POST', 'http://simgweb.072cdmx.gob.mx/imagen/upload.php');
	xhr.send({
		media : imagenToBlob,
		nombre : nom
	});
};

function image1Up(imagenToBlob,NoTicket) {
	$.reporteWin.add(pBar);
	pBar.show();
	 var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(20000); 
	var nom = "in"+NoTicket+"-1"+ ".jpg";
	xhr.onload = function(e) {
		//Ti.API.info('paso 1 imagen 3');
		if (this.readyState == 4) {
			if (this.responseText != 'false') {
				var respo = this.responseText;
				
				if (imagen2ToBlob) {
					//$.reporteWin.remove(activiInd);
					image2Up(imagen2ToBlob, NoTicket);
				} else {
					//$.reporteWin.remove(activiInd);
					ticketEnviado();
				}
				Ti.API.info(this.responseText);
				//alert("MI RESPUES:::" + respo);
				
			} else {
				
				alert('Error : La imagen no pudo ser cargada. Intente nuevamente.');
			}
		}
	};
	xhr.onerror = function(e) {
		alert("Error(TimeOut) : La imagen no pudo ser cargada. Intente nuevamente." + e.error);
		$.reporteWin.remove(blockView);
		pBar.hide();
	};
	xhr.onsendstream = function(e)
    {
       var stream = e.progress;
       var val =  Math.round(stream*10);
       
       Ti.API.info("progreso: "+ val);
       if (interval) {
			clearInterval(interval);
		}
	
		interval = setInterval(function(){
		Ti.API.info('INTERVAL FIRED value imagen1 ' + val);
			if(val >= 10){
				clearInterval(interval);
				pBar.hide();
				return;
			}
			pBar.value = val;
			pBar.message = 'Enviando imagen1 %' + val;
			val++;
			
		},100) ;
       
      
    };
	
	//xhr.open('POST', 'http://189.254.14.169/Imagen/AGENCIA%20DE%20GESTI%C3%93N%20URBANA/Ingreso/imagesmovil/upload.php');
	xhr.open('POST', 'http://simgweb.072cdmx.gob.mx/imagen/upload.php');
	
	xhr.setRequestHeader("Connection", "close");
	xhr.send({
		media : imagenToBlob,
		nombre : nom
	});
}


function enviarTicket(params) {
	//Ti.API.info('paso 3')
	Alloy.network.callService('apexrest/creaticket', params, function(response){
		if (response.error === 'false') {
			//var r = JSON.stringify(response);
			//alert("mi tickets" +);
			numeroTicket = response.numeroTicket;
			image1Up(imagen1ToBlob,numeroTicket);
		} else {
			$.reporteWin.remove(blockView);
			var alert = Ti.UI.createAlertDialog({
				title : "Error",
				message : "No fue posible generar el reporte, intentalo de nuevo mas tarde "+JSON.stringify(response),
				buttonNames : ["OK"]
			});
			alert.show();
		}
	});
}			  

function ticketEnviado(){
	       var alert = Ti.UI.createAlertDialog({
				title : "Listo!",
				message : "Le informamos que su petición ha sido registrada con el reporte " + numeroTicket + ", para consultar su seguimiento seleccione la pestaña (Perfil) Mis Reportes.",
				buttonNames : ["OK"]
			});
			alert.show();
			alert.addEventListener("click", function() {
					
					//$.pickerReporte.setSelectedRow(0,0,true);
					$.imagenReporte1.image="/reporte/imagen.png";
					$.imagenReporte2.image="/reporte/imagen.png";
					//$.imagenReporte2.visible = false;
					$.textAreaReporte.value = "";
					lat = null;
					lon = null;
					imagen1ToBlob=null;
					imagen2ToBlob=null;
					distanciaRecorrida = 0;
					wildlifeValue = "Bache";
					
					numeroTicket = null;
					Ti.App.Properties.setString("longitud", null);
					Ti.App.Properties.setString("latitud", null);
					$.referenciaText.value = "";
					$.calleText.value = "";
					$.entreCalleText.value = "";
					$.reporteWin.remove(blockView);
					//$.distanciaSwitch.value = false;
					//$.distanciaText.value = "";
			});
}
