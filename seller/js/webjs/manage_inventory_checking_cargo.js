$(function () {
    
    var cargoName; // 货件名
    inputctr.public.checkLogin();
    if (window.sessionStorage) {
        var planId = sessionStorage.getItem('planId')
        var cargoNo = sessionStorage.getItem('cargoNo')
    }
    // 6.1 获取货件预处理信息
    $.post(baseUrl + '/GetCargoReady', {
        planId: planId,
    }, function (res) {
        console.log(res);
        detail = res.cargoInfo;
        let detailTmpl = doT.template($('#showArray').text());
        $('#showTmpl').html(detailTmpl(detail));

        $('input[name="cargoName"]').each(function (index, item, array) {
            $(this).click(function () {
                cargoNo = $(this).parents('.adds').attr('cargoNo');
                if(window.sessionStorage){
                    sessionStorage.setItem('cargoNo',cargoNo);
                    $('.okBtn').show();
                    $('.yellowgoBtn').hide()
                }
            })
        })


    }, 'json')

    // 获取进度操作数据
    $.post(baseUrl + '/GetSchedule', {
        tag: '4',
        planId: planId,
        cargoNo:""
    }, function (res) {
        console.log(res);
        $('.name').text(decodeURIComponent(res.adrInfo.name));
        $('.address').text(decodeURIComponent(res.adrInfo.address));
        $('.address2').text(decodeURIComponent(res.adrInfo.address2));
        $('.detailAddress').text(`${decodeURIComponent(res.adrInfo.city)} ${decodeURIComponent(res.adrInfo.province)}`);
        $('.zipcode').text(decodeURIComponent(res.adrInfo.zipcode));
        $('.country').text(decodeURIComponent(res.adrInfo.country));
        $('.packMethod').text(decodeURIComponent(res.packMethod))
    }, 'json')
    // 批准货件
    $('.yellowgoBtnSpan').click(function () { 
        alert('请选择货件名称')
     })
     // 批准货件
    $('.goBtn').click(function () {
        // 检查货件
        // $.post(baseUrl + '/CreateCargo', {
        //     planId: planId,
        //     sellerId: amazon_userid,
        //     cargoName: cargoName
        // }, function (res) {
        //     console.log(res);
        //     if(res.result == '1'){
        //         if(window.sessionStorage){
        //             sessionStorage.setItem('cargoNo',res.cargoNo);

        //         }
        //     }
        // }, 'json') 
        $(location).attr('href', '/seller/manage_inventory_checking_hide.html');
    })
    // 返回
    // $('.returnBtn').click(function () {
    //     $(location).attr('href', '/seller/manage_inventory_labeling_goods.html');
    // })
})