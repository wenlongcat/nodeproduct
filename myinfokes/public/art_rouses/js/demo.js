'use strict';

(function () {
  $(document).ready(function () {
    var odivs = $("#content>div");
    var ospns = $('#content>div span');
    $('#content').addClass('animate');

    var _loop = function _loop(i) {
      odivs.eq(i).css({ "animation-delay": i * 500 + "ms" });
      odivs.eq(i).mouseover(function(){
        ospns[i].className = 'hover';
      });
      odivs.eq(i).mouseleave(function(){
       ospns[i].className = '';
      })
    };

    for (var i = 0; i < odivs.length; i++) {
      _loop(i);
    }
  });
})();
