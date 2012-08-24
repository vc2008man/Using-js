(function(){
	Using.Class.create("UserModel",function(name,gender){
		this.name = name || null;
		this.gender = gender || null;
	}).property({
		setName : function(name){
			this.name = name;
		},
		setGender : function(gender){
			this.gender = gender;
		},
		show : function(){
			alert(this.name + " " + this.gender);
		}
	}).namespace(Using.Modules);
})();