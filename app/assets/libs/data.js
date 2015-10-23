/*
 * data.js
 * 
 * Contiene las constantes y datos estáticos de uso general
 *  
 */


// Objeto del módulo

var data = {};


// Validación de datos

data.expression = 
{
	NUMERIC : '^[0-9]+$',
	ALPHABETIC : '^[a-zñA-ZÑ\s]+$',
	ALPHANUMERIC : '^[a-zñA-ZÑ0-9]+$',
	EMAIL : '^[A-Za-z][A-Za-z0-9_.]*@(([a-zA-Z0-9-])*.)+([a-zA-Z0-9]{2,4})$',
	PHONE : '^[0-9]{8}([0-9]{2}){0,1}$',
	CURP : '^[A-Z]{4}[0-9]{6}[H,M][A-Z]{5}[0-9]{2}$',
	RFC : '^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$',
	TWITTER : '^@([A-Za-z0-9_]+)'
};

data.estadosTicket = {
	"ingreso" : "Su reporte con número de ticket "+ " será gestionada a través de la Agencia de Gestión Urbana de la Ciudad de México, en cuanto tengamos más información al respecto, con gusto los podrá visualizar en este mismo apartado de Mis tickets.",
	"supervisión" : "Su reportó con número de ticket " + " se está verificando, estamos en espera de una descripción más detallada por parte del área de Supervisión de la Agencia de Gestión Urbana de la Ciudad de México, en cuanto tengamos más avances al respecto, con gusto los podrá visualizar en este mismo apartado de Mis tickets.",
	"notificación" : "Su reportó con número de ticket " + " fue canalizado por parte de Agencia de Gestión Urbana de la Ciudad de México,  a la (DEPENDENCIA)  para su atención en cuanto tengamos más avances al respecto, con gusto los podrá visualizar en este mismo apartado de Mis tickets.",
	"operación/ operativo" : "Su reporte con número de ticket " + " se encuentra en la (DEPENDENCIA) quien será la encargada de darle atención, actualmente esta en espera de ser programada. En cuanto tengamos más información, con gusto los podrá visualizar en este mismo apartado de Mis tickets.",
	"concluido" : "Por parte de la Agencia de Gestión Urbana de la Ciudad de México, se está llevando a cabo la verificación final de su reporte con número de ticket " + " a fin de poderle informar a usted  los trabajos realizados por parte del área operativa de la (DEPENDENCIA).",
	"finalizado": "Le informa la Agencia de Gestión Urbana de la Ciudad de México, que en base a su reporte  con número de Ticket " + " la (DEPENDENCIA) llevo a cabo los trabajos necesarios para la atención a su solicitud. Gracias por su confianza",
};



data.validateExpression = function(exp, value, empty)
{
	var expression = empty ? '^$|'+exp : exp;  
	
	return ( value.match(expression) != null );
};

data.validForm = function(obj){
		
		var errorFields = [];
		 		var response = {
					valid : true,
					errorFields : []
				};
		
		for(propiedad in obj){
		
			
				switch(propiedad){
					case "nombre":
						if(obj.nombre === ''){
							response.errorFields.push("nombre vacío");
							response.valid = false;	
						}
					break;
					case "apaterno":
						if(obj.apaterno === ''){
							response.errorFields.push("apaterno vacío");
							response.valid = false;
						}
					break; 
					case "amaterno":
						if(obj.amaterno === ''){
							response.errorFields.push("amaterno vacio");
							response.valid = false;
						}
					break;
					case "email":
						if(obj.email === '' ){
							response.errorFields.push("email  vacío");
							response.valid = false;
						}else if(!data.validateExpression(data.expression.EMAIL,obj.email,false)){
							response.valid = false;
							response.errorFields.push("Email formato incorrecto");
									
						}			
					break;
					case "telefono":
						if(obj.telefono === ''){
							response.errorFields.push("Telefono vacío");
							response.valid = false;
						}else if(!data.validateExpression(data.expression.PHONE,obj.telefono,false)){
							response.valid = false;
							response.errorFields.push("Teléfono formato incorrecto");
						}
						
					break;
					case "password":
						if(obj.password === '' ){
							response.errorFields.push("password vacío");
							response.valid = false;
						}else if(obj.password.length < 6 || obj.password.length > 20){
							response.errorFields.push("password debe tener entre 6 y 20 caracteres");
							response.valid = false;
						}else if(obj.password != obj.confirm_password){
							response.errorFields.push("Confirmación de password incorrecta");
							response.valid = false;
						}
					break;
				}
		}
		return response;
	};




module.exports = data;