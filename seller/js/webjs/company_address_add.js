$(function () {
    inputctr.public.checkLogin(); 
    $('.last_step').click(function () { 
        window.location.href="../../company_address_choose.html"
     })
    $('.submitBtnAdd').click(function () {
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
         if(address && city  && zipcode && phone){
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
    })
})