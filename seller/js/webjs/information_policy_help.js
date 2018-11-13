$(function () { 
    ;
    var help_id = 0;
    var data_title = null;
    var data_content = null;
    var data_image = null;
    var data_index = null;
    var content = null;
    var shopLogoImg = null;
     // 获取自定义帮助
     $.ajax({
        url: baseUrl + '/GetCustomHelpList',
        method: 'post',
        dataType: "json",
        data: {
            userid: amazon_userid,
            help_id:0
        },
        success: function (res) {
            console.log(res);
            var date = res.result
            var help = doT.template($('#helpArray').text());
            $('#helpTmpl').html(help(date));
            // 编辑
            $('.editBtn').each(function (i) { 
                $('.editBtn').eq(i).click(function () { 
                   help_id = $(this).parents('.help').attr('data-id')
                   data_title = $(this).parents('.help').attr('data-title')
                   data_content = $(this).parents('.help').attr('data-content')
                   data_image = $(this).parents('.help').attr('data-image')
                   data_index = $(this).parents('.help').attr('data-index')
                   $('input[name="0_attrValue_0"]').val(data_title)
                   document.getElementById('editattrValue').contentWindow.document.body.innerText = data_content;
                   content = document.getElementById('editattrValue').contentWindow.document.body.innerText
                   $('.img').attr('src',data_image)
                })
             })
            // 删除
             $('.deleteBtn').each(function (i) { 
                $('.deleteBtn').eq(i).click(function () { 
                    help_id = $(this).parents('.help').attr('data-id')
                    console.log(help_id)
                    $.ajax({
                        url: baseUrl + '/DelCustomHelp',
                        method: 'post',
                        dataType: "json",
                        data: {
                            help_id:help_id,   
                        },
                        success: function (res) {
                            console.log(res);
                            if(res.result == 1){
                                $('.submitInfo').show()
                                $('html,body').animate({scrollTop: 0},'200');
                            } 
                        },
                        error: function (res) {
                            console.log(decodeURIComponent(res.error))
                        }
                    })
                })
             })
            
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
            if (!/image\/\w+/.test(file.type)) {
                alert('请确保文件为图像类型')
                return false
            }
            var render = new FileReader();
            render.onload = function () {
                get_data(this.result)
            }
            render.readAsDataURL(file)

        } catch (e) {
            console.log('图片转换出错', e.toString())
        }
    }

    // 设置公司徽标
    $('input').on('change', function (e) {
        //e.preventDefault();
        run(this, function (data) {
            $.ajax({
                url: baseUrl + '/UploadBase64Pic',
                method: 'post',
                async:false,
                dataType: "json",
                data: {
                    base64_pic: data
                },
                success: function (res) {
                    shopLogoImg = decodeURIComponent(res.pic)
                    console.log(shopLogoImg)
                    $('.img').attr('src',shopLogoImg)
                },
                error: function (res) {
                    console.log(decodeURIComponent(res.error))
                }
            })

        })
    })
   
    //设置自定义帮助
    $('button').click(function (e) {
        e.preventDefault(); 
        data_title = $('input[name="0_attrValue_0"]').val()
        content = document.getElementById('editattrValue').contentWindow.document.body.innerText
        $.ajax({
            url: baseUrl + '/SetCustomHelp',
            method: 'post',
            dataType: "json",
            data: {
                userid: amazon_userid,
                help_id:help_id,
                index:1,
                title:data_title,
                content:content,
                image:shopLogoImg
            },
            success: function (res) {
                console.log(res);
                if(res.result == 1){
                    $('.submitInfo').show()
                    $('html,body').animate({scrollTop: 0},'200');
                } 
            },
            error: function (res) {
                console.log(decodeURIComponent(res.error))
            }
        })
    })
 })