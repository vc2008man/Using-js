// var al = Using.Observer(Album)
// al.subscribe("open",[cover.open]);
// al.publish("open",'xxx');// jinliangzidonghua

(function(){
	var Observer = function(){
	}
	
	Observer.fn = Observer.prototype;
	Observer.fn.subscribe = function(){
	}
	Observer.fn.publish = function(){
	}
	Observer.fn.notify = function(){
	}
	
	Using.Observer = Using.Observer || new Observer();
})();