//----工具类 开始----
var utl = {};
utl.Binary = {
	fixdata(data) { //文件流转BinaryString
		var o = "",
			l = 0,
			w = 10240;
		for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
		o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
		return o;
	},
	s2ab(s) { //字符串转字符流
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
}
utl.XLSX = {
	wb: null,
	rABS: false,
	import (f, c) { //导入根据文件
		this.wb = null;
		var reader = new FileReader();
		reader.onload = function(e) {
			var data = e.target.result;
			if (utl.XLSX.rABS) {
				utl.XLSX.wb = XLSX.read(btoa(utl.Binary.fixdata(data)), { //手动转化
					type: 'base64'
				});
			} else {
				utl.XLSX.wb = XLSX.read(data, {
					type: 'binary'
				});
			}
			if (c && typeof(c)) {
				c();
			}
		};
		if (utl.XLSX.rABS) {
			reader.readAsArrayBuffer(f);
		} else {
			reader.readAsBinaryString(f);
		}
	},
	onImport(obj, c) { //导入根据 input file标签
		if (!obj.files) {
			return;
		}
		this.import(obj.files[0], c);
	},
	getSheetsByIndex(index = 0) { //获取数据根据Sheets索引
		return XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[index]]);
	},
	getCharCol(n) {
		let temCol = '',
			s = '',
			m = 0
		while (n > 0) {
			m = n % 26 + 1
			s = String.fromCharCode(m + 64) + s
			n = (n - m) / 26
		}
		return s
	},
	export (json, title, type) { //导出
		var keyMap = []; //获取keys
		for (k in json[0]) {
			keyMap.push(k);
		}
		var tmpdata = []; //用来保存转换好的json 
		json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
			v: v[k],
			position: (j > 25 ? utl.XLSX.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
		}))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
			v: v.v
		});
		var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
		var tmpWB = new Object();
		title = title ? title : "mySheet";
		tmpWB.SheetNames = [title];
		tmpWB.Sheets = {};
		tmpWB.Sheets[title] = Object.assign({}, tmpdata, //内容
			{
				'!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
			});
		return new Blob([utl.Binary.s2ab(XLSX.write(tmpWB, { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' } //这里的数据是用来定义导出的格式类型
		))], { type: "" }); //创建二进制对象写入转换好的字节流
	},
	onExport(json, title, type) { //直接下载
		utl.Download.byObj(this.export(json, title, type), "下载.xlsx");
	}
};
utl.Download = {
	byURL(url, fileName) { //动态下载
		var tmpa = document.createElement("a");
		tmpa.download = fileName || "下载";
		tmpa.href = url; //绑定a标签
		tmpa.click(); //模拟点击实现下载
	},
	byObj(obj, fileName) { //内存二进制数据下载
		this.byURL(URL.createObjectURL(obj), fileName);
		setTimeout(function() { //延时释放
			URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
		}, 100);
	}
}
utl.Object = {
	reverse(obj) { //对象键值倒转
		var o = new Object();
		for (var k in obj) {
			o[obj[k]] = k;
		}
		return o;
	},
	deepCopy() { //深拷贝
		let temp = obj.constructor === Array ? [] : {}
		for (let val in obj) {
			temp[val] = typeof obj[val] == 'object' ? deepCopy(obj[val]) : obj[val];
		}
		return temp;
	},
	copyJson(o) { return JSON.parse(JSON.stringify(o)); } //拷贝JSON格式
}
//----工具类 结束----

//----handsontable 初始化 开始------

