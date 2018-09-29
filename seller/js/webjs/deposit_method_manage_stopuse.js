$(function () {
    inputctr.public.checkLogin();
    var method_id = null;
    var account_number = null;
    if(window.sessionStorage){
        method_id = sessionStorage.getItem('method_id')
        $('.account_number').text(sessionStorage.getItem('account_number'))
    }
    $('.submitBtn').click(function () {
        var account_number = $('.account_number_input').val().trim()
        if (account_number) {
            $.ajax({
                url: baseUrl + '/SetDepositMade',
                method: 'post',
                dataType: "json",
                data: {
                    userid: amazon_userid,
                    method_id: method_id,
                    account_number: account_number
                },
                success: function (res) {
                    console.log(res)
                    if (res.result == 1) {
                        $(location).attr('href', "/seller/deposit_method.html")
                    } else {
                        $('.errorInfo').show()
                        console.log(decodeURIComponent(res.error))
                    }
                },
                error: function (res) {

                    console.log(decodeURIComponent(res.error))
                }
            })
        } else {
            addwarn("account_number", 2, "必填字段");
            $('.account_number_input').addClass('activebtn')
        }
    })
    $('.returnBtn').click(function () { 
        $(window).attr('location', '/seller/deposit_method.html')
     })
})