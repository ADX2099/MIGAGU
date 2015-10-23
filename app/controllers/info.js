var win = $.popupWin;

var folder;
//alert("La medida del alto:::.." + Alloy.platform.h);
var salir = Titanium.UI.createView({
	backgroundImage:"/images/tutorial/saltar.png",
	bottom:"10", 
	right:"10",
	width:"156",
	height:"22"   
});
salir.addEventListener("click", function(){
		Alloy.Globals.tutorial = true;
		$.popupWin.close();
});

switch(Alloy.platform.h){
	
	case 480:
		folder = "iphone4";
		var viewsStock =[];
		for(var i=1;i<8;i++){
			var page = Titanium.UI.createView({
				id:"view"+i,
				backgroundImage : "/images/tutorial/"+folder+i+".png",
				width:"100%",
				height:"100%"
			});
			if(page.id == "view7"){
				page.add(salir);
			}
		
			viewsStock.push(page);	
        }
        
		$.scrollableView.pagingControl = true;
		$.scrollableView.views = viewsStock;
		
	break;
	case 568:
		folder = "iphone6/";
		var viewsStock =[];
		for(var i=1;i<8;i++){
			Ti.API.info("imprime i:::" + i);
			
			var page = Titanium.UI.createView({
				id:"view"+i,
				backgroundImage : "/images/tutorial/"+folder+i+".png",
				width:"100%",
				height:"100%"
			});
			if(page.id == "view7"){
				Ti.API.info("hola soy 7");
				page.add(salir);
			}
		
			viewsStock.push(page);	
        }
        
		$.scrollableView.pagingControl = true;
		$.scrollableView.views = viewsStock;				
	break;	
}


Ti.API.info("ES IPAD Y ESE ES TL ANCHO::.." + Alloy.platform.w +" y este el alto::" + Alloy.platform.h + ":::.." );
