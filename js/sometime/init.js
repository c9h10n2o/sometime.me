/* Page boot
 * Coded by c9h10n2o in 2012.5
 * @preserve http://sometime.me
 */

define(function(require) {

	require('jquery');
	require('common');
	
	window.Discman = require('sometime/discman');
	window.Rewinder = require('sometime/rewinder');
//	expose them to all modules such as time-machine
//	to avoid creating duplicated instances for control

	var	now = new Date()
	,	nowHours = now.getHours();
	
//	_.deframe('sometime.me', true);

//	apply UA-specific styles
	if(_.MOBILE) _.$DE.addClass('ua-mobile');
	if(_.IOS) _.$DE.addClass('ua-ios');
	if(_.IPHONE) _.$DE.addClass('ua-iphone');
	if(_.IPAD) _.$DE.addClass('ua-ipad');

	if(_.IE) _.$DE.addClass('ua-ie');
	if(_.IE <= 6) _.$DE.addClass('ua-ie6');
	if(_.IE == 7) _.$DE.addClass('ua-ie7');
	if(_.IE == 8) _.$DE.addClass('ua-ie8');

//	apply doodles
//	if(nowHours > 21 || nowHours < 6) {
	if(Math.random() > .5) {
		$('#hd').transparent();
//		_.$DE.addClass('doodle-night');
		_.$DE.addClass(Math.random() > .5 ? 'doodle-hz' : 'doodle-nj flip');
		setTimeout(function() { $('#hd').opaque(300) }, 1000);
	}

	require('sometime/time-machine').init({ bookmark: location.hash.slice(2) });
	
	$('#about').show();
//	延迟显示，防止出现CSS尚未加载时#about裸奔
	$('#fn-panel').removeClass('hdn2');
	$('#ft .cpy .now').text((new Date).getFullYear());

//	for desktop browsers
	if (!_.MOBILE) {
		if (!(_.IE <= 6)) {
			Rewinder.init();
			Discman.init({
				station: '/disc/'
			,	shuffle: true
			,	tracks: [
					['Linhai_Deng_Liming.mp3', '林海 - 等，黎明']
				,	['Liuxing_The_Tree_I.mp3', '刘星 - 树']
				,	['Linhai_ZaijianWangshi_Zaijian.mp3', '林海 - 再见往事，再见']
				,	['Linhai_Chuqiu.mp3', '林海 - 初秋']
				,	['Linhai_YuanfangdeJijing.mp3', '林海 - 远方的寂静']
				,	['Linhai_Mishi.mp3', '林海 - 迷失']
				]
			,	uijPlayer: '#fn-panel .discman .jplayer'
			,	uiBtn: '#fn-panel .discman.btn'
			});
		}
		require('sometime/patcher').init();
	}
	else $('#fn-panel').hide();
	
//	statics
	require('widgets/ga').init();
});

