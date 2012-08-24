/*!
 * UsingJS v0.4.3
 * Freely distributable under the MIT license.
 * @author : sun
 * @email : sunjiawei1986@163.com
 * @blog : http://www.cnblogs.com/itsusing/
 */
(function(){
		/**
		* 私有(内部)变量 用于配置using.config.js的路径
		* @attribute configPath
		* @type {String}
		* @private
		*/
	var configPath = "/js/using.config",
		/**
		* 私有(内部)变量 用于保存DOM结构加载完毕之后需要执行的函数集合
		* @attribute readyList
		* @type {Array}
		* @private
		*/
		readyList = [],
		/**
		* 私有(内部)变量 用于保存需要且还未加载的模块名(Using.Config中的key)
		* @attribute moduleList
		* @type {Array}
		* @private
		*/
		moduleList = [],
		/**
		* 私有(内部)变量 用于保存已加载的模块名(Using.Config中的key)
		* @attribute loadedModuleList
		* @type {Array}
		* @private
		*/
		loadedModuleList = [],
		/**
		* 私有(内部)变量 用于保存模块加载完毕之后需要执行的回调函数(集合)
		* @attribute asynQueue
		* @type {Array}
		* @private
		*/
		asynQueue = [];
		/**
		* 私有(内部)函数 用于处理DOMContentLoaded事件的IE兼容
		* @method _domReady
		* @private
		*/
	var _domReady = function(){
			try{
				document.documentElement.doScroll("left");
				_ready();
			}catch(ex){
				setTimeout(_domReady,1);
				return;
			}
		},
		/**
		* 私有(内部)函数 逐一执行DOMContentLoaded事件中缓存的所有函数 依赖readyList集合
		* @method _ready
		* @private
		*/
		_ready = function(){
			while(readyList.length > 0){
				(readyList.shift())();
			}
			if(document.removeEventListener){
				document.removeEventListener("DOMContentLoaded",_ready,false);
			}
		},
		/**
		* 私有(内部)函数 判断集合中是否包含指定的元素
		* @method _exist
		* @param {Array} 集合
		* @param {Object} 任意类型的元素
		* @return {Boolean} 存在为true 不存在为false
		* @private
		*/
		_exist = function(list,element){
			var len = list.length;
			if(len > 0){
				while(len--){
					if(list[len] === element){
						return true;
					}
				}
			}
			return false;
		};
		/**
		* 私有(内部)函数 执行所有异步操作中缓存的函数 依赖asynQueue队列
		* @method _execAsyn
		* @private
		*/
	var _execAsyn = function(){
		var func = null;
		if(asynQueue.length > 0){
			_execAsyn.isRunning = true;
			func = asynQueue.shift();
			if(moduleList.length < 1){
				func();
				_execAsyn();
			}else{
				Using.fn.script(function(){
					func();
					_execAsyn();
				});
			}
		}else{
			_execAsyn.isRunning = false;
		}
	}
	_execAsyn.isRunning = false;
	
	/**
	* Using 用于实现JS模块的动态加载
	* @class Using
	* @constructor
	* @param {String} 需要加载的模块名 对应Using.Config中的key
	*/
	var Using = function(module){
		/**
		* @property version
		* @type {String} 当前UsingJS的版本
		*/
		this.version = "0.4.3";
		Using.fn.initialize(module);
		return;
	}
	/**
	* @property Using.fn
	* @type {Object} Using.prototype的别名
	* @default Using.prototype
	*/
	Using.fn = Using.prototype;
	/**
	* Using初始化函数 Using原型中的函数
	* @method Using.fn.initialize
	* @param {String} 需要加载的模块名 对应Using.Config中的key
	*/
	Using.fn.initialize = function(module){
		!_exist(moduleList,module) ? moduleList.push(module) : null;
	}
	/**
	* ajax异步请求 Using原型中的函数
	* @method Using.fn.ajax
	* @param {String} 需要加载模块的路径 对应Using.Config中的value
	* @param {Function} 请求完毕之后的回调函数
	*/
	Using.fn.ajax = function(path,callback){
		var request = null;
		if(XMLHttpRequest){
			request = new XMLHttpRequest();
		}else{
			try{
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(ex){
				request = new ActiveXObject("Msxml2.XMLHTTP");
			}
		}
		if(request){
			request.open("GET",path + ".js",true);
			request.setRequestHeader("Content-Type","text/html;charset=utf-8");
			request.onreadystatechange = function(){
				if(request.readyState === 4 && request.status === 200){
					eval(request.responseText);
					callback ? callback() : null;
				}
			}
			request.send(null);
		}
	}
	/**
	* 遍历需要加载的模块文件 Using原型中的函数
	* @method Using.fn.script
	* @param {Function} 指定数量(moduleList)的模块加载完毕之后执行的回调函数
	*/
	Using.fn.script = function(callback){
		var _this = this,
			len = moduleList.length,
			num = 0, i = 0;
		var _count = function(){
			num++;
			if(num >= len){
				callback ? callback() : null;
			}
		}
		var _load = function(){
			for(;i<len;i++){
				var module = moduleList.shift();
				if(!_exist(loadedModuleList,module)){
					loadedModuleList.push(module);
					_this.ajax(Using.Config[module],function(){
						_count();
					});
				}else{
					_count();
				}
			}
		}
		!Using.Config ? _this.ajax(configPath,function(){
							_load();
						}) : _load();
	}
	/**
	* 封装页面DOM结构加载完毕之后需要执行的函数 可以调用任意次 Using的静态函数
	* @method Using.ready
	* @param {Function} 页面加载完毕之后需要执行的函数
	*/
	Using.ready = function(func){
		if(document.readyState === "complete"){
			return setTimeout(func,1);
		}
		readyList.push(func);
		if(document.addEventListener && !Using.ready._binded){
			document.addEventListener("DOMContentLoaded",_ready,false);
			Using.ready._binded = true;
			return;
		}
		_domReady();
	}
	Using.ready._binded = false;
	/**
	* 通知Using进行模块加载 请最好将代码都放置在Using.asyn函数中 以避免造成由异步请求带来的找不到对象异常 Using的静态函数
	* @method Using.asyn
	* @param {Function} 模块加载完毕之后的回调函数
	*/
	Using.asyn = function(callback){
		asynQueue.push(callback);
		!_execAsyn.isRunning ? _execAsyn() : null;
	}
	
	window.Using = Using;
})();