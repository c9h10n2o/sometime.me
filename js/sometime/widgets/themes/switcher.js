/* Apply themes
 * Coded by c9h10n2o in 2013.8
 * @preserve http://sometime.me
 */

define(function(require, exports) {

	var	now = new Date()
	,	nowHours = now.getHours()
	,	$uiDebussyWrapper = $('#hd .debussy');

	exports.init = function() {
//		night
		if (nowHours > 18 || nowHours < 6) {
			if (Math.random() > .5 && !_.MOBILE && _.CANVAS && _.AUDIO) {
				_.$DE.addClass('theme-night');
				$uiDebussyWrapper.fadeIn(1e3);
				
				require('widgets/themes/night/debussy/debussy')
				.init(
					$uiDebussyWrapper[0]
				,	'/images/themes/night/debussy/'
				,	function() {
	//					动画CPU占用太高，结束后闪光定格成静帧替代
						$uiDebussyWrapper.empty();
						$('<div>', { 'class': 'flash' })
						.appendTo($uiDebussyWrapper)
						.fadeOut(500);
						
						window.Discman && setTimeout(function() { Discman.on() }, 1500);
					}
				);
				window.Discman && Discman.off();
			}
			else {
				$('#hd, #ft').transparent();
				_.$DE.addClass('theme-roof');
				setTimeout(function() { $('#hd, #ft').opaque(300) }, 1e3);
			}
		}
//		day
		else if (Math.random() > .5) {
			$('#hd, #ft').transparent();
			_.$DE.addClass(Math.random() > .5 ? 'theme-hz' : 'theme-nj flip');
			setTimeout(function() { $('#hd, #ft').opaque(300) }, 1e3);
		}
	};

});

