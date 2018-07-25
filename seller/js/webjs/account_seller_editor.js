$(function () {
  //过滤指定特殊字符
  function filterStr(str)  
    {  
        var pattern = new RegExp("[~@#$*_+<>?,.\/;]");  
        var specialStr = "";  
        for(var i=0;i<str.length;i++)  
        {  
             specialStr += str.substr(i, 1).replace(pattern, '');   
        }  
        return specialStr;  
    } 
  var statusName = false;
  var statusUrl = false;
  $('#shopName').blur(function (e) {
      $('.canNotReceive').hide();
      $('.shopNameError').hide();
      $('.mustMes').hide();
      $('.successMes').hide();

    e.preventDefault();
    //非空验证 //必须填写显示名称
    if ($('#shopName').val() == '') {
      $('.mustMes').show();
      return
    } else {
      $('.mustMes').hide();
    }
    //只有一位字符 //显示名称不可用
    if(($('#shopName').val()).length<2){
      $('.canNotReceive').show();
      return
    }else{
      $('.canNotReceive').hide();
    }

    //去掉特殊字符，剩余正常字符2个以上  //商品名称无效
    let str = filterStr($('#shopName').val())
    if(str.length<2){
      $('.shopNameError').show();
      return
    }else{
      $('.shopNameError').hide();
    }

    $('.successMes').show();
    statusName = true
  });
  //店铺地址框
  $('#shopNameUrl').blur(function (e) {
    $('.urlCanNotReceive').hide();
    $('.shopNameNull').hide()
    $('.urlCanNotReceive').hide();
    $('.urlSuccessMes').hide();

    e.preventDefault();
    //为空判断 //商店名称为空
    if($('#shopNameUrl').val() == '' ){
      $('.shopNameNull').show()
      return
     }else{
      $('.shopNameNull').hide()
     } 
    
     //只有一位字符 //商店名称不可用
    if(($('#shopNameUrl').val()).length<2){
      $('.urlCanNotReceive').show();
      return
    }else{
      $('.urlCanNotReceive').hide();
    }

    //去掉特殊字符，剩下的正常字符两个以上  //商店名称无效
    let str = filterStr($('#shopName').val())
    if(str.length<2){
      $('.urlCanNotReceive').show();
      return
    }else{
      $('.urlCanNotReceive').hide();
    }
    $('.urlSuccessMes').show();
    statusUrl = true
  });
  $('.submitSpan').click(function(){
    $('.success_status').hide()
    if(statusUrl&&statusName){
      $('.success_status').show()
    }
  })


  $.ajax({
		url: baseUrl+'/UpdateStoreDetails',
    method: 'post',
    dataType: "json", 
		data: {
      userid: '13',
      shop_name: '11',
      shop_link: '12'
		},
		success: function (res) {
      console.log(res)
      if(res.result == 1){
        console.log('success!')
      }
    },
    error:function () { 
      console.log(res.error)
    }
	})
})