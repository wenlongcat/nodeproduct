'use strict';

;(function () {
  //设置swiper
  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    //切换swiper页时 触发回调
    onSlideChangeEnd: function onSlideChangeEnd(swiper) {
      $('.swiper-slide').eq(swiper.activeIndex).addClass('animate').siblings().removeClass('animate');
      //是否滑动到第三页
      if (swiper.activeIndex === 2) {
        $('.swiper-slide').eq(2).addClass('swiper-no-swiping');
      }
      //切到另外一页后清空动画属性
      if (swiper.previousIndex === 2) {
        $('.swiper-slide').eq(2).find('.bear').attr('style', '');
        $('.animation-bear-box div').attr('style', '');
        $('.normal-card div').attr('style', '');
        $('.hit-card-box div').attr('style', '');
      }
    }
  });
  //1.页面打开  稍等一会  开启定时器
  $(function () {
    //第一页
    setTimeout(function () {
      var load = $('.loading');
      load.addClass('animate');
      //检测动画是否完成
      $('.loading .step').on('animationend', function () {
        load.fadeOut(1000, function () {
          $('.welcome').addClass('animate');
        });
      });
    }, 1000);
    //第二页,长按事件longTap
    $('.welcome .rotate-btn-box').longTap(function () {
      //zepto 添加 css中的animation动画
      $('.bear-box').css('animation', 'bearDisappear 1s forwards');
      setTimeout(function () {
        $('.welcome').fadeOut(1000, function () {
          //为swiper的第一页添加 animate
          $('.page1').addClass('animate');
        });
      }, 1000);
    });

    //swiper的 第三页
    var swpSlide2 = $('.swiper-slide').eq(2);
    swpSlide2.on('click', function () {
      $(this).removeClass('swiper-no-swiping');
      swpSlide2.children('.bear').css('animation', 'none');
      var index = 0;
      var bearnum = $('.animation-bear-box div');
      var timer = setInterval(function () {
        bearnum.css('opacity', 0);
        $('.normal-card div').eq(index).css('animation', 'none');
        bearnum.eq(index).css('opacity', '1');
        $('.hit-card-box div').eq(index).css('opacity', '1');
        index++;
        if (index === 3) {
          clearInterval(timer);
          $('.hit-card-box div').css('animation', 'bearDisappear 1s  forwards');
          //开启滑屏
          setTimeout(function () {
            swpSlide2.removeClass('swiper-no-swiping');
          }, 1000);
        };
      }, 1000);
    });
  });
  //音频按钮
  var audioDom = $('audio');
  $('.audioControl').on('click', function () {
    if (audioDom[0].paused === true) {
      audioDom[0].play();
      $(this).addClass('animate');
      $(this).css('background-image', 'url("images/play.png")');
    } else {
      audioDom[0].pause();
      $(this).css('background-image', 'url("images/pause.png")');
      $(this).removeClass('animate');
    }
  });
})();
