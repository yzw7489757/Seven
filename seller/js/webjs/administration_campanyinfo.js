$(function () {
    let detail = null;
    inputctr.public.checkLogin();
    var addreassShow = false;
   
    if (window.sessionStorage) {
        $('.company_name').val(sessionStorage.getItem('company_name'))
        var idStorage =  sessionStorage.getItem('address_id')
       
    }
    // if(window.sessionStorage && sessionStorage.getItem('changeInfo')){
    //     $('.account_setting_100').show()
    //     $('.account_setting_66').hide()
    //     sessionStorage.removeItem('changeInfo')
    // }
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
                var listdate = res.List;
                var address = doT.template($('#address_Div').text())
                $('#address_tmpl').html(address(listdate))
                $('#address_tmpl .select').change(function () {
                    $('.address').hide()
                    $('.address2').hide()
                    $('.city_town').hide()
                    $('.state_province_region').hide()
                    $('.zip_code').hide()
                    $('.contury').hide()
                    $('.tel').hide()
                    $('.reg-db-content-list').show()
                    $('.addNewaddressBtn').show()
                    let index = $(this).get(0).selectedIndex - 2;
                    if(index>=0){
                        detail = res.List[index];
                        let detailTmpl = doT.template($('#detail_Div').text());
                        $('#detail_tmpl').html(detailTmpl(detail));
                    }else{
                        $('.address').show()
                        $('.address2').show()
                        $('.city_town').show()
                        $('.state_province_region').show()
                        $('.zip_code').show()
                        $('.contury').show()
                        $('.tel').show()
                        $('.reg-db-content-list').hide()
                        $('.addNewaddressBtn').hide()
                    }   
                })
                
                res.List.forEach(function (item) { 
                    if(item.address_id ===idStorage){ 
                        let detailTmpl = doT.template($('#detail_Div').text());
                        $('#detail_tmpl').html(detailTmpl(item));
                        $('.addNew').text(item.name+'-'+item.province)
                        
                    }
                 })
            } else {
                console.log(decodeURIComponent(res.error))
            }
        },
        error: function () {
            console.log(decodeURIComponent(res.error))
        }
    })
    $('.addNewaddress').click(
        function (e) {
            e.preventDefault();
            addreassShow = true;
            $('.address').show()
            $('.address2').show()
            $('.city_town').show()
            $('.state_province_region').show()
            $('.zip_code').show()
            $('.contury').show()
            $('.tel').show()
            $('.reg-db-content-list').hide()
            $('.addNewaddressBtn').hide()
        }
    )
   
    $('.extension_numberBtn').click(
        function (e) {
            e.preventDefault();
            $('.extension_number').show();
            $('.extension_numberBtn').hide();
        }
    )
    $('.submitBtn').click(function () {
        $('.state_province_region').removeClass('errBgcolor')
        $('.zip_code').removeClass('errBgcolor')
        $('.errinfo').hide()
        $('.scui-alert').hide()
        // 街道地址
        var address = $('.address_input').val().trim();
        // 公寓、楼层
        var address2 = $('.address2_input').val().trim();
        // 市/镇
        var city = $('.city_input').val().trim();
        // 州/地区/省;
        var province = $('.province_input').val().trim();
        // 国家/地区
        var country = $('.country_select option:selected').text();
        // 邮编
        var zipcode = $('.zipcode_input').val().trim();
        // 手机号
        var phone = $('.phone_input').val().trim();
        var data={
                        userid: amazon_userid,
                        address: address,
                        address2: address2,
                        city: city,
                        province: province,
                        country: country,
                        zipcode: zipcode,
                        phone: phone,
                        type: '3',
                        name: '',
                        email: '',
                        full_name: ''
                    }
        if (addreassShow) {
            if (zipcode && province) {
                $.ajax({
                    url: baseUrl + '/AddAddress',
                    method: 'post',
                    dataType: "json",
                    data: {json:JSON.stringify(data)},
                    success: function (res) {
                        console.log(res)
                        if (res.result == 1) {
                            if (window.sessionStorage) {
                                sessionStorage.setItem('successInfo', '1')
                            }
                            $(location).attr('href', '/seller/administration_submit.html')
                        } else {
                            console.log(decodeURIComponent(res.error))
                        }
                    },
                    error: function (res) {
                        console.log(decodeURIComponent(res.error))
                    }
                })
            }
            if (!province) {
                $('.state_province_region').addClass('errBgcolor')
                $('.errinfo').show()
                $('.scui-alert').show()
            }
            if (!zipcode) {
                $('.zip_code').addClass('errBgcolor')
                $('.errinfo').show()
                $('.scui-alert').show()
            }
        }else{
            if (window.sessionStorage) {
                sessionStorage.setItem('companyInfo', 'companyInfo')
            }
            $(location).attr('href', '/seller/administration_submit.html') 
        }
    })
})