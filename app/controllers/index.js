/*
 * Archivo inicial de la App, siempre corre este archivo como base y realiza las siguientes acciones:
 * 	-Levanta los metodos del GPS
 * 	-Determina si se mostrara el tutorial o no
 * 	-
 * 
 */

//Alloy.multimedia.gps();
var bg = 	Alloy.createController("ruta");	
var service = Ti.App.iOS.registerBackgroundService({url:bg});
var activiInd = Alloy.createWidget("activityIndicatorCustom").getView("actIndWin");

var tutorialCond = Ti.App.Properties.getBool("tutorial");
//alert("COMO VIENE EL TUTORIAL " + tutorialCond);
var mapa = $.webview;
mapa.scalesPageToFit = false;
var dev = Ti.App.Properties.getBool("Dev");
Ti.API.info("COMO ESTA EN DEV:::.::" + dev);
if(Ti.App.Properties.getBool("Dev") == true){
	
	mapa.url = "http://backupfull-072gdf.cs19.force.com/ApoyoVialMovil";
	$.titleIos.title = "Development";
}else{
	
	mapa.url = "http://072gdf.force.com/ApoyoVialMovil";
	$.titleIos.backgroundImage = "/images/logo_navBar.png";
}
var swiped = 'none';
var deslizar = 'none';
var swipedButton = 'right';
var botonDeslizar = 'left';


if(tutorialCond == true){
	var tutorial = Alloy.createController('info');
	tutorial.getView('popupWin').open({modal:true});
	Ti.App.Properties.setBool("tutorial",false);
}

/*
 * Seccion de eventos asignados al mapa que presenta dinamicamente la URL proporcionada
 */
Ti.App.addEventListener("transito", function(e) {
	
	mapa.url = e.url;
});

mapa.addEventListener('load', function() {
	$.mainWin.remove(activiInd);
});

mapa.addEventListener('beforeload', function(e) {
	if (Alloy.network.isAvailable()) {
		$.mainWin.add(activiInd);	
	}
	
	moveMenu(1, 0);
	swipedButton = 'right';
});
mapa.addEventListener('error',function(){
	$.mainWin.remove(activiInd);
	var alerta = Ti.UI.createAlertDialog({
		title:"Atención",
		message:"No ha sido posible generar el mapa, intenta nuevamente.",
		buttnName:["Aceptar"]
	});
	alerta.show();
});



function swipeLeft(e) {
		
		//ADX2099 ahora este boton genera  la pantalla de configuracion 
		var configuracionWin = Alloy.createController("configuracion");	
	 	configuracionWin.getView("windowConf").open();
		
		
}

function swipe(e) {
	
	if (swipedButton != 'left'){
		moveMenu(2, 0);
		swipedButton = 'left';
	} else {
		moveMenu(1, 0);
		swipedButton = 'right';
	}
}

function moveMenu(mov, identifier) {
	if (identifier == 0) {
		var anim = Ti.UI.createAnimation({
			duration : 800
		});
		anim.left = (mov == 1 ) ? -Alloy.Globals.width * 0.7 : 0;
		$.Vista.animate(anim);
	} else {
		var anim = Ti.UI.createAnimation({
			duration : 800
		});
		anim.left = (mov == 1 ) ? Alloy.Globals.width * 1.0 : Alloy.Globals.width * 0.5;
	}
}

$.mainWin.open();