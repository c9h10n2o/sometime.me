/* Browser compatibility patcher
 * Coded by c9h10n2o in 2012.5
 * http://sometime.me
 */

define(function(require, exports) {

//	var _ = require('common')
//	,	$ = require('jquery');
	
	if(_.IE <= 6) require('$.belated-png')($);

	exports.init = function() {
		if (_.IE) {
			switch(_.BMAJORVER) {
				case 6:
					_.$WIN.on('scroll', function() {
						$('#fn-panel').hide();
						setTimeout("$('#fn-panel').show()", 1500);
					});
					break;
				case 7:
				case 8:
			}
			$('#about, #ft .cpy')
			.hover(
				function() { $(this).animate({opacity: 1}, _.IE <= 6 ? 0 : 800) }
			,	function() { $(this).animate({opacity: 0}, _.IE <= 6 ? 0 : 800) }
			);
			if (_.IE > 6)
				$('#fn-panel .btn')
				.hover(
					function() { $(this).animate({opacity: 1}, 500) }
				,	function() { $(this).animate({opacity: .5}, 500) }
				);
			if (_.IE <= 6)
				$('#fn-panel .btn .icon').fixPng();
		}
	};
});