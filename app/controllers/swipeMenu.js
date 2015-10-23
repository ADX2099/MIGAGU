/*
 * Clase encargada de generar la tabla desplegable que contiene la lista de transportes que el usuario puede 
 * consultar 
 */
var forms = require('libs/datosMenu');

/*
 * Crea una seccion dentro del tableview indicandole la posicion el tipo de transporte y el tamaño de fuente
 * param{String}  section -> indica el nombre de la seccion 
 */
function createSection(section,transporte,smallFontSize) {
	if (!section.modificado) {
		for (var m in transporte) {
			var row1 = Ti.UI.createTableViewRow({
				backgroundColor: "white",
				id: transporte[m].id,
				height : Ti.UI.SIZE,
			});
			if(OS_IOS){
				row1.layout = "horizontal";
			}
			var lb1=Ti.UI.createLabel({
				text:"·",
				font : { 
					fontSize : "50sp",
					fontWeight : 'bold'
				},
				left:2,
				height:Ti.UI.SIZE,
				width:Ti.UI.SIZE,
				color: transporte[m].color
			});
			var lb2= Ti.UI.createLabel({
				color:"black",
				font : { 
					fontSize : "20sp"
				},
				left:"13%",
				height: Ti.UI.SIZE,
				text: transporte[m].text,
				id: transporte[m].id
				
			});

			if(smallFontSize){
				lb2.font = {fontSize : "15sp"};
			};

			row1.add(lb1);
			row1.add(lb2);
			section.add(row1);
			
		}
		section.modificado = true;
	}
	return section;
}



// Codigo encargado de crear los valores iniciales de la tabla, con el valor inicial de false para control de la animacion 
var openedMenu = false;
var banderaMetro = false;
var banderaMetrobus = false;
var banderaTrolebus = false;
var banderaRTP = false;
var banderaEcobici = false;
var banderaTransito = false;
var banderaNocheBus = false;
var banderaTuriBus = false;
var banderaCedaBus = false;

var section1 = Ti.UI.createTableViewSection({modificado:false});
var section2 = Ti.UI.createTableViewSection({modificado:false});
var section3 = Ti.UI.createTableViewSection({modificado:false});
var section4 = Ti.UI.createTableViewSection({modificado:false});
var section5 = Ti.UI.createTableViewSection({modificado:false});
var section6 = Ti.UI.createTableViewSection({modificado:false});
var section7 = Ti.UI.createTableViewSection({modificado:false});
var section8 = Ti.UI.createTableViewSection({modificado:false});
var section9 = Ti.UI.createTableViewSection({modificado:false});
var section10 = Ti.UI.createTableViewSection({modificado:false});
var section11 = Ti.UI.createTableViewSection({modificado:false});

/*
 * Sección asigna los titulos de cada sección y define las propiedades de la seccion
 */
var sectionPrincipal1 = Ti.UI.createTableViewSection({});
var transitoRow = Ti.UI.createTableViewRow({
	backgroundColor:"#f9c100",
	id : "transito",
	height : Titanium.Platform.displayCaps.platformHeight * 0.12
});

var imageRowImage = Ti.UI.createImageView({
	image: "/images/flechita.png",
	height: Titanium.Platform.displayCaps.platformHeight * 0.05,
	width: Titanium.Platform.displayCaps.platformHeight * 0.05,
	right: "4%",
	imageId: "transito"
});
transitoRow.add(imageRowImage);

var labelTransito = Ti.UI.createLabel({
	text:"Afectaciónes \n Viales",
	idM:"transito",
	color:"white",
	font : { 
		fontSize : "18sp",
		fontWeight : 'bold'
	},
	left:7
});
transitoRow.add(labelTransito);
sectionPrincipal1.add(transitoRow);



var sectionPrincipal2 = Ti.UI.createTableViewSection({});
var metroRow = Ti.UI.createTableViewRow({
	backgroundColor:"#f9b600",
	id : "metro",
	height : Titanium.Platform.displayCaps.platformHeight * 0.090
});

