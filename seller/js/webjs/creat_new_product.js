var browse_category_carousel;
var backward_button;
var forward_button;
$(function () {
    inputctr.public.checkLogin();
    backward_button = $('#backward_button');
    forward_button = $('#forward_button');
    browse_category_carousel = $("#category_browse");
    CreateCategory(0, 0);

    $("#category_search_button").click(function () {
        var key = $("#category_search").val().trim();
        if (key == '')
            return;
        location.href = "Classify.html?key=" + key;
    });
})
function CreateCategory(id, level, number, name) {
    $(".js-category-card").each(function () {
        if ($(this).attr("card") > level) {
            $(this).remove();
        }
    })
    var objid = 'category_browse_card_' + level;
    if ($("#" + objid).length == 0) {
        var temp = '<div id="' + objid + '" class="active_card card fl js-category-card" card="' + level + '">' +
                    '<div class="card_inner">' +
                        '<ul class="scrollable-browse" card="' + level + '"><div class="loading_box"><img src="img/loading-2x.gif" alt="加载中..." /></div></ul>' +
                    '</div>' +
                '</div>';
        browse_category_carousel.append(temp);
    } else {
        $("#" + objid).find(".scrollable-browse").html('<div class="loading_box"><img src="img/loading-2x.gif" alt="加载中..." /></div>')
    }
    if(number == "0"){
        $("#" + objid).find(".scrollable-browse").html(
            '<div class="leaf-card-elements">' +
                '<h3 id="category_name">'+name+'</h3>' +
                '<div class="category-selection-form">' +
                    '<span class="a-button a-button-primary a-button-span6"><span class="a-button-inner"><span class="a-button-text" aria-hidden="true" onclick="javascript:location.href=\'product_details.html?cateid=' + id + '\'">选择</span></span></span>' +
                '</div>' +
            '</div>');
        $("#" + objid).on('click', '.a-button-text', function() {
             inputctr.public.judgeBegaintask('1203');
             inputctr.public.judgeBegaintask('1204');
             inputctr.public.judgeBegaintask('1205');
             inputctr.public.judgeBegaintask('1206');
             inputctr.public.judgeBegaintask('1207');
        });
        return;
    }
    inputctr.public.GetCategory(id, function (data) {
        if (!data) {
            alert("网络错误！");
            return;
        }
        var html = '';
        for (var i in data) {
            var num = data[i].num;
            var sprites = (num > 0) ? '<i class="a-icon-touch-link sprites fr"></i>' : '';
            var lock = (data[i].state != 1) ? 'lock-link' : '';
            html += '<li>' +
                        '<a href="javascript:;" class="browse-link ' + lock + ' clear_both" id="' + data[i].id + '" level="' + (data[i].level-1) + '" num="' + num + '" title="' + decodeURIComponent(data[i].name) + '">' +
                            '<span class="browse_path_label fl"> ' + decodeURIComponent(data[i].name) + ' </span>' + sprites +
                        '</a>' +
                    '</li>';
        }
        $("#" + objid).find(".scrollable-browse").html(html);
        $("#" + objid).find(".scrollable-browse").find('.browse-link').on("click", function () {
            $(this).parents('.scrollable-browse').find('.browse-link').removeClass("selected-browse-link");
            $(this).addClass("selected-browse-link");
            CreateCategory($(this).attr("id"), $(this).attr("level"), $(this).attr("num"), $(this).attr("title"));
            var category_card = $(".js-category-card");
            var card_length = category_card.length;
            var category_hide = card_length - 3;
            category_card.each(function () {
                if ($(this).attr("card") < category_hide) {
                    $(this).addClass('hide');
                }else{
                    $(this).removeClass('hide');
                }
            })
            if(card_length > 3){
                backward_button.removeClass('button-disabled').addClass('pagination_inner');
                forward_button.addClass('button-disabled').removeClass('pagination_inner');
                ShowCategory(category_card,category_hide,card_length)
            }else{
                backward_button.addClass('button-disabled').removeClass('pagination_inner');
                forward_button.addClass('button-disabled').removeClass('pagination_inner');
            }
        })
    })
}
function ShowCategory(target,back,next){
    var b = back;
    var n = next;
    backward_button.off('click').click(function(){
        if(!$(this).hasClass('pagination_inner')){
            return;
        }
        b--;
        n--;
        target.eq(b).removeClass('hide');
        target.eq(n).addClass('hide');
        if(b == 0){
            $(this).addClass('button-disabled').removeClass('pagination_inner');
        }else{
            $(this).removeClass('button-disabled').addClass('pagination_inner');
        }
        forward_button.removeClass('button-disabled').addClass('pagination_inner');
    })
    forward_button.off('click').click(function(){
        if(!$(this).hasClass('pagination_inner')){
            return;
        }
        target.eq(n).removeClass('hide');
        target.eq(b).addClass('hide');
        b++;
        n++;
        if(n == next){
            $(this).addClass('button-disabled').removeClass('pagination_inner');
        }else{
            $(this).removeClass('button-disabled').addClass('pagination_inner');
        }
        backward_button.removeClass('button-disabled').addClass('pagination_inner');
    })
}
