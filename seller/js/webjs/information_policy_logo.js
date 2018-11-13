$(function () {
    // ;
    var file = null;
    var shopLogoImg = null;
    var imgType = false;
    var toUpload = false;
    // 获取公司徽标
    $.ajax({
        url: baseUrl + '/GetShopLogo',
        method: 'post',
        dataType: "json",
        data: {
            userid: amazon_userid
        },
        success: function (res) {

            if (res) {
                inputctr.public.judgeBegaintask('1107');
            }
            console.log(res);
            $('.logo').attr('src', decodeURIComponent(res.shopLogoImg))
        },
        error: function (res) {
            console.log(decodeURIComponent(res.error))
        }
    })

    function run(input_file, get_data) {
        if (typeof (FileReader) === 'undefined') {
            alert('浏览器不支持fileReader')
            return flase
        }
        try {
            file = input_file.files[0];
            // if(!/image\/(jpg|gif|jpeg)/.test(file.type)){
            //     alert('文件类型不符')
            //     return;
            // }

            var render = new FileReader();
            render.onload = function () {
                get_data(this.result)
            }
            render.readAsDataURL(file)
        } catch (e) {
           alert('图片转换出错', e.toString())
        }
    }

    // 设置公司徽标
    $('input').on('change', function (e) {
       // e.preventDefault();
        inputctr.public.judgeRecodertask('1107', '设计上传卖家logo开始');
        run(this, function (data) {
                $.ajax({
                    url: baseUrl + '/UploadBase64Pic',
                    method: 'post',
                    async: false,
                    dataType: "json",
                    data: {
                        base64_pic: data
                    },
                    success: function (res) {
                        shopLogoImg = decodeURIComponent(res.pic);
                        let image = new Image();
                        image.onload = function () {
                            console.log(image.width, image.height)
                            // if(image.width<=120&&image.height<=30){
                            //     alert('图片大小合适')
                            //     toUpload = true;
                            // }else{
                            //     alert('图片大小不合适')
                            //     toUpload = false;
                            // }
                        }
                        image.src = shopLogoImg   
                        
                    },
                    error: function (res) {
                        console.log(decodeURIComponent(res.error))
                    }
                })
        })   
    })

    $('button').click(function (e) {
        e.preventDefault()
        // if(!toUpload){
        //     alert('徽标图像必须为 120 像素宽 x 30 像素高。') 
        //     return;
        // }
        $.ajax({
            url: baseUrl + '/SetShopLogo',
            method: 'post',
            dataType: "json",
            data: {
                userid: amazon_userid,
                shopLogoImg: shopLogoImg
            },
            success: function (res) {
                console.log(res);
                if(res.result=="1"){
                    alert('上传成功!')
                    console.log(decodeURIComponent(res.error))
                    inputctr.public.judgeFinishtask('1107');
                }
               
            },
            error: function (res) {
                console.log(decodeURIComponent(res.error))
            }
        })
    })
})