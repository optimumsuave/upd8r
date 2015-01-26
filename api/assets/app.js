var ContentApp = ContentApp || {};



ContentApp.PostIcon = function(options){


}



ContentApp.PostIcon.prototype = {
	init: function(){
		var _this = this;
	}
}

ContentApp.Photos = function(options){
	if(typeof options.$project !== "undefined") {
		this.$project = options.$project;
		this.sources = [];
		if(options.photos) {
			this.sources = options.photos;
		}
		this.init();
	}
}
ContentApp.Photos.prototype = {
	init: function(){
		var _this = this;
		$("<h4>Gallery</h4>").appendTo(this.$project);
		this.$el = $("<div class='photos'></div>").appendTo(this.$project);
		this.$gallery = $("<div class='gallery'></div>").appendTo(this.$el);
		this.$controls = $("<div class='controls'><ul><li class='box'><form enctype='multipart/form-data' method='post'><input type='file' name='image_file' id='image_file'/></form></li><li class='upload'><i class='fa fa-upload'></i> Upload Photo</li></ul></div>").appendTo(this.$el);
		this.$form = this.$controls.find("form");
		this.$input = this.$controls.find(".box input");
		this.$upload = this.$controls.find("li.upload");
		this.$upload.click(function(){
			_this.uploadPhoto();
		});
		$("<div class='clearfix'></div>").appendTo(this.$el);
		if(this.sources.length) {
			this.renderGallery();
		}
	},
	uploadPhoto: function(){
		this.$upload.hide();
		console.log("Uploading?", this.$input[0].files.length);
		var _this = this;
		if(this.$input[0].files.length) {
			var form = new FormData();
			console.log(this.$input[0], this.$input[0].files);
			form.append('image_file', this.$input[0].files[0]);
			var photoAjax = $.ajax({
				url: "photo.php",
				type: "POST",
				data: form,
				contentType: false,
				cache: false,
				processData:false
			}).success(function(data){_this.photoUploaded(data)}).fail(function(){_this.photoUploadFail();});
		} else {
			_this.photoUploadFail();
		}
	},
	photoUploaded: function(data){
		console.log(data);
		var check = this.checkJson(data);
		if(check) {
			data = check;			
			if(typeof data.success !== "undefined") {
				ContentApp.Messenger.message("<i class='fa fa-check'></i> Uploaded image", "success");
				this.$form[0].reset();
				this.sources.push(data.image);
				this.renderGallery();
				this.$upload.show();
			} else {
				this.photoUploadFail();
			}
		} else {
			this.photoUploadFail();
		}
	},
	photoUploadFail: function(){
		this.$upload.show();
		ContentApp.Messenger.message("<i class='fa fa-warning'></i> Image not uploaded", "error");
	},
	renderGallery: function(){
		var _this = this;
		this.$gallery.empty();
		this.photos = [];
		if(this.sources.length) {
			for(var i=0;i<this.sources.length;i++){
				var imgwrap = $("<div class='photo'><div class='photo-controls'><div><i class='fa fa-chevron-left'></i></div><div><i class='fa fa-remove'></i></div><div><i class='fa fa-chevron-right'></i></div></div></div>");
				var img = $("<img>").attr("src", "photos/thumb_"+this.sources[i]).attr("alt", "Gallery Photo "+i).appendTo(imgwrap);
				photocontrols = imgwrap.find(".photo-controls");
				photocontrols.find("div").click(function(){
					var ind = $(this).index();
					var index = $(this).parent().parent().index();
					console.log(index);
					if(ind == 0) {
						//moveleft
						if(index > 0) {
							var tmp = _this.sources.splice(index, 1);
							_this.sources.splice(index-1, 0, tmp[0]);
							_this.renderGallery();
							// _this.photos[index].insertBefore(_thi.photos[index].prev()).hide().fadeIn(500);
						}
					}
					if(ind == 1) {
						//remove
						_this.photos[index].remove();
						_this.sources.splice(index, 1);
					}
					if(ind == 2) {
						if(index < _this.photos.length-1) {
							var tmp = _this.sources.splice(index, 1);
							_this.sources.splice(index+1, 0, tmp[0]);
							_this.renderGallery();
						}
						//moveright
					}
				});
				imgwrap.appendTo(this.$gallery);
				this.photos.push(imgwrap);
			}
		}
	},
	checkJson: function(string) {
		try {
	        var o = JSON.parse(string);
	        // Handle non-exception-throwing cases:
	        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
	        // but... JSON.parse(null) returns 'null', and typeof null === "object", 
	        // so we must check for that, too.
	        if (o && typeof o === "object" && o !== null) {
	            return o;
	        }
	    }
	    catch (e) { }
	    return false;
	},
	getMyData: function(){
		var data = [];
		if(this.sources.length) {
			for(var i=0;i<this.sources.length;i++){
				data.push(this.sources[i]);
			}
			return data;
		}

	}

}



