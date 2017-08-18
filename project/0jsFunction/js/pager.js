jQuery.fn.pagination = function(set) {
  set = jQuery.extend({
	total:0,
    perpage: 10,
    display: 10,
    current: 0,
    edge: 0,
    link_to: "#",
    prev_text: "上一页",
    next_text: "下一页",
    ellipse_text: "...",
    prev_show_always: true,
    next_show_always: true,
    callback: function() {
      return false;
    }
  }, set || {});

  return this.each(function() {
    function numPages() {
      return Math.ceil(set.total / set.perpage);
    }

    function getInterval() {
      var ne_half = Math.ceil(set.display / 2);
      var np = numPages();
      var upper_limit = np - set.display;
      var start = current > ne_half ? Math.max(Math.min(current - ne_half, upper_limit), 0) : 0;
      var end = current > ne_half ? Math.min(current + ne_half, np) : Math.min(set.display, np);
      return [start, end];
    }

    function pageSelected(page_id, evt) {
      current = page_id;
      drawLinks();
      var continuePropagation = set.callback(page_id, panel);
      if (!continuePropagation) {
        if (evt.stopPropagation) {
          evt.stopPropagation();
        } else {
          evt.cancelBubble = true;
        }
      }
      return continuePropagation;
    }

    function drawLinks() {
      panel.empty();
      var interval = getInterval();
      var np = numPages();
      var getClickHandler = function(page_id) {
        return function(evt) {
          return pageSelected(page_id, evt);
        }
      }
      var appendItem = function(page_id, appendset) {
        page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1);
        appendset = jQuery.extend({
          text: page_id + 1,
          classes: ""
        }, appendset || {});
        if (page_id == current) {
          var lnk = jQuery("<span class='current'>" + (appendset.text) + "</span>");
        } else {
          var lnk = jQuery("<a>" + (appendset.text) + "</a>")
            .bind("click", getClickHandler(page_id))
            .attr('href', set.link_to.replace(/__id__/, page_id));
        }
        if (appendset.classes) {
          lnk.addClass(appendset.classes);
        }
        panel.append(lnk);
      }
      if (set.prev_text && (current > 0 || set.prev_show_always)) {
        appendItem(current - 1, {
          text: set.prev_text,
          classes: "prev"
        });
      }
      if (interval[0] > 0 && set.edge > 0) {
        var end = Math.min(set.edge, interval[0]);
        for (var i = 0; i < end; i++) {
          appendItem(i);
        }
        if (set.edge < interval[0] && set.ellipse_text) {
          jQuery("<span>" + set.ellipse_text + "</span>").appendTo(panel);
        }
      }
      for (var i = interval[0]; i < interval[1]; i++) {
        appendItem(i);
      }
      if (interval[1] < np && set.edge > 0) {
        if (np - set.edge > interval[1] && set.ellipse_text) {
          jQuery("<span>" + set.ellipse_text + "</span>").appendTo(panel);
        }
        var begin = Math.max(np - set.edge, interval[1]);
        for (var i = begin; i < np; i++) {
          appendItem(i);
        }

      }
      if (set.next_text && (current < np - 1 || set.next_show_always)) {
        appendItem(current + 1, {
          text: set.next_text,
          classes: "next"
        });
      }
    }
    var current = set.current;
    set.total = (!set.total || set.total < 0) ? 1 : set.total;
    set.perpage = (!set.perpage || set.perpage < 0) ? 1 : set.perpage;
    var panel = jQuery(this);
    this.selectPage = function(page_id) {
      pageSelected(page_id);
    }
    this.prevPage = function() {
      if (current > 0) {
        pageSelected(current - 1);
        return true;
      } else {
        return false;
      }
    }
    this.nextPage = function() {
      if (current < numPages() - 1) {
        pageSelected(current + 1);
        return true;
      } else {
        return false;
      }
    }
    drawLinks();
    set.callback(current, this);
  });
}