var imageRowImage = Ti.UI.createImageView({
	image: "/images/flechita.png",
	height: Titanium.Platform.displayCaps.platformHeight * 0.05,
	width: Titanium.Platform.displayCaps.platformHeight * 0.05,
	right: "4%",
	imageId: "metro"
});
metroRow.add(imageRowImage);

var labelMetro = Ti.UI.createLabel({
	text:"Metro",
	idM:"metro",
	color:"white",
	font : { 
		fontSize : "22sp",
		fontWeight : 'bold'
	},
	left:7
});
metroRow.add(labelMetro);
sectionPrincipal2.add(metroRow);

var sectionPrincipal3 = Ti.UI.createTableViewSection({});
var metrobusRow = Ti.UI.createTableViewRow({
	backgroundColor:"#f9aa00",
	id : "metrobus",
	height : Titanium.Platform.displayCaps.platformHeight * 0.090
});
var imageRowImage = Ti.UI.createImageView({
	image: "/images/flechita.png",
	height: Titanium.Platform.displayCaps.platformHeight * 0.05,
	width: Titanium.Platform.displayCaps.platformHeight * 0.05,
	right: "4%",
	imageId: "metrobus"
});
metrobusRow.add(imageRowImage);
var labelMetrobus = Ti.UI.createLabel({
	text:"Metrobus",
	idM:"metrobus",
	color:"white",
	font : { 
		fontSize : "22sp",
		fontWeight : 'bold'
	},
	left:7
});
metrobusRow.add(labelMetrobus);
sectionPrincipal3.add(metrobusRow);

var sectionPrincipal4 = Ti.UI.createTableViewSection({});
var trolebusRow = Ti.UI.createTableViewRow({
	backgroundColor:"#f99e00",
	id : "trolebus",
	height : Titanium.Platform.displayCaps.platformHeight * 0.090
});

var imageRowImage = Ti.UI.createImageView({
	image: "/images/flechita.png",
	height: Titanium.Platform.displayCaps.platformHeight * 0.05,
	width: Titanium.Platform.displayCaps.platformHeight * 0.05,
	right: "4%",
	imageId: "trolebus"
});
trolebusRow.add(imageRowImage);

var labelTrolebus = Ti.UI.createLabel({
	text:"Trolebus",
	idM:"trolebus",
	color:"white",
	font : { 
		fontSize : "22sp",
		fontWeight : 'bold'
	},
	left:7
});
trolebusRow.add(labelTrolebus);
sectionPrincipal4.add(trolebusRow);


var sectionPrincipal5 = Ti.UI.createTableViewSection({});
var RTPRow = Ti.UI.createTableViewRow({
	backgroundColor:"#f99200",
	id : "rtp",
	height : Titanium.Platform.displayCaps.platformHeight * 0.090
});

var imageRowImage = Ti.UI.createImageView({
	image: "/images/flechita.png",
	height: Titanium.Platform.displayCaps.platformHeight * 0.05,
	width: Titanium.Platform.displayCaps.platformHeight * 0.05,
	right: "4%",
	imageId: "rtp"
});
RTPRow.add(imageRowImage);

var labelRTP = Ti.UI.createLabel({
	text:"RTP",
	idM:"rtp",
	color:"white",
	font : { 
		fontSize : "22sp",
		fontWeight : 'bold'
	},
	left:7
});
RTPRow.add(labelRTP);
sectionPrincipal5.add(RTPRow);

var sectionPrincipal6 = Ti.UI.createTableViewSection({});
var EcobiciRow = Ti.UI.createTableViewRow({
	backgroundColor:"#f96400",
	id : "ecobici",
	height : Titanium.Platform.displayCaps.platformHeight * 0.090
});

var imageRowImage = Ti.UI.createImageView({
	image: "/images/flechita.png",
	height: Titanium.Platform.displayCaps.platformHeight * 0.05,
	width: Titanium.Platform.displayCaps.platformHeight * 0.05,
	right: "4%",
	imageId: "ecobici"
});
EcobiciRow.add(imageRowImage);

var labelEcobici = Ti.UI.createLabel({
	text:"Ecobici",
	idM:"ecobici",
	color:"white",
	font : { 
		fontSize : "22sp",
		fontWeight : 'bold'
	},
	left:7
});
EcobiciRow.add(labelEcobici);
sectionPrincipal6.add(EcobiciRow);

