
$(
    function () {
      console.log($('.submitBtn'));
    inputctr.public.checkLogin();
    var shop_name = sessionStorage.getItem('shop_name')
    $('.newName').val(decodeURIComponent(shop_name))
    $('.submitBtn').click(function (e) {
      //  e.preventDefault();
        $.ajax({
            url: baseUrl + '/UpdateName',
            method: 'post',
            dataType: "json",
            data: {
                userid: amazon_userid,
                name:$(" input[ class='newName'] ").val(),
            },
            success: function (res) {
                console.log(res)
                if (res.result == 1) {

                    sessionStorage.setItem('shop_name', $(" input[ type='text' ] ").val())
                    window.location.replace("./landing_settings.html"+"?flag");
                }
            }
        })
    })

}
)
