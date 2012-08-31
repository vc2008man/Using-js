(function(){
	var _iterator = function(target,override){
		for(var key in target){
			if(override){
				if(target.hasOwnProperty(key)){
					this[key] = target[key];
				}
			}else{
				if(target.hasOwnProperty(key)){
					!this[key] ? this[key] = target[key] : null;
				}
			}
		}
	}
	/**
	* 可用于模块的命名空间
	* @module Using.Modules
	*/
	Using.Modules = Using.Modules || {};
	/**
	* UsingJS中封装的用于创建类的对象
	* @module Using.Class
	* @class Using.Class
	*/
	Using.Class = Using.Class || function(){};
	/**
	* @property Using.Class.fn
	* @type {Object} Using.prototype的别名
	* @default Using.Class.prototype
	*/
	Using.Class.fn = Using.Class.prototype;
	/**
	* 代理 给需要代理的函数做this替换
	* @method Using.Class.proxy
	* @param {Function} 需要
	* @param {Object} 替换的对象
	*/
	Using.Class.proxy = function(func,target){
		return (function(){
			return func.apply(target,arguments);
		});
	}
	/**
	* 创建类的函数
	* @method Using.Class.create
	* @param {String} 类名
	* @param {Object} 构造函数 可选参数
	*/
	Using.Class.create = function(name,constr){
		/**
		* 用于将需要创建的类缓存 并添加公用函数
		* @attribute F
		* @type {Function}
		* @private
		*/
		//var F = constr || function(){};
		constr = constr || function(){};
		var single = false;
		var F = function(){
			this._prototype = F.fn;
			constr.apply(this,arguments);
			return null;
		}
		F.fn = F.prototype;
		/**
		* 用于将需要创建的类的类名
		* @attribute F.fn.nick
		* @type {String}
		* @private
		*/
		F.fn.nick = name;
		/**
		* 代理 给需要代理的函数做this替换
		* @attribute F.fn.proxy = F.proxy
		* @type {Function}
		* @param {Function} 需要代理的函数
		* @return {Function} 已经设置好代理的新函数
		* @private
		*/
		F.fn.proxy = F.proxy = function(func){
			return Using.Class.proxy(func,this);
		}
		/**
		* 继承
		* @attribute F.extend
		* @type {Function}
		* @param {Function} 父类
		* @param {Boolean} 是否需要覆盖相同的函数 默认为不覆盖
		* @return {Function} F
		* @private
		*/
		F.extend = function(parent,override){
			_iterator.call(F.fn,parent,override);
			return F;
		}
		/**
		* 创建类中的原型属性
		* @attribute F.property
		* @type {Function}
		* @param {Object} 类中需要添加的属性(JSON)
		* @param {Boolean} 是否需要覆盖相同的属性 默认为不覆盖
		* @return {Function} F
		* @private
		*/
		F.property = function(option,override){
			_iterator.call(F.fn,option,override);
			return F;
		}
		/**
		* 创建类的静态属性 通过类名直接调用 无需实例化
		* @attribute F.static
		* @type {Function}
		* @param {Object} 类需要添加的静态属性(JSON)
		* @param {Boolean} 是否需要覆盖相同的属性 默认为不覆盖
		* @return {Function} F
		* @private
		*/
		F.static = function(option,override){
			_iterator.call(F,option,override);
			return F;
		}
		/**
		* 类的命名空间 推荐使用Using.Modules 以避免产生更多的全局变量
		* @attribute F.namespace
		* @type {Function}
		* @param {Object} 所属命名空间
		* @return {Function} F
		* @private
		*/
		F.namespace = function(ns){
			ns[F.fn.nick] = F;
			return F;
		}
		
		F.instance = function(){
			var f = null;
			if(!single){
				f = new F();
				f.initialize ? f.initialize() : null;
			}
			return f;
		}
		
		F.singleton = function(){
			single = true;
		}
		//F.private = function(){option};
		return F;
	}	
})();