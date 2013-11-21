/* Apply User-Agent Specific Styles
 * Coded by c9h10n2o in 2012.7
 * @preserve http://sometime.me
 */

define(function(require, exports) {

	exports.init = function() {
		if (_.MAC) _.$DE.addClass('ua-mac');
		if (_.MSWIN) _.$DE.addClass('ua-win');
		if (_.MOBILE) _.$DE.addClass('ua-mobile');
		if (_.IOS) _.$DE.addClass('ua-ios');
		if (_.IPHONE) _.$DE.addClass('ua-iphone');
		if (_.IPAD) _.$DE.addClass('ua-ipad');
	
		if (_.IE) _.$DE.addClass('ua-ie');
		if (_.IE < 7) _.$DE.addClass('ua-ie6');
		if (_.IE == 7) _.$DE.addClass('ua-ie7');
		if (_.IE == 8) _.$DE.addClass('ua-ie8');
	};

});

