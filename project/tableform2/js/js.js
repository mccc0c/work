var isChecked = [],
    $$ = function(id) {
        return document.getElementById(id);
    },
    container = $$('example'),
    exampleConsole = $$('example1console'),
    autosave = $$('autosave'),
    // load = $$('load'),
    save = $$('save'),
    autosaveNotification,
    hot;
var hotOption = {
    rowHeaders: false,
    afterChange: function(change, source) {
        if (source === 'loadData') {
            return; //don't save this change
        }
        if (!autosave.checked) {
            return;
        };
        clearTimeout(autosaveNotification);
        $.ajax({
            type: "get",
            url: "scripts/json/save.json",
            success: function(data) {
                exampleConsole.innerText = 'Autosaved (' + change.length + ' ' + 'cell' + (change.length > 1 ? 's' : '') + ')';
                autosaveNotification = setTimeout(function() {
                    localStorage['data'] = JSON.stringify(hot.getData());
                    exampleConsole.innerText = 'Changes will be autosaved';
                }, 1000);
            }
        });
    },
    cells: function(row, col, prop) {
        this.renderer = customRenderer;
    },
    contextMenu: {
        callback: function(key, options) {
            var x = options.end.row;
            var y = options.end.col;
            var a = [x, y];
            if (key === 'clear') {
                //rowUnchecked.push(a);
                hot.setDataAtCell(x, y, '');
            };
            if (key === 'add') {
                //rowUnchecked.remove(a);
                hot.setDataAtCell(x, y, "input");
            };
            hot.render();
        },
        items: {
            "add": { name: 'add input' },
            "clear": { name: 'clear' },
            "hsep0": "---------",
            "row_above": {},
            "row_below": {},
            "hsep1": "---------",
            "col_left": {},
            "col_right": {},
            "hsep2": "---------",
            "remove_row": {},
            "remove_col": {}
            /*,
                        "hsep3": "---------",
                        "undo": {},
                        "redo": {},
                        "hsep4": "---------",
                        "make_read_only": {},
                        "hsep5": "---------",
                        "alignment": {},
                        "hsep6": "---------",
                        "copy": {},
                        "cut": {}*/
        }
    }
};

if (localStorage['data']) {
    console.log(hot);
    if (hot) { hot.destroy() }
    hot = new Handsontable(container, hotOption);
    var data = JSON.parse(localStorage['data']);
    // getData(data);
    hot.loadData(data);
    hot.render();
    hot.updateSettings({
        colHeaders: function(col) {
            var txt = "";
            if (col > 0) {
                txt = "<input type='checkbox' class='checker' ";
                txt += isChecked[col] ? 'checked="checked"' : '';
                txt += "> 输入框";
            };
            return txt;
        }
    })
    // hot.setDataAtCell(0, 0, '报表名称');
}
$.ajax({
    url: 'js/data.json',
    type: 'get',
    dataType: 'json',
    success: function(res) {
        if (hot) { hot.destroy() }
        getData(res);
        hot = new Handsontable(container, hotOption);
        var rows = res.report_row;
        var cols = res.report_col;
        var odata = res.columns;
        var readcell = [];
        var data = [];
        //console.log(res.columns);
        for (var i = 0; i < rows; i++) {
            var a = [];
            for (var j = 0; j < cols; j++) {
                var m = i * cols + j;
                a.push(odata[m].content);
            };
            data.push(a);
        }
        // console.log(data);
        hot.loadData(data);
        // hot.setDataAtCell(0, 0, '报表名称');
        /*hot.updateSettings({
            cells: function(row, col, prop) {
                this.renderer = customRenderer;
                var cellProperties = {};
                if (hot.getSourceData()[row][prop] !== 'input') {
                    cellProperties.readOnly = true;
                } else {
                    cellProperties.readOnly = false;
                };

                return cellProperties;
            },
            contextMenu: false,
            colHeaders: false,
        });*/
        hot.updateSettings({
            colHeaders: function(col) {
                var txt = "";
                if (col > 0) {
                    txt = "<input type='checkbox' class='checker' ";
                    txt += isChecked[col] ? 'checked="checked"' : '';
                    txt += "> 输入框";
                };
                return txt;
            }
        })

        exampleConsole.innerText = 'Data loaded';
    }
});
/*$.ajax({
    type: 'GET',
    url: '../s/data.json',
    success: function(data) {
        hot = new Handsontable(container, hotOption);
        hot.loadData(data);
        hot.render();
        hot.updateSettings({
            colHeaders: function(col) {
                var txt = "";
                if (col > 0) {
                    txt = "<input type='checkbox' class='checker' ";
                    txt += isChecked[col] ? 'checked="checked"' : '';
                    txt += "> 输入框";
                };
                return txt;
            }
        })
        hot.setDataAtCell(0, 0, '报表名称');
        hot.loadData(data.data);
        exampleConsole.innerText = 'Data loaded';
    }
})*/



