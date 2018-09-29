$(function () {
    errorAlert("p1");
    errorAlert("p2");
    errorAlert("p3");
    errorAlert("p4");

console.log(11111);
   
    inputctr.public.checkLogin();
    var service_email = sessionStorage.getItem('service_email')
    var password=sessionStorage.getItem('password')

    $('.emailAddress').text(decodeURIComponent(service_email))
    $('.newEmailAddress').val(decodeURIComponent(service_email))

    $('.submitBtn').click(function (e) {
        e.preventDefault();
        if($(" input[ type='email' ] ").val()!=$(" input[ type='againEmail' ] ").val()){
            
            AlertShow("p1");
        
            //errorAlert("p1");
            return 0;
        }
        else if($(" input[ type='email' ] ").val()==$('.emailAddress').text()){
            AlertShow("p2");
           
            //errorAlert("p3");
             return 0;

        }
        else if($(" input[ type='password' ] ").val()!=password) {
         AlertShow("p3");
    
         //errorAlert("p2");
         return 0;
        }
        else if($("#myBtn").attr("VerifySuccess")==0){
            AlertShow("p4");

            return 0;

        }


       
        $.ajax({
            url: baseUrl + '/UpdateEmail',
            method: 'post',
            dataType: "json",
            data: {
                trainingmode:inputctr.public.getCookie('traintype'),
                stuid:inputctr.public.getCookie('studentID'),
                userid: amazon_userid,
                email: $(" input[ type='againEmail' ] ").val(),
                pwd: password
            },
            success: function (res) {
                console.log(res)
                console.log(decodeURIComponent(res.error))
                if (res.result == 1) {
                    sessionStorage.setItem('service_email', $(" input[ type='email' ] ").val(),)
                    window.location.replace("./landing_settings.html"+"?flag");
                }

            }
           
        })
    })



    function errorAlert(type){
        //$(".message").remove();
        var h6,p;
         h6=$(` 
        <h6 data-i18n-text="_body_Problem">111</h6>
        `);
        if(type=="p1"){
         
          p= $(`
        <p data-i18n-text="_body_ProblemContent3">
          邮箱地址不一致，请重试。
        </p>
        `);
        }
        else if(type=="p2"){
   
            p=$(`
                <p data-i18n-text="_body_ProblemContent4">
                邮箱已存在
                </p>
                `)

        }
        else if(type=="p3"){
           
            p=$(`
                <p data-i18n-text="_body_ProblemContent2">
                     密码错误，请重试。
                </p>
                `)

        }
        else{
             p=$(`
               <p data-i18n-text="_body_problemVerify">
                        验证码输入有误，请重新输入
                </p>
                `)
        }
        var div=$(`
            <div class="message error">
            <span></span>
            </div>
            `).hide().addClass(type).addClass("errorAlert");
        div.append(h6).append(p);
        $(".ap_cnep_pagelet").before(div);
    }
    function AlertShow(className){
        console.log(1);
        $(".errorAlert").hide();
        $("."+className).show();
    }
})