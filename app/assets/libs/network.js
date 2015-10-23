/*
* network.js
*
* Módulo de sistema de servicios de red y conexión a redes
*/

// Objeto del módulo


var network = {};

network.services = {
	crear_ciudadano : 'apexrest/ciudadano',
	//actualizar_ciudadano: 'apexrest/updciudadano',
	login : 'apexrest/login',
	//recupera: 'apexrest/enviapass',
	crear_ticket : 'apexrest/creaticket',
	status_ticket : 'apexrest/statusticket',
	noticias : 'apexrest/noticias',
	ticket_favorito : 'apexrest/AMFavorito'
};

var errors = require('./error');

// Parámetros del módulo

network.timeout = 30000;

// Obtiene los datos del estado de la conexión

network.getState = function() {
	var data_state = {};

	if (Ti.Network.networkType > 0) {
		data_state.available = true;
		data_state.type = Ti.Network.networkType;
		data_state.typename = Ti.Network.networkTypeName;
	} else {
		data_state.available = false;
	}

	return data_state;
};
network.callServiceM = function(service, method, params, callback) {
	//Ti.UI.createAlertDialog({message:"::..param..:: " + JSON.stringify(params) }).show();
	network.getToken(function(auth) {
		//Ti.UI.createAlertDialog({message:"info" + JSON.stringify(auth) + " " + "service" + service + " " + "params" + params }).show();
		if (!auth.error) {
			network.callServiceWithAuth(service, method, params, auth.access_token, callback);
		} else {
			callback({
				error : true,
				tipo : "Error al conectarse al servicio",
				servicio : "libreria network"
			});
		}

	});
};

network.callServiceWithAuth = function(service, method, params, token, callback) {
	//Ti.UI.createAlertDialog({message:"::..param..:: " + JSON.stringify(params) }).show();
	if (network.isAvailable()) {
		//Ti.UI.createAlertDialog({message:"::..check..::" + token}).show();
		var xhr = Ti.Network.createHTTPClient();
		var dev = Ti.App.Properties.getBool("Dev");
		//alert("EL DEV ES " + dev);
		if(Ti.App.Properties.getBool("Dev") == true){
			xhr.open(method, "https://cs19.salesforce.com/services/" + service);	
		}else{
			xhr.open(method, "https://na19.salesforce.com/services/" + service);	
		}
		xhr.setRequestHeader('Authorization', 'OAuth ' + token);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setTimeout(30000);
		//Ti.UI.createAlertDialog({message:"::..params..:: " + JSON.stringify(params)}).show();
		xhr.send(JSON.stringify(params));
		xhr.onload = function() {
			if (xhr.readyState == 4) {

				//Ti.UI.createAlertDialog({message:xhr.responseText}).show();
				var str = xhr.responseText.replace(/\"{/g, '{').replace(/}\"/g, '}').replace(/\\\"/g, '\'');
				Ti.API.info("Lo que regresa..::" + xhr.responseText);
				Ti.API.info("Lo que es el stringify..::" + JSON.stringify(xhr.responseText));
				callback(eval("(" + str + ")"));
			}
		};

		xhr.onerror = function(e) {
			callback({
				error : true,
				tipo : "Error al conectarse al servicio",
				servicio : "libreria network"
			});
		};
	} else {
		callback({
			error : "Tu dispositivo no cuenta actualmenta con internet"
		});

	}

};
// Indica si existe una conexión de datos activa

network.isAvailable = function() {
	return network.getState().available;
};
//llama al servicio de autenticacion y le pasq por parametro el servicio seleccionado
network.callService = function(service, params, callback) {

	network.callServiceM(service, 'POST', params, callback);
	//Ti.UI.createAlertDialog({message:"::..param..:: " + JSON.stringify(params) }).show();

};

network.getToken = function(callback) {

	var xhr = Ti.Network.createHTTPClient();

	xhr.onreadystatechange = function() {
		//Ti.UI.createAlertDialog({message:'el status: '+xhr.readyState}).show();
	};

	xhr.onload = function() {
		//Ti.UI.createAlertDialog({message:'status: '+xhr.readyState}).show();
		if (xhr.readyState == 4) {
			//Ti.UI.createAlertDialog({message:"el status" + xhr.readyState}).show();
			//Ti.UI.createAlertDialog({message:'responseText ' +xhr.responseText}).show();
			callback(JSON.parse(xhr.responseText));

		}
	};

	xhr.onerror = function(e) {
		//Ti.UI.createAlertDialog({message:e.error}).show();
		callback({
			error : true,
			tipo : "Error al conectarse al servicio",
			servicio : "ibreria network"
		});
		alert("Ocurrió un error al conectarse a los servicios, intente nuevamente");
	};
	
	if(Ti.App.Properties.getBool("Dev") == true){
		xhr.open('POST', "https://cs19.salesforce.com/services/" + "oauth2/token");
		xhr.send('grant_type=password&client_id=3MVG99OxTyEMCQ3j1W8faf5mAqHImevYMg5eflaVYq27DG8riryIHpggEZZxLMUAE01vz_icavWX8vSpVCaus&client_secret=1110909413960982424&username=adminconfiguracion@agucdmx.gob.mx.backupfull&password=grupoday01KKneBqdU9LKZeI1E9ObJCGDy');
	}else{
		xhr.open('POST', "https://na19.salesforce.com/services/" + "oauth2/token");	
		xhr.send('grant_type=password&client_id=3MVG99OxTyEMCQ3j1W8faf5mAqHImevYMg5eflaVYq27DG8riryIHpggEZZxLMUAE01vz_icavWX8vSpVCaus&client_secret=1110909413960982424&username=admin072movil@obrasdf.gob.mx&password=072movil2013aCVunihgEOWjjTV4Sp35MGjB');
	}
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setTimeout(30000);
	
	
};
// Realiza la conexión a un servicio web

network.callServiceFrameWork = function(url, method, params, callback) {
	if (network.isAvailable()) {
		var xhr = Ti.Network.createHTTPClient();
		xhr.open(method, url);
		xhr.setTimeout(network.timeout);
		xhr.setRequestHeader('Content-Type', 'application/json');

		switch(method) {

			case "GET":
				xhr.send();

				break;

			case "POST":
				xhr.send(JSON.stringify(params));
				break;

			default:
				//Ti.API.info("METODO NO VALIDO ");

				break;
		}

		xhr.onload = function() {
			var resp = xhr.responseText;

			if (xhr.readyState == 4) {
				var obj;
				try {
					obj = JSON.parse(xhr.responseText);

				} catch(e) {
					obj = errors.NETWORK_BAD_FORMAT;

				}
				callback(obj);
			}
		};

		xhr.onerror = function() {
			callback(errors.NETWORK_ERROR_CONNECTION);
		};
	} else {
		callback(errors.NETWORK_NOT_AVAILABLE);
	}
};


	
module.exports = network;
