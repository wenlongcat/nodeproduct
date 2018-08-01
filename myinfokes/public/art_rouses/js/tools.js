'use strict';

(function () {
  /*head头部功能*/
  $(".mask").eq(0).delay(1000).hide();
  var lis = $('#head .right li');
  var len = lis.length;
  var oaudio = $('#audio');
  for (var i = 0; i < len; i++) {
    lis.eq(i).hover(function () {
      var _src = $(this).attr('datasrc');
      $(this).children().addClass('animate');
      var src = "/www/music/" + _src + ".mp3";
      oaudio.attr('src', src);
      oaudio.get(0).play();
    }, function () {
      $(this).children().removeClass('animate');
    });
  };
})();
