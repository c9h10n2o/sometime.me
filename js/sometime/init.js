/* Page Boot
 * Coded by c9h10n2o in 2012.5
 * @preserve http://sometime.me
 */

define(function(require) {

	require('jquery');
	require('common');
	
	window.Discman = require('widgets/discman');
	window.Rewinder = require('widgets/rewinder');
//	expose them to all modules such as time-machine
//	to avoid creating duplicated instances for control
	
//	_.deframe('sometime.me', true);
//	avoid being framed

	require('widgets/ua').init();
//	apply UA-specific styles

	$('#about').removeClass('hidden');
//	延迟显示，防止出现CSS尚未加载时#about裸奔
	$('#fn-panel').removeClass('invisible');
	$('#ft .cpy .now').text((new Date).getFullYear());

	require('sometime/time-machine').init({ bookmark: location.hash.slice(1) });
	if (_.IE < 7 && location.hash != '#') location.hash = '';
//	对IE6不实时更新书签，若是通过书签进入，则清除书签
//	即使无书签，location.hash在IE6下仍旧返回'#'

//	for desktop browsers
	if (!_.MOBILE) {
		if (!(_.IE < 7)) {
			Rewinder.init();
			Discman.init({
				station: 'http://disc.sometime.me/disc/'
//				station: '/disc/'
			,	shuffle: true
			,	tracks: [
					['Linhai_Deng_Liming.mp2', '林海 - 等，黎明']
				,	['Liuxing_The_Tree_I.mp2', '刘星 - 树']
				,	['Linhai_ZaijianWangshi_Zaijian.mp2', '林海 - 再见往事，再见']
				,	['Linhai_Chuqiu.mp2', '林海 - 初秋']
				,	['Linhai_YuanfangdeJijing.mp2', '林海 - 远方的寂静']
				,	['Linhai_Mishi.mp2', '林海 - 迷失']
				,	['RenjianSiyuetian_WoDenghouNi.mp2', '人间四月天 - 我等候你']
				,	['Wuna_GuqinZhiYue.mp2', '巫娜 - 一叶一菩提']
				,	['Joe_Hisaishi_Departures.mp2', '久石让 - Departures']
				]
			,	uijPlayer: '#fn-panel .discman .jplayer'
			,	uiBtn: '#fn-panel .discman.btn'
			});
			_.DEBUG && Discman.off();
		}
		require('sometime/patcher').init();
	}
	else $('#fn-panel').hide();
	
//	beep after focusing on my portrait
	if (_.AUDIO) {
		$('<audio>', { id: 'focusing', src: '/images/focusing.wav', preload: 'auto' })
		.insertAfter('#about .pic');

		$('#about').on('mouseenter', function() {
			var $uiAbout = $(this);
			
			setTimeout(function() {
				// if ($uiAbout.css(_.VENDOR + 'filter') == 'blur(0px)')
				$('audio#focusing').prop('volume', .6)[0].play();
			}, 700);
		});
	}

	require('widgets/themes/switcher').init();
//	apply themes

//	require('widgets/ga').init();
//	statics(GA通过<script>加载以统计页面加载时间)
});

