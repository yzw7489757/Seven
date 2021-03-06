$(function () {
    inputctr.public.checkLogin();
    var cargoStatus = 'all'; // 状态 ：all所有 1处理中 2在途 3在运营中心 4已完成 0已删除/已取
    var currentPage; // 页码
    var pageSize; // 页大小
    var d = new Date();
    var currYear = d.getFullYear();
    var currMonth = (d.getMonth() + 1);
    var currDate = d.getDate();
    var timeRange = currYear + "-" + currMonth + "-" + d.getDate();; // 日期范围：
    if(window.sessionStorage){
        // 储存初始值
        sessionStorage.setItem('timeRange',timeRange)
    } 
    
    if(window.sessionStorage){
        timeRange = sessionStorage.getItem('timeRange');
        sessionStorage.removeItem('timeRange');
        GetCargoList();
    }
    $('.drop_ul ').click(function () {
        $('.popover_down').css({
            'display': 'block'
        })
    })
    // 搜索结果
    $('.popover_down ul li a').click(function () {
        //$(this).each(function () {
            $('.drop_ul').text($(this).text());
            $('.drop_ul').attr('size', $(this).attr('size'));
            pageSize = $('.drop_ul').attr('size', $(this).attr('size'));
            $('.popover_down').css({
                'display': 'none'
            })
            if(window.sessionStorage){
                timeRange = sessionStorage.getItem('timeRange');
            }
            GetCargoList();
        //})
    })

    // 状态 ：all所有 1处理中 2在途 3在运营中心 4已完成 0已删除/已取
    $('.showUl ul li input').click(function () {
       // $(this).each(function () {
            cargoStatus = $(this).val()
            if(window.sessionStorage){
                timeRange = sessionStorage.getItem('timeRange');
                // sessionStorage.setItem('cargoStatus',cargoStatus)
                $('input[type="number"]').val(1)
            }
       // })
        GetCargoList();
    })
    // 前往
    $('input[type="button"]').click(function () {
        GetCargoList();
    })

    function GetCargoList() {
        currentPage = $('input[type="number"]').val();
        pageSize = $('.drop_ul').attr('size');
        // 获取货件进度列表
        $.post(baseUrl + '/GetCargoList', {
            sellerId: amazon_userid,
            cargoStatus: cargoStatus,
            timeRange: timeRange,
            currentPage: currentPage,
            pageSize: pageSize
        }, function (res) {
            console.log(res);
            $('#showTmpl').html('');
            var data = res.list
            var add = doT.template($('#showArray').text());
            $('#showTmpl').html(add(data));
            $('.totalPages').text(res.totalPages);
            $('input[type="number"]').attr('max', res.totalPages)
            
            // 查看货件按钮
            $('#showTmpl .adds').each(function () {
                $(this).find('.actionBtn').click(function () {
                    if(window.sessionStorage){
                        sessionStorage.setItem('planNo',$(this).parents('.adds').attr('planNo'))
                        sessionStorage.setItem('cargoNo',$(this).parents('.adds').find('.cargoNo').text())
                        $(location).attr('href', '/seller/manage_inventory_list.html');
                    }
                })
            })
        }, 'json')
    }
})