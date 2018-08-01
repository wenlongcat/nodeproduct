$(function(){
  $(document).ready(function(){
    // 可多次引用方法
    //addClass兼容
    $.fn.Myadd = function(clas){
      var ocla = $(this).get(0).className;
      $(this).get(0).className = ocla+' '+clas+'';
    }
    // removeClass兼容
    $.fn.removeMyadd = function(clas){
      var reg = new RegExp(clas);
      var oclas = $(this).get(0).className;
      $(this).get(0).className = oclas.replace(reg,"");
    }
   //补零函数
    function add0(mas){
      if(mas<10){
        mas = "0"+mas;
      }
      return mas;
    }
    // 播放器功能
    ;(function(){
      var oplay = $('#tool .isplay');
      var v = $("#ovideo").get(0);
      var cplay = $("#videobox .cplay");
      var ojz = $('#tool .jz').eq(0);
      var obf = $('#tool .bf').eq(0);
      var ospans = $('#tool .timeinfo>span');
      var num = 0;
      var preVideo = $('#tool .pre').eq(0);
      var nextVideo = $('#tool .next').eq(0);
      var time0,time1;
      var videobox = $('#videobox');
      var allscrren = $('#tool .allscreen').eq(0);
      var videoArr = ['/www/video/dream.mp4','/www/video/xc.mp4'];
      var videonum = 0;//初始视频源
      //初始化函数
      function init(){
        play();
        sel_play();
        volume();
        speed();
        videoWidth();
        change();
      }
      oplay.eq(0).on("click",function(){
        init();
        // 点击开始视屏加载
        if($(this).hasClass('isplay')){
          $(this).get(0).className = "play";
          cplay.get(0).className = 'leave';
          v.play();
        }else{
          $(this).get(0).className = "isplay";
          cplay.get(0).className = 'cplay';
          clearInterval(time0);
          clearInterval(time1);
          v.pause();
          clearEvent();
        }
      });
      cplay.eq(0).on("click",function(){
        v.play();
        init();
        $(this).get(0).className = "leave";
        oplay.get(0).className = 'play';
      });
       // 进度条跳转播放
      function sel_play(){
        $('#tool .timer').eq(0).on("mousedown",function(e){
            var e = e||window.event;
            var bx = $(this).offset().left;
            var X = e.clientX - bx;
            var oW = $(this).width();
            $(this).on("mouseup",function(e){
              var dura = (X/oW)*100+"%";
              v.currentTime = v.duration*(X/oW);
              obf.css({"width":dura})
            })
        });
      }
      // 播放功能
      function play(){
        time0 = setInterval(function(){
          if(v.buffered.length>0){
            if(num<v.buffered.end(0)){
              num = num +0.7;
            }else{
              num = v.buffered.end(0);
              clearInterval(time0);
            }
          }
          var dura = (num/v.duration)*100+"%";
          ojz.css({"width": dura});
        },100);
        time1 = setInterval(function(){
          var currentTime = v.currentTime;
          var dura = (currentTime/v.duration)*100+"%";
          if(dura === "100%"){
            clearInterval(time1);
          }
          obf.css({"width":dura});
          nowtime(currentTime);
        },100);
      }
      //视频进度
      function nowtime(cur){
        var durations = add0((v.duration/60)|0);
        var durations1 = add0((v.duration|0)%60);
        var current0 = add0((cur/60)|0);
        var current1 = add0((cur|0)%60);
        var str0 = durations+":"+durations1;
        var str1 = current0+":"+current1;
        ospans.eq(0).text(str1);
        ospans.eq(1).text(str0);
      }
      // 音量调节
      function volume(){
        var muted = $('#tool .muted').eq(0);
        var odiv = $('#tool .sy>div').eq(0);
        var volume = 1;//声音初始为1最大
        var nowvoerl = (volume*100)+"%";
        muted.off = true;
        odiv.css({"width":nowvoerl});
        // 是否静音
        muted.on('click',function(){
          nowvoerl = (volume*100)+"%";
          if(muted.off){
            v.volume = 0;
            $(this).Myadd('nomuted');
            odiv.css({"width":0});
          }else{
            v.volume = volume;
            $(this).removeMyadd('nomuted');
            odiv.css({"width":nowvoerl});
          };
          muted.off = !muted.off;
        });
        // 按比例调节音量
        $('#tool .sy').eq(0).on('mousedown',function(e){
          var e = e || window.event;
          var X = e.clientX - $(this).offset().left;
          var dura = (X/$(this).width())*100 +"%"
          volume = v.volume = X/($(this).width());
          $('#tool .sy>div').eq(0).css({"width":dura})
        });
      }
       // 调节播放倍速
      function speed(){
        var ospeed = $('#tool .speed').eq(0);
        var speed_sel = $('#tool .speed .speed_sel').eq(0);
        var lis = $('#tool .speed .speed_sel li');
        var preindex = 0;//存储上一个的index
        var playbackRate = v.playbackRate;
        ospeed.on('mouseover',function(){
          speed_sel.show();
          if($(this).hasClass('hover')){
            return;
          }
          $(this).Myadd("hover");
        });
        speed_sel.on('mouseleave',function(){
          ospeed.removeMyadd('hover');
          $(this).hide();
        });
        for(var i = 0;i<lis.length;i++){
          lis.eq(i).attr("oindex",i);
          lis.eq(i).on('mouseenter',function(){
            $(this).Myadd("hover");
          });
          lis.eq(i).on('mouseleave',function(){
            $(this).removeMyadd('hover');
          });
          lis.eq(i).on('click',function(){
            var speedData = $(this).attr('speed-data');
            var preli = lis.eq(preindex);
            if(preli.hasClass("select")){
              preli.removeMyadd("select");
            }
            preindex = $(this).attr("oindex");
            $(this).Myadd("select");
            v.playbackRate = playbackRate*speedData;
            speed_sel.hide();
          });
        }
      }
      // 是否全屏
      function videoWidth(){
        allscrren.on('click.all',function(){
          var onoff = $(this).attr('onoff');
          if(onoff == "can"){
            videobox.Myadd('allscrren1');
            $(this).attr('onoff',"no");
          }else{
            videobox.removeMyadd('allscrren1');
            $(this).attr('onoff',"can");
          }
        });
        //按esc退出全屏
        $(document).on('keydown',function(e){
          var e = e||window.event;
          if(e&&e.keyCode == 27){
            if(videobox.hasClass('allscrren1')){
              videobox.removeMyadd('allscrren1');
              allscrren.attr("onoff","can");
            }
          }
        })
      }
      //视频源切换
      function change(){
        preVideo.on('click.pre',function(){
          videonum--;
          if(videonum<0){
            videonum=1;
          }
          comment();
        });
        nextVideo.on('click.next',function(){
          videonum++;
          videonum = videonum%2;
          comment();
        })
        function comment(){
          console.log(videonum);
          if(videonum == 0){
            v.src = videoArr[0];
          }else{
            v.src = videoArr[1];
          }
          v.pause();
          clearEvent();
          $('#tool>li').get(0).className = 'isplay';
        }
      }
      //删除多次添加的事件，避免多次触发
      function clearEvent(){
        preVideo.off('.pre');
        nextVideo.off('.next');
        allscrren.off('.all');
      }
    })();
    // echarts实例
    ;(function(){
      var myChart = echarts.init(document.getElementById('main'));
      var new_opation = "";//存储对象指针
      var ops = $('#op>li');
      for(var i = 0;i<ops.length;i++){
        ops.eq(i).attr('ifajax',"can");
        (function(i){
          var opl = ops.eq(i);
          opl.Myadd('animate');
          opl.css({"animation-delay":200*i+"ms"});
          opl.on('mouseenter',function(){
            $(this).Myadd('n2hover');
          });
          opl.on("click",function(){
            if($(this).attr('ifajax') == "can"){
              $.ajax({
                type:"GET",
                dataType: "json",
                url:"http://localhost:3000/skills.html?opation="+i+"",
                success: function(data){
                  no_video();
                  op_opation(data,i);
                }
              });
              changeattr();
              $(this).attr('ifajax',"no");
            }
          });
          opl.on('mouseleave',function(){
            if($(this).hasClass('n2hover')){
              $(this).removeMyadd('n2hover');
            }
          })
        })(i);

        // 改变属性值
        function changeattr(){
          for(var i = 0;i<ops.length;i++){
            ops.eq(i).attr('ifajax','can');
          }
        }
      }
      //视频消失
      function no_video(){
        var ovbox = $('#videobox');
        var ov = $('#ovideo').get(0);
        ov.pause();
        ovbox.hide();
      }
      function op_opation(Data,num){
        if(num == 0){
          var opation = {
              xAxis: {
                  type: 'category',
                  data:  Data.data_name
              },
              yAxis: {
                  type: 'value'
              },
              series: [{
                  data: Data.data_math,
                  type: 'bar'
              }]
          };
          new_opation = opation;
          myChart.setOption(new_opation);
        }else if(num == 1){
          var opation = {
              xAxis: {
                  type: 'category',
                  data: Data.data_name
              },
              yAxis: {
                  type: 'value'
              },
              series: [{
                  data: Data.data_math,
                  type: 'line',
                  symbol: 'triangle',
                  symbolSize: 20,
                  lineStyle: {
                      normal: {
                          color: 'green',
                          width: 4,
                          type: 'dashed'
                      }
                  },
                  itemStyle: {
                      normal: {
                          borderWidth: 3,
                          borderColor: 'yellow',
                          color: 'blue'
                      }
                  }
              }]
          };
          new_opation = opation;
          myChart.setOption(new_opation);
        }else if(num == 2){
          var opation = {
              backgroundColor: '#CBBFBF',

              title: {
                  text: '技能比例图',
                  left: 'center',
                  top: 20,
                  textStyle: {
                      color: '#ccc'
                  }
              },

              tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },

              visualMap: {
                  show: false,
                  min: 80,
                  max: 600,
                  inRange: {
                      colorLightness: [0, 1]
                  }
              },
              series : [
                  {
                      name:'技能比例',
                      type:'pie',
                      radius : '55%',
                      center: ['50%', '50%'],
                      data:Data.data_info.sort(function (a, b) { return a.value - b.value; }),
                      roseType: 'radius',
                      label: {
                          normal: {
                              textStyle: {
                                  color: 'rgba(255, 255, 255, 0.3)'
                              }
                          }
                      },
                      labelLine: {
                          normal: {
                              lineStyle: {
                                  color: 'rgba(255, 255, 255, 0.3)'
                              },
                              smooth: 0.2,
                              length: 10,
                              length2: 20
                          }
                      },
                      itemStyle: {
                          normal: {
                              color: '#c23531',
                              shadowBlur: 200,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      },

                      animationType: 'scale',
                      animationEasing: 'elasticOut',
                      animationDelay: function (idx) {
                          return Math.random() * 200;
                      }
                  }
              ]
          };
          new_opation = opation;
          myChart.setOption(new_opation);
        }
      }
    })();
  })
}());