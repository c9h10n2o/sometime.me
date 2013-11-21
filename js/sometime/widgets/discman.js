/* Discman (bg music player)
 * Coded by c9h10n2o in 2012.5
 * @preserve http://sometime.me
 */

define(function(require, exports) {
	
	require('$.jplayer');

	var config = {
			station:		'/disc/'
//			lib dir
		,	tracks: 		[]
//			default playlist
		,	loop:			-1
//			list-loop, -1 for infinite
		,	shuffle:		false
		,	volume:			1
//			initial volume
		,	uijPlayer:		'#jplayer'
//			jPlayer container
//			SWF used by jPlayer for non-HTML5 browsers
		,	uiBtn:			'.btn-discman'
//			switcher button
		}
	,	$uijPlayer = null
	,	$uiBtn = null
	,	cur = -1
//		current track index
	,	curVol = 1
//		current volume
	,	volTimer;
//		volume fade timer
	
	exports.isPaused = false;
	exports.isPausedByUser = false;
//	paused by UI event (clicking button or trigger)
	
	exports.init = function(_config) {
		$.extend(config, _config || {});
		
		$uijPlayer = $(config.uijPlayer);
		$uiBtn = $(config.uiBtn);
		
		if (config.shuffle)
			config.tracks.sort(function() { return Math.random() > .5 });
			
		($uijPlayer = $(config.uijPlayer))
		.hide()
		.jPlayer({
			ready:		exports.on
		,	ended:		exports.next
		,	swfPath:	'/js/libs/jquery/plugins/jPlayer/2.4.0/'
		,	volume:		config.volume
//		,	solution:	_.FF ? 'html5' : ''
		});
	};

	exports.next = function() {
		if (++cur < config.tracks.length) {
			$uijPlayer.jPlayer('setMedia',
				{ mp3: config.station + config.tracks[cur][0] }).jPlayer('play');
		}
		else if (--config.loop != 0) {
			$uijPlayer.jPlayer('setMedia',
				{ mp3: config.station + config.tracks[cur = 0][0] }).jPlayer('play');
		}
		$uiBtn.attr('title', config.tracks[cur][1]);
	};

	exports.on = function(e) {
		if (exports.isPaused) {
			$uijPlayer.jPlayer('play');
			fade2Volume(config.volume);
			exports.isPaused = false;
			exports.isPausedByUser = false;
		}
		else {
			exports.next();
			$uiBtn.fadeIn();
		}
		$uiBtn.off('click').on('click', exports.off);

		if(e && e.type == 'click') $('.debussy audio').prop('volume', 0);
//		mute debussy
	};

	exports.off = function(e) {
//		pass event data { isInternal: true } to simulate user action
		fade2Volume(0, function() {
			$uijPlayer.jPlayer('pause');
			exports.isPaused = true;
			exports.isPausedByUser = !!e && !(e.data && e.data.isInternal);
		});
		$uiBtn.off('click').on('click', exports.on);

		$('.debussy audio').prop('volume', e && e.type == 'click' ? 1 : 0);
//		resume debussy if user turns off bgm
//		mute debussy if called internally, such as playing video
	};

	function fade2Volume(target, callback) {
		clearInterval(volTimer);
		volTimer = setInterval(function() {
			var v = curVol
			,	delta = Math.min(Math.abs(v - target), .05);
			if (v < target) $uijPlayer.jPlayer('volume', v += delta);
			else if (v > target) $uijPlayer.jPlayer('volume', v -= delta);
			else {
				clearInterval(volTimer);
				if (callback) callback();
			}
			curVol = v;
		}
		, 50);
	}
});