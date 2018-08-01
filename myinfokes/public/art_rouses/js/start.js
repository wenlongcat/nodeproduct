'use strict';
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var boxlis = $('.demobox li');
  var list_lis = $('.list li');
  var music = $('#music');
  $(document).ready(function () {
    /*demobox板块功能*/
    setTimeout(function () {
      var obox = $('.demobox').eq(0);
      obox.addClass('animate');
      setTimeout(function () {
        obox.removeClass('animate').addClass('noshow');
        $('.list').eq(0).show();
        /*music进入*/
        (function () {
          var music = $('#music');
          var ods = $('#music>div');
          var fisaudio = $('#fisaudio');
          var ifplay = $('.ifplay').eq(0);
          var mucnum = 0; //初始音乐
          var len = ods.length;
          var audioArr = ['/www/music/modswwb.mp3', '/www/music/adjcdd.mp3', '/www/music/yy.mp3', '/www/music/yb.mp3', '/www/music/cbg.mp3'];
          music.addClass('animate');
          for (var i = 0; i < len; i++) {
            ods.eq(i).attr('index', i);
            ods.eq(i).hover(function () {
              $(this).toggleClass('select');
            });
            ods.eq(i).on('click', function () {
              var _this = $(this);
              if (_this.attr('index') == "0") {
                if (_this.hasClass('selected')) {
                  fisaudio.get(0).pause();
                  _this.removeClass('selected play');
                } else {
                  fisaudio.get(0).play();
                  _this.addClass('selected play');
                }
              }
              if (_this.attr('index') == "1") {
                mucnum--;
                mucnum = mucnum < 0 ? audioArr.length - 1 : mucnum;
                fisaudio.attr('src', audioArr[mucnum]);
                fisaudio.get(0).play();
                ifplay.addClass('selected play');
              }
              if (_this.attr('index') == "2") {
                mucnum++;
                mucnum = mucnum % len;
                fisaudio.attr('src', audioArr[mucnum]);
                fisaudio.get(0).play();
                ifplay.addClass('selected play');
              }
            });
          }
        })();

        /*展示页进入*/
        [].concat(_toConsumableArray(list_lis)).forEach(function (item, index) {
          var oitem = $(item);
          setTimeout(function () {
            oitem.addClass('animate');
          }, 200 * index, setTimeout(function () {
            oitem.css({ "transform": "translateX(0)" });
          }, 400 * index + 500));
        });
        /*鼠标移动效果*/
        $(document).on('mousemove', function () {
          var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;

          var X = e.clientX;
          var lisarr = [];
          for (var j = 0; j < list_lis.length; j++) {
            lisarr.push(list_lis.eq(j).offset().left);
          }
          [].concat(lisarr).forEach(function (item, index) {
            var oli = list_lis.eq(index);
            if (item < X) {
              if (oli.hasClass('mover_l')) {
                oli.removeClass('mover_l');
              }
              oli.addClass('mover_r');
            } else {
              if (oli.hasClass('mover_r')) {
                oli.removeClass('mover_r');
              }
              oli.addClass('mover_l');
            }
          });
        });
        /*点击跳转*/
        for (var i = 0; i < list_lis.length; i++) {
          list_lis.eq(i).on('click', function () {
            window.location.href = 'demo.html';
          });
        }
      }, 2500);
    }, 800);
  });
})();