/*$(document).on('click', '.myinput', function(e) {
    var s = hot.getSelected();
    hot.updateSettings({
        cells: function(row, col, prop) {
            this.renderer = customRenderer;

            var cellProperties = {};

            if (row == s[0] && col == s[1]) {
                cellProperties.readOnly = false;
            };

            return cellProperties;
        },
        contextMenu: false,
        colHeaders: false,
    });
    e.stopPropagation();
    return false;
});*/
$(document).on('click', '.createTable', function(e) {
    createTable();
});
Handsontable.dom.addEvent(container, 'mousedown', function(event) {
    if (event.target.nodeName == 'INPUT' && event.target.className == 'checker') {
        event.stopPropagation();
    }
});
Handsontable.dom.addEvent(container, 'mouseup', function(event) {
    if (event.target.nodeName == 'INPUT' && event.target.className == 'checker') {
        var s = hot.getSelected();
        isChecked[s[1]] = !event.target.checked;
        var myinput = [];
        var val = "";
        if (isChecked[s[1]]) {
            val = 'input';
        };
        for (var i = 1; i <= s[2]; i++) {
            myinput.push([i, s[1], val]);
        };
        hot.setDataAtCell(myinput);
        localStorage['data'] = JSON.stringify(hot.getData());
        hot.render();
    }
});

function customRenderer(instance, td, row, col, prop, value, cellProperties) {
    var that = this;
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    if (value == 'input') {
        $(td).html("<input type='text' class='myinput' readOnly>");
        cellProperties.readOnly = true;
        return cellProperties;
    };
}

/*Handsontable.dom.addEvent(load, 'click', function() {
    ajax('js/data.json', 'GET', '', function(res) {
        var data = JSON.parse(res.response);
        hot.loadData(data.data);
        exampleConsole.innerText = 'Data loaded';
    });
});*/

