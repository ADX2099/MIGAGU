// function showIndicator(e){
    // $.activityIndicator.show();
    // // do some work that takes 6 seconds
    // // ie. replace the following setTimeout block with your code
    // setTimeout(function(){
        // //$.actIndWin.close();
        // $.activityIndicator.hide();
    // }, 6000);
// }
$.actIndWin.message = function(m){
	$.activityIndicator.message = m;
};


$.activityIndicator.show();
