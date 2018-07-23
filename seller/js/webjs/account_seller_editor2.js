$(function() {
  $('.submit_span').click(function(){
    function enterUserMessage(input,warn,Nodeclass,reg){
        if($(input).val()==''||!(reg.test($(input).val()))){
            $(input).addClass(Nodeclass);
           $(warn).show();
           return false
        }else{
           $(warn).hide();
           $(input).removeClass(Nodeclass);
           return true
        }
   }
    let email =  new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
    let tel = new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/);
    let userEmail = enterUserMessage('#userEmailInput','.group_input0_no','activebtn',email)
    let userTel = enterUserMessage('#usertelphone','.group_input1_no','activebtn',tel)
    let saleEmail = enterUserMessage('#saleEmailInput','.group_input2_no','activebtn',email)
    console.log(userEmail,userTel,saleEmail)
    if(userEmail&&userTel&&saleEmail){
        $('.update').show();
    }else{
        $('.update').hide();
    }
  })
});
