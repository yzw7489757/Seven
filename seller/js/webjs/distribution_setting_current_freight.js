$(function () { 
	inputctr.public.checkLogin();




	//载入数据
	$.ajax({
		url: baseUrl + '/GetUserShippingPrice',
		method: 'post',
		dataType: "json",
		data: {
			userid: amazon_userid,
			shippingModel:1,
		},

		success: function (res) {
			//console.log(res);
			//console.log(res.result[0])
			//var tpl;
			console.log(res);
			
			res.result.forEach(function(e,index){
				
				res.result[index].country= decodeURIComponent(res.result[index].country);

				if(res.result[index].shippingLevel1!=undefined){
					var tBody=$("<tbody></tbody>");

					res.result[index].shippingLevel1.country= decodeURIComponent(res.result[index].country);
					res.result[index].shippingLevel1.shoppingLevel= "普通配送";
					res.result[index].shippingLevel1.sectionWords= "工作日";
					res.result[index].shippingLevel1.fldId=res.result[index].fld_id;
					var tableHead = doT.template($("#tableTrContentHead").html());
					var tableBody = doT.template($("#tableTrContentBody").html());
					var tableTail = doT.template($("#tableTrContentTail").html());
					$("#table").append(tBody)
					$(tBody).append(tableHead(res.result[index].shippingLevel1));

					if(res.result[index].shippingLevel1.shippingPrice.length!=0){
						var sp=res.result[index].shippingLevel1.shippingPrice;
						sp.forEach(function(e,index){
							if(sp[index].max_money<sp[index].min_money){
								sp[index].max_money="";
							}
							$(tBody).append(tableBody(sp[index]));
						})
					}
					else
					{
						$(tBody).append(tableBody(defaultPriceData));
						//$(tBody).append(tableBody(res.result[index].shippingLevel1));
					}
					$(tBody).append(tableTail(res.result[index].shippingLevel1));
				}
				if(res.result[index].shippingLevel2!=undefined){
					var tBody=$("<tbody></tbody>");
					res.result[index].shippingLevel2.country= decodeURIComponent(res.result[index].country);
					res.result[index].shippingLevel2.shoppingLevel= "快递配送";
					res.result[index].shippingLevel2.sectionWords= "工作日";
					res.result[index].shippingLevel2.fldId=res.result[index].fld_id;

					var tableHead = doT.template($("#tableTrContentHead").html());
					var tableBody = doT.template($("#tableTrContentBody").html());
					var tableTail = doT.template($("#tableTrContentTail").html());
					$("#table").append(tBody)
					$(tBody).append(tableHead(res.result[index].shippingLevel2));

					if(res.result[index].shippingLevel2.shippingPrice.length!=0){

						var sp=res.result[index].shippingLevel2.shippingPrice;
						sp.forEach(function(e,index){
							if(sp[index].max_money<sp[index].min_money){
								sp[index].max_money="";
							}
							$(tBody).append(tableBody(sp[index]));
						})
					}
					else
					{
						$(tBody).append(tableBody(defaultPriceData));
						//$(tBody).append(tableBody(res.result[index].shippingLevel1));
					}
					$(tBody).append(tableTail(res.result[index].shippingLevel2));
					
				}
				if(res.result[index].shippingLevel3!=undefined){
					var tBody=$("<tbody></tbody>");
					res.result[index].shippingLevel3.country= decodeURIComponent(res.result[index].country);
					res.result[index].shippingLevel3.shoppingLevel= "隔日达";
					res.result[index].shippingLevel3.sectionWords= "工作日";
					res.result[index].shippingLevel3.fldId=res.result[index].fld_id;

					var tableHead = doT.template($("#tableTrContentHead").html());
					var tableBody = doT.template($("#tableTrContentBody").html());
					var tableTail = doT.template($("#tableTrContentTail").html());
					$("#table").append(tBody)
					$(tBody).append(tableHead(res.result[index].shippingLevel3));

					if(res.result[index].shippingLevel3.shippingPrice.length!=0){
						var sp=res.result[index].shippingLevel3.shippingPrice;
						sp.forEach(function(e,index){
							if(sp[index].max_money<sp[index].min_money){
								sp[index].max_money="";
							}
							$(tBody).append(tableBody(sp[index]));
						})
					}
					else
					{
						$(tBody).append(tableBody(defaultPriceData));
						//$(tBody).append(tableBody(res.result[index].shippingLevel1));
					}
					$(tBody).append(tableTail(res.result[index].shippingLevel3));
					
					
				}
				if(res.result[index].shippingLevel4!=undefined){
					var tBody=$("<tbody class></tbody>");
					
					res.result[index].shippingLevel4.country= decodeURIComponent(res.result[index].country);
					res.result[index].shippingLevel4.shoppingLevel= "次日达";
					res.result[index].shippingLevel4.sectionWords= "小时";
					res.result[index].shippingLevel4.fldId=res.result[index].fld_id;

					var tableHead = doT.template($("#tableTrContentHead").html());
					var tableBody = doT.template($("#tableTrContentBody").html());
					var tableTail = doT.template($("#tableTrContentTail").html());
					$("#table").append(tBody)
					$(tBody).append(tableHead(res.result[index].shippingLevel4));

					if(res.result[index].shippingLevel4.shippingPrice.length!=0){
						var sp=res.result[index].shippingLevel4.shippingPrice;
						sp.forEach(function(e,index){
							if(sp[index].max_money<sp[index].min_money){
								sp[index].max_money="";
							}	
							$(tBody).append(tableBody(sp[index]));
						})
					}
					else
					{
						$(tBody).append(tableBody(defaultPriceData));
						//$(tBody).append(tableBody(res.result[index].shippingLevel1));
					}
					$(tBody).append(tableTail(res.result[index].shippingLevel4));
				}



				//tpl = doT.template($("#tableTrContent").html());
				//$("#table").append(tpl(res.result[index]));
			})
			//显示最后一条的删除按钮
			$("tbody").each(function(index,e){

				if($(e).find(".IntervalBar").length>=2){
					$(e).find(".IntervalBar:last").find(".deleteButton").show();
				}
			})

		}
	})



var defaultPriceData={
	id: "0",
	min_money: "0.00",
	max_money: "",
	fee: "0.00"
}

$("#table").on('focus','.maxMoney',function(){

	$(this).attr("defaultVal",$(this).val())

})
//最高金额焦点判定
$("#table").on('blur','.maxMoney',function(){
	var flag=0;
	var maxMoney=$(this).val();
	var minMoney=$(this).parents(".IntervalBar").find(".minMoney").text();
		minMoney=minMoney.substr(1,minMoney.length)
		minMoney=parseFloat(minMoney);
	if(isNaN(maxMoney)){	
			$(this).parents()
			$(this).val($(this).attr("defaultVal"))
			flag=1;
	}else{
		maxMoney=parseFloat(maxMoney);
		if(maxMoney<=minMoney){
				//alert("费用不得小于最小数字");
				$(this).parents(".IntervalBar").find(".alert").hide();
				$(this).parents(".IntervalBar").find(".alert1").show();

				$(this).val($(this).attr("defaultVal"))
				flag=1;
		}
		else{
			$(this).parents(".IntervalBar").find(".alert").hide();
		}

	}
   //当非最后一行时，吧当前最高金额与下一行最低金额进行对比
	if(flag==0&&$(this).val()!=""){
		var thisBar=$(this).parents(".IntervalBar");

		
		if ($(this).parents(".IntervalBar").html()==$(this).parents("tbody").find(".IntervalBar").eq(-1).html()) {
			//console.log("同行")
		}else{
			
			if($(this).parents("tbody").find(".IntervalBar").eq(-1).text()!=""){
                var newMinMoney=$(this).val();
				newMinMoney=parseFloat (newMinMoney);
				newMinMoney=newMinMoney+0.01
			
				if(newMinMoney>=parseFloat($(this).parents(".IntervalBar").next().find(".maxMoney").val())){
					console.log(newMinMoney)
					console.log($(this).parents(".IntervalBar").next().find(".maxMoney").val())
					//alert("修改的数字必须小于下一行的更高金额");
					//$(this).parents(".IntervalBar").find(".alert").show();
					$(this).parents(".IntervalBar").find(".alert").hide();
					$(this).parents(".IntervalBar").find(".alert3").show();
					$(this).val($(this).attr("defaultVal"))

				}
				else{
					$(this).parents(".IntervalBar").find(".alert").hide();
					$(this).parents(".IntervalBar").next().find(".minMoney").text("$"+newMinMoney)
				}
			}else{
				$(this).parents(".IntervalBar").find(".alert").hide();
				var newMinMoney=$(this).val();
				newMinMoney=parseInt(newMinMoney);
				newMinMoney=newMinMoney+0.01
				$(this).parents(".IntervalBar").next().find(".minMoney").text("$"+newMinMoney)

			}



		
			//console.log($(this).parents(".IntervalBar").next())
			//$(this).val()
			
			//console.log("不同行")
		}
		
	}

	
})


//运费焦点判定
$("#table").on('focus','.shippingFee',function(){

	$(this).attr("defaultVal",$(this).val())

})
$("#table").on('blur','.shippingFee',function(){
	if(!isNaN($(this).val())){

		if ($(this).val()<0) {
			$(this).parents(".IntervalBar").find(".shippingFeeAlert").hide();
			$(this).parents(".IntervalBar").find(".alert5").show();
			$(this).val($(this).attr("defaultVal"))
		}
		else{
			$(this).parents(".IntervalBar").find(".shippingFeeAlert").hide();
		}
	}
	else{
		$(this).parents(".IntervalBar").find(".shippingFeeAlert").hide();
		$(this).parents(".IntervalBar").find(".alert4").show();
		$(this).val($(this).attr("defaultVal"))

	}
	if($(this).val()==""){
		$(this).val("0.00")
	}
})

$('#table').click(function (e) { 
	//添加区间按钮点击
	if (e.target.className.indexOf('addBtn') != '-1'){
		var maxMoney=$(e.target).parents("tbody").find(".IntervalBar:last").find(".maxMoney").val();
		var minMoney=$(e.target).parents("tbody").find(".IntervalBar:last").find(".minMoney").text();
		minMoney=minMoney.substr(1,minMoney.length)
		minMoney=parseInt(minMoney);
	    //console.log(minMoney)
		if(isNaN(maxMoney)){	

			alert("请在输入框中填入数字");
		}
		else{
			if(maxMoney<=minMoney){
			
				if(maxMoney==""){
					//alert("请在输入框中填入数字");
					$(e.target).parents("tbody").find(".IntervalBar:last").find(".alert").hide();
					$(e.target).parents("tbody").find(".IntervalBar:last").find(".alert2").show();
					//console.log($(e.target).parents("tbody").find(".IntervalBar:last").find(".alert1"))
				}
				else{
					$(e.target).parents("tbody").find(".IntervalBar:last").find(".alert").hide();
					$(e.target).parents("tbody").find(".IntervalBar:last").find(".alert1").show();

					//alert("费用不得小于最小数字");
				}
			}else{
				$(e.target).parents("tbody").find(".IntervalBar:last").find(".alert").hide();
				maxMoney=parseInt(maxMoney)+0.01
				var Data={

					id: "0",
					min_money: maxMoney,
					max_money: "",
					fee: "0.00"
				}

				var tableBody = doT.template($("#tableTrContentBody").html());
				$(e.target).parents("tr").before(tableBody(Data));
				$(e.target).parents("tbody").find(".IntervalBar").find(".deleteButton").hide();
				$(e.target).parents("tbody").find(".IntervalBar:last").find(".deleteButton").show();
			}
		}
	}
    //删除按钮点击
    if (e.target.className.indexOf('deleteButton') != '-1'){
    	console.log(1)
    	if($(e.target).parents("tbody").find(".IntervalBar:last").attr("shippingId")!=0){
    		$.ajax({
    			url: baseUrl + '/DelShippingPrice',
    			method: 'post',
    			dataType: "json",
    			data: {
    				bandedId:$(e.target).parents("tbody").find(".IntervalBar:last").attr("shippingId")
    			},
    			success: function (res) {	
    				console.log(res)
    				console.log(decodeURIComponent(res.error))

    				if($(e.target).parents("tbody").find(".IntervalBar").length>=3){
						$(e.target).parents("tbody").find(".IntervalBar").eq(-2).find(".deleteButton").show();
					}

    				$(e.target).parents("tbody").find(".IntervalBar:last").remove()

    			},
    			error:function(res){
    				console.log(res)
    			}
    		})
    	}
    	else{
    		if($(e.target).parents("tbody").find(".IntervalBar").length>=3){
						$(e.target).parents("tbody").find(".IntervalBar").eq(-2).find(".deleteButton").show();
					}

    				$(e.target).parents("tbody").find(".IntervalBar:last").remove()

    	}


    }


})


//点击继续
$(".btnContinue").click(function(){


	//最大金额输入框移除
	$(".maxMoney").each(function(index,e){
		var minMoney=$(e).parents(".IntervalBar").find(".minMoney").text();
		minMoney=minMoney.substr(1,minMoney.length)
		minMoney=parseFloat(minMoney);

		var num=$(e).val();
		if(num!=""){

			num=parseInt(num);
			num=num.toFixed(2)
			if(minMoney>=num){
				num='最高金额';
				$(e).parents("td").find(".character4").hide();
			}
		}
		else{
			num='最高金额';
			$(e).parents("td").find(".character4").hide();
		}
		$(e).parents("tr").find(".sMaxMoney").text(num);
		$(e).hide();

	})
	//费用输入框移除
	$(".shippingFee").each(function(index,e){
		var num=$(e).val();
		if(!isNaN(num)){
			num=parseInt(num);
			num=num.toFixed(2)
		}

		$(e).parents("tr").find(".sShippingFee").text(num);
		$(e).hide();
	})
	$(".addBtn").parents("tr").hide();
	$(".page3").hide();
	$(".page4").show();
	$(".deleteButton").hide();

	//流程图改变
	$(".relative").find(".float_left").eq(2).find("div").removeClass("bgcolor");
	$(".relative").find(".float_left").eq(3).find("div").addClass("bgcolor");
	$(".relative").find(".float_left").eq(2).find("p").removeClass("font_color_p");
	$(".relative").find(".float_left").eq(3).find("p").addClass("font_color_p");

	//标题
	$(".header-orange").text("确认运费")

/*
    	$(".maxMoney").before($(".maxMoney").val());
    	$(".maxMoney").hide();
    	$(".shippingFee").before($(".shippingFee").val());
    	$(".shippingFee").hide();
    	*/

    })


//点击返回
$(".buttonBack").click(function(){
	window.location.reload();
})




var upData=new Array();
//点击保存
$(".btnEnsure").click(function(){
	//配送大条目遍历
	$(".tableBar").parents("tbody").each(function(index,e){
		var cost=new Array();
		//小条目遍历
		$(e).find(".IntervalBar").each(function(index,e){

			var minMoney=$(e).find(".minMoney").text();
			minMoney=minMoney.substr(1,minMoney.length);
			//判断是否是数字
			if(!isNaN($(e).find(".sMaxMoney").text())){
				var costData={
					id:$(e).attr("shippingID"),
					min_money:minMoney,
					max_money:$(e).find(".sMaxMoney").text(),
					fee:$(e).find(".sShippingFee").text()
				}
				cost.push(costData);
			}
			else if($(e).find(".sMaxMoney").text()=="最高金额"){
				var costData={
					id:$(e).attr("shippingID"),
					min_money:minMoney,
					max_money:"",
					fee:$(e).find(".sShippingFee").text()
				}
				cost.push(costData);
			}
			
		})
		var data={
			fld_id:$(e).find(".tableBar").attr('fldid'),
			service_level:$(e).find(".tableBar").attr('splevel'),
			cost:cost
		}
		upData.push(data);
	});


	upData=JSON.stringify(upData);
	upData="{"+"\"service\":"+upData+"}";
	console.log(upData);

	$.ajax({
		url: baseUrl + '/SetUserShippingPrice',
		method: 'post',
		dataType: "json",
		data: {
			userid: amazon_userid,
			shippingModel:1,
			strJson:upData,
		},
		success: function (res) {	
			console.log(res)
			console.log(decodeURIComponent(res.error))
			$(window).attr('location','./distribution_setting.html')


		},
		error:function(res){
			console.log(res)
			$(window).attr('location','./distribution_setting.html')

		}
	})


})
})