var sectionPrincipal8 = Ti.UI.createTableViewSection({});
var SuburbanoRow = Ti.UI.createTableViewRow({
	backgroundColor:"#f94600",
	id : "suburbano",
	//height : Titanium.Platform.displayCaps.platformHeight * 0.075
	height : Titanium.Platform.displayCaps.platformHeight * 0.090
});

var imageRowImage = Ti.UI.createImageView({
	image: "/images/flechita.png",
	height: Titanium.Platform.displayCaps.platformHeight * 0.05,
	width: Titanium.Platform.displayCaps.platformHeight * 0.05,
	right: "4%",
	imageId: "suburbano"
});
SuburbanoRow.add(imageRowImage);

var labelSuburbano = Ti.UI.createLabel({
	text:"Suburbano",
	idM:"suburbano",
	color:"white",
	font : { 
		fontSize : "20sp",
		fontWeight : 'bold'
	},
	left:7
});
SuburbanoRow.add(labelSuburbano);
sectionPrincipal8.add(SuburbanoRow);

/*
 * MODIFICACION ENERO 2014 SE AGREGAN DOS NUEVAS CAPAS
 */
var sectionPrincipal9 = Ti.UI.createTableViewSection({});
var nocheRow = Ti.UI.createTableViewRow({
	backgroundColor:"#f98700",
	id : "nochebus",
	height : Titanium.Platform.displayCaps.platformHeight * 0.090
});

var imageRowImage = Ti.UI.createImageView({
	image: "/images/flechita.png",
	height: Titanium.Platform.displayCaps.platformHeight * 0.05,
	width: Titanium.Platform.displayCaps.platformHeight * 0.05,
	right: "4%",
	imageId: "nochebus"
});
nocheRow.add(imageRowImage);

var labelNoche = Ti.UI.createLabel({
	text:"NocheBus",
	idM:"nochebus",
	color:"white",
	font : { 
		fontSize : "20sp",
		fontWeight : 'bold'
	},
	left:7
});
nocheRow.add(labelNoche);
sectionPrincipal9.add(nocheRow);

var sectionPrincipal10 = Ti.UI.createTableViewSection({});
var turiRow = Ti.UI.createTableViewRow({
	backgroundColor:"#f97500",
	id : "turibus",
	height : Titanium.Platform.displayCaps.platformHeight * 0.090
});

var imageRowImage = Ti.UI.createImageView({
	image: "/images/flechita.png",
	height: Titanium.Platform.displayCaps.platformHeight * 0.05,
	width: Titanium.Platform.displayCaps.platformHeight * 0.05,
	right: "4%",
	imageId: "turibus"
});
turiRow.add(imageRowImage);

var labelTuri = Ti.UI.createLabel({
	text:"TuriBus",
	idM:"turibus",
	color:"white",
	font : { 
		fontSize : "20sp",
		fontWeight : 'bold'
	},
	left:7
});
turiRow.add(labelTuri);
sectionPrincipal10.add(turiRow);
/*
 * MODIFICACION ENERO 2015 SE AGREGAN UNA NUEVA
 */
var sectionPrincipal11 = Ti.UI.createTableViewSection({});
var cedaRow = Ti.UI.createTableViewRow({
	backgroundColor:"#EC4200",
	id : "cedabus",
	height : Titanium.Platform.displayCaps.platformHeight * 0.090
});

var imageRowImage = Ti.UI.createImageView({
	image: "/images/flechita.png",
	height: Titanium.Platform.displayCaps.platformHeight * 0.05,
	width: Titanium.Platform.displayCaps.platformHeight * 0.05,
	right: "4%",
	imageId: "cedabus"
});
cedaRow.add(imageRowImage);

var labelCeda = Ti.UI.createLabel({
	text:"Cedabus",
	idM:"cedabus",
	color:"white",
	font : { 
		fontSize : "20sp",
		fontWeight : 'bold'
	},
	left:7
});
cedaRow.add(labelCeda);
sectionPrincipal11.add(cedaRow);

