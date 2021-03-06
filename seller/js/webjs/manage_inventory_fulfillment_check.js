$(function () { 
    
    var distribution;
    if(window.sessionStorage){
        var orderId = sessionStorage.getItem('orderId');
    }
    
    $.post(baseUrl + '/GetMultichannelOrder', {
        orderId: orderId
    }, function (res) {
        console.log(res);
        $('.goodsName').text(decodeURIComponent(res.goodsName));
        $('.sellerSku').text(decodeURIComponent(res.sellerSku));
        $('.asin').text(res.asin);
        $('.fnsku').text(res.fnsku);
        $('.orderId').text(res.orderId);
        $('.orderNo').text(res.orderNo);
        $('.orderDate').text(res.orderDate);
        $('.remarks').text(decodeURIComponent(res.remarks));
        $('.cost').text(res.cost);
        $('.speed').text(decodeURIComponent(res.speed));
        $('.phone').text(res.phone);
        $('.country').text(res.country);
        $('.address').text(`${res.adrInfo} - ${res.adrInfo2}`)
        $('.Portland').text(`${res.region} OR ${res.zipcode}`)
        $('.adrName').text(decodeURIComponent(res.adrName));
        $('.city').text(decodeURIComponent(res.city));
        $('.condition').text(decodeURIComponent(res.condition));
        $('.reserveNum').text(decodeURIComponent(res.reserveNum));

    }, 'json')
    $('input[name="kucun"]').click(function () { 
        distribution = $(this).val();
     })
    //
    $('.placeOrderBtn').click(function () { 
        if(!distribution){
            alert('选择配送操作');
            return;
        }
        $.post(baseUrl + '/MultichannelPlaceOrder', {
            orderId: orderId,
            distribution: distribution
        }, function (res) {
            console.log(res);
           alert(decodeURIComponent(res.error))
    
        }, 'json')
     })
 })