/*
 * multimedia.js
 * 
 * Módulo de sistema de multimedia
 *  
 */


// Objeto del módulo

var multimedia = {};

var errors = require("./error");


// Obtiene una imágen desde la cámara

multimedia.getImageFromCamera = function(callback)
{
	Ti.Media.showCamera
	({
		success: function(e)
		{
			callback( (e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) ? e : errors.MULTIMEDIA_INVALID_FORMAT );
			//multimedia.gpsGetPosition();
			
		},
		error: function(e)
		{
			callback(errors.MULTIMEDIA_ERROR_CAMERA);
		},
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
		saveToPhotoGallery:true
	});
	 
};


// Obtiene una imágen desde la galería

multimedia.getImageFromGallery = function(callback)
{
	Ti.Media.openPhotoGallery
	({
		success: function(e)
		{
			callback( (e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) ? e : errors.MULTIMEDIA_INVALID_FORMAT );
			
		},
		error: function(e)
		{
			callback(errors.MULTIMEDIA_ERROR_GALLERY);
		},
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
	});
};
	
// Almacena una imágen en el dispositivo

multimedia.saveImage = function(media, name, height, width, path)
{
	
    //Ti.API.info("test 1 image size:" + media.size);
    //Ti.API.info("test 1 image dimensions: " + media.width + 'x' + media.height);
	mediaResized = media.imageAsResized(400,400);
	//Ti.API.info("test 1 image size:" + mediaResized.size);
    //Ti.API.info("test 1 image dimensions: " + mediaResized.width + 'x' + mediaResized.height);
	var view = Ti.UI.createImageView
	({
		image: mediaResized,//media,
		height: height,
		width: width,
		canScale: true,
	});
	
	var image = view.toBlob();
	//alert("el nombre del archivos esh:..." + name);
	
	var file = Ti.Filesystem.getFile( path + Ti.Filesystem.separator + name);
	
	if( file.exists() )
	{
		file.deleteFile();
	}
	
	file.write( image );
};


multimedia.gpsInit = function(){
	
	if(Ti.Geolocation.locationServicesEnabled == false){
		Titanium.UI.createAlertDialog({
			title:"Localización",
			message:"Necesitas los servicios de GPS activos para detectar tu ubicación."
		}).show;
	}else{
		Ti.Geolocation.purpose = "Obtener la posicion al momento de la fotografia";
		Ti.Geolocation.preferredProvider = "GPS";
		Ti.Geolocation.distanceFilter = 0 ;
		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_LOW;
		Ti.Geolocation.setPauseLocationUpdateAutomatically(true);
		Titanium.Geolocation.getCurrentPosition(function(e){
			
		});
		
	}
	
};


/*
 * METODO QUE REGRESA LA LATITUD Y LONGITUD EN EL MOMENTO,
 */

multimedia.gpsGetPosition = function(){
	var mapview;
	var locationAdded = false;
	Ti.Geolocation.purpose = "Obtener la posicion al momento de la fotografia" ;
	Titanium.Geolocation.getCurrentPosition(function(e){
		if(!e.success || e.error){
			error = 'error: ' + JSON.stringify(e.error);
			alert(error);
		}else{
			
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
			Ti.Geolocation.setPauseLocationUpdateAutomatically(false);
			var longitude = e.coords.longitude;
			var latitude = e.coords.latitude;
			//var accuracy = Titanium.Geolocation.getAccuracy();
			//alert("esta es la accuracy cuando es Best" + accuracy);
			Titanium.App.Properties.setString('latitud',latitude);
		   	Titanium.App.Properties.setString('longitud',longitude);	
	 		//alert("longitud "+longitude+"latitud "+ latitude);
	 		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_LOW;
	 	}
	}); 
};



module.exports = multimedia;
