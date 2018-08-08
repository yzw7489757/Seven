$(function () {
    inputctr.public.checkLogin(); 
    var method_id = null;
    var billing_address_id = null;
    var checked = false;
    var show = true; //设置付款方式1 为真时调用
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
        show = false;
        $('.replace_credit_card').hide();
        $('.new_credit_card').show();
        $('.billing_address').show();
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
                            billing_address_id = $('input[name=address]:checked').parents('.adds').attr('data-card')
                        })
                    })
                } else {
                    console.log(decodeURIComponent(res.error))
                }
            },
            error: function () {
                console.log(decodeURIComponent(res.error))
            }
        })


    })
    $('.new_credit_card_a').click(function (e) {
        e.preventDefault()
        $('.replace_credit_card').show();
        $('.new_credit_card').hide();
        $('.billing_address').hide();
    })
    var obj = {
        card_number:'1234',
        valid_through_month:'5',
        valid_through_year:'2018',
        card_holder_name:'Seven',
        strAddressInfo:'北京',
    }
    var card_html = doT.template($('#card_tmpl').text());
    $('#card_Div').html(card_html(obj))

    // 初始化  编辑付款方式
    $.ajax({
        url: baseUrl + '/InitializaChargeInfo',
        method: 'post',
        dataType: "json",
        data: {
            userid: amazon_userid,
        },
        success: function (res) {
            console.log(res)
            if (res.result == 1) {
                var data = res.data.strChargeInfo;
                // 卡号
                $('.card_number').text(data.card_number)
                // 有效月份
                $('.valid_through_month').text(data.valid_through_month)
                // 有效年份
                $('.valid_through_year').text(data.valid_through_year)
                // 持卡人姓名
                $('.card_holder_name').text(decodeURIComponent(data.card_holder_name))
                // 帐单地址
                $('.strAddressInfo').text(decodeURIComponent(decodeURIComponent(res.data.strAddressInfo)))
            } else {
                console.log(decodeURIComponent(res.error))
            }
        },
        error: function (res) {
            console.log(decodeURIComponent(res.error))
        }
    })
    var obj2 = [
        {
            method_id:'1',
            card_number:'123',
            valid_through_month:'4',
            valid_through_year:'2018',
            card_holder_name:'seven',
            strAddressInfo:'北京',
        },
        {
            method_id:'2',
            card_number:'456',
            valid_through_month:'6',
            valid_through_year:'2099',
            card_holder_name:'Floyd',
            strAddressInfo:'杭州',
        },
        {
            method_id:'3',
            card_number:'789',
            valid_through_month:'2',
            valid_through_year:'2019',
            card_holder_name:'Steven',
            strAddressInfo:'地道',
        }
    ]


    method_id = '1';
    obj2.forEach(function (item) {
        item.status = (item.method_id === '1') ? true :false
    })
    var bank = doT.template($('#bankArray').text());
    $('#bankTmpl').html(bank(obj2))
    $('#bankTmpl input').each(function (i) {
        $('#bankTmpl input').eq(i).click(function () {
            method_id = $('input[name=card]:checked').parents('.banks').attr('data-card')
            //获取点击行的值，重新渲染
            obj.card_number = $(this).parents('.banks').find('.card_number').text();
            obj.valid_through_month = $(this).parents('.banks').find('.valid_through_month').text()
            obj.valid_through_year = $(this).parents('.banks').find('.valid_through_year').text()
            obj.strAddressInfo = $(this).parents('.banks').attr('data-address');
            obj.card_holder_name = $(this).parents('.banks').find('.card_holder_name').text()
            console.table(obj)
            $('#card_Div').html(card_html(obj))
        })
    })

    // 初始化付费方式(初始化信用卡列表) 
    // $.ajax({
    //     url: baseUrl + '/InitializaCharge',
    //     method: 'post',
    //     dataType: "json",
    //     data: {
    //         userid: amazon_userid,
    //     },
    //     success: function (res) {
    //         console.log(res)
    //         if (res.result == 1) {
    //             method_id = res.chargeId
    //             res.data.forEach(function (item) {
    //                 item.status = (item.method_id === res.chargeId) ? true : false
    //             })
    //             var data = res.data;
    //             var bank = doT.template($('#bankArray').text());
    //             $('#bankTmpl').html(bank(data))
    //             $('#bankTmpl input').each(function (i) {
    //                 $('#bankTmpl input').eq(i).click(function () {
    //                     method_id = $('input[name=card]:checked').parents('.banks').attr('data-card')
    //                         // 获取点击行的值，重新渲染
    //                         obj.card_number = $(this).parents('.banks').find('.card_number').text();
    //                         obj.valid_through_month = $(this).parents('.banks').find('.valid_through_month').text()
    //                         obj.valid_through_year = $(this).parents('.banks').find('.valid_through_year').text()
    //                         obj.strAddressInfo = $(this).parents('.banks').attr('data-address');
    //                         obj.card_holder_name = $(this).parents('.banks').find('.card_holder_name').text()
    //                         console.table(obj)
    //                         $('#card_Div').html(card_html(obj))
    //                 })
    //             })

    //         } else {
    //             console.log(decodeURIComponent(res.error))
    //         }
    //     }
    // })
    //初始化账单寄送地址 新增邮寄地址
    $('.submitBtn').click(function (e) {
        e.preventDefault();
        // 信用卡号
        var card_number = $('.card_number_input').val().trim();
        // 有效期限（月）
        var valid_through_month = $('.valid_through_month_select option:selected').text()
        // 有效期限（年）
        var valid_through_year = $('.valid_through_year_select option:selected').text()
        // 持卡人姓名
        var card_holder_name = $('.card_holder_name_input').val().trim()
        // 街道地址
        var address = $('.address_input').val().trim()
        // 公寓、楼层
        var address2 = $('.address2_input').val().trim()
        // 市/镇
        var city = $('.city_input').val().trim()
        // 州/地区/省
        var province = $('.province_input').val().trim()
        // 国家/地区
        var country = $('.country_select option:selected').text()
        // 邮编
        var zipcode = $('.zipcode_input').val().trim()
        // 手机号
        var phone = $('.phone_input').val().trim()
        if(!card_number ){
            addwarn("address", 2, "必填字段");
            $('.card_number_input').addClass('activebtn')
        }
        if(!address){
            addwarn("card_number", 2, "必填字段");
            $('.address_input').addClass('activebtn')
        }
        //设置付款方式1
        if (show) {
            $.ajax({
                url: baseUrl + '/SetChargeMade',
                method: 'post',
                dataType: 'json',
                data: {
                    userid: amazon_userid,
                    method_id: method_id
                },
                success: function (res) {
                    console.log(res)
                    if (res.result == 1) {

                    } else {
                        console.log(decodeURIComponent(res.error))
                    }
                },
                error: function () {
                    console.log(decodeURIComponent(res.error))
                }
            })
        }
        
        if (address &&  city && country && zipcode && phone) {
            //新增邮寄地址
            $.ajax({
                url: baseUrl + '/AddAddressNew',
                method: 'post',
                dataType: "json",
                data: {
                    userid: amazon_userid,
                    address: address,
                    address2: address2,
                    city: city,
                    province: province,
                    country: country,
                    zipcode: zipcode,
                    phone: phone,
                    type: '1',
                    name: '',
                    email: '',
                    full_name: ''
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
        }

        //新增信用卡
        if (card_number && card_holder_name) {
            $.ajax({
                url: baseUrl + '/AddChargeMethod',
                method: 'post',
                dataType: "json",
                data: {
                    userid: amazon_userid,
                    card_number: card_number,
                    valid_through_month: valid_through_month,
                    valid_through_year: valid_through_year,
                    card_holder_name: card_holder_name,
                    billing_address_id: 1,
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
        }
    })

})