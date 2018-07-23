$(function () {
  var $what = $('#what')
  var showList = true;
  what.onclick = openwindow();


  function openwindow() {
    let width = $(document.body).width(); //获取当前屏幕的宽度，这个宽度是除去控制台的宽度，body的宽度
    let height = $(document.screen).height(); //获取当前显示器的高度，浏览器
    let left = (width - 350) / 2;
    let top = (height - 458) / 3;
  }


  //移动DOM
  // var spaui = document.getElementById('spaui');
  // var toggleChange = document.getElementById('toggleChange');
  // var getSurport = document.getElementById('getSurport');
  // var search = document.getElementById('spaui-head-controls-search');
  // var timer = null;
  // var show = false; //控制显示隐藏
  // var showToggle = true; //控制放大
  // var timerForInput = null; //搜索框变化
  // let divWidth = 410;

  var $spaui = $('#spaui');
  var $toggleChange = $('#toggleChange');
  var $getSurport = $('#getSurport');
  var $search = $('#spaui-head-controls-search');
  var timer = null;
  var show = false; //控制显示隐藏
  var showToggle = true; //控制放大
  var timerForInput = null; //搜索框变化
  let divWidth = 410;
  toggleChange.onclick = function () {
    showToggle ? divWidth = 571 : divWidth = 410;
    //spaui.style.width = divWidth + 'px';
    $spaui.width(divWidth)
    if (showToggle) {
      //search.style.width = '466px'
      $search.width(465)
    } else {
      $search.width(302)
      //search.style.width = '302px'
    }
    $spaui.css({
      right: 0
    })
    //spaui.style.right = '0px';
    showToggle = !showToggle
  }
  getSurport.onclick = function () {
    show ? spaui.style.right = -divWidth + 'px' : spaui.style.right = '0px';
    show = !show;
  }
  // 点击关闭按钮
  $('.spaui-close').on('click', function () {
    show ? spaui.style.right = -divWidth + 'px' : spaui.style.right = '0px';
    show = !show;
  })
  // 目录
  $('.sc-hover-nav').each(function (i) {
    $('.sc-hover-nav').eq([i]).attr('data-list', i)
    $('.sc-hover-nav').eq(i).hover(function () {
      $('.sc-hover-nav').eq([this.dataset.list])
        .find('.sc-nav-arrow').eq(0).css({
          opacity: 1,
          visibility: 'visible'
        });
      $('.sc-hover-nav').eq([this.dataset.list])
        .find('.sc-sub-nav').eq(0).css({
          display: 'block'
        });
    }, function () {
      $('.sc-hover-nav').eq([this.dataset.list])
        .find('.sc-nav-arrow').eq(0).css({
          opacity: 0,
          visibility: 'hidden'
        });
      $('.sc-hover-nav').eq([this.dataset.list])
        .find('.sc-sub-nav').eq(0).css({
          display: 'none'
        });
    })
  })

  // 获得支持
  $('.spaui-get-support-card-item').each(function (i) {
    $('.spaui-get-support-card-item').eq(i).attr('data-list', i)
    $('.spaui-get-support-card-item').eq(i).on('click', function () {
      if (showList) {

        $('.spaui-get-support-card-item').eq([this.dataset.list])
          .find('.spaui-get-support-card-item-body').eq(0).css({
            display: 'block'
          });
        showList = !showList

      } else if (!showList) {
        $('.spaui-get-support-card-item').eq([this.dataset.list])
          .find('.spaui-get-support-card-item-body').eq(0).css({
            display: 'none'
          });
        showList = !showList
      }
    })
  })

  // 设置
  var timer_sc = null;
  $('#sc-ql-sz').hover(function () {
    $('.sc-nav-arrow-right').addClass('opacity_visibility')
    $('.sc-sub-nav-right').addClass('display_block');
  }, function () {
    timer_sc = setTimeout(function () {
      $('.sc-nav-arrow-right').removeClass('opacity_visibility')
      $('.sc-sub-nav-right').removeClass('display_block')
    }, 10)
  })

  $('#sc-sub-nav-right').hover(
    function () {
      clearInterval(timer_sc); //做的就是将延迟事件移除掉，
    },
    function () {
      timer_sc = setTimeout(function () {
        $('.sc-nav-arrow-right').removeClass('opacity_visibility')
        $('#sc-sub-nav-right').removeClass('display_block')
      }, 10)
    })

});