$(function () {
    inputctr.public.checkLogin();
    inputctr.public.selectCountry();
    var strJson;
    var orderNo;
    var goodsSku;
    var isIdentical = 0;
    var showTrue = false;
    if (window.sessionStorage) {
        var orderId = sessionStorage.getItem('orderId');
        var skuId = sessionStorage.getItem('sku');
       
    }
    
    function inputValue() {
        orderNo = $('.orderNo').val().trim();
        addressName = $('.addressName').val().trim();
        address1 = $('.address1').val().trim();
        address2 = $('.address2').val().trim();
        City = $('.City').val().trim();
        Region = $('.Region').val().trim();
        Phone = $('.Phone').val().trim();
        orderId = $('.Phone').val().trim();
        Zipcode = $('.Zipcode').val().trim();
        Country = $("select[name='country'] option:selected").val();
        orderDate = $('.orderDate').val();
        reserveNum = $('input[name="reserveNum"]').val();
        Remarks = $('.Remarks').val();
        
    }
    // 是否同上 1是 0否
    $('input[type="checkbox"]').change(function () { 
        if($("input[type='checkbox']").is(':checked')){
            isIdentical = 1;
            console.log(isIdentical);
        }else{
            isIdentical = 0;
            console.log(isIdentical);

        }
     })

     $('input[name="reserveNum"]').blur(function () { 
        if(Number($(this).val()) > Number($('.usableNum').text())){
            alert("已订购输入错误")
        }else if($(this).val() == "0"){
            alert("可已订购数量输入不为0");
            return;
        }else{
            showTrue = true;
        }
    })
    // 获取商品信息
    $.post(baseUrl + '/GetGoodInfo', {
        skuId: skuId
    }, function (res) {
        console.log(res);
        $('.goodsName').text(decodeURIComponent(res.goodsName));
        $('.sellerSku').text(decodeURIComponent(res.sellerSku));
        $('.condition').text(res.condition);
        $('.num').text(res.num);
        $('.asin').text(res.asin);
        $('.fnsku').text(res.fnsku);
        $('.usableNum').text(res.usableNum)
    }, 'json')


    $('.goBtn').click(function () {
        inputValue();
        if(!showTrue){
            alert('已订购输入错误');
            return;
        }else if(!reserveNum){
            alert('请填写“已订购”文本框');
            return;
        }else if($('input[name="reserveNum"]').val() == "0"){
            alert("可已订购数量输入不为0");
            return;
        }else if(addressName && address1 &&　City && Region && Zipcode){
            strJson = JSON.stringify({
                orderId: orderId,
                orderNo: orderNo,
                isIdentical: isIdentical,
                sellerId: amazon_userid,
                addressName: addressName,
                address1: address1,
                address2: address2,
                city: City,
                country: Country,
                region: Region,
                zipcode: Zipcode,
                phone: Phone,
                remarks: Remarks,
                orderDate: orderDate,
                goodsSku: skuId,
                reserveNum: reserveNum
            })
            $.post(baseUrl + '/CreateMultichannelOrder', {
                strJson: strJson
            }, function (res) {
                console.log(res);
                if (res.result == "1") {
                    if(window.sessionStorage){
                        sessionStorage.setItem('orderId',res.orderId)
                    }
                     $(location).attr('href', '/seller/manage_inventory_fulfillment_check.html');
                }
            }, 'json')
        }else{
            alert('请填写完整配送地址带 * 文本框');
            return;
        }
    })

})