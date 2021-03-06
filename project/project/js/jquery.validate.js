/*! jQuery Validation Plugin - v1.14.0 - 6/30/2015
 * http://jqueryvalidation.org/
 * Copyright (c) 2015 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,d=d.concat(c.errorList)}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||-1!==a.inArray(c.keyCode,d)||(b.name in this.submitted||b===this.lastElement)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors();var b,c=this.elements().removeData("previousValue").removeAttr("aria-invalid");if(this.settings.unhighlight)for(b=0;c[b];b++)this.settings.unhighlight.call(this,c[b],this.settings.errorClass,"");else c.removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?this.findByName(b.name).filter(":checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j instanceof TypeError&&(j.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\]|\$)/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.off(".validate-equalTo").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}});var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})});
// 验证身份证
jQuery.validator.addMethod("isIdCard",function(value,element){return this.optional(element)||idCardNoUtil.checkIdCardNo(value)},"请正确输入您的身份证号码");var idCardNoUtil={provinceAndCitys:{11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},powers:["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],parityBit:["1","0","X","9","8","7","6","5","4","3","2"],genders:{male:"男",female:"女"},checkAddressCode:function(addressCode){var check=/^[1-9]\d{5}$/.test(addressCode);if(!check){return false}if(idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0,2))]){return true}else{return false}},checkBirthDayCode:function(birDayCode){var check=/^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);if(!check){return false}var yyyy=parseInt(birDayCode.substring(0,4),10);var mm=parseInt(birDayCode.substring(4,6),10);var dd=parseInt(birDayCode.substring(6),10);var xdata=new Date(yyyy,mm-1,dd);if(xdata>new Date()){return false}else{if((xdata.getFullYear()==yyyy)&&(xdata.getMonth()==mm-1)&&(xdata.getDate()==dd)){return true}else{return false}}},getParityBit:function(idCardNo){var id17=idCardNo.substring(0,17);var power=0;for(var i=0;i<17;i++){power+=parseInt(id17.charAt(i),10)*parseInt(idCardNoUtil.powers[i])}var mod=power%11;return idCardNoUtil.parityBit[mod]},checkParityBit:function(idCardNo){var parityBit=idCardNo.charAt(17).toUpperCase();if(idCardNoUtil.getParityBit(idCardNo)==parityBit){return true}else{return false}},checkIdCardNo:function(idCardNo){var check=/^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);if(!check){return false}if(idCardNo.length==15){return idCardNoUtil.check15IdCardNo(idCardNo)}else{if(idCardNo.length==18){return idCardNoUtil.check18IdCardNo(idCardNo)}else{return false}}},check15IdCardNo:function(idCardNo){var check=/^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);if(!check){return false}var addressCode=idCardNo.substring(0,6);check=idCardNoUtil.checkAddressCode(addressCode);if(!check){return false}var birDayCode="19"+idCardNo.substring(6,12);return idCardNoUtil.checkBirthDayCode(birDayCode)},check18IdCardNo:function(idCardNo){var check=/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);if(!check){return false}var addressCode=idCardNo.substring(0,6);check=idCardNoUtil.checkAddressCode(addressCode);if(!check){return false}var birDayCode=idCardNo.substring(6,14);check=idCardNoUtil.checkBirthDayCode(birDayCode);if(!check){return false}return idCardNoUtil.checkParityBit(idCardNo)},formateDateCN:function(day){var yyyy=day.substring(0,4);var mm=day.substring(4,6);var dd=day.substring(6);return yyyy+"-"+mm+"-"+dd},getIdCardInfo:function(idCardNo){var idCardInfo={gender:"",birthday:""};if(idCardNo.length==15){var aday="19"+idCardNo.substring(6,12);idCardInfo.birthday=idCardNoUtil.formateDateCN(aday);if(parseInt(idCardNo.charAt(14))%2==0){idCardInfo.gender=idCardNoUtil.genders.female}else{idCardInfo.gender=idCardNoUtil.genders.male}}else{if(idCardNo.length==18){var aday=idCardNo.substring(6,14);idCardInfo.birthday=idCardNoUtil.formateDateCN(aday);if(parseInt(idCardNo.charAt(16))%2==0){idCardInfo.gender=idCardNoUtil.genders.female}else{idCardInfo.gender=idCardNoUtil.genders.male}}}return idCardInfo},getId15:function(idCardNo){if(idCardNo.length==15){return idCardNo}else{if(idCardNo.length==18){return idCardNo.substring(0,6)+idCardNo.substring(8,17)}else{return null}}},getId18:function(idCardNo){if(idCardNo.length==15){var id17=idCardNo.substring(0,6)+"19"+idCardNo.substring(6);var parityBit=idCardNoUtil.getParityBit(id17);return id17+parityBit}else{if(idCardNo.length==18){return idCardNo}else{return null}}}};
// 验证上传图片类型大小
(function($){var is_supported_browser=!!window.File,fileSizeToBytes,formatter=$.validator.format;fileSizeToBytes=(function(){var units=["B","KB","MB","GB","TB"];return function(size,unit){var index_of_unit=units.indexOf(unit),coverted_size;if(index_of_unit===-1){coverted_size=false}else{while(index_of_unit>0){size*=1024;index_of_unit-=1}coverted_size=size}return coverted_size}}());$.validator.addMethod("fileType",function(value,element,params){var files,types=params.types||["text"],is_valid=false;if(!is_supported_browser||this.optional(element)){is_valid=true}else{files=element.files;if(files.length<1){is_valid=false}else{$.each(types,function(key,value){is_valid=is_valid||files[0].type.indexOf(value)!==-1})}}return is_valid},function(params,element){return formatter("图片格式需要为: {0}.",params.types.join(","))});$.validator.addMethod("minFileSize",function(value,element,params){var files,unit=params.unit||"KB",size=params.size||100,min_file_size=fileSizeToBytes(size,unit),is_valid=false;if(!is_supported_browser||this.optional(element)){is_valid=true}else{files=element.files;if(files.length<1){is_valid=false}else{is_valid=files[0].size>=min_file_size}}return is_valid},function(params,element){return formatter("图片最小需要为 {0}{1} .",[params.size||100,params.unit||"KB"])});$.validator.addMethod("maxFileSize",function(value,element,params){var files,unit=params.unit||"KB",size=params.size||100,max_file_size=fileSizeToBytes(size,unit),is_valid=false;if(!is_supported_browser||this.optional(element)){is_valid=true}else{files=element.files;if(files.length<1){is_valid=false}else{is_valid=files[0].size<=max_file_size}}return is_valid},function(params,element){return formatter("图片不能大于 {0}{1}.",[params.size||100,params.unit||"KB"])})}(jQuery));
// 判断整数value是否等于0 
jQuery.validator.addMethod("isIntEqZero", function(value, element) {
    value = parseInt(value);
    return this.optional(element) || value == 0;
}, "整数必须为0");

// 判断整数value是否大于0
jQuery.validator.addMethod("isIntGtZero", function(value, element) {
    value = parseInt(value);
    return this.optional(element) || value > 0;
}, "整数必须大于0");

// 判断整数value是否大于或等于0
jQuery.validator.addMethod("isIntGteZero", function(value, element) {
    value = parseInt(value);
    return this.optional(element) || value >= 0;
}, "整数必须大于或等于0");

// 判断整数value是否不等于0 
jQuery.validator.addMethod("isIntNEqZero", function(value, element) {
    value = parseInt(value);
    return this.optional(element) || value != 0;
}, "整数必须不等于0");

// 判断整数value是否小于0 
jQuery.validator.addMethod("isIntLtZero", function(value, element) {
    value = parseInt(value);
    return this.optional(element) || value < 0;
}, "整数必须小于0");

// 判断整数value是否小于或等于0 
jQuery.validator.addMethod("isIntLteZero", function(value, element) {
    value = parseInt(value);
    return this.optional(element) || value <= 0;
}, "整数必须小于或等于0");

// 判断浮点数value是否等于0 
jQuery.validator.addMethod("isFloatEqZero", function(value, element) {
    value = parseFloat(value);
    return this.optional(element) || value == 0;
}, "浮点数必须为0");

// 判断浮点数value是否大于0
jQuery.validator.addMethod("isFloatGtZero", function(value, element) {
    value = parseFloat(value);
    return this.optional(element) || value > 0;
}, "浮点数必须大于0");

// 判断浮点数value是否大于或等于0
jQuery.validator.addMethod("isFloatGteZero", function(value, element) {
    value = parseFloat(value);
    return this.optional(element) || value >= 0;
}, "浮点数必须大于或等于0");

// 判断浮点数value是否不等于0 
jQuery.validator.addMethod("isFloatNEqZero", function(value, element) {
    value = parseFloat(value);
    return this.optional(element) || value != 0;
}, "浮点数必须不等于0");

// 判断浮点数value是否小于0 
jQuery.validator.addMethod("isFloatLtZero", function(value, element) {
    value = parseFloat(value);
    return this.optional(element) || value < 0;
}, "浮点数必须小于0");

// 判断浮点数value是否小于或等于0 
jQuery.validator.addMethod("isFloatLteZero", function(value, element) {
    value = parseFloat(value);
    return this.optional(element) || value <= 0;
}, "浮点数必须小于或等于0");

// 判断浮点型  
jQuery.validator.addMethod("isFloat", function(value, element) {
    return this.optional(element) || /^[-\+]?\d+(\.\d+)?$/.test(value);
}, "只能包含数字、小数点等字符");

// 匹配integer
jQuery.validator.addMethod("isInteger", function(value, element) {
    return this.optional(element) || (/^[-\+]?\d+$/.test(value) && parseInt(value) >= 0);
}, "匹配integer");

// 判断数值类型，包括整数和浮点数
jQuery.validator.addMethod("isNumber", function(value, element) {
    return this.optional(element) || /^[-\+]?\d+$/.test(value) || /^[-\+]?\d+(\.\d+)?$/.test(value);
}, "匹配数值类型，包括整数和浮点数");

// 只能输入[0-9]数字
jQuery.validator.addMethod("isDigits", function(value, element) {
    return this.optional(element) || /^\d+$/.test(value);
}, "只能输入0-9数字");

// 判断中文字符 
jQuery.validator.addMethod("isChinese", function(value, element) {
    return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
}, "只能包含中文字符。");

// 判断英文字符 
jQuery.validator.addMethod("isEnglish", function(value, element) {
    return this.optional(element) || /^[A-Za-z]+$/.test(value);
}, "只能包含英文字符。");

// 手机号码验证    
jQuery.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    return this.optional(element) || (length == 11 && /^\d{11}$/.test(value));
}, "请正确填写您的手机号码。");

// 电话号码验证    
jQuery.validator.addMethod("isPhone", function(value, element) {
    var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
    return this.optional(element) || (tel.test(value));
}, "请正确填写您的电话号码。");

// 联系电话(手机/电话皆可)验证   
jQuery.validator.addMethod("isTel", function(value, element) {
    var length = value.length;
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
    return this.optional(element) || tel.test(value) || (length == 11 && mobile.test(value));
}, "请正确填写您的联系方式");

// 匹配qq      
jQuery.validator.addMethod("isQq", function(value, element) {
    return this.optional(element) || /^[1-9]\d{4,12}$/;
}, "匹配QQ");

// 邮政编码验证    
jQuery.validator.addMethod("isZipCode", function(value, element) {
    var zip = /^[0-9]{6}$/;
    return this.optional(element) || (zip.test(value));
}, "请正确填写您的邮政编码。");

// 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。      
jQuery.validator.addMethod("isPwd", function(value, element) {
    return this.optional(element) || /^[a-zA-Z]\\w{6,12}$/.test(value);
}, "以字母开头，长度在6-12之间，只能包含字符、数字和下划线。");

// 身份证号码验证
jQuery.validator.addMethod("isIdCardNo", function(value, element) {
    //var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;   
    return this.optional(element) || isIdCardNo(value);
}, "请输入正确的身份证号码。");

// IP地址验证   
jQuery.validator.addMethod("ip", function(value, element) {
    return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
}, "请填写正确的IP地址。");

// 字符验证，只能包含中文、英文、数字、下划线等字符。    
jQuery.validator.addMethod("stringCheck", function(value, element) {
    return this.optional(element) || /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value);
}, "只能包含中文、英文、数字、下划线等字符");

// 匹配english  
jQuery.validator.addMethod("isEnglish", function(value, element) {
    return this.optional(element) || /^[A-Za-z]+$/.test(value);
}, "匹配english");

// 匹配汉字  
jQuery.validator.addMethod("isChinese", function(value, element) {
    return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
}, "匹配汉字");

// 匹配中文(包括汉字和字符) 
jQuery.validator.addMethod("isChineseChar", function(value, element) {
    return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
}, "匹配中文(包括汉字和字符) ");

// 判断是否为合法字符(a-zA-Z0-9-_)
jQuery.validator.addMethod("isRightfulString", function(value, element) {
    return this.optional(element) || /^[A-Za-z0-9_-]+$/.test(value);
}, "判断是否为合法字符(a-zA-Z0-9-_)");

// 判断是否包含中英文特殊字符，除英文"-_"字符外
jQuery.validator.addMethod("isContainsSpecialChar", function(value, element) {
    var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
    return this.optional(element) || !reg.test(value);
}, "含有中英文特殊字符");

$.extend( $.validator.messages, {
	required: "这是必填字段",
	remote: "请修正此字段",
	email: "请输入有效的电子邮件地址",
	url: "请输入有效的网址",
	date: "请输入有效的日期",
	dateISO: "请输入有效的日期 (YYYY-MM-DD)",
	number: "请输入有效的数字",
	digits: "只能输入数字",
	creditcard: "请输入有效的信用卡号码",
	equalTo: "你的输入不相同",
	extension: "请输入有效的后缀",
	maxlength: $.validator.format( "最多可以输入 {0} 个字符" ),
	minlength: $.validator.format( "最少要输入 {0} 个字符" ),
	rangelength: $.validator.format( "请输入长度在 {0} 到 {1} 之间的字符串" ),
	range: $.validator.format( "请输入范围在 {0} 到 {1} 之间的数值" ),
	max: $.validator.format( "请输入不大于 {0} 的数值" ),
	min: $.validator.format( "请输入不小于 {0} 的数值" )
} );

