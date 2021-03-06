let campaign_manager={};
$(function(){
	//判断是否开通过
	campaign_manager.JudgeFirstEnter();
})
campaign_manager.JudgeFirstEnter=function(){
	let request_data={
			data:{
				seller_id:amazon_userid,
			}
	}
	request_data.data=JSON.stringify(request_data.data);
	$.ajax({
        type:'POST',
        url:baseUrl+'/IsSetCampaingAccount',
        data:request_data,
        dataType:"json",
        success:function(data){
        	if(data.result==1){
        		 //开通过
        		campaign_manager.GetCampaignList('1');
				campaign_manager.InitFilterCondition('.a-dropdown-container');
        	}else{
        		//没有开通过，调用开通接口
        		campaign_manager.OpenCampaign();
        	}
        },
        error:function(XHR){
          
        }
    }); 
	
}
//开通广告
campaign_manager.OpenCampaign=function(){
	let request_data={
		data:{
			seller_id:amazon_userid,
		}
	}
	request_data.data=JSON.stringify(request_data.data);
	$.ajax({
        type:'POST',
        url:baseUrl+'/SetCampaingAccount',
        data:request_data,
        dataType:"json",
        success:function(data){
        	if(data.result==1){
        		campaign_manager.GetCampaignList('1');
				campaign_manager.InitFilterCondition('.a-dropdown-container');
        	}else{
        		alert(decodeURIComponent(data.error));
        	}
        },
        error:function(XHR){
          
        }
    });        
}
//初始化筛选条件
campaign_manager.InitFilterCondition=function(target){
	let ctr_dom=$(target).find('.dropdown-menu').find('li a');
	ctr_dom.each(function(){
		$(this).click(function(){
			if($(this).parent('li').attr('aria-checked')=="true"){
				//没有改变筛选条件
				 if($(target).prop('id')=="operationAdCampaign"){
					campaign_manager.OperationAdCampaign();
				}else{
					return true;
				}
			}else{
				$(this).addClass('active');
				$(this).parent('li').attr('aria-checked',"true");
				$(this).parent('li').siblings('li').attr('aria-checked',"false");
				$(this).parent('li').siblings('li').find('a').removeClass('active');
				let val=$(this).attr('data-value');
				let tex=$(this).attr("replace-text");
				$(this).parents('.a-dropdown-container').attr('data-condition',val);
				$(this).parents('.a-dropdown-container').find('.a-dropdown-prompt').html(tex);
				let flag=$('.spa-tab-container').find('.active a').attr('data-id');
				if($(this).parents('.a-dropdown-container').prop('id')=="select-campaigns-action"){
					campaign_manager.GetCampaignList('1','filter')
				}else if($(this).parents('.a-dropdown-container').prop('id')=="operationAdCampaign"){
					campaign_manager.OperationAdCampaign();
				}
				
			}
		})
	})
}

//获取活动列表 
campaign_manager.GetCampaignList=function(num,flag){
	let key=$('#product-search').val();
	let status=$('#select-campaigns-action').attr('data-condition');
	let request_data={
			data:{
				pageSize:10,
				currentPage:num,
				seller_id:amazon_userid,
				key:key,
				status:status
			}
	}
	request_data.data=JSON.stringify(request_data.data);
	$.ajax({
        type:'POST',
        url:baseUrl+'/GetCampaingList',
        data:request_data,
        dataType:"json",
        success:function(data){
        	if(data.result==1){
        		if(data.data.length>0){
        			var html=template(document.getElementById('Campaign-table-container-tpl').innerHTML,data);
					document.getElementById('Campaign-table-container').innerHTML = html;
					campaign_manager.Pagination(data, num, campaign_manager.GetCampaignList);
					$(".campaign-history-pagination").removeClass('hide');
        		}else{
        			if(flag=='filter'){
        				var html=template(document.getElementById('Campaign-table-container-tpl').innerHTML,data);
						document.getElementById('Campaign-table-container').innerHTML = html;
        				$(".campaign-history-pagination").addClass('hide');
        			}else{
        				location.href="campaign_first_entry.html"
        			}
        			
        		}
        	}
        },
        error:function(XHR){
          
        }
    }); 
}
campaign_manager.Pagination= function (alldata, num,callback_function) {
    //分页
    $(".campaign-history-pagination").paging({
        pageNo: num,
        totalPage:parseInt(alldata.totalPages),
        totalSize:parseInt(alldata.totalRecords),
        callback: function (num) {
            callback_function(num)
        }
    })
}
campaign_manager.GoCreatCampaign=function(){
	location.href="campaign_advertising_creat.html"
}
//改变广告状态
campaign_manager.OperationAdCampaign=function(){
	let campaignid="";
	$('#Campaign-table-container table tbody input[type="checkbox"]:checked').each(function(){
		campaignid+=$(this).prop('id')+','
	})
	if(!campaignid){
		alert('请选择需要操作的广告！');
		return false;
	}else{
		campaignid=campaignid.substr(0,campaignid.length-1);
	}
	let action=$('#operationAdCampaign').attr('data-condition');
	let request_data={
			data:{
				id:campaignid,
				action:action 
			}
	}
	request_data.data=JSON.stringify(request_data.data);
	$.ajax({
        type:'POST',
        url:baseUrl+'/CampaingActions',
        data:request_data,
        dataType:"json",
        success:function(data){
        	if(data.result==1){
        		 campaign_manager.GetCampaignList('1','filter')
        	}
        },
        error:function(XHR){
          
        }
    }); 
}

//选择所有的活动
campaign_manager.CheckCampaign=function(target){
	if($(target).prop('id')=='check-all'){
		//点击全选
		if($(target).is(':checked')){
			$('#Campaign-table-container table tbody input[type="checkbox"]').prop('checked',true);
		}else{
			$('#Campaign-table-container table tbody input[type="checkbox"]').prop('checked',false);
		}
	}else{
		let flag=1;
		$('#Campaign-table-container table tbody input[type="checkbox"]').each(function(){
			if(!$(this).prop('checked')){
				flag=0;
			}
		})
		if(flag==0){
			$('#Campaign-table-container table #check-all').prop('checked',false);
		}else{
			$('#Campaign-table-container table #check-all').prop('checked',true);
		}
	}
	
}

//设置活动预算
campaign_manager.AccountDailyBudget=function(){
 	let budget=$('#account-daily-budget-cap').val();
 	budget=campaign_manager.FormatPrice(budget);
 	if(!budget){
 		budget=0;
 	}
	let request_data={
			data:{
				seller_id:amazon_userid,
				budget:budget 
			}
	}
	request_data.data=JSON.stringify(request_data.data);
	$.ajax({
        type:'POST',
        url:baseUrl+'/SetCampaingAccountDailyBudget',
        data:request_data,
        dataType:"json",
        success:function(data){
        	if(data.result==1){
        		 alert('设置成功！')
        	}else{
        		alert(decodeURIComponent(data.error));
        	}
        },
        error:function(XHR){
          
        }
    }); 
}

//处理输入的价格
campaign_manager.FormatPrice=function(price){
	let flag=1;
	let bid='';
	if(!inputctr.public.isPrice(price)){
		flag=0;
		return false;
	}else{
		if(price.indexOf('$')==0){
			bid=price.substr(1,price.length);
		}else{
			bid=price;
		}
		return bid;
	}
	
}