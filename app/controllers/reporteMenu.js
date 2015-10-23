function opciones(e){
	var eval = e.source.id;
	
	switch(eval){
		case "reporte":
					var winReporte = Alloy.createController("reporte");
					winReporte.getView("reporteWin").open();
					
		break;
		// case "tickets":
			// alert("ticket");
		// break;
	}
	/*
	var alert = Titanium.UI.createAlertDialog();
	alert.title = "Invalido";
	alert.message = "numero: " + e.source.id;
	alert.buttonNames = ['OK'];
	alert.show();*/
}
