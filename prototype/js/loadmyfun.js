function loadmyfun(url,endfun){
	var ascript = document.createElement('script');
	ascript.src=url;
	document.getElementsByTagName('head')[0].appendChild(ascript);

	if(ascript.readState){
		ascript.onreadstatechange=function(){
			if(ascript.readyState =="loaded" || ascript.readyState=="complete"){
				endfun();
				ascript.onreadstatechange=null;
			}
		}
	}
	else{
		ascript.onload=function(){
			endfun();
		}
	}
}
