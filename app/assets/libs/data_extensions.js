var dataExtensions = {};
dataExtensions.time_ago_in_words_with_parsing = function(from) {
	var date = new Date;
	date.setTime(Date.parse(from));
	return this.time_ago_in_words(date);
};

dataExtensions.time_ago_in_words = function(from) {
	return this.distance_of_time_in_words(new Date, from);
};

dataExtensions.distance_of_time_in_words = function(to, from) {
	var distance_in_seconds = ((to - from) / 1000);
	var distance_in_minutes = Math.floor(distance_in_seconds / 60);

	if (distance_in_minutes == 0) {
		return 'Hace menos de un minuto';
	}
	if (distance_in_minutes == 1) {
		return 'Hace un minuto';
	}
	if (distance_in_minutes < 45) {
		return 'Hace ' + distance_in_minutes + ' minutos';
	}
	if (distance_in_minutes < 90) {
		return 'Hace una hora';
	}
	if (distance_in_minutes < 1440) {
		return 'Hace ' + Math.floor(distance_in_minutes / 60) + ' horas';
	}
	if (distance_in_minutes < 2880) {
		return 'Hace un día';
	}
	if (distance_in_minutes < 43200) {
		return 'Hace ' + Math.floor(distance_in_minutes / 1440) + ' días';
	}
	if (distance_in_minutes < 86400) {
		return 'Hace un mes';
	}
	// if (distance_in_minutes < 525960) {
		// return 'Hace ' + Math.floor(distance_in_minutes / 43200) + ' meses';
	// }
	// if (distance_in_minutes < 1051199) {
		// return 'Hace un año';
	// }

	//return 'over ' + (distance_in_minutes / 525960).floor() + ' years ago';
};
module.exports = dataExtensions; 