Handsontable.dom.addEvent(save, 'click', function() {
    // save all cell's data
    var data = hot.getData();
    var d = {};
    d.report_title = $('#report_title').val();
    d.interfaceUrl = $('#interfaceUrl').val();
    if ($('#needCheck').attr('checked') == "checked") {
        d.needCheck = 1;
    } else {
        d.needCheck = 0;
    }
    d.report_row = data.length;
    d.report_col = data[0].length;
    d.columns = [];

    //console.log(data);
    for (var i = 0; i < d.report_row; i++) {
        for (var j = 0; j < d.report_col; j++) {
            var a = {};
            a.id = i * d.report_col + j;
            if (data[i][j] == 'input') {
                a.type = "input"
            } else {
                a.type = "str"
            };
            a.row = i;
            a.col = j;
            a.content = data[i][j];
            d.columns.push(a);
        }
    };
    console.log(JSON.stringify(d));
    $.ajax({
        type: 'POST',
        url: '/dynamicReport/reportCreate',
        data: JSON.stringify(d),
        contentType: "application/json;  charset=utf-8",
        success: function(r) {
            if (r.code == 200) {
                localStorage.removeItem('data');
                alert("提交成功");
            } else {
                alert("提交失败");
            }
        }
    });

});
$('#needCheck').click(function() {
    var el = $(this);
    if (el.attr('checked')) {
        el.attr('checked', false)
    } else {
        el.attr('checked', 'checked');
    }
})
Handsontable.dom.addEvent(autosave, 'click', function() {
    if (autosave.checked) {
        exampleConsole.innerText = 'Changes will be autosaved';
    } else {
        exampleConsole.innerText = 'Changes will not be autosaved';
    }
});

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function createTable() {
    var rowValue = $('#a').val(),
        colValue = $('#b').val();
    // if(!rowValue||!colValue){return;}
    var options = {
        rowHeaders: false,
        afterChange: function(change, source) {
            if (source === 'loadData') {
                return; //don't save this change
            }
            if (!autosave.checked) {
                return;
            };
            clearTimeout(autosaveNotification);
            $.ajax({
                type: "get",
                url: "scripts/json/save.json",
                success: function(data) {
                    exampleConsole.innerText = 'Autosaved (' + change.length + ' ' + 'cell' + (change.length > 1 ? 's' : '') + ')';
                    autosaveNotification = setTimeout(function() {
                        localStorage['data'] = JSON.stringify(hot.getData());
                        exampleConsole.innerText = 'Changes will be autosaved';
                    }, 1000);
                }
            });
            /*ajax('', 'GET', JSON.stringify({ data: change }), function(data) {
                exampleConsole.innerText = 'Autosaved (' + change.length + ' ' + 'cell' + (change.length > 1 ? 's' : '') + ')';
                autosaveNotification = setTimeout(function() {
                    localStorage['data'] = JSON.stringify(hot.getData());
                    exampleConsole.innerText = 'Changes will be autosaved';
                }, 1000);
            });*/
        },
        cells: function(row, col, prop) {
            this.renderer = customRenderer;
        },
        contextMenu: {
            callback: function(key, options) {
                var x = options.end.row;
                var y = options.end.col;
                var a = [x, y];
                if (key === 'clear') {
                    //rowUnchecked.push(a);
                    hot.setDataAtCell(x, y, '');
                };
                if (key === 'add') {
                    //rowUnchecked.remove(a);
                    hot.setDataAtCell(x, y, "input");
                };
                hot.render();
            },
            items: {
                "add": { name: 'add input' },
                "clear": { name: 'clear' },
                "hsep0": "---------",
                "row_above": {},
                "row_below": {},
                "hsep1": "---------",
                "col_left": {},
                "col_right": {},
                "hsep2": "---------",
                "remove_row": {},
                "remove_col": {}
                /*,
                            "hsep3": "---------",
                            "undo": {},
                            "redo": {},
                            "hsep4": "---------",
                            "make_read_only": {},
                            "hsep5": "---------",
                            "alignment": {},
                            "hsep6": "---------",
                            "copy": {},
                            "cut": {}*/
            }
        }
    };
    options.startRows = rowValue;
    options.startCols = colValue;
    if (hot) { hot.destroy(); }
    hot = new Handsontable(container, options);
    hot.updateSettings({
        colHeaders: function(col) {
            var txt = "";
            if (col > 0) {
                txt = "<input type='checkbox' class='checker' ";
                txt += isChecked[col] ? 'checked="checked"' : '';
                txt += "> 输入框";
            };
            return txt;
        }
    })
    // hot.render();
    // hot.setDataAtCell(0, 0, '报表名称');
}

function getData(data) {
    $('#report_title').val(data.report_title);
    $('#interfaceUrl').val(data.interfaceUrl);
    if (data.needCheck == 1) { 
        $('#needCheck').attr('checked', 'checked') 
    } else {
        $('#needCheck').attr('checked', false);
    };
    $("#a").val(data.report_row);
    $("#b").val(data.report_col);
}
/*{
  "id": 1,
  "report_title": "嘉兴利润表",
  "report_row": 39,
  "report_col": 8,
  "columns": [{
    "id": 1,
    "type": "str",
    "row": 1,
    "col": 1,
    "content": "资产"
  }, {
    "id": 2,
    "type": "input",
    "row": 1,
    "col": 2,
    "content": "col1_1"
  }]
}


[["","Kia","aff","Toyota","Honda","Mazda","Ford"],["飞","input","反倒是",12,13,15,16],["飞","input","input","input","13",15,16],["2014","input","input",12,13,15,16],["2015","input","input",12,13,15,16],["2016","input","input",12,13,15,16]]*/