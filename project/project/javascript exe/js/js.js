var clone = function(option) {
	var o;
	if (typeof option == "object") {
		if (option == null) {
			o = null;
		} else if (option instanceof Array) {
			// console.log('arr***');
			o = [];
			for (var i = 0; i < option.length; i++) {
				o.push(arguments.callee(option[i]));
				// console.log(o[i]);
			}
			// console.log('arr---');
		} else {
			// console.log('obj***');
			o = {};
			for (var obj in option) {
				o[obj] = arguments.callee(option[obj]);
				// console.log(o[obj]);
			}
			// console.log('obj---');
		}
	} else {
		o = option;
	}
	return o;
};

function compare(val1, val2, flag) {
	var flagVal = "asc"; //递增
	if (flag) { flagVal = "desc"; } //递减
	/*if (val1 < val2) {
		return -1
	} else if (val1 > val2) {
		return 1
	} else {
		return 0;
	}*/
	return flagVal === "asc" ? val1.localeCompare(val2) : val2.localeCompare(val1);
	// return val1-val2;//递增排序,返回正数1则互换位置
	//localeCompare() 例如a.localeCompare(b)，可用于比较中文排序
}

function compareWithName(propertyname, sortflag) {
	return function(obj1, obj2) {
		var val1, val2;
		if (propertyname) {
			val1 = obj1[propertyname];
			val2 = obj2[propertyname];
		} else {
			val1 = obj1;
			val2 = obj2;
		}

		return compare.apply(this, [val1, val2, sortflag]);
		/*if (val1 < val2) {
			return -1
		} else if (val1 > val2) {
			return 1
		} else {
			return 0;
		}*/
	};
}
//工厂模式
//无法解决对象识别问题
function createPerson(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function() {
		return this.name;
	};
	return o;
}
//构造函数
//每个方法在每个实例化上都要创建一遍
//可将sayName方法写在全局，通过指针调用改方法，但是全局方法只能特定对象调用，且失去封装性
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function() { //其实是this.name = new Function(){}
		return this.name;
	};
}
//原型模式
function PersonTo() {

}
/*PersonTo.prototype.name = "Nick";
PersonTo.prototype.age = 22;
PersonTo.prototype.job = 'Engineer';
PersonTo.prototype.sayName = function () {
	return this.name;
};*/
PersonTo.prototype = {
	constructor: PersonTo,
	name: 'Nick',
	age: 23,
	job: 'Engineer',
	sayName: function() {
		return this.name;
	}
};
Object.defineProperty(PersonTo.prototype, 'constructor', {
	enumerable: false,
	value: PersonTo
});

//继承
function SuperType() {
	this.superFlag = true;
	this.color = ['red','blue'];
}
SuperType.prototype.saySuperFlag = function() {
	console.log(this.superFlag);
};

function SubType() {
	this.subcolor = ['red','blue'];
	this.subFlag = false;
	SuperType.call(this);
}
SubType.prototype = new SuperType();
/*SubType.prototype = {};*/
SubType.prototype.saySubFlag = function() {
	console.log(this.subFlag);
};
//判断类型
function checkObj(obj) {
	var getType = Object.prototype.toString;
	return getType.call(obj).slice(7, -1);
}

function checkObjIs() {
	var getType = Object.prototype.toString;
	var s = {
		isObj: function(o) {
			return getType.call(o) == '[object Object]';
		},
		isArray: function(o) {
			return getType.call(o) == '[object Array]';
		},
		isNULL: function(o) {
			return gettype.call(o) == "[object Null]";
		},
		isDocument: function(o) {
			return gettype.call(o) == "[object Document]" || "[object HTMLDocument]";
		}
	};
	return s;
}