ContentApp.Project = function(options){
	// console.log("Project");
	if(options.data) {
		this.title = options.data.title;
		this.subtitle = options.data.subtitle;
		this.descr = options.data.descr;
		this.icon = options.data.icon;
		this.timestamp = options.data.timestamp;
		if(options.data.photos) {
			this.photos = options.data.photos;
		} else {
			this.photos = [];
		}
	} else {
		this.title = "";
		this.subtitle = "";
		this.icon = "";
		this.descr = "";
		this.timestamp = "";
		this.photos = [];
	}
	this.section = options.section;
	this.$section = options.$section;
	this.init();
}
ContentApp.Project.prototype = {
	init: function(){
		var _this = this;
		this.$el = $("<div class='project'></div>").appendTo(this.$section.find(".projects"));
		this.$controls = $("<div class='controls'><ul><li class='moveup'><i class='fa fa-chevron-up'></i></li><li class='movedown'><i class='fa fa-chevron-down'></i></li><li class='remove'><i class='fa fa-remove'></i></li></ul></div>").appendTo(this.$el);
		this.$moveup = this.$controls.find(".moveup");
		this.$movedown = this.$controls.find(".movedown");
		this.$remove = this.$controls.find(".remove");
		this.$title = $("<h3>"+this.title+"</h3>").appendTo(this.$el);
		$("<b>Icon (i.e. fa-icon-shortcode)</b>").appendTo(this.$el);
		this.$icon = $("<span>"+this.icon+"</span>").appendTo(this.$el);
		$("<b>Subtitle</b>").appendTo(this.$el);
		this.$subtitle = $("<p>"+this.subtitle+"</p>").appendTo(this.$el);
		$("<b>Description</b>").appendTo(this.$el);
		this.$descr = $("<p>"+this.descr+"</p>").appendTo(this.$el);
		$("<b>Scheduled Post Time</b>").appendTo(this.$el);
		this.$timestamp = $("<p>"+this.timestamp+"</p>").appendTo(this.$el);
		this.$time = $("<p>"+moment(this.timestamp).toString()+"</p>").appendTo(this.$el);

		this.$photos = new ContentApp.Photos({$project: this.$el, photos: this.photos});

		this.$moveup.click(function(){
			_this.moveUp();
		});
		this.$movedown.click(function(){
			_this.moveDown();
		});
		this.$remove.click(function(){
			_this.removeMe();
		});

		this.$title.editable(function(value, settings) {
     		_this.title = value;
     		return value;
  		}, {
     		type    : 'text',
     		submit  : 'Save',
     		cancel  : 'Cancel',
     		placeholder : 'Click to edit title...'
 		});
 		this.$icon.editable(function(value, settings) {
     		_this.icon = value;
     		_this.$icon = value;

     		return value;
  		}, {
     		type    : 'text',
     		submit  : 'Save',
     		cancel  : 'Cancel',
     		placeholder : 'Click to edit font-awesome shortcode title...'
 		});
 		this.$subtitle.editable(function(value, settings) {
     		_this.subtitle = value;
     		return value;
  		}, {
     		type    : 'textarea',
     		submit  : 'Save',
     		cancel  : 'Cancel',
     		placeholder : 'Click to edit subtitle...'

 		});
 		this.$descr.editable(function(value, settings) {
     		_this.descr = value;
     		return value;
  		}, {
     		type    : 'textarea',
     		submit  : 'Save',
     		cancel  : 'Cancel',
     		placeholder : 'Click to edit description...'
 		});
 		this.$timestamp.editable(function(value, settings) {

     		_this.timestamp = moment(value).unix();
     		_this.$time.html(moment(value).toString());
			ContentApp.Messenger.message("<i class='fa fa-clock'></i> Using "+moment(value).unix(), "success");
     		return _this.timestamp;
  		}, {
     		type    : 'text',
     		submit  : 'Save',
     		cancel  : 'Cancel',
     		placeholder : 'Click to edit timestamp...'
 		});
	},
	getMyData: function(){
		if(this.title != "") { 
			var data = {title: this.title, icon: this.icon, subtitle: this.subtitle, descr: this.descr, timestamp: this.timestamp, photos: this.$photos.getMyData()};
			return data;
		}
	},
	removeMe: function(){
		this.section.removeMe(this);
	},
	moveDown: function(){
		this.section.moveMeDown(this);
	}, 
	moveUp: function(){
		this.section.moveMeUp(this);
	}
}

ContentApp.Section = function(options){
	this.name = options.name;
	this.data = options.data;
	this.projects = [];
	this.init();
}

