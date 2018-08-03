$(function () {
    inputctr.public.checkLogin(); 
    var addressId=null;
    var method_id =null;
    if (window.sessionStorage) {
        // $('.card_name_input').val(sessionStorage.getItem('card_name'))
        method_id = sessionStorage.getItem('method_id')
        //编辑付款方式（初始化信息）
        $.ajax({
            url: baseUrl + '/GetChargeInfo',
            method: 'post',
            dataType: "json",
            data: {
                method_id: method_id,
            },
            success: function (res) {
                console.log(res)
                if (res.result == 1) {
                    var data = res.data;
                    // 卡号
                    $('.card_number').text(data.card_number)
                    // 有效月份
                    $('.valid_through_month_select option:selected').val(data.valid_through_month)
                    // 有效年份
                    $('.valid_through_year_select option:selected').val(data.valid_through_year)

                    // 持卡人姓名
                    $('.card_holder_name_input').val(decodeURIComponent(data.card_holder_name))
                } else {
                    console.log(decodeURIComponent(res.error))
                }
            },
            error: function (res) {
                console.log(decodeURIComponent(res.error))
            }
        })
       
    }
    $('.billing_addressBtn').click(function (e) {
        e.preventDefault();
        $('.billing_address').hide()
        $('.send_address').show();
    })
    $('.send_addressBtn').click(function (e) {
        e.preventDefault();
        $('.billing_address').show()
        $('.send_address').hide();
    })
    $('.replace_credit_card_a').click(function (e) {
        e.preventDefault()
        $('.replace_credit_card').hide();
        $('.new_credit_card').show();
        $('.billing_address').show();
    })
    $('.new_credit_card_a').click(function (e) {
        e.preventDefault()
        $('.replace_credit_card').show();
        $('.new_credit_card').hide();
        $('.billing_address').hide();
    })
    
    //初始化账单寄送地址
    $.ajax({
        url: baseUrl + '/GetAddressList',
        method: 'post',
        dataType: "json",
        data: {
            userid: amazon_userid,
            sign: '1'
        },
        success: function (res) {
            console.log(res)
            if (res.result == 1) {
                var data = res.List
                var add = doT.template($('#addArray').text());
                $('#addTmpl').html(add(data))
                $('#addTmpl input').each(function (i) {
                    $('#addTmpl input').eq(i).click(function () {
                        addressId = $('input[name=address]:checked').parents('.adds').attr('data-card')
                        console.log($('input[name=address]:checked').parents('.adds').attr('data-card'))
                    })
                })
            } else {
                console.log(decodeURIComponent(res.error))
            }
        },
        error: function (res) {
            console.log(decodeURIComponent(res.error))
        }
    })
    $('.submitBtn').click(function () {
        method_id = sessionStorage.getItem('method_id')
        // 卡号
        var card_number = $('.card_number').text();
        // 有效月份
        var valid_through_month =  $('.valid_through_month_select option:selected').val()
         // 有效年份
        var valid_through_year = $('.valid_through_year_select option:selected').val()
          // 持卡人姓名
        var card_holder_name = $('.card_holder_name_input').val()
        $.ajax({
            url: baseUrl + '/UpdateChargeInfo',
            method: 'post',
            dataType: "json",
            data: {
                method_id: method_id,
                userid:amazon_userid,
                card_number:card_number,
                valid_through_month:valid_through_month,
                valid_through_year:valid_through_year,
                card_holder_name:card_holder_name,
                billing_address_id:addressId
            },
            success: function (res) {
                console.log(res)
                if (res.result == 1) {
                   
                } else {
                    console.log(decodeURIComponent(res.error))
                }
            },
            error: function (res) {
                console.log(decodeURIComponent(res.error))
            }
        })
    })
})