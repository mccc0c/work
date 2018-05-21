(function() {
	/*//反转字符串
	var s = 'abc123';
	var sreverse = s.split('').reverse().join('');
	console.log(s, sreverse);*/

	/*//打平嵌套数组,最好不要在原数组上修改
	var s = [1,[2,3,[5,'sds']],4];
	function flatten(arr){
		for(var i=0;i<arr.length;i++){
			if(Array.isArray(arr[i])){
				arr.splice(i,1,...flatten(arr[i]));
			}
		}
		return arr;
	}	
	function flatten2(t,arr){
		for(var i=0;i<arr.length;i++){
			if(Array.isArray(arr[i])){
				flatten2(t,arr[i]);
			}else{
				t.push(arr[i]);
			}
		}
		return t;
	} 
	console.log(s,flatten2([],s));*/
	/*//factorial
	function factorial(n,total){
		if(n===1) return total;
		else return factorial(n-1,n*total);
	}
	console.log(factorial(5,1));//5!=5*4*3*2*1=120*/

	/*//数组全排列
	var s = [1,2,3]; //[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
	var b = [];
	function allRange(arr, path, res) {
		if (!arr.length) {
			res.push(path)
			return
		}
		arr.forEach((v, idx) => {
			const t = arr.slice();
			const p = path.slice();
			console.log("==="+p);
			t.splice(idx, 1);
			p.push(v);
			console.log(p,t);
			allRange(t, p, res);
		});
	}
	allRange(s, [], b);
	console.log(b);*/

	/*//查找有序数组中最小相同元素，用游标
	var s =[1,2,5,9,10],
	s1 = [3,4,6,8,11];
	function findMixSameNum(arr1,arr2){
		var i=j=0;
		while(i<arr1.length||j<arr2.length){
			if(arr1[i] === arr2[j]){
				return arr1[i];
			}else if(arr1[i]<arr2[j]){
				i++;
			}else{
				j++;
			}
		}
		return -1;
	}
	console.log(findMixSameNum(s,s1));*/
	/*//去重
	var s = [1, "1", NaN, 2, NaN, "aaa", 2, 'aaa', 2, undefined, undefined, 5, null, null, 4, 2];

	function removeSame(arr) {
		//return [...new Set(s)]
		var a = [],
			o = {};
		for (var i = 0; i < arr.length; i++) {
			if (!o[arr[i]]) {
				o[arr[i]] = true;
				a.push(arr[i]);
			}
		}
		return a;
	}
	console.log(removeSame(s));
	console.log([...new Set(s)]);*/
	//编写一个js函数fn，该函数有一个参数n（数字类型），其返回值是一个数组，该数组内是n个随机且不重复的整数，且整数取值范围是[2,32]。
	/*function randNum(n){
		var list = [],o={};
		for(var i=0;i<n;i++){
			var s = Math.random();
			s = Math.floor(s*30+2);//向下取整
			if(!o[s]){
				o[s]=true;
				list.push(s);
			}else{
				i--;
			}
		}
		o=null;
		return list;
	}
	console.log(randNum(10));*/
	/*//杨辉三角 第n行输出
	function yhTri(n){
		var arr =[];				
		for(var i=0;i<n;i++){
			arr[i] = [];
			arr[i][0] = 1;
			arr[i][i] = 1;
		}
		for(var j=2;j<n;j++){
			for(var z =1;z<j;z++){
				arr[j][z] = arr[j-1][z-1]+arr[j-1][z];
			}
		}
		return arr[n-1].join(' ');
	}
	console.log(yhTri(1));*/
}(window));

(function() {

	var Beautifier = function(ele, opt) {
		this.$element = ele;
		this.default = {
			'color': 'red',
			'fontSize': '12px',
			'textDecoration': 'none',
			'word':'success'
		};
		this.option = {};
		for (var key in this.default) {
			if (!opt[key]) { 
				this.option[key] = this.default[key] 
			} else {
				this.option[key] = opt[key];
			}
		}
	};
	Beautifier.prototype = {
		constructor: Beautifier,
		beautify: function() {
			this.$element.style.cssText = "color:" + this.option["color"]+";font-size:"+this.option["fontSize"]+";text-decoration:"+this.option["textDecoration"];
			return this;
		},
		sayHello:function(){
			var p = document.createElement('span');
			p.innerHTML = this.option["word"];
			document.querySelector('.wrapper').insertBefore(p,this.$element);
			return this;
		}
	};
	window.Beautifier = Beautifier;

})(window)