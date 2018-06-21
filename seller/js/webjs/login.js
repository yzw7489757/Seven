$(function(){ 

    var signInSubmit = $('#signInSubmit');
    var ap_email = $('#ap_email');
    var ap_password = $('#ap_password');
    signInSubmit.click(function(){
        var email_missing_alert = $('#auth-email-missing-alert');
        var password_missing_alert = $('#auth-password-missing-alert');
        if(!ap_email.val()){
            email_missing_alert.removeClass('auth-inlined-error-message')
        }else{
            email_missing_alert.addClass('auth-inlined-error-message')
        }
        if(!ap_password.val()){
            password_missing_alert.removeClass('auth-inlined-error-message')
        }else{
            password_missing_alert.addClass('auth-inlined-error-message')
        }
    })
})