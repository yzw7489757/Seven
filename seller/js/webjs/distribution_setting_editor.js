$(function () {
    inputctr.public.checkLogin(); 
    var show = true;
    var addIdArr = []
    var address_id = null;
    var address_data = null;
    //配送设置（设置配送地址为默认地址）
    $.ajax({
        url: baseUrl + "/InitialShippingSettings",
        method: "post",
        dataType: "json",
        data: {
            userid: amazon_userid,
        },
        success: function (res) {
            console.log(res);
            if (res.result == 1) {
                console.log("success!");
            } else {
                console.log(decodeURIComponent(res.error));

            }
        },
        error: function (res) {
            console.log(decodeURIComponent(res.error));
        }
    });
    //  配送设置（初始化配送地址）  GetAddressList
    //console.log(sessionStorage.address_id)
    var add = function () {
        console.log(3)
        $('#addTmpl .titleHeader').each(function (i) {
            $('#addTmpl .titleHeader').eq(i).click(function (e) {
                address_id = $('#addTmpl .titleHeader').eq(i).parents('.adds').attr('data-card')
                if (e.target.className.indexOf('address_btn') != '-1') {
                    //点击的是默认地址文字
                    // 配送设置（设置配送地址为默认地址）
                    // 点击后的新地址id
                    var new_id = $(this).parents('.adds').attr('data-card');
                    //拿到第一行数据，和下标
                    var new_data = null;
                    var new_index = null;
                    //再做一遍循环，拿到默认的那项，再重新渲染
                    for (let i = 0; i < address_data.length; i++) {
                        address_data[i].status = false;
                        if (address_data[i].address_id == new_id) {
                            address_data[i].status = true;
                            new_data = JSON.parse(JSON.stringify(address_data[i]))
                        }
                    }
                    address_data.splice(i, 1); //删除这个数据
                    address_data.unshift(new_data)
                    //最后进行渲染
                    var resetRender = doT.template($('#addArray').text());
                    $('#addTmpl ').html(resetRender(address_data));
                    //重新渲染后的html丢失了时间，所以要重新进行绑定
                    add();
                    $.ajax({
                        url: baseUrl + "/SetAddressDefault",
                        method: "post",
                        dataType: "json",
                        data: {
                            userid: amazon_userid,
                            addressId: address_id
                        },
                        success: function (res) {
                            console.log(res);
                            if (res.result == 1) {
                                console.log("success!");
                            } else {
                                console.log(decodeURIComponent(res.error));

                            }
                        },
                        error: function (res) {
                            console.log(decodeURIComponent(res.error));
                        }
                    });
                } else {
                    //点击的是整行

                    if (show) {
                        $('.a-icon-img').eq(i).removeClass('a-icon-section-expand');
                        $('.a-section-expander-inner').eq(i).show();
                        show = false;
                    } else {
                        $('.a-icon-img').eq(i).addClass('a-icon-section-expand');
                        $('.a-section-expander-inner').eq(i).hide();
                        show = true;
                    }
                }

            })
        })
    }
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
                address_data = res.List
                for (let i = 0; i < address_data.length; i++) {
                    address_data[i].status = false;
                    if (address_data[i].address_id == sessionStorage.getItem('address_id')) {
                        address_data[i].status = true;
                    }
                }
                new Promise((resolve, reject) => {
                    var add = doT.template($('#addArray').text());
                    $('#addTmpl ').html(add(address_data));
                    resolve();
                }).then(() => {
                    add();
                })
            } else {
                console.log(decodeURIComponent(res.error))
            }
        },
        error: function (res) {
            console.log(decodeURIComponent(res.error))
        }
    })


})