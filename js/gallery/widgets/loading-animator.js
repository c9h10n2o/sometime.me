/* loading dots animation
 * Coded by c9h10n2o in 2012
 * http://sometime.me
 */

define(function(require, exports){

	var config = {
			uiDots:			'.loading-dots',	// default selector for dots containers
			amount:			3,					// amount of dots
			interval:		500,				// animation speed, ms
			dotChar:		'.'				// dot character
		},
		cur = 1,					// current dot
		timer;				// animation timer
	
	exports.init = function(_config){
		$.extend(config, _config || {});
		$(config.uiDots).each(function(i, k){
			startTimer();
		});
	};
	
	function startTimer(){
		timer = setInterval(ani, config.interval);
	}

	function ani(){
		$(config.uiDots).text(
			new Array(cur + 1).join(config.dotChar));
		cur = cur < config.amount ? cur + 1 : 1;
	}
});