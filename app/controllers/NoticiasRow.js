var fila = $.row;
var noticiasCollection = Alloy.Collections.noticias;
var indice;
var datosImg = {
	descripcion : "",
	img : "",
};

$.row.addEventListener("click",function(e){
	indice = e.index;
	//Ti.API.info("descripcion............................" + noticiasCollection.models[indice].get("descripcion"));
	
	var noticiaDescription = noticiasCollection.models[indice].get("descripcion");
    var noticiaImage = noticiasCollection.models[indice].get("imagen");
   // var detail = Alloy.createController('popup').getView('popupWin');
    //detail.mostrarData(noticiaDescription,noticiaImage);
   datosImg.descripcion = noticiaDescription;
   datosImg.img = noticiaImage;
   Ti.App.fireEvent("datosNoticias",datosImg);
   
    
    
	//Ti.API.info("...:::Hola funciona::" + e.index);
	
	//Ti.API.info("...:::Hola funciona::" );
	
});

