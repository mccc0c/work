;
(function() {
	//ie8没有console.log()
	//使用严格模式之后 this 关键字不允许指向全局对象
	/*if (typeof console == "undefined" || typeof console.log == "undefined") {
		var console = {
	    	log: function() {}
		};
	}*/
	'use strict';
	var Treencity = function(el, opts, callback) {
		var self = this;
		var defaults = {
			dataUrl: './data/city.json', //数据库地址
			/*provinceField:'province', //省份字段名
			cityField:'city',         //城市字段名
			areaField:'area',         //地区字段名*/
			province: '', //省份名称
			city: '', //城市名称
			area: '', //地区名称
			required: false, //是否必须选一个
			/*nodata: 'hidden', //当无数据时的表现形式:'hidden'隐藏,'disabled'禁用,为空不做任何处理*/
			onChange: function() {} //地区切换时触发,回调函数传入地区数据
		};
		opts = opts || {};
		callback = callback || function() {};
		for (var w in defaults) {
			if ("undefined" == typeof opts[w]) {
				opts[w] = defaults[w];
			}
		}
		this.options = opts;
		this.container = r(el);
		if (this.container.length > 1) {
			var x = [];
			return this.container.each(function() {
				x.push(new Treencity(this,opts,callback));
			});
		}
		this.$province = self.container.find('.trprovice')[0];
		this.$city = self.container.find('.trcity')[0];
		this.$area = self.container.find('.trdistrict')[0];
		this.proviceD = [];
		this.cityD = [];
		this.areaD = [];
		var request = new XMLHttpRequest();
		request.open("GET", self.options.dataUrl, true);
		request.send();
		request.onreadystatechange = function() {
			if (request.readyState === 4) {
				if (request.status === 200) {
					self.data = JSON.parse(request.responseText);
					// console.log(c.data);
					self.init();
				} else {
					alert("发生错误：" + request.status);
				}
			}
		};
		callback(self);
	};
	/*{
			"name":"省",
			"city":[{
				"name":"市",
				"area":["区"]
			}]
		},*/
	Treencity.prototype = {
		init: function() {
			var self = this;
			self.updataData();
			self.provie_build();
			self.bindChangeEvent();
		},
		bindChangeEvent: function() {
			var self = this;
			this.$province.onchange = function() {
				self.options.province = self.$province.value;
				self.options.city = "";
				self.options.area = "";
				self.cityD = [];
				self.areaD = [];
				self.updataData();
				self.city_build();
				self.options.onChange(self.getValue());
			};
			this.$city.onchange = function() {
				self.options.city = self.$city.value;
				self.options.area = "";

				self.areaD = [];
				self.updataData();
				self.area_bulid();
				self.options.onChange(self.getValue());
			};
			this.$area.onchange = function() {
				self.options.area = self.$area.value;
				self.options.onChange(self.getValue());
			};
		},
		updataData: function() {
			var self = this;
			for (var i = 0; i < self.data.length; i++) {
				self.proviceD[i] = self.data[i].name;
				for (var j = 0; j < self.data[i].city.length; j++) {
					var selePro = self.options.province;
					if (selePro === self.data[i].name) {
						self.cityD[j] = self.data[i].city[j].name;
					}
					for (var z = 0; z < self.data[i].city[j].area.length; z++) {
						var seleCity = self.options.city;
						if (seleCity === self.data[i].city[j].name) {
							self.areaD[z] = self.data[i].city[j].area[z];
						}
					}
				}
			}
		},
		provie_build: function() {
			var self = this;
			emptys(self.$province); //self.provice.innerHTML = "";
			self.optionFac(self.proviceD, self.$province);
			if (self.options.province) {
				self.$province.value = self.options.province; //(self.options.province);
			}
			this.city_build();
		},
		city_build: function() {
			var self = this;
			emptys(self.$city); //self.city.innerHTML = "";
			self.optionFac(self.cityD, self.$city);
			if (self.options.city) {
				self.$city.value = self.options.city; //(self.options.province);
			}
			this.area_bulid();
		},
		area_bulid: function() {
			var self = this;
			emptys(self.$area); //self.area.innerHTML = "";			
			self.optionFac(self.areaD, self.$area);
			if (self.options.area) {
				self.$area.value = self.options.area; //(self.options.province);
			}
		},
		optionFac: function(data, pObj) {
			var self = this;
			self.formatFirstOption(pObj);
			var option;
			for (var i = 0; i < data.length; i++) {
				option = document.createElement("option");
				option.value = data[i];
				option.text = data[i];
				pObj.appendChild(option);
			}
			option = null;
		},
		formatFirstOption: function(pObj) {
			var self = this;
			if (!self.options.required) {
				var option;
				option = document.createElement("option");
				option.text = '请选择';
				pObj.appendChild(option);
				option = null;
			}

		},
		getValue: function(valuetype) {
			var self = this;
			valuetype = valuetype || 'json';
			var proviince_val = self.$province.value,
				city_val = self.$city.value,
				area_val = self.$area.value;
			if (valuetype === "json") {
				return { "province": proviince_val, "city": city_val, "area": area_val };
			} else {
				return {};
			}
		}
	};
	var r = (function() {
		var e = function(e) {
			var a = this,
				t = 0;
			for (t = 0; t < e.length; t++) {
				a[t] = e[t];
			}
			return a.length = e.length, this
		};
		e.prototype = {
			addClass: function(e) {
				if ("undefined" == typeof e) return this;
				for (var a = e.split(" "), t = 0; t < a.length; t++)
					for (var r = 0; r < this.length; r++) this[r].classList.add(a[t]);
				return this
			},
			each: function(e) {
				for (var a = 0; a < this.length; a++) e.call(this[a], a, this[a]);
				return this
			},
			html: function(e) {
				if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;
				for (var a = 0; a < this.length; a++) this[a].innerHTML = e;
				return this
			},
			find: function(a) {
				for (var t = [], r = 0; r < this.length; r++)
					for (var i = this[r].querySelectorAll(a), s = 0; s < i.length; s++) t.push(i[s]);
				return new e(t)
			},
			append: function(a) {
				var t, r;
				for (t = 0; t < this.length; t++)
					if ("string" == typeof a) {
						var i = document.createElement("div");
						for (i.innerHTML = a; i.firstChild;) this[t].appendChild(i.firstChild)
					} else if (a instanceof e)
					for (r = 0; r < a.length; r++) this[t].appendChild(a[r]);
				else this[t].appendChild(a);
				return this
			},
		}
		var a = function(a, t) {
			var r = [],
				i = 0;
			if (a && !t && a instanceof e) {
				return a;
			}
			if (a) {
				if ("string" == typeof a) {
					var s, n, o = a.trim();
					if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
						var l = "div";
						for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = a, i = 0; i < n.childNodes.length; i++) r.push(n.childNodes[i])
					} else
						for (s = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [document.getElementById(a.split("#")[1])], i = 0; i < s.length; i++) s[i] && r.push(s[i])
				} else if (a.nodeType || a === window || a === document) {
					r.push(a);
				} else if (a.length > 0 && a[0].nodeType) {
					for (i = 0; i < a.length; i++) {
						r.push(a[i]);
					}
				}
			}
			return new e(r)
		};
		return a;
	}())
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	}
	//清空元素
	function emptys(selector) {
		while (selector.firstChild) {
			selector.removeChild(selector.firstChild);
		}
	}
	window.Treencity = Treencity;
}(window));