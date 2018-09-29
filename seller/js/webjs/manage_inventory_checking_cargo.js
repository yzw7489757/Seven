$(function () {
    var baseUrl = 'http://192.168.2.164:8096/QAMZNAPI.asmx';
    var cargoName;// 货件名
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
        cargoName = res.cargoName;
        $('.country').text(decodeURIComponent(res.adrInfo.country))
        $('.province').text(decodeURIComponent(res.adrInfo.province))
        $('.city').text(decodeURIComponent(res.adrInfo.city))
        $('.address').text(decodeURIComponent(res.adrInfo.address))
        $('.address2').text(decodeURIComponent(res.adrInfo.address2))
        $('.zipcode').text(decodeURIComponent(res.adrInfo.zipcode))
        // 商品数量
        $('.sellerSku').text(res.planGoodsInfo[0].goodsNum)
        // 货件名
        $('.cargoName').val(decodeURIComponent(res.cargoName))
        
    }, 'json')
    
    // 获取进度操作数据
    $.post(baseUrl + '/GetSchedule', {
        tag: '4',
        planId: planId
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

    $('.goBtn').click(function () {
        // 检查货件
        $.post(baseUrl + '/CreateCargo', {
            planId: planId,
            sellerId: amazon_userid,
            cargoName: cargoName
        }, function (res) {
            console.log(res);
            if(res.result == '1'){
                if(window.sessionStorage){
                    sessionStorage.setItem('cargoNo',res.cargoNo);
                    $(location).attr('href', '/seller/manage_inventory_checking_hide.html');
                }
            }
        }, 'json')   
    })
    // 返回
    $('.returnBtn').click(function () {
        $(location).attr('href', '/seller/manage_inventory_labeling_goods.html');
    })
})