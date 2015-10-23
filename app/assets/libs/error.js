/*
 * error.js
 * 
 * Contiene las constantes de error de la aplicación
 * 
 */

module.exports =  
{
	NETWORK_NOT_AVAILABLE : {error: 'No posees una conexión a internet activa en este momento'},
	NETWORK_ERROR_CONNECTION : {error: 'Error al conectarse al servidor'},
	NETWORK_BAD_FORMAT : {error: 'Error al obtener la información del servicio'},
	LOCALIZATION_NOT_FOUND: {error: 'Error al obtener la ubicación actual'},
	LOCALIZATION_NOT_AVAILABLE : {error: 'El servicio de localización no está activo en este momento'},
	MULTIMEDIA_INVALID_FORMAT : {error: 'Formato inválido de imagen'},
	MULTIMEDIA_ERROR_CAMERA : {error: 'Error al obtener imágen de la cámara'},
	MULTIMEDIA_ERROR_GALLERY : {error: 'Error al obtener imágen de la galería'}
};
