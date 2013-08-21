/* BOF
 * Time Machine (progressive content loader)
 * Coded by c9h10n2o in 2012.5 ~ 2013.8
 * @preserve http://sometime.me
 * Project home: https://github.com/c9h10n2o/sometime.me
 * 数码按事件整理专辑，胶片按事件或主题（对于零散的）整理专辑，与同事件/时期数码合并
 * 由于采用Timeline设计，不适合分类性专辑，只适合事件性专辑
 * 纵高均不超过759px（考虑较普及的高分屏以及结合max-height支持低分屏的较好兼容方案）
 */

define(function(require, exports) {

	require('css/block-styles.css');
	
	require('$.tmpl')($);
	require('$.lazyload')($, window, document);
//	require('$.hashchange')($, window);

	var config = {
			api: {
				_get: function(apiName) {
					return this._server + this._base + this[apiName]
					+ (_.DEBUG ? '?debug=1' : '');
				}
			,	_server: _.SERVER
			,	_base: '/time-capsule'
				
//			,	getRolls: '/sample/roll.json'
			,	getRolls: '/roll.php'
			,	getDetail: '/detail.php'
//			,	getDetail: '/sample/detail-image.json'
//			,	getDetail: '/sample/detail-video.json'
//			,	getDetail: '/sample/detail-text.json'
//			,	getComments: '/sample/comments.json'
			,	getComments: '/comments.php'
			,	postComment: '/comments.php'
			,	vote: '/vote.php'
			}
			
		,	bookmark: ''
//			#!123[~456][/789]
//			load specified roll(s)/detail(optional)
//			123 = roll id in db
		,	bufferRolls: _.IE < 8 ? 1 : 2
//			amount of rolls per loading
		,	maxRollAmount: _.IE < 8 ? 6 : 9
//			max amount of rolls on the page
		,	thresholdRecallRoll: 0
//			pixels from #bd>.recalling top to window bottom
		}
	,	nextRollOffset = 0
//		roll offset is relative to the latest roll,
	,	bookmark = { enabled: false }
//		parsed bookmark data
	,	retryTimer = 0, retryCount = 0, maxRetry = 3
	
	,	isFirstLoad = true
//		scroll2body when first load
	,	isLoading = false
	,	isLoadingDetail = false
	,	isLoadingComments = false
	,	loadingStartTime = 0
//		loading start timestamp

	,	hitBof = false
//		hit BOF of time?
	,	userScrolled = false
//		user has scrolled after page loaded
	,	patternGetId = /^\w+-(\w+)$/i
//		get '123' from 'tile/roll-123'
//		lastHashDetailId;
//		for hashchange
	,	isDiscmanPaused4Video = false;

	exports.init = function(_config) {
		$.extend(config, _config || {});
		
//		for specified roll(s)
		if (config.bookmark) {
			var _bookmark = [];
			
			_bookmark = config.bookmark.split('/');
			_bookmark[0] = _bookmark[0].split('~');
//			parse the raw bookmark string
			bookmark = {
				enabled: true
			,	startRollId: _bookmark[0][0]
			,	endRollId: _bookmark[0][1] || _bookmark[0][0]
			,	detailId: _bookmark[1] || ''
			,	isRange: !!_bookmark[0][1] && _bookmark[0][1] != _bookmark[0][0]
			};
		}

		_.$WIN
		.on('scroll', floatTitle)
		.on('scroll.detectUserScroll', function() { userScrolled = true })
//		disable scroll2body
		.on('mousewheel.detectUserScroll', function() { _.$BD.stop() })
//		stop scroll2body animation when user scrolling
		.on('resize', snapDate)
		.on('beforeunload', function() { location.hash = '' });
//		防止刷新时进入固定专辑（webkit不支持，FF支持但无效）
		
//		.on('hashchange', function() {
//			lastHashDetailId
//			&& !_.getStr(/\/(.+)/i, location.hash)
//			&& _.exitDarkroom();
//		});
//		TODO chrome bug, 有时不支持书签历史, issue 1016
//		放弃关联浏览器导航以增强稳定性, 同时本也不能只依赖后退来关闭detail

		recallRolls();

		setInterval(function() {
			if (_.isVisible('#bd>.recalling', config.thresholdRecallRoll)) recallRolls();

			if (_.isVisible($('#detail .comments .recalling'), 0, $('#detail'))) recallComments();
		}
		, _.IE < 8 ? 1600 : 800);

		setInterval(updateURLBookmark, _.IE < 8 ? 2000 : 1000);
		
//		require('widgets/loading-animator').init();
		_.bufferImgs(
			_.IE <= 6
			? ['ie-icn-btn-vote-red-on-black.gif', 'ie-icn-btn-vote-red-on-gray.gif']
			: 'icn-btn-vote-red.png'
		);
	};
	
//	load new buffer rolls or specified roll(via hash)
	function recallRolls() {

//		private functions (pre-defined for MOZ)

//		ajax callback - succ
		function succ(data) {
			if (bookmark.isRange) {
				var startRollIndex = -1;
				$.grep(data.rolls, function(v,i) {
					if(v.id == bookmark.startRollId) startRollIndex = i;
				});
				if (startRollIndex >= 0) data.rolls = data.rolls.slice(0, startRollIndex + 1);
//				reduce data.rolls by bookmark range limit
			}

//			fuck IE6
			if (isFirstLoad && _.IE <= 6 && !bookmark.enabled) {
				data.rolls.unshift({
					id: 0
				,	offset: 0
				,	title: "从今天起，告别您的IE6！"
				,	folder: 'misc'
				,	blocks: [{
						style: '1'
					,	date: '2001.8.27 - 2010.3.1'
						
					,	tiles: [{
							id: 0
						,	tile: 1
						,	type: 'misc'
						,	link: 'http://www.google.cn/chrome/intl/zh-CN/landing_chrome.html?hl=zh_cn'
						,	file: 'bye_ie6'
						,	title: '让我们收藏时光中的一切，除了您电脑上的IE6。 &gt; 点击下载 Google Chrome'
//							置于博古架众古玩或文物展柜之中的icon石雕或盘底纹样
						,	votes: 999
						}]
					}]
				});
			}
			
			printRolls(data.rolls);
//			冲印底片
			
			!data.rolls[0].id && data.rolls.shift();
//			fuck完事，恢复原状，不影响offset计算
			
			data.rolls.length
			&&	(!bookmark.enabled
				? nextRollOffset += data.rolls.length
				: bookmark.isRange
				  ? nextRollOffset = data.rolls[data.rolls.length - 1].offset + 1
				  : nextRollOffset += data.rolls[0].offset ? 0 : isFirstLoad ? 1 : data.rolls.length)
//				  single bookmark & not the latest roll
			
			retryCount = 0;
			
//			specified roll
			if (isFirstLoad && bookmark.enabled) {
				if (!data.rolls.length) {
//				not found
					alert('未能忆起指定的专辑(#' + config.bookmark.split('/')[0] + ')。\n\n也许，她已被遗忘在时光深处，相见不如怀念 :)');
					location = '/';
				}
			}
			
//			hit BOF
			if (data.rolls.length < amount
			|| data.count < nextRollOffset + 1
			|| bookmark.isRange && data.rolls[data.rolls.length - 1].id == bookmark.startRollId) {
//				$('#bd>.recalling').html('如果，人生可以如此倒片，<span class="symbols">。</span>');
				$('#bd>.recalling').html('如果，人生可以如此倒片，');
				hitBof = true;
			}

			if (isFirstLoad){
				setTimeout(function() {
					!(_.IE <= 6) ? scroll2Body(loadDetailBookmark) : loadDetailBookmark();
				}
				, _.IE < 9 ? _.IE < 8 ? 3000 : 1500 : 1000);
//				delay to boost animation
				isFirstLoad = false;
			}
			
			document.title = '断章 - '
				+ parseInt((new Date - new Date(data.birthday)) / 1000 / 3600 / 24) + '天，'
				+ data.moments + '个瞬间';
		}
		
//		ajax callback - fail
		function fail(xhr, statusText) {
			isLoading = false;
			if (retryCount < maxRetry) {
				clearTimeout(retryTimer);
				retryTimer = setTimeout(function() {
					retryCount++;
					recallRolls();
				}
				, 2000);
			}
			else retryCount = 0;
			_.ajaxError.call(this, xhr, statusText);
		}
		
		function loadDetailBookmark() {
			$('.roll .tile[data-id=' + bookmark.detailId + ']:first')
				.trigger('click');
		}
		
//		END private functions
		
		var amount = config.bufferRolls;
		
		if (new Date - loadingStartTime < 1000 || isLoading || hitBof) return;
		clearTimeout(retryTimer);
		loadingStartTime = new Date();
		isLoading = true;
		
		$.ajax({
			dataType: 'json'
		,	url: config.api._get('getRolls')
//		,	cache: false
		,	data: isFirstLoad && bookmark.enabled
			? {
				start_id: bookmark.startRollId
			,	end_id: bookmark.endRollId
			,	amount: amount
			}
//			load specified roll
			: {							
				offset: nextRollOffset
			,	amount: amount
			}
//			load next roll in turn
		,	success: succ
		,	error: fail
		});
	}
	
	function printRolls(data) {
		var $uiRolls = $('#tmpl-roll').tmpl(data);

		while($('.roll').length > Math.max(0, config.maxRollAmount - data.length))
			$('.roll:first').remove();
//		keep max amount of rolls on the page
		
		$('.tile', $uiRolls).each(function(i,v) {
			$.inArray($(v).data('id') + '', _.getCookieItem('voted', true)) >= 0
			&& $('.btn-vote', v).addClass('btn-voted');
		});
//		recover voting status via cookies

		$uiRolls
		.insertBefore('#bd>.recalling')
		.find('img[data-lazysrc]').lazyload({
			data_attribute: "lazysrc"
		,	threshold: _.$WIN.height() / 2
		,	effect: _.MOBILE && !_.IPAD || _.IE <= 6 ? 'show' : 'fadeIn'
		,	skip_invisible: false
//			false required for chrome(lazy bug)
//		,	container: window
//		,	event: 'scroll'
		});
		
		$('.title .txt', $uiRolls)
		.each(function(i,v) { updateTileTitleTxtW(v) });
//		correct the max width of title text

		snapDate($('.date', $uiRolls));
		$uiRolls
		.on('click tap', '.tile', showDetail)
		.on('click tap', '.btn-vote', vote);
		if (_.IPAD) $('.title', $uiRolls).css('opacity', 1);
//		belatedPNG works but causes btn-vote unclickable
//		if (_.IE <= 6) $('.btn-vote', $uiRolls).fixPng();

//		if (!_.MOBILE) {
		if (!_.IOS) {
//		iOS UI重绘优先级高于脚本，导致floatTitle无法实时定位
//			$uiRolls.hide();
//			fake loading delay
//			setTimeout(function() {
				isLoading = false;
				$uiRolls.fadeIn(function() { floatTitle($uiRolls) });
//			}
//			, 500);
			
//			patch for IE fade fx
			_.IE && $('.tile-image, .tile-video, .tile-map', $uiRolls)
//			.hover(
//				function() {
//					$('.title', this).animate({opacity: .7}, _.IE <= 6 ? 0 : 500);
//				}
//		   	,	function() {
//		   			$('.title', this).animate({opacity: 0}, _.IE <= 6 ? 0 : 500);
//		   		}
//		   	);
			.hover(
				function() {
					$('.title', this).fadeIn(_.IE <= 6 ? 0 : 500);
				}
		   	,	function() {
		   			$('.title', this).fadeOut(_.IE <= 6 ? 0 : 500);
		   		});
			   		   
//			patch for IE6 btn-vote fade fx
			_.IE <= 6 && $('.btn-vote', $uiRolls)
			.hover(
				function() { $(this).addClass('hover') }
		   	,   function() { $(this).removeClass('hover') });
			   		   
//			patch for IE6 PNG alpha
			_.IE <= 6 && $('.btn-play', $uiRolls).fixPng();
		}
		else isLoading = false;
		
		return $uiRolls;
	}

	function updateTileTitleTxtW(uiTxt) {
		var $uiTxt = $(uiTxt);
		
		$uiTxt.css({
			maxWidth: $uiTxt.parent('.title').width()
			- $uiTxt.siblings('.btn-vote')[0].offsetWidth
			- $uiTxt[0].offsetWidth + $uiTxt.width()
			- 2
		});
//		max width = title width - btn-vote width - txt padding/margin
//		- adjustment(IMPORTANT)
	}
	
	function floatTitle(uiRoll) {
		var winB;
		
//		if (_.IE) return;
		if (_.MOBILE || _.IE < 9) return;
		uiRoll = (uiRoll && uiRoll.target ? undefined : uiRoll) || '.roll';
//		filter pass-in event object
		
		winB = _.$WIN.height();
		
		$(uiRoll).each(function(i,v) {
			var rollT = _.getClientY(v)
			,	isBelow = rollT < 0;
//				roll top below or under cur screen
				
			if (!_.isVisible(v, 500)) return isBelow;
//			for invisible rolls(tolerance for too fast scrolling)
//			continue(below) or break(under)

			$('.block', v).each(function(ii,vv) {
				$('.tile-image, .tile-video, .tile-map', vv).each(function(iii,vvv) {
					var $uiTitle = $('.title', vvv)
					,	tileT = _.getClientY(vvv)
					,	tileB = tileT + vvv.offsetHeight
					,	titleH = $uiTitle.height()
						
//						new css values
					,	titlePos = tileT < winB - titleH &&	tileB > winB ? 'fixed' : 'absolute'
					,	titleT = titlePos == 'absolute' && tileT > winB - titleH
						? 0
						: 'auto'
					,	titleB = titlePos == 'absolute' && !titleT
						? 'auto'
						: 0;

					$uiTitle.css({
						position: titlePos
					,	top: titleT
					,	bottom: titleB
					,	width: $(vvv).width()
					});
				});			
			});
		});
	}
		
	function detectVisibleRolls(isMaxVisibleOnly) {
		var _uiVisibleRolls = []
		,	maxVisibleH = 0, _uiMaxVisibleRoll
		,	winB = _.$WIN.height();
			
		$('.roll').each(function(i,v) {
			var	rollH = $(v).height()
			,	rollT = _.getClientY(v)
			,	rollB = rollT + rollH
			,	isBelow = rollT < 0
//				roll top below or under cur screen
			,	visibleH;
//			% of visible height

			if (!_.isVisible(v)) return isBelow;
//			for invisible rolls, continue(below) or break(under)
			else _uiVisibleRolls.push(v);
			
			if (isMaxVisibleOnly) {
				visibleH = isBelow
				? rollB / rollH
				: (winB - rollT) / rollH;
	
				if (visibleH > maxVisibleH) {
					maxVisibleH = visibleH;
					_uiMaxVisibleRoll = v;
				}
			}
		});
		return isMaxVisibleOnly ? _uiMaxVisibleRoll : _uiVisibleRolls;
	}
	
	function updateURLBookmark() {
		var $uiCurRoll, curRollId = '', curRollTitle = ''
		,	$uiCurDetail, curDetailId = ''
		,	hash = '', title = document.title.split(' - ');
		
		$uiCurRoll = $(detectVisibleRolls(true));
		$uiCurDetail = $('#detail:visible');
			
		if ($uiCurRoll[0]) {
//			curRollId = _.getStr(patternGetId, $uiCurRoll[0].id) / 1;		
			curRollId = $uiCurRoll.data('id') / 1 || curRollId;
			curRollTitle = $uiCurRoll.data('title');
		}
		
		if (curRollId && $uiCurDetail[0])
			curDetailId = $uiCurDetail.data('id') / 1 || curDetailId;

		if(curRollTitle)
			title.length > 2 ? title[0] = curRollTitle : title.unshift(curRollTitle);

		hash = (curRollId && '#!' + curRollId) + (curDetailId && '/' + curDetailId);

//		hash =
//			location.hash
//			&& location.hash.replace(/(#!.+)\/?/i, curRollId + '/')
//		||
//			curRollId
//			&& '#!' + curRollId;
		
		if (hash && hash != location.hash) location.replace(hash);
//		{
//			!lastHashDetailId && curDetailId
//			? (location.href = hash, lastHashDetailId = curDetailId)
//			: location.replace(hash);
//		}
		document.title = title.join(' - ');
	}
	
//	snap film-date to left side
	function snapDate(uiDate) {
		var offsetX;
		
		if (_.MOBILE && !_.IPAD) return;
		uiDate = uiDate && uiDate.target ? undefined : uiDate;
//		filter pass-in event object
	
		$(uiDate || '.block>.date, #detail>.content>.date')
		.each(function(i,v) {
			offsetX = Math.round(($(v).parent().width() - _.$BD.width() - $(v).width()) / 2 + 10);
//			10 = film-bg-pos-x / 2
			$(v).css('left', offsetX);
		});
	}
	
	function showDetail(e, isAutoNav) {		
		
//		private functions (pre-defined for MOZ)
		
//		ajax callback  - succ
		function succ(data) {
			var $uiDetail;
			
			isLoadingDetail = false;
			if (!$('#darkroom.enter')[0]) return;
//			detail opened or darkroom closed

			$uiDetail = $('#tmpl-detail')
			.tmpl(data, {
				folder: $uiSrcTile.parents('.roll').data('folder')
			,	swf: false
			,	videoTag: _.VIDEO
			})
			.appendTo('#bd');
			
			$('.btn-vote', $uiSrcTile).hasClass('btn-voted')
			&& $('.btn-vote', $uiDetail).addClass('btn-voted');
//			recover voting status via the corresponding tile
			
//			pause bg music
			if(data.type == 'video' && !Discman.isPaused) {
				Discman.off();
				isDiscmanPaused4Video = true;
			}

			$uiDetail
			.on('click tap', '.content, .tile, .comments', function(e) {
//			click to slide
//			.on('click tap', function(e) {
//			click to exit
				if (e.target == this || $(this).hasClass('tile'))
					exitDarkroom();
			})
			.on('click tap', '.video', function(e) {
				(e.pageY - $(this).offset().top) / this.offsetHeight > .8
				&& e.stopPropagation();
//				don't exit when clicking on video controls(<video> only)
			})
			.on('click tap', '.slide-area.l', prev)
			.on('click tap', '.slide-area.r', next)
			.on('click tap', '.btn-vote', vote)
			.children('.slide-area')
			.css({
				width: ($uiDetail[0].scrollWidth
				- $uiDetail.children('.content').width()) / 2
			,	height: $uiDetail[0].scrollHeight
			});
			
			_.$DE.on('keyup', function(e) {
				e.which == 37 && $('.slide-area.l:visible').trigger('click');
				e.which == 39 && $('.slide-area.r:visible').trigger('click');
			});
//			左右箭头键盘控制
			
			isTextType && $uiDetail.addClass('light-on');
			snapDate($('.date', $uiDetail));
			_.btnPressFx($('.comments .post .btn-submit', $uiDetail));

//			recallComments();
//			默认不加载评论, 以提高纯浏览性能(主要使用情形)
			
			setTimeout(function() { $uiDetail.addClass('show') }, 0);
			if (_.IE > 7) $uiDetail.hide().fadeIn(500);
//			fade-in detail

			setTimeout(function() { _.scrollIntoView($uiSrcTile) }
			, _.IE < 8 ? 0 : 500);
			
			$('#darkroom').removeClass('loading loading-white');
			
			$('.comments .post', $uiDetail)
			.on('click tap', '.btn-submit', postComment)
			.on('focus', 'textarea', function() {
				var that = this;
				if (!_.IE) $(this).addClass('expand');
				else {
					$(this).animate({
						width: 529
					,	height: 79
					,	maxWidth: 529
					,	maxHeight: 559
//					,	borderColor: '#999'
					}
					, _.IE <= 6 ? 0 : 300);
				}
				setTimeout(function(){
					$(that).parent('.something').siblings('.sig').fadeIn()
					if (_.IE) _.placeholder(that);
				}
				, _.IE <= 6 ? 0 : 800);
//				$(this).parent('.something').siblings('.sig').fadeIn();
//				setTimeout(function(){ _.scrollIntoView(this, null, $uiDetail) }
//				, _.IE <= 6 ? 0 : 300);
			})
			.on('focus', '[type=url]', function() {
				if (!this.value) {
					this.value = 'http://';
//					_.pressKey('DOM_VK_RIGHT', 39);
//					simulator RIGHT key to move cursor to end
//					try using textEvent to insert 'http://'?
					_.select(this, -1);
//					move cursor to end
				}
			})
			.on('keydown', 'textarea, input', function(e) {
				if (e.which == 13
				&& (this.tagName.toLowerCase() != 'textarea' || e.shiftKey)) {
//				enter on input, or shift + enter on textarea

					postComment();

					e.preventDefault();
				}
			});
		}
		
//		ajax callback - fail
		function fail(xhr, statusText) {
			isLoadingDetail = false;
			_.ajaxError.call(this, xhr, statusText);
		}
		
		function postComment() {

//			private functions (pre-defined for MOZ)
		
//			ajax callback  - succ
			function succ(data) {
				$uiPost.fadeOut(function() {
					$('#tmpl-detail-comment')
					.tmpl({
						something: formData.something
					,	someone: formData.someone
					,	someplace: data.someplace
					,	somewhere: formData.somewhere
					,	sometime: data.sometime
					})
	//				.replaceAll($uiPost)
					.insertAfter($uiPost)
					.hide().fadeIn();
				});
			}
			
//			ajax callback - fail
			function fail(xhr, statusText) {
				_.ajaxError.call(this, xhr, statusText);
			}

//			END private functions

			var $uiDetail = $('#detail')
			,	$uiPost = $('.comments .post', $uiDetail)
			,	formData = _.serializeJSON($uiPost, true);

			if (!formData.something) return;
			formData.id = id;
//			formData.somewhere = formData.somewhere.replace(/http:(\/)*/g, '');
			formData.somewhere = formData.somewhere.replace(/^(http:(\/)*)+/, '');
			formData.somewhere = formData.somewhere
			&& 'http://' + formData.somewhere;

			$.ajax({
				type: 'POST'
			,	dataType: 'json'
			,	url: config.api._get('postComment')
//			,	cache: false
			,	data: formData
			,	success: succ
			,	error: fail
			});

		}
		
		function prev() {
			var $uiPrevBlock = $uiSrcTile.parents('.block')
			,	_uiPrevTile = (function($uiTile) {

					var r = $uiTile[0]
						|| $uiTile.prevAll('.tile[data-id]:not(.tile-words):first')[0]
						|| $uiPrevBlock[0]
						&& ($uiPrevBlock = $uiPrevBlock.prev('.block'))
						&& arguments.callee($('.tile[data-id]:not(.tile-words):last', $uiPrevBlock));
	//					recursive query across blocks
									
						return r;
		
					})($uiSrcTile.prevAll('.tile[data-id]:not(.tile-words):first'));

			_uiPrevTile
			? $(_uiPrevTile).trigger('click', true)
			: exitDarkroom();
		}
		
		function next() {
			var $uiNextBlock = $uiSrcTile.parents('.block')
			,	_uiNextTile = (function($uiTile) {
						
					var r = $uiTile[0]
						|| $uiTile.nextAll('.tile[data-id]:not(.tile-words):first')[0]
						|| $uiNextBlock[0]
						&& ($uiNextBlock = $uiNextBlock.next('.block'))
						&& arguments.callee($('.tile[data-id]:not(.tile-words):first', $uiNextBlock));
//						recursive query across blocks
					
					return r;
	
				})($uiSrcTile.nextAll('.tile[data-id]:not(.tile-words):first'));

			_uiNextTile
			? $(_uiNextTile).trigger('click', true)
			: exitDarkroom();
		}
		
//		END private functions

		var $uiSrcTile
		,	$uiLastDetail
		,	id
		,	type
		,	isTextType;

//		if ($('#detail.show')[0]) return;
		if (isLoadingDetail) return;

		$uiSrcTile = $(this);
		$uiLastDetail = $('#detail');
//		id = _.getStr(patternGetId, $uiSrcTile[0].id);
		id = $uiSrcTile.data('id');
		type = $uiSrcTile.data('type');
		isTextType = type == 'text' || type == 'words';

		if (!id || $uiSrcTile.parent('a')[0]) return;
//		no detail for tiles with a link
		isLoadingDetail = true;
		
//		_.scrollIntoView($uiSrcTile, function(){
//		scrollIntoView动画置后, 以减少detail画面停顿等待

			!isAutoNav && renderGhostFx($uiSrcTile);
			enterDarkroom(isTextType, hideDetail, function() {
//				$(detectVisibleRolls()).addClass('blur');
//			});
//			将加载detail置于darkroom淡入之后以提高darkroom淡入流畅度

//				if cached
//				仅缓存上一个使用和性能(DOM和Net)意义都不大(缓存所有则影响性能)
//				重看上一个几率不大, Ajax304+图片缓存方案更佳
//				且由于没有重新执行ajax-succ-tmpl并由此重新创建和绑定prev/next函数及其闭包
//				导致prev/next及其闭包依旧为上次创建的, $uiSrcTile等无法更新, 引起nav bug
//				if (id == $uiLastDetail.data('id')) {
//					isLoadingDetail = false;
//					_.IE ? $uiLastDetail.fadeIn(500) : $uiLastDetail.show();
//					setTimeout(function() { $uiLastDetail.addClass('show') }, 0);
//					 fade-in cached detail
//				}
//				else {
					hideDetail(null, function() {
						$uiLastDetail.remove();
//						remove cached detail
						
						$('#darkroom').addClass('loading');
						if (!isTextType) $('#darkroom').addClass('loading-white');
			
						$.ajax({
							dataType: 'json'
						,	url: config.api._get('getDetail')
//						,	cache: false
						,	data: {
								id: id
							,	comment: 10
//								amount of comments in detail data
							}
						,	success: succ
						,	error: fail
						});
					});
//				}
			});
//		});
	}

	function hideDetail(e, callback) {
		var $uiDetail = $('#detail');

//		$('.roll').removeClass('blur');
		$uiDetail.removeClass('show');
//		$('.video', $uiDetail).remove();
//		stop video immediately (but changes layout)
//		try { $('.video', $uiDetail)[0].pause() } catch(e){}
//		用于缓存detail的方案
		setTimeout(function() {
			$uiDetail.remove();
//			$uiDetail.hide();
//			用于缓存detail的方案
			callback && callback();
		}
		, _.IE < 8 ? 0 : 500);
		if (_.IE > 7) $uiDetail.fadeOut(500);
//		fade-out & hide detail
//		淡出不流畅, 取消, 以保证darkroom相对流畅淡出

//		resume bg music
		if(isDiscmanPaused4Video) {
			Discman.on();
			isDiscmanPaused4Video = false;
		}
	}

	function recallComments() {
	
//		private functions (pre-defined for MOZ)
		
//		ajax callback  - succ
		function succ(data) {
			isLoadingComments = false;
			if (!$('#darkroom.enter')[0]) return;
//			detail(darkroom) aleady closed
		
			$('#tmpl-detail-comment').tmpl(data.comments)
			.insertBefore($('.comments .recalling', $uiDetail))
			.hide().fadeIn();
			
			curOffset += data.comments.length;
			
			if (data.comments.length < pageSize || data.count < curOffset){
				$('.comments .recalling', $uiDetail)
				.fadeOut(function() {
					if (curOffset > 1) $('.comments .bof', $uiDetail).fadeIn();
				});
			}
			
			$uiDetail.children('.slide-area')
			.css('height', $uiDetail[0].scrollHeight);
		}
		
//		ajax callback  - fail
		function fail(xhr, statusText) {
			_.ajaxError.call(this, xhr, statusText);
		}
		
//		END private functions

		var $uiDetail
		,	detailId
		,	curOffset = 1
//			comment offset for next loading, from 1
		,	pageSize = 5;
		
		if (isLoadingComments) return;
		
		$uiDetail = $('#detail');
		detailId = $uiDetail.data('id');
		curOffset = $('.comments .comment', $uiDetail).length + 1;
		
		$.ajax({
			dataType: 'json'
		,	url: config.api._get('getComments')
//		,	cache: false
		,	data: {
				id: detailId
			,	offset: curOffset
			,	amount: pageSize
			}
		,	success: succ
		,	error: fail
		});
	}

	function vote(e) {
	
//		private functions (pre-defined for MOZ)
		
//		ajax callback  - succ
		function succ(data) {
			$('.btn-vote', '.tile[data-id="' + id + '"], #detail')
			.text(data.count || '');
//			由于遮盖性，如果有#detail，则必是所vote的，故不必再判断detail[data-id]
			_.setCookieItem('voted', id, isVoted ? 'remove' : 'append');
		}
		
//		ajax callback  - fail
		function fail(xhr, statusText) {
			_.ajaxError.call(this, xhr, statusText);
		}
		
//		END private functions
		
		var $uiEl = $(this)
//		,	id = _.getStr(patternGetId, $uiEl.parents('[data-id]')[0].id)
		,	id = $uiEl.parents('[data-id]').data('id')
		,	isVoted = $uiEl.hasClass('btn-voted')
		,	votes = $uiEl.text() / 1 || 0;
			
		votes += isVoted ? -1 : 1;
		votes = votes < 0 ? 0 : votes;
		$uiEl.text(votes || '');
		
		isVoted
		? $uiEl.removeClass('btn-voted')
		: $uiEl.addClass('btn-voted');

		updateTileTitleTxtW($uiEl.prev('.txt'));

		if ($uiEl.parents('#detail')[0])
			$('.tile[data-id="' + id + '"] .btn-vote').trigger('click');
		else {
//			send request after animation
			setTimeout(function() {
				$.ajax({
					dataType: 'json'
				,	url: config.api._get('vote')
//				,	cache: false
//					用缓存防止频繁喜欢
//					服务端可根据缓存日期判断操作是否有效, 但均返回最新count
				,	data: {
						id: id
					,	action: isVoted ? 'cancel' : 'vote'
					}
				,	success: succ
				,	error: fail
				});
			}
			, 500);
		}
		
		e.stopPropagation();
	}
	
	function scroll2Body(callback) {
		var delta = Math.max(0, $('#hd').height() - _.PAGESCROLL.scrollTop)
//			如果其他原因导致此时滚动已超过头部高度, 则取消scroll2Body
		,	winH = _.DE.clientHeight
		,	rollH = $('.roll:first').height();

		if (!userScrolled && delta / winH > .2) {
			if (rollH <= winH) delta -= (winH - rollH) / 2;
			_.$PAGESCROLL.animate({ scrollTop: delta }, 1200, function() {
				_.$WIN.off('.detectUserScroll');
				callback && callback();
			});
		}
		else callback && callback();
	}
	
	function enterDarkroom(isLightOn, onExit, onEnter) {
		var $uiMask = $('#darkroom')
		,	scrollT = _.PAGESCROLL.scrollTop;
			
		if (!$uiMask[0]) $uiMask = $('<div>', { id: 'darkroom' }).appendTo(_.BD).hide();

		$uiMask.off();
		setTimeout(function() {
			$uiMask
			.on('click tap', exitDarkroom)
			.on('enter', onEnter)
			.on('hide', onExit)
			.trigger('enter');
			
			_.$DE.on('keydown', function(e) { e.which == 27 && exitDarkroom() });
//			press ESC to exit
		}
		, $uiMask.hasClass('enter') || _.IE < 8 ? 0 : 1000);

		isLightOn ? $uiMask.addClass('light-on') : $uiMask.removeClass('light-on');
		$uiMask.show();
		setTimeout(function() { $uiMask.addClass('enter') }, 0);
		if (_.IE > 7) $uiMask.fadeIn(1000);
//		fade-in mask

		_.$DE.css({
			overflow: 'hidden'
		,	paddingRight: _.SCROLLBARW
		});

		if (_.MOZ) _.PAGESCROLL.scrollTop = scrollT;
//		FF reset scrollTop to 0 when changing overflow
//		so, recover it here
	}

	function exitDarkroom() {
		var $uiMask = $('#darkroom.enter')
		,	scrollT = _.PAGESCROLL.scrollTop;

		if (!$uiMask[0]) return;

		$uiMask.trigger('hide');
//		$uiMask.trigger('hide', function() {
			$uiMask.removeClass('enter');
//			$uiMask.addClass('exit');
//			css animation version
			if (_.IE > 7) $uiMask.fadeOut(1000);
//			fade-out mask
	
			setTimeout(function() {
				$uiMask.hide();
				_.$DE.css({
					overflow: 'auto'
				,	paddingRight: 0
				});
				if (_.MOZ) _.PAGESCROLL.scrollTop = scrollT;
			}
			, _.IE < 8 ? 0 : 1000);
//		});
	}
	
	function renderGhostFx($uiEl) {
		var $uiGhostEl;

		if (_.IE) return;
		if ($uiEl.siblings('.ghost-zoom')[0]) return;
//		duplicated animation running

		$uiGhostEl = $uiEl.clone(false);
//		clone without data & events to disable interaction

		$uiGhostEl
		.insertAfter($uiEl)
		.addClass('ghost-zoom')
		.find('.title').css('opacity', 1);
//		create ghost node
			
		setTimeout(function() { $uiGhostEl.addClass('gz-active') }, 0);
//		run ghost animation
		setTimeout(function() { $uiGhostEl.remove() }, 500);
		
		return $uiGhostEl;
	}
});

/********************** 写在最后 ***********************
 * 有机会亲手一针一线缝制这样一个悦目又能珍藏光阴的人生珠宝盒，
 * 是我青春里最奢侈的体验。
 * 如果你读到这一行，那是我们的缘。:)
 ************************ EOF *************************/