seajs.config({
//	base: '/js'
	paths: {
		'sometime': '/js/sometime'
	,	'widgets': '/js/sometime/widgets'
	,	'css': '/css'
	}
,	alias: {
		'es5-safe': 'es5-safe/0.9.2/es5-safe'
    ,	'json2': 'json2/1.0.1/json2'
	,	'jquery': 'jquery/1.10.2/jquery'
	,	'common': 'sometime/common'
	,	'artmpl': 'artmpl/2.0.1/artmpl'
	,	'underscore': 'underscore/1.3.3/underscore'
	,	'$.migrate': 'jquery/plugins/migrate/1.2.1/migrate'
	,	'$.tmpl': 'jquery/plugins/tmpl/1.0.0/tmpl'
	,	'$.lazyload': 'jquery/plugins/lazyload/1.7.2/lazyload'
	,	'$.jplayer': 'jquery/plugins/jplayer/2.4.0/jplayer'
	,	'$.belated-png': 'jquery/plugins/belated-png/0.0.8/belated-png'
	,	'$.hashchange': 'jquery/plugins/hashchange/1.3.0/hashchange'
	,	'$.base64': 'jquery/plugins/base64/1.1.0/base64'
	}
,	preload: [
		Function.prototype.bind ? '' : 'es5-safe'
	,	this.JSON ? '' : 'json2'
	]
,	debug: false
,	map: [
//		['.js', '-debug.js']
//	,	['http://sometime.me/js/sometime/', 'http://localhost/js/sometime/']
	]
,	charset: 'utf-8'
,	timeout: 20000
});

// preload modules and expose them
// seajs can NOT "preload" jQuery and Common TO $ and _ variable
seajs.on('exec', function(module) {
   if (module.uri === seajs.resolve('jquery')) {
      window.$ = window.jQuery = module.exports;
   }
   else if (module.uri === seajs.resolve('common')) {
      window._ = module.exports;
   }
});