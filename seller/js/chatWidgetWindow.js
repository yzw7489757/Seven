var chatWidgetWindow={};
$(function(){
})
chatWidgetWindow.editUserInfo=function(){
	$('#user-default-information').addClass('hide');
	$('#edit-user-default-information').removeClass('hide')
}
chatWidgetWindow.toggleBusinessHours=function(target){
	if(target=='show'){
		$('.meshim_widget_components_chatWindow_preChatOfflineForm_Form').addClass('hide');
		$('.meshim_widget_components_chatWindow_preChatOfflineForm_OperatingHours').removeClass('hide');
	}else{
		$('.meshim_widget_components_chatWindow_preChatOfflineForm_OperatingHours').addClass('hide');
		$('.meshim_widget_components_chatWindow_preChatOfflineForm_Form').removeClass('hide');
	}
}

chatWidgetWindow.closeOnlineCustomerService=function(){
	var top=window.parent.document.getElementById('ChatWidgetWindow-container');  
	$(top).addClass('hide');
}
