win = $.noticiasWin;
var id = Ti.App.Properties.getString("id");
var noticiasCollection = Alloy.Collections.noticias;
var activiInd = Alloy.createWidget("activityIndicatorCustom").getView("actIndWin");
var param = {
	"idCiudadano" : id
};

var indice;

if (OS_IOS) {
	$.refreshButton.addEventListener("click", function() {
		$.noticiasWin.add(activiInd);
		refresh();
	});
}

function refresh() {
	if (Ti.Network.networkType > 0) {
		Alloy.network.getToken(function(auth) {

			if (!auth.error) {

				var xhr = Ti.Network.createHTTPClient();
				if(Ti.App.Properties.getBool("Dev") == true){
					xhr.open("POST", "https://cs19.salesforce.com/services/" + 'apexrest/noticias');
				}else{
					xhr.open("POST", "https://na19.salesforce.com/services/" + 'apexrest/noticias');	
				}
				xhr.setRequestHeader('Authorization', 'OAuth ' + auth.access_token);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setTimeout(30000);

				xhr.send(JSON.stringify(param));

				xhr.onload = function() {

					if (xhr.readyState == 4) {
						var response = JSON.parse(xhr.responseText);
						//var response = xhr.responseText;
						cargaNoticias(response);
					}
				};

				xhr.onerror = function(e) {
					//Ti.API.info('error')
					alert("Hay un problema con la conexión");
				};
			} else {
				//Ti.API.info('no entra');
				alert("Hay un problema con la conexión");
			}

		});

	} else {
		alert("Es necesario estar conectado a internet.");

	}

};

if (OS_IOS) {
	$.Cerrar.addEventListener("click", function() {

		win.close();
	});
}


$.noticiasWin.addEventListener("open", function() {

	$.noticiasWin.add(activiInd);

	refresh();
});
function cargaNoticias(response) {
	//alert("alerta" + JSON.stringify(response));
	noticiasCollection.reset();
	for (i in response) {
		var miCollection = Alloy.createModel('noticias', {
			id : i,
			descripcion : response[i].Descripcion__c,
			titulo : response[i].Titulo__c,
			imagen : response[i].Imagen__c,
			fecha : response[i].FechaPublicacion__c

		});

		noticiasCollection.add(miCollection);

	}
	
	$.noticiasWin.remove(activiInd);
	$.noticias.visible = true;
	
}

var paramsIn = {
	descripcionIn : "",
	imgIn : ""
};




Ti.App.addEventListener("datosNoticias",function(params){
	
	paramsIn.descripcionIn = params.descripcion;
	paramsIn.imgIn = params.img;
	//alert(paramsIn.descripcionIn);
	var detail = crearDetail(paramsIn.descripcionIn,paramsIn.imgIn);
	$.noticiasWin.add(detail);
});




function crearDetail(description, noticiaImg){
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
	var img = Ti.UI.createImageView({
		height:"11%", 
		width:"19%",
		top:"3%"
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
	img.image = noticiaImg;

	
	fondo.add(img);
    fondo.add(consulta);
    fondo.add(aceptar);
    popupView.add(fondo);	
    	
    		
	return popupView;
}



