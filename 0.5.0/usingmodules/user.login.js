Using("UsingClass");

Using.asyn(function(){
	Using.Class.create("UserLoginModel",function(){
		this.userName = null;
		this.userPassword = null;
	}).property({
		find : function(){
			if(this.userName != 'xxx' || this.userPassword != '123456'){
				return false;
			}
			return true;
		}
	}).namespace(Using.Modules);
	Using.Class.create("UserLoginController",function(){
		this.model = null;
	}).property({
		initialize : function(){
			var _this = this;
			$("#subButton").click(function(){
				var userName = $("#userName").val(),
					userPassword = $("#userPassword").val();
				_this.validate(userName,userPassword);
			});
		},
		validate : function(userName,userPassword){
			if(userName === "" || userPassword === ""){
				alert("please input ur infomation");
			}else{
				this.model.userName = userName;
				this.model.userPassword = userPassword;
				if(this.model.find()){
					alert("login success");
				}else{
					alert("please input correct infomation");
				}
			}
		}
	}).namespace(Using.Modules);
	
	var model = new Using.Modules.UserLoginModel(),
		ctrl = new Using.Modules.UserLoginController();
	ctrl.model = model;
	ctrl.initialize();
});