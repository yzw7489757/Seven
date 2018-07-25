$(function () { 
    $.ajax({
        url: baseUrl+'/GetShopInfo',
        method: 'post',
        dataType: "json", 
        data: {
            userid: '15'
        },
        success: function (res) {
            console.log(res)
            if(res.result==1){
                var data = res.data;
                // 电子邮件
                $('.pEmail').text(decodeURIComponent(data.service_email))
                // 回复电子邮件
                $('.replyEmail').text(decodeURIComponent(data.service_reply_email))
                // 显示名称
                $('.show_name').text(decodeURIComponent(data.shop_name))
                // 店面链接
                $('.shop_link').text(decodeURIComponent(data.shop_link))
                // 电话
                $('.service_phone').text(data.service_phone)
            }
        }
    })
 })