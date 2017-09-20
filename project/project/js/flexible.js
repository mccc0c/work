/*(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))*/


! function(N, M) {
    function setBodyFontSize() {
        var width = docEl.getBoundingClientRect().width; //获取html宽度
        width / dpr > 540 && (width = 540 * dpr);
        var rem = width / 10;
        docEl.style.fontSize = rem + "px", flexible.rem = N.rem = rem;
    }
    var K, doc = N.document,
        docEl = doc.documentElement,
        metaEl = doc.querySelector('meta[name="viewport"]'),
        flexibleEl = doc.querySelector('meta[name="flexible"]'),
        dpr = 0,
        scale = 0,
        flexible = M.flexible || (M.flexible = {});

    // 判断head中是否设置了viewport，如果有设置，按照已有viewport 设置缩放比；判断head中是否设置了viewport，如果有设置，按照已有viewport 设置缩放比；
    if (metaEl) {
        console.warn("将根据已有的meta标签来设置缩放比例");
        var match = metaEl.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        match && (scale = parseFloat(match[1]), dpr = parseInt(1 / scale))
    } else {
        if (flexibleEl) {
            var content = flexibleEl.getAttribute("content");
            //如果没有设置meta viewport，判断是否设置dpr，如果有，通过dpr计算缩放scale。
            if (content) {
                var initialDpr = content.match(/initial\-dpr=([\d\.]+)/),
                    maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);//maximum 设置最大值，与initial的值比较，取最小值；
                initialDpr && (dpr = parseFloat(initialDpr[1]),
                        scale = parseFloat((1 / dpr).toFixed(2))),
                    maximumDpr && (dpr = parseFloat(maximumDpr[1]),
                        scale = parseFloat((1 / dpr).toFixed(2)));
            }
        }
    }
    //如果 dpr &scale都没有设置，那么就通过设备的dpr设置起缩放 scale
    if (!dpr && !scale) { //meta[name="viewport"]&&meta[name="flexible"]都不存在。
        var win = N.navigator.userAgent,
            isAndroid = (!!win.match(/android/gi), !!win.match(/iphone/gi)),
            isIPhone = isAndroid && !!win.match(/OS 9_3/),
            devicePixelRatio = N.devicePixelRatio;
        dpr = isAndroid && !isIPhone ? devicePixelRatio >= 3 && (!dpr || dpr >= 3) ? 3 : devicePixelRatio >= 2 && (!dpr || dpr >= 2) ? 2 : 1 : 1, scale = 1 / dpr // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案其他设备下，仍旧使用1倍的方案

        /*if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;*/

    }
    //得到scale之后 ，如果meta 的viewport不存在，那么就创建一meta[name=“viewport”],将scale配置进去。
    if (docEl.setAttribute("data-dpr", dpr), !metaEl) {
        if (metaEl = doc.createElement("meta"), metaEl.setAttribute("name", "viewport"), metaEl.setAttribute("content", "initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no"), docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl)
        } else {
            var u = doc.createElement("div");
            u.appendChild(metaEl), doc.write(u.innerHTML)
        }
    }
    N.addEventListener("resize", function() {
      clearTimeout(K),
      K = setTimeout(setBodyFontSize, 300)
    }, !1),
    N.addEventListener("pageshow", function(b) { 
      b.persisted && (clearTimeout(K), 
      K = setTimeout(setBodyFontSize, 300)) 
    }, !1),
     "complete" === doc.readyState ? doc.body.style.fontSize = 12 * dpr + "px" : doc.addEventListener("DOMContentLoaded", function() { doc.body.style.fontSize = 12 * dpr + "px" }, !1), setBodyFontSize(), flexible.dpr = N.dpr = dpr, flexible.refreshRem = setBodyFontSize, flexible.rem2px = function(d) { var c = parseFloat(d) * this.rem; return "string" == typeof d && d.match(/rem$/) && (c += "px"), c }, flexible.px2rem = function(d) { var c = parseFloat(d) / this.rem; return "string" == typeof d && d.match(/px$/) && (c += "rem"), c }
}(window, window.lib || (window.lib = {}));