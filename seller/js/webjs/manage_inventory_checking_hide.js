$(function () {
    
    if (window.sessionStorage) {
        var planId = sessionStorage.getItem('planId');
        var cargoNo = sessionStorage.getItem('cargoNo');
    }
    $('.look_goods').click(function () {
        $('.model-wrapper').show()
    })

    $.post(baseUrl + '/GetCargoGoods', {
        planId: cargoNo
    }, function (res) {
        console.log(res)
        var data = res.goodsLable[0];
        // 卖家sku
        $('.sellerId').text(data.sellerId)
        // 商品名称
        $('.goodsName').text(decodeURIComponent(data.goodsName))
        // 配送类型：-1 所有 1卖家 2 亚马逊
        if (data.packModel == '-1') {
            $('.shippingMode').text('所有')
        } else if (data.packModel == '1') {
            $('.shippingMode').text('卖家')
        } else if (data.packModel == '2') {
            $('.shippingMode').text('亚马逊')
        }
        // 发货（1是 0否）
        if (data.deliveried == '1') {
            $('.deliveried').text('是')
        } else {
            $('.deliveried').text('0')
        }
        // 收货（1是 0否）
        if (data.Collected == '1') {
            $('.Collected').text('是')
        } else {
            $('.Collected').text('0')
        }
    
    }, 'json')

     // 6.3 获取货件信息
     $.post(baseUrl + '/GetCargoFilish', {
        planId: planId,
        cargoNo: cargoNo
    }, function (res) {
        console.log(res);
        $('.city').text(decodeURIComponent(res.city))
        $('.address').text(decodeURIComponent(res.address))
        $('.zipcode').text(decodeURIComponent(res.zipcode))
        // 商品数量
        $('.sellerSku').text(res.goodsNum)
        // 货件名
        $('.cargoName').text(res.cargoName)
        // 货件编号
        $('.cargoNo').text(res.cargoNo)
        // 商品数量
        $('.goodsNum').text(res.goodsNum)
    }, 'json')
    // 处理货件
    $('.handlinggoodsBtn').click(function () { 
        $(location).attr('href', '/seller/manage_inventory_pretreatment_cargo.html');
     })
    $('.goBtn').click(function () {
        $(location).attr('href', '/seller/manage_inventory_pretreatment_cargo.html');
    })
})