/*
* alloy.js
*
* Inicialización de la aplicación
*/

// Módulos utilizados

Alloy.multimedia = require("libs/multimedia");
Alloy.network = require('libs/network');
Alloy.errors = require('libs/error');
Alloy.data = require('libs/data');
Alloy.localization = require("libs/localization");
Alloy.dataExtensions = require('libs/data_extensions');
Alloy.notificacion = require('libs/notificacion');

Alloy.platform = {};
Alloy.platform.isiOS = Alloy.platform.isiPhone | Alloy.platform.isiPad;
Alloy.platform.filepath = Ti.Filesystem.applicationDataDirectory;
Alloy.platform.h =  Titanium.Platform.displayCaps.platformHeight;
Alloy.platform.w = Titanium.Platform.displayCaps.platformWidth;
 //Pantalla
Alloy.Globals.height = Ti.Platform.displayCaps.platformHeight;
Alloy.Globals.width = Ti.Platform.displayCaps.platformWidth;
Alloy.Globals.topMenu = (42);
Alloy.Globals.heightMenu = Titanium.Platform.displayCaps.platformHeight * 0.075;
Alloy.Globals.imagenReporte = Alloy.Globals.height * 0.1;
Alloy.Globals.limite = Alloy.Globals.height * 0.013;
Alloy.Globals.url_desarrollo = "https://cs15.salesforce.com/services/";
Alloy.Globals.url_produccion = "https://cs16.salesforce.com/services";
Alloy.Globals.token_desarrollo = "grant_type=password&client_id=3MVG99OxTyEMCQ3j1W8faf5mAqHImevYMg5eflaVYq27DG8riryIHpggEZZxLMUAE01vz_icavWX8vSpVCaus&client_secret=1110909413960982424&username=darzola@grupoday.com.dev&password=davidmaar2014TJWvF0OFRVxqzX2v7zEPU5rdX";
Alloy.Globals.token_produccion = "grant_type=password&client_id=3MVG99OxTyEMCQ3j1W8faf5mAqHImevYMg5eflaVYq27DG8riryIHpggEZZxLMUAE01vz_icavWX8vSpVCaus&client_secret=1110909413960982424&username=admin072movil@obrasdf.gob.mx&password=072movil2013aCVunihgEOWjjTV4Sp35MGjB";
Alloy.Globals.transito_desarrollo = "";
Alloy.Globals.transito_produccion = "";
Alloy.Globals.appVer = 1.5;


function askInternet(){
	if(Titanium.Network.online == false){
		var a = Titanium.UI.createAlertDialog({
			title:"Advertencia",
   		    message:"No cuenta con internet, por lo cual no podra realizar todas las operaciones.",
		    buttonNames:['Aceptar']
		});	
		a.show();	
	}
}





/*
 * FUNCION QUE VERIFICA EL SISTEMA OPERATIVO DEL DISPOSITIVO 
 * EN CASO DE QUE EL SISTEMA SEA MAYOR A IOS 8 REGISTRARA LAS NOTIFICACIONES
 */

var firstTime = Ti.App.Properties.getBool("instalacion");
//alert("COMO VIENE EL INSTALLED::.:::" +firstTime);

if (firstTime  != true) {
	/*
	 *PARA CAMBIAR DE AMBIENTE SERÁ NECESARIO REINSTALAR LA APP 
	 */
		Ti.App.Properties.setBool("Dev",true);
		Ti.App.Properties.setBool("tutorial",true);
		Ti.App.Properties.setString("datos", "");
		Ti.App.Properties.setBool("session", false);
		Ti.App.Properties.setString("id", "");
		Ti.App.Properties.setBool("instalacion",true);
		Ti.App.Properties.setString("TOKEN","");
		Ti.App.Properties.setBool("autorizadoTweeter",false);
		
		
		
		
		askInternet();
		
		
							
		
		//Ti.App.Properties.setString("token",obtenerToken());
		
	}else{
		
		askInternet();
		//var notification = Ti.App.Properties.getString("token");
		//if(notification == " " || notification == null){
			//notificationService();
		//}
}