var hotElement = document.querySelector('#hot'); //<====绑定handsontable初始化div 
var colHeaders = []; //<===handsontable列头显示值
var cols = []; //<====handsontable列头显示值对应的实际字段与其他配置
var hot;
/*for (var key in xHred) {
	cols.push({ data: xHred[key] });
	colHeaders.push(key);
}*/
/*var hotSettings = { //<====handsontable的配置
	startRows: 8,
	startCols: 6,
	colHeaders: colHeaders, //当值为true时显示列头，当值为数组时，列头为数组的值
	// data: [], //数据源
	columns: cols, //列具体配置 
	// width: 906,
	autoWrapRow: true,
	// height: 641,
	// maxRows: 22,
	minRows: 1,
	// currentRowClassName：当前行样式的名称,
	// currentColClassName：当前列样式的名称,
	manualColumnResize: true, //当值为true时，允许拖动，当为false时禁止拖动
	manualRowResize: true, //当值为true时，允许拖动，当为false时禁止拖动
	stretchH: "all", //last:延伸最后一列,all:延伸所有列,none默认不延伸。
	manualColumnMove: true, // 当值为true时，列可拖拽移动到指定列
	manualRowMove: true, // 当值为true时，行可拖拽至指定行
	rowHeaders: true, //当值为true时显示行头，当值为数组时，行头为数组的值
	columnSorting: true, //允许排序
	sortIndicator: true,
	contextMenu: true, //显示右键菜单
	autoColumnSize: true //当值为true且列宽未设置时，自适应列大小
	
};*/
var MyRenderer = function(instance, td, row, col, prop, value, cellProperties) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);
	console.log(value);
	if (row != 0) {//新建每行都是input
		if (value === null||value === ""||value=="input"){$(td).html("<input type='text' value='' readOnly/>");};
		
	}
	// console.log(cellProperties)
	// if(cellProperties.noInput === "0"){
	// 	$(td).html("");
	// }else{
	// 	$(td).html("<input type='text' value='' readOnly/>");
	// }
};
var hotSettings = {
	// startRows: 8,
	// startCols: 6,
	rowHeaders: true,
	// colHeaders: colHeaders,
	colHeaders: function(col, value) {
		var txt = "";
		if (col > 0) {
			txt = "<input type='checkbox' class='checker'>设置该列为输入框";
		};
		return txt;
	},
	contextMenu: true, //显示右键菜单
	/*afterChange: function(change, source) {
		if (source === 'loadData') {
			return; //don't save this change
		}
		if (!autosave.checked) {
			return;
		}
		clearTimeout(autosaveNotification);
		ajax('scripts/json/save.json', 'GET', JSON.stringify({ data: change }), function(data) {
			exampleConsole.innerText = 'Autosaved (' + change.length + ' ' + 'cell' + (change.length > 1 ? 's' : '') + ')';
			autosaveNotification = setTimeout(function() {
				exampleConsole.innerText = 'Changes will be autosaved';
			}, 1000);
		});
	},*/
	cells: function(row, col, prop) {
		var cellProperties = {};
		/*if (row === 0 || this.instance.getData()[row][col] === 'readOnly') {
			cellProperties.readOnly = true;
		}*/
		/*if (row === 0) {  
		   cellProperties.renderer = firstRowRenderer;//调用首行渲染方法   
		}  
		else {*/
		if (row != 0) {
			cellProperties.renderer = MyRenderer; //调用自定义渲染方法 
		}

		/*} */
		return cellProperties;
	}
}
hot = new Handsontable(hotElement, hotSettings);
/*hot.updateSettings({
	contextMenu: {
		callback: function(key, options) {
			if (key === 'about') {
				setTimeout(function() {
					// timeout is used to make sure the menu collapsed before alert is shown
					alert("This is a context menu with default and custom options mixed");
				}, 100);
				
				// hot.setDataAtCell(selectrow,selectcolumn,"");
				hot.setCellMeta(selectrow,selectcolumn,'noInput',1);
				// hot.render();
				// [selectrow][selectcolumn].getCellEditor("你想往div里追加的html代码");
				
			}
		},
		items: {
			"row_above": {
				disabled: function() {
					// if first row, disable this option
					return hot.getSelected()[0] === 0;
				}
			},
			"row_below": {},
			"hsep1": "---------",
			"remove_row": {
				name: 'Remove this row, ok?',
				disabled: function() {
					// if first row, disable this option
					return hot.getSelected()[0] === 0
				}
			},
			"hsep2": "---------",
			"about": {
				name: '删除输入框',
				disabled: function() {
					// if first row, disable this option
					selectrow = hot.getSelected()[0]; //表示获取选中的某一行  
					selectcolumn = hot.getSelected()[1]; //表示获取选中的某一行中的某一行的单元格地址

					return hot.getSelected()[0] === 0
				}
			}
		}
	}
})*/
$('.createTable').click(function() {
	hot.destroy();
	var hotSettings = {
		startRows: 8,
		startCols: 6,
		rowHeaders: true,
		colHeaders: true,
		/*colHeaders: function(col, value) {
			var txt = "";
			if (col > 0) {
				txt = "<input type='checkbox' class='checker'>设置该列为输入框";
			};
			return txt;
		},*/
		contextMenu: true, //显示右键菜单
		/*afterChange: function(change, source) {
			if (source === 'loadData') {
				return; //don't save this change
			}
			if (!autosave.checked) {
				return;
			}
			clearTimeout(autosaveNotification);
			ajax('scripts/json/save.json', 'GET', JSON.stringify({ data: change }), function(data) {
				exampleConsole.innerText = 'Autosaved (' + change.length + ' ' + 'cell' + (change.length > 1 ? 's' : '') + ')';
				autosaveNotification = setTimeout(function() {
					exampleConsole.innerText = 'Changes will be autosaved';
				}, 1000);
			});
		},*/
		cells: function(row, col, prop) {
			var cellProperties = {};
			/*if (row === 0 || this.instance.getData()[row][col] === 'readOnly') {
				cellProperties.readOnly = true;
			}*/
			/*if (row === 0) {  
			   cellProperties.renderer = firstRowRenderer;//调用首行渲染方法   
			}  
			else {*/
			if (row != 0) {
				cellProperties.renderer = MyRenderer; //调用自定义渲染方法 
			}

			/*} */
			return cellProperties;
		}
	}
	hotSettings.startRows = $('input[name="rowNum"]').val();
	hotSettings.startCols = $('input[name="colNum"]').val();
	hot = new Handsontable(hotElement, hotSettings);
})

//----handsontable 初始化 完成------
$.ajax({
	url: 'load.json',
	type: 'get',
	success: function(r) {
		// var data = JSON.parse(r);	
		hot.loadData(r.data);

	}
})

$(document).on('click', '.checker', function(e) {
	if ($(this)[0].checked) {
		isChecked = true;
	};
	console.log(hot.getSelected());
	var sCol = hot.getSelected()[1];
	hot.updateSettings({
		cells: function(row, col, prop) {
			if (col === sCol && row > 0) {
				this.renderer = customRenderer;
				var cellProperties = {};
				cellProperties.readOnly = true;
			}
			return cellProperties;
		}
	})
	e.stopPropagation();

});

function customRenderer(instance, td) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);

	if (isChecked) {
		$(td).html("<input type='text' class='myinput'>");
	} else {
		td.style.backgroundColor = 'white';
	}

	return td;
}
/*var load = document.querySelector('#load');
Handsontable.dom.addEvent(load, 'click', function() {
	$.ajax({
		url: 'load.json',
		type: 'get',
		success: function(r) {
			// var data = JSON.parse(r);	
			hot.loadData(r.data);

		}
	})
});*/