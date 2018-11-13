$(function(){
    inputctr.public.checkLogin();
    var Refund_button = $('.Refund-button');
    var list_row_refund = $('li.list-row-refund');
    function dec(str){
        return decodeURIComponent(str);
    }
    Refund_button.click(function() {
        if($(this).hasClass('active')){
            return;
        }
       $(this).addClass('active').siblings('.Refund-button').removeClass('active');
       list_row_refund.eq($(this).index()).removeClass('hide').siblings('.list-row-refund').addClass('hide');
    })
    var problem_id = inputctr.public.getQueryString('fld_id');
    //获得退款信息
    var goods_price = $('#goods-price');
    var shipping_price = $('#shipping-price');
    var other_price = $('#other-price');
    function RefundInit(){
        inputctr.public.SellerRegisterLoading();
        inputctr.public.AjaxMethods('POST', baseUrl + '/GetReturnOrderInfo', {problem_id:problem_id}, function (data) {
            inputctr.public.SellerRegisterLoadingRemove();
            var order_html = '';
            if(data.result == 1) {
                $('.Order-ID').text(data.data.goods[0].order_no);
                $('.total-price').text(data.data.product);
                goods_price.attr('price',data.data.product);
                $('#amount-price').text(data.data.product + Number($('#Prior-price').text()));
                $('.Shipping-price').text(data.data.shipping);
                shipping_price.attr('price',data.data.shipping);
                shippingPrice(data.data.shipping,data.data.product + Number($('#Prior-price').text()));
                $('.Other-price').text(data.data.other);
                other_price.attr('price',data.data.other);
                otherPrice(data.data.other,data.data.product + Number($('#Prior-price').text()));
                $('#all-price').text(data.data.product + Number($('#Prior-price').text()));
                $('#max-all').text(data.data.product + Number(data.data.shipping) + Number(data.data.other));
                for(var i=0;i<data.data.goods.length;i++){
                    order_html += '<div class="refund-goods-info">'+
                                        '<h4 class="refund-goods-name a-spacing-mini">'+
                                            '<a class="blue-font">'+data.data.goods[i].goods_name+'</a>'+
                                        '</h4>'+
                                        '<div class="goods-info clear_both">'+
                                            '<div class="goods-info-list fl">'+
                                                '<div class="goods-info-name">Quantity:</div>'+
                                                '<div class="goods-info-name">Merchant SKU:</div>'+
                                                '<div class="goods-info-name">'+data.data.goods[i].product_id_type+':</div>'+
                                                '<div class="goods-info-name">Listing ID:</div>'+
                                                '<div class="goods-info-name">Order-Item ID:</div>'+
                                                '<div class="goods-info-name">Condition:</div>'+
                                            '</div>'+
                                            '<div class="goods-info-list-r">'+
                                                '<div class="detailed">'+data.data.goods[i].quantity+'</div>'+
                                                '<div class="detailed">'+data.data.goods[i].seller_sku+'</div>'+
                                                '<div class="detailed">'+data.data.goods[i].product_id+'</div>'+
                                                '<div class="detailed">******</div>'+
                                                '<div class="detailed">'+data.data.goods[i].order_no+'</div>'+
                                                '<div class="detailed">'+data.data.goods[i].condition+'</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
                }
                $('.refund-goods-info-box').html(order_html);
            }else{
                alert(dec(data.error));
                $('.refund-goods-info-box').html(dec(data.error));
            }
        }, function (error) {
            alert(error.statusText);
        })
    }RefundInit()
    // 全款 修改费用
    var Shipping_enter = $('.Shipping-enter');
    var Other_enter = $('.Other-enter');
    function shippingPrice(price,total){
        Shipping_enter.focus(function() {
            $(this).val('');
        })
        Shipping_enter.blur(function() {
            if($(this).val().trim() > price){
                $(this).val(price);
            }
            if($(this).val().trim() < 0){
                $(this).val(0);
            }
            $('#all-price').text(total + Number($(this).val()) + Number(Other_enter.val()))
        })
    }
    function otherPrice(price){
        Other_enter.focus(function() {
            $(this).val('');
        })
        Other_enter.blur(function() {
            if($(this).val().trim() > price){
                $(this).val(price);
            }
            if($(this).val().trim() < 0){
                $(this).val(0);
            }
            $('#all-price').text(total + Number($(this).val()) + Number(Shipping_enter.val()))
        })
    }
    // 部分退款 修改费用
    function partialSet(target){
        target.focus(function() {
            $(this).val('');
        })
        target.blur(function() {
            if($(this).val().trim() > Number($(this).attr('price'))){
                $(this).val($(this).attr('price'));
            }
            if($(this).val().trim() < 0){
                $(this).val(0);
            }
            $('.partial-all').text(Number(goods_price.val()) + Number(shipping_price.val()) + Number(other_price.val()));
        })
    }
    partialSet(goods_price);
    partialSet(shipping_price);
    partialSet(other_price);
    // 退款操作
    var Refund_order_button = $('.Refund-order-button');
    Refund_order_button.off('click').click(function() {
        if($(this).attr('way') == 1){
            var RefundData = {
                problem_id:problem_id,
                way:1,
                product:$($('.total-price')[0]).text(),
                shipping:Number(Shipping_enter.val()),
                other:Number(Other_enter.val()),
                reason:$('.all-refund-reason').val(),
                memo:$('#Memo-to-buyer').val()
            }
            if(RefundData.reason == ''){
                $('.all-refund-reason').addClass('error-border');
                $('html,body').animate({ scrollTop: 0 }, 100);  
                return;
            }else{
                $('.all-refund-reason').removeClass('error-border');
            }
        }else{
            var RefundData = {
                problem_id:problem_id,
                way:2,
                product:Number(goods_price.val()),
                shipping:Number(shipping_price.val()),
                other:Number(other_price.val()),
                reason:$('#select-refund-reason').val(),
                memo:$('#Memo-to-buyer2').val()
            }
            if(RefundData.reason == ''){
                $('#select-refund-reason').addClass('error-border');
                $('html,body').animate({ scrollTop: 200 }, 100);  
                return;
            }else{
                $('#select-refund-reason').removeClass('error-border');
            }
        }
        inputctr.public.SellerRegisterLoading();
        inputctr.public.AjaxMethods('POST', baseUrl + '/ReturnRefundSubmit', {json:JSON.stringify(RefundData)}, function (data) {
            inputctr.public.SellerRegisterLoadingRemove();
            if(data.result == 1) {
               alert('Success!')
            }else{
                alert(dec(data.error));
            }
        }, function (error) {
            alert(error.statusText);
        })
    })
})