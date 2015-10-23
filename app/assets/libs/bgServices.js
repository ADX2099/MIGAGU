
Ti.API.info("bg-service: se ha invocado el servicio");
addLocalNotification();
function addLocalNotification(){
	var notification = Ti.App.iOS.scheduleLocalNotification({
		alertAction:"Ruta Generada",
		alertBody:"Tu ruta ha sido terminada, regresa!",
		badge:1,
		date: new Date(new Date().getTime() + 2000),
		sound:"/not.mp3"
	});
	//Ti.App.currentServiceStop.stop();
}


Ti.App.iOS.addEventListener("notification",function(e){
	if(e.badge > 0){
		Ti.App.iOS.scheduleLocalNotification({
			date: new Date(new Date().getTime()),
			badge:-1
		});
	}
	
	
});



var listener = Ti.App.currentService.addEventListener("stop",function(){
	Ti.API.info("bgservice: Apesar de que el servicio esta detenido, aun esta registrado y sera ejecutado en la proxim apausa");
	Ti.API.info("bgservice: Todos los servicios background son detenidos automaticamente");
});
