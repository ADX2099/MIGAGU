/*
 * Clase encargada de integrar el menu inferior de la aplicación el cual contiene los accesos a:
 *  -Ubicame
 *  -Noticias
 *  -Ruta
 *  -Configuración
 * 
 * Despliega una animacion de elevacion al dar click sobre la vista principal
 * 
 *  
 *  
 */
Alloy.multimedia.gpsInit();
var lat=null;
var lon= null;
var altoMenu = Alloy.Globals.height * 0.2;
var topMenu = "95%";
var desplegado = 0;
$.containerMenu.height = altoMenu;
$.containerMenu.top = topMenu;
$.cuerpo.top = altoMenu * 0.1;
$.btnDespliega.width = Alloy.Globals.width / 3;


/*
 * EL USUARIO NO TIENE LA POSIBILIDAD DE VER NOTICIAS NI DE GENERAR RUTA SIN UNA SESIÓN POR LO TANTO SE EVALUA QUE EXISTA 
 * UNA SESION MEDIANTE LA VARIABLE GLOBAL "session".
 */

$.btnNoticias.addEventListener("click",function(){
		if (Ti.App.Properties.getBool("session")) {
			var ventanaNoticia = Alloy.createController("noticias");
			ventanaNoticia.getView("noticiasWin").open();
		}else{
			alert("Necesitas iniciar sesión para ver las noticias");
		}
});	

$.btnRuta.addEventListener("click",function(){
		
		if (Ti.App.Properties.getBool("session")) {
			Alloy.notificacion.getToken();
			var ventanaRuta = Alloy.createController("ruta");
		    ventanaRuta.getView("rutaWin").open();		
		}else{
			alert("Necesitas iniciar sesión para poder planear tu ruta");
		}
});

/*
 * Evento que controla la animación del menu  
 */

$.btnDespliega.addEventListener("click",function(){
	if(desplegado== 0)
	{
		var a1 = Titanium.UI.createAnimation();
		a1.top = Alloy.Globals.height * 0.8;
		a1.duration = 300;
		$.containerMenu.animate(a1);
		desplegado = 1;
	}
	else{
		var a2 = Titanium.UI.createAnimation();
		a2.top = topMenu;
		a2.duration = 300;
		$.containerMenu.animate(a2);
		desplegado = 0;
	}
});
/*
 * Eventos para crear controladores de ventanas
 */

$.btnUbicame.addEventListener("click",function(){
		Ti.API.info("YA LLEGUE AL CKLÇLICK QUE PASE?");
		Alloy.multimedia.gpsGetPosition();
		lon = Ti.App.Properties.getString("longitud");
		lat = Ti.App.Properties.getString("latitud");
		Ti.API.info("La longa niza::." + lon);
		if(Alloy.Globals.desarrollo == true){
			var urlZoom = "http://dev-072gdf.cs16.force.com/ApoyoVialMovil?"+"Lat="+lat+"&Lon="+lon;	
		}else{
			var urlZoom = "http://072gdf.force.com/ApoyoVialMovil?"+"Lat="+lat+"&Lon="+lon;
		}	
		if(lon != null || lat != null){
			Ti.App.fireEvent("transito", {url:urlZoom});	
		}else{
			var alert = Ti.UI.createAlertDialog({
				title:"Atención",
				message:"No encontramos tu posición intenta nuevamente",
				buttonNames:["OK"]
			});
			alert.show();
		}
		
		
});

$.btnReporte.addEventListener("click",function(){
	if (Ti.App.Properties.getBool("session")) {
		var winReporte = Alloy.createController("reporte");
		winReporte.getView("reporteWin").open();
	} else {
		alert("Es necesario iniciar sesión para realizar un reporte");
	}
});