ContentApp.Section.prototype = {
	init: function(){
		var _this = this;
		this.$el = $("<div class='section closed'><h2>"+this.name+"</h2></div>").appendTo(".sections");
		var len = 0;
		if(typeof this.data !== "undefined"){
			len = this.data.length;
		}
		this.$controls = $("<div class='controls'><ul><li class='total'><i class='fa fa-cubes'></i> <span>"+len+"</span> Posts</li><li class='add'><i class='fa fa-plus'></i> Add New Post</li></ul></div>").appendTo(this.$el);
		this.$total = this.$controls.find(".total").find("span"); 
		this.$addButton = this.$controls.find(".add"); 
		this.$addButton.on("click", function(){_this.addNew()});

		$("<div class='projects'></div>").appendTo(this.$el);
		this.$el.on("click", function(){_this.expandMe()});

		if(typeof this.data !== "undefined"){
			if(this.data.length > 0) {
				for(var j=0;j<this.data.length;j++) {
					var data = {};
					data.data = _this.data[j];
					data.section = _this;
					data.$section = _this.$el;
					var proj = new ContentApp.Project(data);
					this.projects.push(proj);
				}
			}
		}

	},
	addNew: function(){
		var data = {};
		data.section = this;
		data.$section = this.$el;
		var proj = new ContentApp.Project(data);

		$("body").animate({scrollTop: proj.$el.offset().top-100}, 500, function(){
			 proj.$el.fadeOut(500).fadeIn(500);
		});
		this.projects.push(proj);
		this.updateCount();
		console.log(this.projects, this.name);

	},
	updateCount: function(){
		var _this = this;
		this.$total.html(_this.projects.length);
	},
	expandMe: function(){
		var _this = this;
		this.$el.removeClass("closed");
		// console.log(this.el);
	},
	moveMeDown: function(who) {
		var index = $(who.$el).index();
		if(index < this.projects.length-1) {
			$(who.$el).insertAfter(who.$el.next()).hide().fadeIn(500);
			var tmp = this.projects.splice(index, 1);
			this.projects.splice(index+1, 0, tmp[0]);
		}

	},
	moveMeUp: function(who) {
		var index = $(who.$el).index();
		if(index > 0) {
			$(who.$el).insertBefore(who.$el.prev()).hide().fadeIn(500);
			var tmp = this.projects.splice(index, 1);
			this.projects.splice(index-1, 0, tmp[0]);
		}
	},
	removeMe: function(who) {
		var index = $(who.$el).index();
		if(index != -1) {
			$(who.$el).remove();
			var out = this.projects.splice(index, 1);
		}
	},
	getMyData: function(){
		if(this.projects.length > 0){
			var data = [];
			for(var i=0;i<this.projects.length;i++){
				data.push(this.projects[i].getMyData());
			}
			return data;
		}
	},
}







//==========| IMPORTANT

ContentApp.Modal = function(options){
	if(typeof this.modal !== "undefined") {
		return this.modal;
	} else {
		this.init();
	}
}
ContentApp.Modal.prototype = {
	modalTime: 2000,
	init: function(){
		this.$el = $("<div class='modal'></div>").appendTo("body");
	},
	message: function(data, type) {
		var _this = this;
		this.$el.removeClass("succes error warning");
		this.$el.addClass(type);
		this.$el.html(data).addClass("open");
		setTimeout(function(){
			_this.$el.removeClass("open");
			_this.$el.html("");
		}, _this.modalTime)
	}
};


ContentApp.App = function(options){

};
ContentApp.App.prototype = {
	sections: [],
	init: function(){
		var _this = this;
		this.mainJSON = this.getData("content");
		ContentApp.Messenger = new ContentApp.Modal();
		this.$save = $(".save");
		this.$save.on("click", function(){_this.compileData();});
	},
	getData: function(name){
		var _this = this;
		$.getJSON("json/"+name+".json", function(data){
			_this.parseData(data);
			ContentApp.Messenger.message("<i class='fa fa-check'></i> Loaded content.json", "success");
		}).fail(function(){
			ContentApp.Messenger.message("<i class='fa fa-exclamation-triangle'></i> Failed to retrieve content.json", "error");
		});
	},
	compileData: function(){
		var _this = this;
		this.$save.find("i").removeClass("fa-save").addClass("fa-refresh fa-spin");
		var finaldata = this.getMyData();
		var posted = this.saveData(finaldata);
		posted.success(function(){
			_this.savedData();
		});
	},
	parseData: function(data) {

		console.log(data);
		if(typeof data.data !== "undefined"){
			if(data.data.length > 0) {
				for(var i=0;i<data.data.length;i++){
					var section = new ContentApp.Section({name: data.data[i].name, data: data.data[i].data});
					this.sections.push(section);
				}
					// console.log(this.sections);
			}			
		}
	},
	getMyData: function(){
		if(this.sections.length > 0){
			var data = [];
			for(var i=0;i<this.sections.length;i++){
				data.push({name:this.sections[i].name, data: this.sections[i].getMyData()});
			}
			return {data: data};
		}
	},
	saveData: function(data) {
		return $.post("save.php", {json : JSON.stringify(data)});
	},
	savedData: function(){
		ContentApp.Messenger.message("<i class='fa fa-check'></i> Successfully saved content.json", "success");
		this.$save.find("i").removeClass("fa-refresh fa-spin").addClass("fa-save");
	}
};


$(document).ready(function(){	
	var contentApp = new ContentApp.App();
	contentApp.init();
});