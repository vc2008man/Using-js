Using("UsingClass");

Using.asyn(function(){
	Using.Class.create("MusicPlugin",function(){
		this.list = [];
		this.playing = false;
		this.mode = null;
		this.volume = 20;
		//this.favorite = null;
		this.frame = {
			layer : $("<div class=\"music-layer\"></div>"),
			startBtn : $("<a href=\"javascript:;\" title=\"start\" class=\"music-button music-start-button\"></a>"),
			pauseBtn : $("<a href=\"javascript:;\" title=\"pause\" class=\"music-button music-pause-button\"></a>"),
			listBtn : $("<a href=\"javascript:;\" title=\"list\" class=\"music-button music-list-button\"></a>"),
			nextBtn : $("<a href=\"javascript:;\" title=\"next\" class=\"music-button music-next-button\"></a>"),
			currentTip : $("<span title=\"current\" class=\"music-current-tip\"></span>")
		}
		this.player = "<object id='media-player' width='370' height='45' {0}> " +
				"<param name='rate' value='1' /> " +
				"<param name='balance' value='0' /> " +
				"<param name='currentPosition' value='0' /> " +
				"<param name='defaultFrame' /> " +
				"<param name='playCount' value='1' /> " +
				"<param name='autoStart' value='0' /> " +
				"<param name='currentMarker' value='0' /> " +
				"<param name='invokeURLs' value='0' /> " +
				"<param name='baseURL' /> " +
				"<param name='volume' value='50' /> " +
				"<param name='mute' value='0' /> " +
				"<param name='uiMode' value='invisible' /> " +
				"<param name='stretchToFit' value='0' /> " +
				"<param name='windowlessVideo' value='0' /> " +
				"<param name='enabled' value='-1' /> " +
				"<param name='enableContextMenu' value='0' /> " +
				"<param name='fullScreen' value='0' /> " +
				"<param name='SAMIStyle' /> " +
				"<param name='SAMILang' /> " +
				"<param name='SAMIFilename' /> " +
				"<param name='captioningID' /> " +
				"<param name='enableErrorDialogs' value='0' /> " +
				"<param name='_cx' value='6482' /> " +
				"<param name='_cy' value='6350' /> " +
			"</object> ";
	}).property({
		initialize : function(option){
			option = option || {};
			var _this = this,
				render = option.render || $(document.body),
				frame = this.frame,
				layer = frame.layer;
			layer.append(frame.startBtn);
			layer.append(frame.nextBtn);
			layer.append(frame.listBtn);
			render.append(frame.layer);
			
			if(window.ActiveXObject){
				this.player = this.player.replace(/\{0\}/,"classid=\"clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6\"");
			}else{
				this.player = this.player.replace(/\{0\}/,"type=\"application/x-ms-wmp\"");
			}
			render.append(this.player);
			frame.startBtn.click(function(){
				if(_this.playing){
					$(this).removeClass("music-start-button").addClass("music-pause-button");
				}else{
					$(this).removeClass("music-pause-button").addClass("music-start-button");
				}
				_this.playing = !_this.playing;
			});
		},
		start : function(){
		},
		pause : function(){
		},
		stop : function(){
		},
		setMode : function(){
		},
		next : function(){
		},
		prev : function(){
		},
		showList : function(){
		}
/*		hide : function(){
		}
		close : function(){
		}*/
	}).namespace(Using.Modules);
	
	
	var music = new Using.Modules.MusicPlugin();
	music.initialize();
});