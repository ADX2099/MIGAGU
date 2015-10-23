/*
 * localization.js
 * 
 * Módulo de sistema de geolocalización
 *  
 */


// Objeto del módulo

var localization = {};

var errors = require("./error");


// Parámetros del módulo

Ti.Geolocation.preferredProvider = 'gps';
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;

Ti.Geolocation.distanceFilter = 10;
Ti.Geolocation.purpose = '';

localization.latitude = null;
localization.longitude = null;


// Indica si está disponible el servicio de geolocalización

localization.isAvailable = function()
{
	return Ti.Geolocation.locationServicesEnabled;
}

// Obtiene la posición actual

localization.getPosition = function(callback)
{
	if( localization.isAvailable() )
	{
		var eventLocation = function(e)
		{
			if( !e.error )
			{
				localization.latitude = e.coords.latitude;
				localization.longitude = e.coords.longitude;
				
				callback(e.coords);
			}
			else
			{
				callback(errors.LOCALIZATION_NOT_FOUND);
			}
			
			Ti.Geolocation.removeEventListener('location', eventLocation);
		}
		Ti.Geolocation.addEventListener('location', eventLocation);
	}
	else
	{
		callback(errors.LOCALIZATION_NOT_AVAILABLE);
	}
}

module.exports = localization;