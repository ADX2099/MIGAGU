$.popupWin.mostrarData = function(description, noticiaImg) {
	$.consulta.value = description;
	$.img.image = noticiaImg;

	var t = Titanium.UI.create2DMatrix();
	t = t.scale(1);

	$.popupWin.transform = t;

	var t1 = Titanium.UI.create2DMatrix();
	t1 = t1.scale(0);

	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 200;

	a.addEventListener('complete', function() {
		//Titanium.API.info('here in complete');
		var t2 = Titanium.UI.create2DMatrix();
		t2 = t2.scale(1.0);
		$.popupWin.animate({
			transform : t2,
			duration : 200
		});
	});

}; 


$.aceptar.addEventListener("click", function(){
	Ti.App.fireEvent("closePop");
});




 
