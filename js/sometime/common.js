/* Define myUnderScore: constants & common functions & prototypes
 * Coded by c9h10n2o
 * @preserve http://sometime.me
 */

define(function(require, exports, module) {

	var _ = {};
	
	require('$.migrate');

//	dev mode flag
	_.DEBUG = location.search.toLowerCase().indexOf('debug') >= 0;

//	constants
	
	var ua = navigator.userAgent.toLowerCase();

	_.MAC = ua.indexOf('macintosh') + 1 || undefined;
	_.WIN = ua.indexOf('windows') + 1 || undefined;
	
	_.BVER = $.browser.version;
	_.BMAJORVER = parseInt(_.BVER);
	
	_.WEBKIT = $.browser.webkit && _.BMAJORVER;
	_.GECKO = (ua.indexOf('gecko') + 1 || undefined) && _.BMAJORVER;
	
	_.CHROME = (ua.indexOf('chrome') + 1 || undefined) && _.BMAJORVER;
	_.SAFARI = $.browser.safari && _.BMAJORVER;
	_.MOZ = $.browser.mozilla && _.BMAJORVER;
	_.IE = $.browser.msie && _.BMAJORVER;
	
	_.MOBILE = ua.indexOf('mobile') > 0;
	_.IPHONE = ua.indexOf('iphone') > 0;
	_.IPAD = ua.indexOf('ipad') > 0;
	_.IOS = _.IPHONE || _.IPAD;
	
	_.WIN = window;
	_.D = document;
	_.DE = _.D.documentElement;
	_.BD = _.D.body;
	_.PAGESCROLL = _.IE || _.MOZ ? _.DE : _.BD;
//	page scroll container
	
	_.$WIN = $(_.WIN);
	_.$D = $(_.D);
	_.$DE= $(_.DE);
	_.$BD = $(_.BD);
	_.$PAGESCROLL = $(_.PAGESCROLL);

	_.HTML5 = !_.IE || _.MOBILE || _.IE >= 9;
	_.VIDEO = _.D.createElement('video').canPlayType
	&& _.D.createElement('video').canPlayType('video/mp4');

	_.SERVER = '';
//	http://sometime.me

//	calculate width of scrollbar
	_.SCROLLBARW = (function() {
		var	docW = _.BD.offsetWidth
		,	winW = _.WIN.innerWidth || _.DE.offsetWidth;
//			_.DE.offsetWidth for IE 8-

		return winW - docW || 20;
//		20 = default IE scrollbar width
	})();


//	handle exceptions

	_.error = window.onerror = function(a, b, c) {
		return !_.DEBUG;
	};

	_.ajaxError = function(xhr, statusText) {
		console && console.error && console.error(
			'[AJAX_ERROR]\n' + statusText +
			'\nHTTP ' + xhr.status + ' ' + xhr.statusText +
			' ' + this.url);
	};


//	jquery extensions

	$.fn.invisible = function() {
		return this.css({ visibility: 'hidden' });
	};
	
	$.fn.visible = function() {
		return this.css({ visibility: 'visible' });
	};
	
	$.fn.transparent = function(duration) {
		return this.fadeTo(duration || 0, 0);
	};
	
	$.fn.opaque = function(duration) {
		return this.fadeTo(duration || 0, 1);
	};


//	common functions

//	get jq-tmpl data
	_.getTmplData = function(uiEl, key) {
		var data = $(uiEl).tmplItem().data;
		return key ? data[key] : data;
	};
	
//	compute DOM element visibility
	_.isVisible = function(uiEl, tolerance, uiContainer) {
		var $uiEl = $(uiEl).filter(':visible')
		,	topDist, btmDist;
//		topDist = dist from element top to window bottom
//		btmDist = dist from element bottom to window top

		if (!$uiEl[0]) return;
		tolerance = tolerance ? tolerance : 0;
		
		elT = _.getClientY($uiEl, uiContainer);
		topDist = $(uiContainer || _.WIN).height() - elT;
		btmDist = elT + $uiEl.height();

		return elT > 0 && topDist > -tolerance ||
			   elT < 0 && btmDist > -tolerance;
	};
	
	_.getStr = function(patternRegEx, str, isGetAll) {
		var res = patternRegEx.exec(str);
		return res && (isGetAll ? res.slice(1) : res[1]);
//		IE $1?
	};
	
	_.getPageX = function(_uiEl, _uiContainer) {
//		仅接受DOM对象, 省略过滤, 提高性能(此函数高频调用)
		return _uiEl != _uiContainer
			? _uiEl.offsetLeft + arguments.callee(_uiEl.offsetParent, _uiContainer)
			: 0;
	};
	
	_.getPageY = function(_uiEl, _uiContainer) {
//		仅接受DOM对象, 省略过滤, 提高性能(此函数高频调用)
		return _uiEl != _uiContainer
			? _uiEl.offsetTop + arguments.callee(_uiEl.offsetParent, _uiContainer)
			: 0;
	};
	
//	_.getPageX = function(uiEl, uiContainer) {
//		var _uiEl = $(uiEl)[0]
//		,	_uiContainer = $(uiContainer)[0];

//		return _uiEl && _uiEl != _uiContainer;
//		健壮模式, 不易发现无效_uiContainer(_uiEl=null找到头依然没有找到_uiContainer)
//	};

//	_.getPageY = function(uiEl, uiContainer) {
//		var _uiEl = $(uiEl)[0]
//		,	_uiContainer = $(uiContainer)[0];

//		return _uiEl && _uiEl != _uiContainer;
//		健壮模式, 不易发现无效_uiContainer(_uiEl=null找到头依然没有找到_uiContainer)
//	};
	
	_.getClientX = function(uiEl, uiContainer) {
		var _uiEl = $(uiEl)[0]
		,	_uiContainer = $(uiContainer)[0];
		
		_uiContainer = _uiContainer && _uiContainer.nodeName && _uiContainer;
//		过滤非DOM对象, 如window, 但无法检测过滤无效DOM对象, 如DE
		
		return _.getPageX(_uiEl, _uiContainer)
		- (_uiContainer || _.PAGESCROLL).scrollLeft;
	};
	
	_.getClientY = function(uiEl, uiContainer) {
		var _uiEl = $(uiEl)[0]
		,	_uiContainer = $(uiContainer)[0];
		
		_uiContainer = _uiContainer && _uiContainer.nodeName && _uiContainer;
//		过滤非DOM对象, 如window, 但无法检测过滤无效DOM对象, 如DE

		return _.getPageY(_uiEl, _uiContainer)
		- (_uiContainer || _.PAGESCROLL).scrollTop;
	};
	
	_.getCookieDict = function() {
		var CookieDict = {};
		
		$.grep(document.cookie.split(/;\s*/), function(v,i) {
			var kv = v.split('=');
			CookieDict[kv[0]] = kv[1] || '';
		});
		
		return CookieDict;
	};

	_.getCookieItem = function(key, isArray) {
		var val = _.getCookieDict()[key]
		return !isArray
		? val
		: val ? val.split(',') : [];
	};
	
	_.setCookieItem = function(key, val, action) {
		var origVal = _.getCookieDict()[key]
		,	origVals = origVal ? origVal.split(',') : []
		,	i = $.inArray(val + '', origVals);

		if (!action) origVals = [val];
		else if (action == 'append' && i < 0) origVals.push(val);
		else if (action == 'remove' && i >= 0) origVals.splice(i,1);

		document.cookie = key + '=' + origVals;
		return document.cookie;
	};
			
	_.bufferImgs = function(imgs) {
		if (!imgs) return;
		
		imgs = imgs instanceof Array ? imgs : [imgs];
		for(var i in imgs) (new Image).src = '/images/' + imgs[i];
	};

	_.scrollIntoView = function(uiEl, callback, uiContainer) {
		var $uiEl = $(uiEl)
		,	winH =0
		,	elH = 0
		,	elT = 0, elB = 0
//			dist from el top/bottom to win top/bottom
		,	delta = 0;
//			delta of page scrollTop(to be computed)

		winH = _.DE.clientHeight;
		elH = $uiEl.height();
		elT = _.getClientY($uiEl, uiContainer);
		elB = winH - elT - elH;

		if (elH >= winH) delta = elT;
		else if (elT < 0) delta = -Math.min(-elT + 30, (winH - elH) / 2 - elT);
		else if (elB < 0) delta = Math.min(-elB + 30, (winH - elH) / 2 - elB);

//		console.log('winH', winH, 'elH', elH, 'elT', elT, 'elB', elB, 'delta', delta, '%', Math.abs(delta / elH));

		if (Math.abs(delta / elH) < .5) return callback && callback();
//		ignore threshold

		 $(uiContainer || _.PAGESCROLL)
		 .animate({ scrollTop: '+=' + delta }, 500, function() {
			callback && callback();
		});
	};

//	filter html tags
	_.encodeHtml = function(str, isKeepBr) {
		if (isKeepBr) str = str.replace(/<br\s?\/?>/g, '\n');
		if (!str.replace(/\s/g, '')) return '';
//		blank string

		str = str
		.replace(/\n\s*[\n$]/g, '\n')
//		filter empty line
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

		if (isKeepBr) str = str.replace(/\n/g, '<br>');

		return str;
	};
	
//	dateRange: Single/Array of Date-object(s)/string(s)
//	separators: [' &nbsp;', ' ~ ', '.', ':'], '' for placeholder
//	若为范围则默认无时间, 可通过noTime强制指定有无时间(对单个或范围都有效)
	_.formatDateTime = function(dateRange, noTime, separators) {
		var date, dateStr, dateRangeStr = [];

		dateRange = dateRange || [new Date];
		dateRange = dateRange.pop ? dateRange : [dateRange]
//		Array or Single?
		dateRange = dateRange.length ? dateRange : [new Date];		
//		filter []
		noTime = noTime == undefined
//		null(placeholder) or not set
		? dateRange.length > 1
		: !!noTime;
		separators = separators || [' &nbsp;', ' ~ '];

		while(date = dateRange.shift()){
			date = new Date(date);
			dateStr = [];
			
			dateStr[0] = _.formatDate(date, separators[2]);
			
			if (!noTime)
				dateStr[1] = _.formatTime(date, separators[3]);
			
			dateRangeStr.push(dateStr.join(separators[0]));
		}
		
		return dateRangeStr.join(separators[1]);
	};
		
	_.formatDate = function(date, separator) {
		date = date ? new Date(date) : new Date;
		separator = separator || '.';
		
		return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
		.join(separator);
	};
	
	_.formatTime = function(date, separator) {		
		date = date ? new Date(date) : new Date;
		separator = separator || ':';
		
		return [date.getHours(), date.getMinutes()]
		.join(separator)
		.replace(/:(?=\d$)/, ':0');
//		.replace(/^0/, '00');
	};
	
//	textbox place-holder for legacy UAs
	_.placeholder = function(uiFields) {
		$(uiFields || '[placeholder]')
		.add('[placeholder]', uiFields)
		.filter('[placeholder]')
		
		.on('focus', function() {
			this.value = this.value == this.placeholder
			? ($(this).removeClass('placeholder'), '')
			: this.value;
		})
		.on('blur', function() {
			this.value = this.value
			|| ($(this).addClass('placeholder'), this.placeholder);
		})
		.trigger('blur');
	};
	
	_.select = function(uiEl, start, end) {
		var _uiEl = $(uiEl)[0]
		,	len = 0;
		
		len = _uiEl.value.length;
		start = start && (start < 0 ? len + start + 1 : start) || 0;
		end = end && (end < 0 ? len + end + 1 : end) || len;

		if (_uiEl.setSelectionRange) {
			_uiEl.focus();
			_uiEl.setSelectionRange(len, len);
		}
		else if (_uiEl.createTextRange) {
			with(_uiEl.createTextRange()){
				collapse(true);
				moveStart('character', start);
				moveEnd('character', end);
				select();
			}
		}
	};
	
	_.btnPressFx = function(uiBtn) {
		var $uiBtn = $(uiBtn || '.btn-press-fx');
		
		$uiBtn
		.on('mousedown', function(e) {
			if (e.which != 1) return;
			
			$(this).addClass('btn-pressed');
//			$(this).css({ left: '+=1', top: '+=1', position: 'relative' });
			$(this).css({ left: 1, top: 1, position: 'relative' });
		})
		.on('mouseup mouseleave', function(e) {
			if (e.which != 1) return;
			
			$(this).removeClass('btn-pressed');
//			$(this).css({ left: '-=1', top: '-=1' });
			$(this).css({ left: 0, top: 0 });
		});
	};
	
	_.serializeJSON = function(uiFields, isEncoded) {
//		uiFields可以是表单域集合或表单域的父节点
		var json = {}
		,	validFieldFilter = 'input, textarea, select';
		
		$(uiFields)
		.add(validFieldFilter, uiFields)
//		增加父节点中包含的表单域
		.filter(validFieldFilter)
//		过滤父节点本身
		.filter('[name]')
		.not('[disabled]')
		
		.each(function(i, v) {
			json[v.name] = isEncoded
			? _.encodeHtml(v.value)
			: v.value;
		});

		return json;
	};
	
//	simulate a key pressing with default action
//	not fully debugged & tested
	_.pressKey = function(keyIdentifier, keyCode, ctrl, alt, shift) {
		var e;
		
		if (_.IE < 9) return;
//		older not tested
		
		e = _.D.createEvent('KeyboardEvent')

		if (!_.IE) {
			(e.initKeyboardEvent || e.initKeyEvent)(
				'keypress'
			,	false
//				bubbles
			,	true
//				cancelable: default action cancelable
			,	null
//				view: specifies UIEvent.view
			,	ctrl
			,	alt
			,	shift
			,	false
//				metaKey
			,	_.MOZ ? keyCode : keyIdentifier
//				key: keyIdentifier(webkit) or keyCode(mozilla)
			,	0
//				charCode
			);
		}
		
//		for IE9+ only?
		else if (e.initKeyboardEvent) {
			e.initKeyboardEvent(
				'keypress'
			,	false
//				bubbles
			,	true
//				cancelable
			,	null
//				view: the active window object or null
			,	keyIdentifier
//				key: keyIdentifier
			,	0
//				location: the location of the key on the device
			,	[ctrl ? 'ctrl' : ''
				,alt ? 'alt' : ''
				,shift ? 'shift' : '']
				.join(' ')
//				modifiersList: a space-separated list of key names
			,	false
//				repeat: the number of times this key has been pressed
			,	''
//				the locale name
			);
		}
		
		_.D.dispatchEvent(e);
	};
	
//	submit a form via ajax
	_.ajaxForm = function(uiForm, succ, fail) {
		var $uiForm = $(uiForm)
		,	_uiForm = $uiForm[0];
		
		if (!_uiForm) return;
		
		$.ajax({
			url: _uiForm.action
		,	type: _uiForm.method ? _uiForm.method : 'POST'
//		,	cache: false
		,	data: $uiForm.serialize()
		,	success: succ || $.noop
		,	error: fail || function(xhr, statusText) {
				_.ajaxError.call(this, xhr, statusText);
			}
		});
	};

	_.deframe = function(key, exactMatch, allowFrame) {
		var domain, domainValid
		,	redirUrl;
		
		if (!key) return;
		
		domain = location.hostname;
		domainValid = exactMatch ? domain == key: domain.indexOf(key) >= 0;
		redirUrl = domainValid
		? location.href
		: 'http://' + key + location.pathname + location.search + location.hash;
		
		if (!allowFrame && self != top) top.location.replace(redirUrl);
		else if (!domainValid) location.replace(redirUrl);
	};

	module.exports = _;
});
