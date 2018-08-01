'use strict';

(function () {
	var fir = function fir() {
		var oplane = $('.plane').eq(0);
		var textid = $('#betaAppHost').get(0);
		var startTime = 0; //开始时间
		var endTime = 0; //结束时间
		var startScroll = false; //默认不能滚动
		var pageM = 0;
		var flip = $('#flipRotate');
		var onav = $('.navbar').eq(0);
		var firShowArr = ["fir.im"];
		var firShow = $("#firShow").get(0);
		var allpage = 5; //5屏
		var textArr = ['BetaAppHost', '{', '　　return "fir.im"', '}'];
		var myfs = {
			init: function init() {
				setTimeout(function () {
					myfs.loading();
					setTimeout(function () {
						myfs.creattext(textid, textArr);
					}, 1500);
				}, 800);
				myfs.addScroll();
				myfs.usersHover();
			},
			addScroll: function addScroll() {
				//鼠标滚动事件
				var that = this;
				$(document).on("mousewheel DOMMouseScroll", function () {
					var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;

					e.preventDefault();
					if (startScroll) {
						startTime = new Date().getTime(); //得到时间戳
						var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
						if (endTime - startTime <= -1000) {
							//每屏之间切换间隔1000ms
							if (delta < 0) {
								//向下
								pageM++;
								if (pageM > allpage) {
									pageM = allpage;
									return false;
								}
								that.goPageDown(pageM);
							} else {
								//向上
								pageM--;
								if (pageM < 0) {
									pageM = 0;
									return false;
								}
								that.goPageUp(pageM);
							}
							endTime = new Date().getTime();
						} else {
							return false;
						}
					}
				});
			},
			creattext: function creattext(id, arr) {
				//动态文字
				var speed = 100;
				var oindex = 0;
				var len = arr.length;
				var strlen = arr[0].length;
				var brn = '';
				var end = 0;
				createstr();
				function createstr() {
					//具体功能
					id.innerText = brn + arr[oindex].slice(0, end) + "|";
					if (end === strlen) {
						end = 0;
						brn += arr[oindex] + "\r\n";
						oindex++;
						if (oindex < len) {
							//是否遍历结束
							strlen = arr[oindex].length;
							setTimeout(createstr, speed);
						} else {
							id.innerText = id.innerText.replace("|", "");
						}
					} else {
						end++;
						setTimeout(createstr, speed);
					}
				}
			},
			goPageDown: function goPageDown(pageNum) {
				var that = this;
				switch (pageNum) {
					case 1:
						onav.addClass('color-white');
						oplane.eq(0).addClass('plane-out');
						$('#betaAppHost').hide();
						setTimeout(function () {
							flip.addClass('flipRotate');
							$('.homePage').eq(0).hide();
						}, 2000);
						break;
					case 2:
						flip.removeClass("featuresAnimOut").addClass('featuresAnimIn');
						$('.container').eq(0).css({ "background-color": "#F2AB13" });
						break;
					case 3:
						flip.addClass('filpOut');
						$('#expanded').css('opacity', 0);
						$('.section-3').addClass('animateIn');
						break;
					case 4:
						$('.section-4').eq(0).addClass('reday');
						break;
					case 5:
						$('.section-5').eq(0).addClass('reday');
						onav.removeClass('color-white');
						$('#firShow').html('');
						setTimeout(function () {
							myfs.creattext(firShow, firShowArr);
						}, 800);
						break;
				}
			},
			goPageUp: function goPageUp(pageNum) {
				var that = this;
				var homepage = $('.homePage').eq(0);
				switch (pageNum) {
					case 0:
						var beta = $('#betaAppHost');
						onav.removeClass('color-white');
						flip.removeClass('flipRotate');
						homepage.show();
						homepage.removeClass('animate');
						oplane.removeClass('plane-out').addClass('plane-in');
						beta.html("");
						beta.show();
						setTimeout(function () {
							homepage.addClass('animate');
							oplane.removeClass('plane-in');
							myfs.creattext(textid, textArr);
						}, 1500);
						break;
					case 1:
						flip.removeClass('featuresAnimIn').addClass('featuresAnimOut');
						break;
					case 2:
						flip.removeClass('filpOut');
						setTimeout(function () {
							$('#expanded').css("opacity", 1);
							$('.section-3').removeClass('animayeIn');
						}, 800);
						break;
					case 3:
						$('.section-4').removeClass("reday");
						break;
					case 4:
						onav.addClass('color-white');
						$('.section-5').removeClass("reday");
						break;
				}
			},
			loading: function loading() {
				setTimeout(function () {
					$('.loading img').eq(0).hide();
					$('.yellow_cir').eq(0).addClass('animate');
					setTimeout(function () {
						$('.start').eq(0).fadeOut();
						myfs.planeIn();
						startScroll = true; //飞机进入就可开始滚动
						setTimeout(function () {
							oplane.removeClass('plane-in');
							$('.homePage').eq(0).addClass('animate');
						}, 2000);
					}, 1000);
				}, 800);
			},
			planeIn: function planeIn() {
				oplane.addClass('plane-in');
			},
			usersHover: function usersHover() {
				var users = $('.users-wrapper').eq(0);
				users.find('.item').on("mouseover", function () {
					$(this).addClass('active').siblings().removeClass('active');
					$(this).parents('.container').attr('class', 'container');
					$(this).parents('.container').addClass($(this).data('item'));
					return false;
				});
			}
		};
		myfs.init();
		// 返回方法对象
		return myfs;
	};
	window.firs = fir;
})();
