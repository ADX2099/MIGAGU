var forms = require('libs/forms');
var texto1 = "Los datos personales recabados serán protegidos, incorporados y tratados en el Sistema de datos Personales del Programa 072 Atención Ciudadana para mayor información puedes consultar la página:http://www.agu.df.gob.mx/ley-de-proteccion-de-datos-personales-para-el-df/";
var terminos = texto1;
//var activiInd = Alloy.createWidget("activityIndicatorCustom").getView("actIndWin");
$.formVista.height = "85%";

var nuevo = (Ti.App.Properties.getBool("session") ? false : true);
var datos = ( nuevo ? {} : JSON.parse(Ti.App.Properties.getString("datos")));
var fields = [{
	title : 'Nombre ',
	type : 'text',
	id : 'nombre',
	value : ( nuevo ? '' : datos.nombre)
},
{
	title : '@Twitter ',
	type : 'text',
	id : 'twitter',
	value : ( nuevo ? '' : datos.twitter)
}, 
{
	title : 'Apellido Paterno',
	type : 'text',
	id : 'apaterno',
	value : ( nuevo ? '' : datos.apaterno)
}, {
	title : 'Apellido Materno',
	type : 'text',
	id : 'amaterno',
	value : ( nuevo ? '' : datos.amaterno)
}, {
	title : 'Correo electrónico ',
	type : 'email',
	id : 'email',
	value : ( nuevo ? '' : datos.email)
}, {
	title : 'Teléfono (celular)',
	type : 'phone',
	id : 'telefono',
	value : ( nuevo ? '' : datos.telefono)
}, {
	title : 'Password',
	type : 'password',
	id : 'password',
	value : ( nuevo ? '' : datos.password)
}, {
	title : 'Confirma password',
	type : 'password',
	id : 'confirm_password',
	value : ( nuevo ? '' : datos.password)
}, {
	type : 'submit',
	id : 'registerUser',
	
	title : ( nuevo ? 'CREAR CUENTA' : 'MODIFICAR')
}];

var form = forms.createForm({
	style : forms.STYLE_HINT,
	fields : fields
});

//activiInd.message(mensaje);

	function callAlerta(message) {

		var view_base = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.FIll,
			backgroundColor : "transparent",
			opacity : "0.8"
		});

		var view_loading = Ti.UI.createView({
			backgroundColor : "#fff",
			borderColor : "#ccc",
			borderWidth : 2,
			height : "30%",
			width : "80%"
		});

		var indicator = Ti.UI.createActivityIndicator({
			color : "#000",
			font : {
				fontFamily : 'Helvetica Neue',
				fontSize : "auto",
				fontWeight : 'bold',

			},
			style : Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			message : message
		});

		indicator.show();
		view_loading.add(indicator);
		view_base.add(view_loading);

		return view_base;
	}


var activiInd= callAlerta("Cargando...");




form.addEventListener('registerUser', function(e) {
	if (Alloy.network.isAvailable()) {
		//e.nuevo = nuevo;

		var respuesta = Alloy.data.validForm(e.values);
		if (respuesta.valid) {
			
			/*
			 *
			 * var datosLocales = {
				nombre : e.values.nombre,
				apaterno : e.values.apaterno,
				amaterno : e.values.amaterno,
				email : e.values.email,
				telefono : e.values.telefono,
				password : e.values.password
				token : Ti.App.Properties.getString("token");
			};
			 *  
			 */
			
			var datosLocales = {
				nombre : e.values.nombre,
				twitter : e.values.twitter,
				apaterno : e.values.apaterno,
				amaterno : e.values.amaterno,
				email : e.values.email,
				telefono : e.values.telefono,
				password : e.values.password
			};
			$.formVista.add(activiInd);
			var mensaje;
			mensaje = ( nuevo ? 'Creando usuario' : 'Actualizando' );
			
			var alert = callAlerta(mensaje);
			$.formVista.add(activiInd);
			
			if (nuevo) {

				Alloy.network.callService('apexrest/ciudadano', datosLocales, function(response) {
					//Ti.App.fireEvent('close');
					if (response.error == "false") {

						Ti.App.Properties.setString("id", response.id);
						Ti.App.Properties.setString("datos", JSON.stringify(datosLocales));
						Ti.App.Properties.setBool("configurado", true);
						Ti.App.Properties.setBool("session", true);
						var alert = Ti.UI.createAlertDialog({
							title : "Listo",
							message : "Usuario creado correctamente",
							buttonNames : ["OK"]
						});
						alert.show();

						alert.addEventListener("click", function() {
							$.formVista.remove(activiInd);
							Ti.App.Properties.setBool("Mensaje", true);
							//var winIndex = Alloy.createController("index");

							var winTermino = Ti.UI.createWindow({
								navBarHidden : true,
								backgroundColor : "#eeeeee"
							});

							var closeButton = Ti.UI.createView({
								backgroundImage : "/images/btn-listo.jpg",
								height : "10%",
								width : Ti.UI.FILL,
								bottom : 0
							});

							var condicionesLbl = Ti.UI.createLabel({
								text : terminos,
								height : Ti.UI.SIZE,
								width : "85%",
								color : "black",
								font : {
									fontSize : "16sp",
									fontWeight : 'bold'
								},
								top:25
							});
							var scrollCondiciones = Ti.UI.createScrollView({
								height : "90%",
								width : "100%",
								contentHeight: Ti.UI.SIZE,
								top: 0
							});

							closeButton.addEventListener("click", function() {
								winTermino.close();
								//Ti.App.fireEvent("registradoCierra");
							});

							
							scrollCondiciones.add(condicionesLbl);
							winTermino.add(scrollCondiciones);
							winTermino.add(closeButton);
							winTermino.open({
								modal : true
							});

						});

					} else {
						Ti.UI.createAlertDialog({
							title : "Lo sentimos",
							message : "No ha sido posible crear la cuenta de ciudadano",
							buttonNames : ["OK"]
						}).show();
						$.formVista.remove(activiInd);
						

					}
				});

			} else {
				
				var alert = Ti.UI.createAlertDialog({
					title : "Listo",
					message : "Ciudadano modificado correctamente",
					buttonNames : ["OK"]
				});
				alert.show();
				alert.addEventListener("click", function() {
					Ti.App.Properties.setBool("Mensaje", true);
					$.formVista.remove(activiInd);
				});

			}

		} else {
			var errorMsg = "Los siguientes campos estan incorrectos: \n";
			for (var i = 0; i < respuesta.errorFields.length; i++) {
				errorMsg += respuesta.errorFields[i] + "\n";
			}

			Ti.UI.createAlertDialog({
				title : "Error!",
				message : errorMsg,
				buttonNames : ['OK']
			}).show();
		}

	} else {
		Ti.UI.createAlertDialog({
			title : "Atención",
			message : "Tu dispositivo no se encuentra actualmente con internet, es necesario estar conectado a internet para hacer uso de la aplicación.",
			buttonNames : ["Ok"]
		}).show();
	};

});

$.formVista.add(form);
