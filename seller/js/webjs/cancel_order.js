let cancel_order={};
$(function(){
	cancel_order.GetOrderInformation();
})
//获取订单的详细信息
cancel_order.GetOrderInformation=function(){
	let orderNo=inputctr.public.getQueryString('orderno');
	let reauest_data={
		orderNo:orderNo
	}
	$.ajax({
        type:'POST',
        url:baseUrl+'/GetOrderInfo',
        data:reauest_data,
        dataType:"json",
        success:function(data){
        	if(data.result==1){
        		data.orderno=orderNo;
        		var html=template(document.getElementById('bucketcontainer-order-information-tpl').innerHTML,data);
				document.getElementById('bucketcontainer-order-information').innerHTML = html;
				cancel_order.GetCancelReason();
        	}else{
        		alert(decodeURIComponent(data.error));
        	}
        },
        error:function(XHR){
          
        }
    });
}
cancel_order.GetCancelReason=function(){
	let reauest_data={}
	$.ajax({
        type:'POST',
        url:baseUrl+'/GetCancelReason',
        data:reauest_data,
        dataType:"json",
        success:function(data){
        	if(data.result==1){
        		let content='';
        		for(var i=0;i<data.data.length;i++){
        		 	content+='<option value="'+decodeURIComponent(data.data[i].fld_name_en)+'">'+decodeURIComponent(data.data[i].fld_name_en)+'</option>'
        		}
        		$('#reason-for-cancellation').html(content);
        	}else{
        		alert(decodeURIComponent(data.error));
        	}
        },
        error:function(XHR){
          
        }
    });
}

//关闭订单
cancel_order.CancelOrderCommit=function(){
	let orderNo=inputctr.public.getQueryString('orderno');
	let reason=$('#reason-for-cancellation').val();
	let memo=$('#seller-memo').val();
	let reauest_data={
		order_no:orderNo,
		reason:reason,
		memo:memo
	}
	$.ajax({
        type:'POST',
        url:baseUrl+'/CancelOrder',
        data:reauest_data,
        dataType:"json",
        success:function(data){
        	if(data.result==1){
        		location.href="manage_orders.html"
        	}else{
        		alert(decodeURIComponent(data.error));
        	}
        },
        error:function(XHR){
          
        }
    });
}
