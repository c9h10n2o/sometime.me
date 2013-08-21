/* Google Analytics & Local Statics
 * Coded by c9h10n2o in 2012
 * http://sometime.me
 */

define(function(require, exports){
	exports.init = function(){
		if(_.DEBUG) return;
		
		window._gaq = window._gaq || [];
		_gaq.push(['_setAccount', 'UA-20683254-1']);
		_gaq.push(['_setDomainName', 'sometime.me']);
		_gaq.push(['_trackPageview']);
		
		(function() {
			var ga = document.createElement('script');
			ga.type = 'text/javascript';
			ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(ga, s);
		})();
		
		//TODO local statics, IP recording
	};
});
