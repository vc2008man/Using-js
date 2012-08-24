(function(){
	var Http = function(){
		this.url = null;
	}
	Http.prototype.set = function(url){
		this.url = url;
	}
	Http.prototype.show = function(){
		alert(this.url);
	}
	window.Http = Http;
})();