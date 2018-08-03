var browse_category_carousel;
$(function () {
    browse_category_carousel = $("#category_browse");
    CreateCategory(0, 0);

})
function CreateCategory(id, level) {
    $(".js-category-card").each(function () {
        if ($(this).attr("card") > level) {
            $(this).remove();
        }
    });
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
                                    '<a href="javascript:;" class="browse-link ' + lock + ' clear_both" id="' + data[i].id + '" level="' + data[i].level + '" num="' + num + '" title="' + decodeURIComponent(data[i].name) + '">' +
                                        '<span class="browse_path_label fl"> ' + decodeURIComponent(data[i].name) + ' </span>' + sprites +
                                    '</a>' +
                                '</li>';
        }
        $("#" + objid).find(".scrollable-browse").html(html);
        $("#" + objid).find(".scrollable-browse").find('.browse-link').on("click", function () {
            $("#" + objid).find(".scrollable-browse").find('.browse-link').removeClass("selected-browse-link");
            $(this).addClass("selected-browse-link").siblings().removeClass("selected-browse-link");
            if ($(this).attr("num") == "0") {
                ChooseCategory($(this).attr("id"), $(this).attr("title"));
            }
            else {
                CreateCategory($(this).attr("id"), $(this).attr("level"));
            }
        })
    });
}
function ChooseCategory(id, name) {
    var objid = 'choose_category_browse_card';
    $("#" + objid).remove();
    var temp = '<div id="' + objid + '" class="active_card card fl">' +
                    '<div class="a-box-inner">' +
                        '<div class="leaf-card-elements">' +
                            '<h3 id="category_name">'+name+'</h3>' +
                            '<div class="category-selection-form">' +
                                '<span class="a-button a-button-primary a-button-span6"><span class="a-button-inner"><span class="a-button-text" aria-hidden="true" onclick="javascript:location.href=\'product_details.html?cateid=' + id + '\'">选择</span></span></span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
    browse_category_carousel.append(temp);
}
function d() {
    var card_inner = $("#category_browse_card_1").find('.scrollable-browse');
    var loading_html = '<div class="loading_box">' +
                                '<img src="img/loading-2x.gif" alt="加载中..." />' +
                            '</div>'
    card_inner.append(loading_html)
    var block;
    inputctr.public.GetCategory(0, function (data) {
        if (data) {
            card_inner.empty()
        } else {
            alert("网络错误！");
            return;
        }
        for (var i in data) {
            var num = data[i].num;
            var sprites = (num > 0) ? '<i class="a-icon-touch-link sprites fr"></i>' : '';
            var product_html = '<li>' +
                                        '<a href="javascript:;" class="browse-link clear_both" id="' + data[i].id + '">' +
                                            '<span class="browse_path_label fl"> ' + decodeURIComponent(data[i].name) + ' </span>' + sprites +
                                        '</a>' +
                                    '</li>'
            card_inner.append(product_html)
            if (data[i].state != 1) {
                $(".browse-link").addClass('lock-link')
            }
        }
        function append() {
            card_inner.find('.browse-link').on("click", function () {
                var card = $(this).parent().parent().attr('card');
                if (block - card >= 2) {
                    $('#category_browse_card_' + block + '').removeClass('active_card').find('.scrollable-browse').empty();
                }
                $('#category_browse_card_' + card + '').removeClass('active_card');
                card++;
                block = card;
                $('#category_browse_card_' + card + '').addClass('active_card');
                card_inner = $('#category_browse_card_' + card + '').find('.scrollable-browse');
                card_inner.append(loading_html)
                inputctr.public.GetCategory(this.id, function (data) {
                    console.log(data)
                    if (data) {
                        card_inner.empty()
                    } else {
                        alert("网络错误！");
                        return;
                    }
                    for (var i in data) {
                        var num = data[i].num;
                        var sprites = (num > 0) ? '<i class="a-icon-touch-link sprites fr"></i>' : '';
                        var product_html = '<li>' +
                                                   '<a href="javascript:;" class="browse-link clear_both" id="' + data[i].id + '">' +
                                                       '<span class="browse_path_label fl"> ' + decodeURIComponent(data[i].name) + ' </span>' + sprites +
                                                   '</a>' +
                                               '</li>'
                        card_inner.append(product_html)
                        if (data[i].state != 1) {
                            $(".browse-link").addClass('lock-link')
                        }
                    }
                    append()
                })
            })
        } append()
    })
} 