var imageRowImage = Ti.UI.createImageView({
	image: "/images/flechita.png",
	height: Titanium.Platform.displayCaps.platformHeight * 0.05,
	width: Titanium.Platform.displayCaps.platformHeight * 0.05,
	right: "4%",
	imageId: "cedabus"
});
cedaRow.add(imageRowImage);




/*
 * Sección 
 */
var tablaMenu = Ti.UI.createTableView({
	sections : [sectionPrincipal1, sectionPrincipal2,sectionPrincipal3,sectionPrincipal4,sectionPrincipal5,sectionPrincipal9,sectionPrincipal10,sectionPrincipal6,sectionPrincipal8,sectionPrincipal11],
	borderColor: "transparent",
	width:Ti.UI.FILL,
	height: Ti.UI.FILL
});
//EVENTOS
tablaMenu.addEventListener("click", function(e) {
	
	// Ti.API.info(JSON.stringify(tablaMenu.getSections()));
	//Ti.API.info(JSON.stringify(e));
	var opcMap = e.source.idM;// id de label de section
	var opcSub = e.source.imageId;// id imagen feclita para desplegar submenu
	var opcSubM = e.source.id; // id de row para submeno
	//Ti.API.info('el id de la etiqueta es '+opcMap+" el id de imagen row es "+opcSub+" y el submenu es "+opcSubM);
	// var idRow = ( OS_IOS ? e.rowData.id : e.source.id);
	
	if (opcSub == "metro") {
		if (banderaMetro) {
			tablaMenu.deleteSection(e.index + 1);
			banderaMetro = false;
			openedMenu = false;
			//Ti.API.info('cierra aqui');
		} else {
			if (!openedMenu) {

				tablaMenu.insertSectionAfter(e.index, createSection(section2,forms.datos.metro,false));

				//Ti.API.info('inserta aqui')
				openedMenu = e.index + 1;
			} else {
				tablaMenu.deleteSection(openedMenu);
				//Ti.API.info('cierra otro');
				banderaMetrobus = false;
				banderaTrolebus = false;
				banderaRTP = false;
				banderaEcobici = false;
				banderaTransito = false;
				banderaNocheBus = false;
				banderaTuriBus = false;
				tablaMenu.insertSectionAfter(1, createSection(section2,forms.datos.metro,false));

				//Ti.API.info('inserta aqui y cierra en otro lado')
				openedMenu = 2;
			}
			banderaMetro = true;
		}
	}
	if (opcSub == "metrobus") {
		if (banderaMetrobus) {
			tablaMenu.deleteSection(e.index + 1);
			banderaMetrobus = false;
			openedMenu = false;
			//Ti.API.info('cierra aqui');
		} else {
			if (!openedMenu) {

				tablaMenu.insertSectionAfter(e.index, createSection(section3,forms.datos.metrobus,false));

				//Ti.API.info('inserta aqui')
				openedMenu = e.index + 1;
			} else {
				tablaMenu.deleteSection(openedMenu);
				//Ti.API.info('cierra otro');
				banderaMetro = false;
				banderaTrolebus = false;
				banderaRTP = false;
				banderaEcobici = false;
				banderaTransito = false;
				banderaNocheBus = false;
				banderaTuriBus = false;

				tablaMenu.insertSectionAfter(2, createSection(section3,forms.datos.metrobus,false));

				//Ti.API.info('inserta aqui y cierra en otro lado')
				openedMenu = 3;
			}
			banderaMetrobus = true;
		}
	}
	if (opcSub == "trolebus") {
		if (banderaTrolebus) {
			tablaMenu.deleteSection(e.index + 1);
			banderaTrolebus = false;
			openedMenu = false;
		} else {
			if (!openedMenu) {

				tablaMenu.insertSectionAfter(e.index, createSection(section4,forms.datos.trolebus,true));

				openedMenu = e.index + 1;
			} else {
				tablaMenu.deleteSection(openedMenu);
				//Ti.API.info('cierra otro');
				banderaMetro = false;
				banderaMetrobus = false;
				banderaRTP = false;
				banderaEcobici = false;
				banderaTransito = false;
				banderaNocheBus = false;
				banderaTuriBus = false;

				tablaMenu.insertSectionAfter(3, createSection(section4,forms.datos.trolebus,true));

				openedMenu = 4;
			}
			banderaTrolebus = true;
		}
	}
	if (opcSub == "rtp") {
		if (banderaRTP) {
			tablaMenu.deleteSection(e.index + 1);
			banderaRTP = false;
			openedMenu = false;
		} else {
			if (!openedMenu) {

				tablaMenu.insertSectionAfter(e.index, createSection(section5,forms.datos.rtp,true));

				openedMenu = e.index + 1;
			} else {
				tablaMenu.deleteSection(openedMenu);
				banderaMetro = false;
				banderaMetrobus = false;
				banderaTrolebus = false;
				banderaEcobici = false;
				banderaTransito = false;
				banderaNocheBus = false;
				banderaTuriBus = false;
				tablaMenu.insertSectionAfter(4, createSection(section5,forms.datos.rtp,true));

				openedMenu = 5;
			}
			banderaRTP = true;
		}
	}
	//Cambios realizados 2014
	if (opcSub == "nochebus") {
		if (banderaNocheBus) {
			tablaMenu.deleteSection(e.index + 1);
			banderaNocheBus = false;
			openedMenu = false;
		} else {
			if (!openedMenu) {
				tablaMenu.insertSectionAfter(e.index, createSection(section6,forms.datos.Nochebus,true));
				openedMenu = e.index + 1;
			} else {
				tablaMenu.deleteSection(openedMenu);
				banderaMetro = false;
				banderaMetrobus = false;
				banderaTrolebus = false;
				banderaRTP = false;
				banderaTransito = false;
				banderaTuriBus = false;
				tablaMenu.insertSectionAfter(5, createSection(section6,forms.datos.Nochebus));
				openedMenu = 6;
			}
			banderaNocheBus = true;
		}
	}
	if (opcSub == "turibus") {
		if (banderaTuriBus) {
			tablaMenu.deleteSection(e.index + 1);
			banderaTuriBus = false;
			openedMenu = false;
		} else {
			if (!openedMenu) {
				tablaMenu.insertSectionAfter(e.index, createSection(section8,forms.datos.Turibus,true));
				openedMenu = e.index + 1;
			} else {
				tablaMenu.deleteSection(openedMenu);
				banderaMetro = false;
				banderaMetrobus = false;
				banderaTrolebus = false;
				banderaRTP = false;
				banderaEcobici = false;
				banderaNocheBus = false;
				tablaMenu.insertSectionAfter(6, createSection(section8,forms.datos.Turibus));
				openedMenu = 7;
			}
			banderaTuriBus = true;
		}
	}
	//Cambios realizados enero 2015
	if (opcSub == "cedabus") {
		if (banderaCedaBus) {
			tablaMenu.deleteSection(e.index + 1);
			banderaCedaBus = false;
			openedMenu = false;
		} else {
			if (!openedMenu) {
				tablaMenu.insertSectionAfter(e.index, createSection(section8,forms.datos.Cedabus,true));
				openedMenu = e.index + 1;
			} else {
				tablaMenu.deleteSection(openedMenu);
				banderaMetro = false;
				banderaMetrobus = false;
				banderaTrolebus = false;
				banderaRTP = false;
				banderaEcobici = false;
				banderaNocheBus = false;
				banderaTuriBus = false;
				tablaMenu.insertSectionAfter(6, createSection(section8,forms.datos.Turibus));
				openedMenu = 8;
			}
			banderaTuriBus = true;
		}
	}
	
	//Menu
	switch(opcMap){
		//BLOQUE DE METRO
		case "metro":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=Metro"});
			
		break;
		//BLOQUE DE METROBUS
		case "metrobus":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=Metrobus"});
		break;
		case "trolebus":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=Trolebus"});
		break;
		case "rtp":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=RTP"});
		break;
		case "nochebus":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=Nochebus"});
		break;
		case "turibus":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=Turibus"});
		break;
		case "transito":
			if(Ti.App.Properties.getBool("Dev") == true){
				Ti.App.fireEvent("transito", {url:"http://backupfull-072gdf.cs19.force.com/ApoyoVialMovil"});
			}else{
				Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil"});	
			}
		break;
		case "ecobici":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=EcoBici"});
		break;
		case "suburbano":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=suburb"});
			//Ti.API.info('hola soy un suburbano');
		break;
		case "cedabus":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=cedabus"});
		break;		
	};	
	switch(opcSubM){
		//BLOQUE DE METRO
		case "linea1":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=m1"});
		break;
		case "linea2":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=m2"});
		break;
		case "linea3":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=m3"});
		break;
		case "linea4":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=m4"});
		break;
		case "linea5":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=m5"});
		break;
		case "linea6":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=m6"});
		break;
		case "linea7":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=m7"});
		break;
		case "linea8":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=m8"});
		break;
		case "linea9":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=m9"});
		break;
		case "linea10":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=mA"});
		break;
		case "linea11":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=mB"});
		break;
		case "linea12":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=m12"});
		break;
		case "trenligero":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=trlig"});
		break;
		//BLOQUE DE METROBUS
		case "lineamb1":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=mb1"});
		break;
		case "lineamb2":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=mb2"});
		break;
		case "lineamb3":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=mb3"});
		break;
		case "lineamb4":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=mb4"});
		break;
		case "lineamb5":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=mb5"});
		break;
		//BLOQUE TROLEBUS
		case "trolebus1":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=TroleA"});
		break;
		case "trolebus2":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=TroleCP"});
		break;
		case "trolebus3":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=TroleD"});
		break;
		case "trolebus4":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=TroleG"});
		break;
		case "trolebus5":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=TroleI"});
		break;
		case "trolebus6":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=TroleK"});
		break;
		case "trolebus7":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=TroleLL"});
		break;
		case "trolebus8":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=TroleS"});
		break;
		//BLOQUE RTP
		case "rtp1":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-EXPBIC"});
		break;
		case "rtp2":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-76"});
		break;
		case "rtp3":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-76A"});
		break;
		case "rtp4":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-107B"});
		break;
		case "rtp5":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-12"});
		break;
		case "rtp6":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-23"});
		break;
		case "rtp7":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-39A"});
		break;
		case "rtp8":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-46"});
		break;
		case "rtp9":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-ECB"});
		break;
		case "rtp10":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-57"});
		break;
		case "rtp11":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-47A"});
		break;
		case "rtp12":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-39"});
		break;
		case "rtp13":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=rtp-COREVSA"});
		break;
		//BLOQUE NOCHEBUS
		case "noche1":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=noche-MB1"});
		break;
		case "noche2":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=noche-RTP12"});
		break;
		case "noche3":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=noche-RTP47"});
		break;
		case "noche4":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=noche-RTP57"});
		break;
		case "noche5":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=noche-RTP76"});
		break;
		case "noche6":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=noche-RTPEXPBIC"});
		break;
		case "noche7":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=noche-TROLEA"});
		break;
		case "noche8":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=noche-TROLED"});
		break;
		case "noche9":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=noche-TROLES"});
		break;
		case "noche10":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=noche-RTP115"});
		break;
		case "noche11":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=noche-COREVSA"});
		break;
		
		
		//BLOQUE TURIBUS
		
		case "turibus1":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=Turibus_CANTINASTRADICIONALES"});
		break;
		case "turibus2":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=Turibus_CDDELOSPALACIOS"});
		break;
		case "turibus3":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=Turibus_CTOBASILICA"});
		break;
		case "turibus4":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=Turibus_CTOCENTRO"});
		break;
		case "turibus5":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=Turibus_CTONOCTURNO"});
		break;
		case "turibus6":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=Turibus_CTOSUR"});
		break;
		
		//BLOQUE CEDABUS
		
		case "cedabus1":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=cedabusl1"});
		break;
		case "cedabus2":
			Ti.App.fireEvent("transito", {url:"http://072gdf.force.com/ApoyoVialMovil?layermap=cedabusl2"});
		break;
		
		
	};
	
	//Ti.API.info("el metro es: "+banderaMetro+" el metrobus  es: "+banderaMetrobus+" el openedMenu es: "+openedMenu);
});
$.tableBaseView.add(tablaMenu);


