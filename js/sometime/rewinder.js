/* Rewinder (back2top button)
 * Coded by c9h10n2o in 2012.5
 * @preserve http://sometime.me
 */

define(function(require, exports) {

	if (!_.IE || _.IE > 6) require('$.jplayer')($);

	var config = {
			animationDuration:	_.IE > 7 ? 0 : 800
//			0 to disable animation, sec
		,	minScrollScreens: 	4
//			show Rewinder button after scrolling n screens
		,	uiBtn:				'#fn-panel .btn.rewinder'
		,	uiJplayer:			'#fn-panel .btn.rewinder .jplayer'
//			jPlayer container
		}
	,	uiJplayer
	,	enabled = false;
		
	exports.init = function(_config) {	
		var rollStartTime = 0
		,	Sound;
			
		$.extend(config, _config || {});
		uiJplayer = $(config.uiJplayer);
		
		Sound = {
			_file: {
				'roll': '/images/btn-rewinder-snd-roll.mp3'
			,	'release': '/images/btn-rewinder-snd-release.mp3'
			}
		,	init: function() {
				if (_.IE <= 6) return;
				
				uiJplayer
				.hide()
				.jPlayer({
					preload:	'auto'
				,	swfPath:	'/js/libs/jquery/plugins/jplayer/2.1.0/'
				,	volume:		1
				})
				.jPlayer('setMedia', {
					mp3: this._file['roll']
				,	mp3: this._file['release']
				});
			}
		,	play: function(sndId) {
				if (_.IE <= 6) return;

				uiJplayer.jPlayer('setMedia',
					{ mp3: this._file[sndId] }).jPlayer('play');
			}
		,	pause: function() {
				if (_.IE <= 6) return;
				
				uiJplayer.jPlayer('pause');;
			}
		};

		Sound.init();
		
		$(config.uiBtn)
		.on('mouseup', function() {
		  	if (!enabled || !rollStartTime) return;
//		  	hold time > 200
		  	if (new Date - rollStartTime > 200) {
			  	$(this).removeClass('pressed');
				Sound.pause('roll');
				Sound.play('release');
			}
			else setTimeout(function() {
					$(this).removeClass('pressed');
				}
				, config.animationDuration);
			rollStartTime = 0;
		  	back();
		})
		  
		.on('mousedown', function(e) {
		  	if (!enabled) return;
			e.preventDefault();
		  	rollStartTime = new Date;
		  	$(this).addClass('pressed');
		  	Sound.play('roll');
		})
		
		.on('mouseleave', function() {
			$(this).removeClass('pressed');
			rollStartTime = 0;
		});

		_.$WIN.on('scroll resize', redraw);
		redraw();
	};
	
	function redraw() {
		var bdW, r, minH
		,	uiBtn = $(config.uiBtn);
		
		uiBtn.removeClass('hdn').addClass('hdn2');
		bdW = $('#bd').width();
		uiBtn.removeClass('hdn2').addClass('hdn');
		
//		r = (_.$BD.width() - bdW) / 2 * .7 - uiBtn.width();
		minH = config.minScrollScreens * _.$WIN.height();

//		enabled = r > 20 &&  _.PAGESCROLL.scrollTop > minH;
		enabled = _.PAGESCROLL.scrollTop > minH;

//		enabled
//		? uiBtn.css({ 'right': r }).fadeIn(_.IE <= 6 ? 0 : 800)
//		: uiBtn.fadeOut(_.IE <= 6 ? 0 : 800);
		enabled
		? uiBtn.fadeIn(_.IE <= 6 ? 0 : 800)
		: uiBtn.fadeOut(_.IE <= 6 ? 0 : 800);

	}

	function back() {
		 _.$PAGESCROLL.animate({ scrollTop: 0 }, config.animationDuration);
	}
});