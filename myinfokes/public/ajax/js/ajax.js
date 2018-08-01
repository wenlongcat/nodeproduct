'use strict';

jQuery(document).ready(function () {
  var ocity = $('#citys');
  ocity.on('keydown', function () {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.envent;

    if (e.keyCode === 13) {
      var oval = $(this).val();

      getData(oval);
    }
  });

  function getData(oval) {
    oval = oval ? oval : '北京';
    $.ajax({
      type: 'get',
      url: 'http://api.jisuapi.com/weather/query',
      data: {
        appkey: '8dc3bbc51ff05abd',
        city: oval
      },
      dataType: 'jsonp',
      jsonp: 'callback',
      success: function success(json) {
        if (json.msg == "城市不存在") {
          alert('请输入正确的城市名');
          return;
        }
        var html = template('templt', json);
        $('section').eq(0).css({ "padding": 0 });
        $('.container-box').eq(0).html(html);
      }
    });
  }
});
