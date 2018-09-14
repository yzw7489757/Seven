$(function(){
    // 双滑块点击同步效果
    var switch_background = $(".switch-background");
    var advanced_view_switch = $(".toggle-input");
    var nav_tab = $(".nav_tab");
    var flag = 1;
    if(advanced_view_switch.prop("checked")){
        nav_tab.children('.tab[name="off"]').removeClass('hide')
        flag = 2;
    }
    switch_background.click(function(){
        flag++;
        setTimeout(function(){
            if(flag%2 == 0){
                advanced_view_switch.prop("checked",true);
                nav_tab.children('.tab[name="off"]').removeClass('hide')
            }else{
                advanced_view_switch.prop("checked",false);
                nav_tab.children('.tab[name="off"]').addClass('hide')
            }
        }, 0)
    })
    // 页面数据收集
    var main_submit_button = $('#main_submit_button');
    // Vital Info
    inputctr.public.checkLogin();
    var categoryID = inputctr.public.getQueryString('cateid');

    var vital_segment_input = $('.vital_segment').find('input[type="text"]');
    var external_product_id_type = $('#external_product_id_type');
    var products_info = {
        baseInfo:{
            categoryID:categoryID,
            userID:amazon_userid
        },
        vitalInfo:{
            productID:'',
            productIDType:'',
            productName:'',
            manufacturer:'',
            brandName:''
        },
        variations:{
            variationTheme:'',
            variations:[],
        },
        offer:{
            shippingTemplateID: '',
            shippingTemplate: '',
            yourPrice: '',
            sellerSKU: '',
            condition: '',
            quantity: '',
        },
        images:{
            mainImg:'',
            images:[],
        },
        description:{
            description:'',
            bulletPoint:[],
            legalDisclaimer:'',
            cpsiaWarning:[],
            CPSIA:'',
        },
        keywords:{
            searchTerms: ''
        },
        moreDetails:{
            dimensions: '',
            length: '',
            width: '',
            height: '',
            weightUnit: '',
            weight: ''
        }
    }
    // 产品详情tab选项卡
    var product_nav = $(".nav_tab");
    var product_tab = product_nav.children('.tab');
    var segment = $(".content .segment");
    product_tab.click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        segment.eq($(this).index()).removeClass('hide').siblings().addClass('hide');
    })
    // Add More 
    var attributeMultiControls = $(".attributeMultiControls");
    var Cpsia_Warn = '<div class="cpsia_cautionary_statement">'+
                        '<select name="cpsia_cautionary_statement1" class="attribute_select cpsia_cautionary_statement_select">'+
                            '<option value="">- Select -</option>'+
                            '<option value="choking_hazard_is_a_marble">ChokingHazardIsAMarble</option>'+
                            '<option value="choking_hazard_contains_small_ball">ChokingHazardContainsSmallBall</option>'+
                            '<option value="contains_small_magnets">ContainsSmallMagnets</option>'+
                            '<option value="choking_hazard_contains_a_marble">ChokingHazardContainsAMarble</option>'+
                            '<option value="choking_hazard_is_a_small_ball">ChokingHazardIsASmallBall</option>'+
                            '<option value="choking_hazard_balloon">ChokingHazardBalloon</option>'+
                            '<option value="no_warning_applicable">NoWarningApplicable</option>'+
                            '<option value="choking_hazard_small_parts">ChokingHazardSmallParts</option>'+
                        '</select>'+
                    '</div>';
    var add_n;
    function Add_More(add,selecter,html){
       attributeMultiControls.children('.AddMore').click(function(){
            inputctr.public.judgeRecodertask('1206','了解并设计商品的五点描述开始');
            inputctr.public.judgeRecodertask('1207','了解并设计商品关键词开始');
           if($(this).attr('add') == add){
                if($(this).attr('add') == 'cpsia_cautionary'){
                    $(this).parent().siblings('#Cpsia_Warn').append(html);
                }else{
                    $(this).parent().before(html);
                }
               add_n = $(selecter).length;
               if(add_n == 2){
                    $(this).siblings(":not('.AddMoreText')").toggleClass('hide')
               }
               if(add_n >= 5){
                   $(this).addClass('hide').siblings('.AddMoreText').removeClass('hide');
                   return;
               }
           }
       }) 
    }
    Add_More('bullet-point',".bullet-point",'<input type="text" class="bullet-point">');
    Add_More('cpsia_cautionary','.cpsia_cautionary_statement',Cpsia_Warn);
    Add_More('SearchTerms','.SearchTerms','<input type="text" class="SearchTerms" />');
    // Remove Last
    function Remove_Last(add,selecter){
        attributeMultiControls.children('.removeLastLink').click(function(){
            if($(this).attr('add') == add){
                add_n--;
                if($(this).siblings('.AddMore').hasClass('hide')){
                    $(this).siblings(":not('.removeLastText')").toggleClass('hide')
                }
                var bullet_point = $(selecter);
                $(bullet_point[add_n]).remove();
                if(add_n <= 1){
                    $(this).addClass('hide').siblings('.removeLastText').removeClass('hide')
                    return;
                }
            }
        })
    }
    Remove_Last('bullet-point',".bullet-point");
    Remove_Last('cpsia_cautionary','.cpsia_cautionary_statement');
    Remove_Last('SearchTerms','.SearchTerms');
    // Variation 页面逻辑
    var variation_theme = $("#variation_theme");
    var variation_theme_div = $("#variation_theme_div");
    var Parent_variation_theme = $("#Parent-variation_theme-div");
    var listing_form_menu = $(".listing-form-menu");
    var color_size = $(".variations-key-inputs .variation-keys-attribute-group-container");
    var table_elements_thead = $('.one-by-one-table').children('thead');
    var table_elements_tbody = $('.one-by-one-table').children('tbody');
    Parent_variation_theme.change(function(){
        if($(this).val()){
            if($(color_size[1]).hasClass('size-r')){
                $(color_size[1]).removeClass('size-r');
            }
            $('.SCQ_row').find('input').val('');
            $('.SCQ_row').find('select').children('option[value=""]').prop("selected","selected");
            $('.vital_info_productID').find('input.ProductID').val('');
            $('.vital_info_productID').find('select#external_product_id_type').children('option[value=""]').prop("selected","selected");
            if(!main_submit_button.attr('disabled')){
                main_submit_button.attr('disabled',true);
            }
            var selected_span = $(".selected");
            var text = $(this).children('option[value='+$(this).val()+']').text();
            listing_form_menu.removeClass('hide');
            selected_span.text(text);
            variation_theme.children('option[value='+$(this).val()+']').prop("selected","selected");
            if(text == 'Color'){
                $(color_size[0]).removeClass('hide');$(color_size[1]).addClass('hide');
                table_elements_thead.find('td[data-attribute-name="color_name"]').removeClass('hide');
                table_elements_thead.find('td[data-attribute-name="size_name"]').addClass('hide');

            }else if(text == 'Size'){
                $(color_size[0]).addClass('hide');$(color_size[1]).removeClass('hide');
                table_elements_thead.find('td[data-attribute-name="color_name"]').addClass('hide');
                table_elements_thead.find('td[data-attribute-name="size_name"]').removeClass('hide');
            }else{
                color_size.removeClass('hide');
                $(color_size[1]).addClass('size-r');
                table_elements_thead.find('td[data-attribute-name="color_name"]').removeClass('hide');
                table_elements_thead.find('td[data-attribute-name="size_name"]').removeClass('hide');
            }
            $(this).parents('.row').addClass('hide')
        }
    })
    var edit_button = $(".edit-button");
    edit_button.click(function(){
        var alert_warning = $(".alert-warning");
        alert_warning.removeClass('hide');
        var that = $(this);
        that.attr('disabled',true);
        alert_warning.children('.cancel').click(function(){
            alert_warning.addClass('hide');
            that.attr('disabled',false);
        })
        alert_warning.children('.accept').click(function(){
            alert_warning.addClass('hide');
            that.attr('disabled',false).parent().addClass('hide');
            variation_theme_div.removeClass('hide');
        })
        variation_theme.change(function(){
            table_elements_tbody.empty();
            if($(this).val()){
                if($(color_size[1]).hasClass('size-r')){
                    $(color_size[1]).removeClass('size-r');
                }
                var selected_span = $(".selected");
                var text = $(this).children('option[value='+$(this).val()+']').text();
                selected_span.text(text);
                if(text == 'Color'){
                    $(color_size[0]).removeClass('hide');$(color_size[1]).addClass('hide');
                    table_elements_thead.find('td[data-attribute-name="color_name"]').removeClass('hide');
                    table_elements_thead.find('td[data-attribute-name="size_name"]').addClass('hide');
                }else if(text == 'Size'){
                    $(color_size[0]).addClass('hide');$(color_size[1]).removeClass('hide');
                    table_elements_thead.find('td[data-attribute-name="color_name"]').addClass('hide');
                    table_elements_thead.find('td[data-attribute-name="size_name"]').removeClass('hide');
                }else{
                    color_size.removeClass('hide');
                    $(color_size[1]).addClass('size-r');
                    table_elements_thead.find('td[data-attribute-name="color_name"]').removeClass('hide');
                    table_elements_thead.find('td[data-attribute-name="size_name"]').removeClass('hide');
                }
                that.parent().removeClass('hide');
                variation_theme_div.addClass('hide');
            }else{
                Parent_variation_theme.parents('.row').removeClass('hide');
                Parent_variation_theme.children('option[value=""]').prop("selected","selected");
                edit_button.parent().removeClass('hide');
                variation_theme_div.addClass('hide');
                listing_form_menu.addClass('hide');
                table_elements_thead.find('td[data-attribute-name="color_name"]').addClass('hide');
                table_elements_thead.find('td[data-attribute-name="size_name"]').addClass('hide');
                $('.SCQ_row').removeClass('hide').find('input').addClass('border-red').val('');
                $('.SCQ_row').find('select').addClass('border-red').children('option[value=""]').prop("selected","selected");
                $('.vital_info_productID').removeClass('hide').find('input.ProductID').addClass('border-red').val('');
                $('.vital_info_productID').find('select#external_product_id_type').addClass('border-red').children('option[value=""]').prop("selected","selected");
                main_submit_button.attr('disabled',true);
            }
        })
    })
  // 添加尺寸、颜色 input
    var create_variations = $('#create-variations');
    var size_name_input = $('#Parent-size_name_1');
    var Parent_color_name_1 = $("#Parent-color_name_1");
    function size_color(target){
        target.on('change', 'input', function(event) {
            var n = $(this).index();
            if($(this).val() && $(this).val()!=' '){
                if($(this).attr('add')){
                    return;
                }
                target.append('<input type="text" maxlength="50">');
                $(this).attr('add',true);
                create_variations.prop('disabled',false);
            }else{
                if(target.children('input').length == 2){
                    target.children('input').eq(n).remove();
                    $(this).attr('add',false);
                    create_variations.prop('disabled',true);
                    return;
                }
                target.children('input').eq(n).remove();
            }
        })
    }
    size_color(size_name_input);
    size_color(Parent_color_name_1);
    // Fields: Condition Note Sale Price
    var option_sale = $('.option_sale');
    var option_note = $('.option_note');
    var option_sale_show = 1;
    var option_is_sale = '0';
    option_sale.click(function(){
        option_sale_show++; 
        if(option_sale_show %2 == 0){
            $('.option_sale_block').removeClass('hide');
            $('.form_date').parent('.date_box').addClass('border-red');
            table_elements_tbody.find('.sale_price').addClass('border-red');
            option_is_sale = '1';
        }else{
            $('.option_sale_block').addClass('hide');
            $('.form_date').parent('.date_box').removeClass('border-red');
            table_elements_tbody.find('.sale_price').removeClass('border-red');
            option_is_sale = '0';
        }
    })
    var option_note_show = 1;
    option_note.click(function(){
        option_note_show++; 
        if(option_note_show %2 == 0){
            $('.option_condition_note').removeClass('hide');
        }else{
            $('.option_condition_note').addClass('hide');
        }
    })
    // 动态插入variations表单行 table_elements
    var selected_variation = $(".selected");
    create_variations.click(function(){
        $('.vital_segment').find('.ProductID').removeClass('border-red');
        $('.vital_segment').find('#external_product_id_type').removeClass('border-red');
        inputctr.public.judgeRecodertask('1204','了解并设置全新产品的变体设置开始');
        if(selected_variation.text() == 'Size'){
            var size_arr = size_name_input.children('input').filter(function(index) {
              return $(this).val() != false;
            })
            for(var i=0;i<size_arr.length;i++){
                var tr_html = '<tr class="raw">'+
                                    '<td class="attribute" data-attribute-name="row-selection">'+
                                        '<input type="checkbox" class="row-selection">'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="size_name">'+
                                        '<span class="variation-key">'+size_arr[i].value+'</span>'+
                                    '</td>'+
                                    '<td class="attribute hide" data-attribute-name="color_name">'+
                                        '<span class="variation-key"></span>'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="seller_sku">'+
                                        '<input type="text" name="item_sku_gio_child_1" id="item_sku_gio_child_'+i+'" maxlength="40" size="52.0" class="charcounter">'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="external_product_id">'+
                                        '<input type="text" name="product_id" id="external_product_id_gio_child_'+i+'" maxlength="16"size="20.8" class="charcounter border-red data_vaildate">'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="external_product_id_type">'+
                                        '<select id="external_product_id_type_gio_child_'+i+'" name="external_product_id_type_gio_child_1" class="attribute_select notification-required notification-required-unknown table-select border-red data_vaildate">'+
                                            '<option value="">- Select -</option>'+
                                            '<option value="GTIN">GTIN</option>'+
                                            '<option value="EAN">EAN</option>'+
                                            '<option value="GCID">GCID</option>'+
                                            '<option value="ISBN">ISBN</option>'+
                                        '</select>'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="condition_type">'+
                                        '<select id="condition_type_gio_child_'+i+'" name="condition_type_gio_child_1" class="attribute_select table-select">'+
                                            '<option value="">- Select -</option>'+
                                            '<option value="New" selected>New</option>'+
                                            '<option value="Refurbished">Refurbished</option>'+
                                            '<option value="Good">Good</option>'+
                                            '<option value="Like New">Like New</option>'+
                                            '<option value="Acceptable">Acceptable</option>'+
                                            '<option value="Very Good">Very Good</option>'+
                                        '</select>'+
                                    '</td>'+
                                    '<td class="attribute hide option_condition_note" data-attribute-name="condition_note">'+
                                        '<textarea name="condition_note-first-row" id="condition_note-first-row'+i+'" cols="50" class="condition_note_text"></textarea>'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="standard_price">'+
                                        '<div class="currency-container">'+
                                            '<span class="currency_number-symbol">$</span>'+
                                            '<input type="text" name="standard_price_gio_child_1" id="standard_price_gio_child_'+i+'" class="price table-price border-red data_vaildate">'+
                                        '</div>'+
                                    '</td>'+
                                    '<td class="attribute option_sale_block hide" data-attribute-name="sale_price">'+
                                        '<div class="currency-container">'+
                                            '<span class="currency_number-symbol">$</span>'+
                                            '<input type="text" name="sale_price-first-row" id="sale_price-first-row'+i+'" class="price table-price data_vaildate sale_price">'+
                                        '</div>'+
                                    '</td>'+
                                    '<td class="attribute option_sale_block hide" data-attribute-name="sale_from_date">'+
                                        '<div class="date_box date_box2">'+
                                            '<i class="icon-calendar a-icon"></i>'+
                                            '<input type="text" id="sale_from_date-first-raw'+i+'" class="form_date data_vaildate">'+
                                        '</div>'+
                                    '</td>'+
                                    '<td class="attribute option_sale_block hide" data-attribute-name="sale_end_date">'+
                                        '<div class="date_box date_box2">'+
                                            '<i class="icon-calendar a-icon"></i>'+
                                            '<input type="text" id="sale_end_date-first-raw'+i+'" class="form_date data_vaildate">'+
                                        '</div>'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="quantity">'+
                                        '<input type="number" size="10" min="0" maxlength="25" class="border-red data_vaildate" name="quantity" id="quantity_gio_child_'+i+'">'+
                                    '</td>'+
                                    '<td></td>'+
                                '</tr>'
                table_elements_tbody.append(tr_html);
            }
            size_name_input.empty().append('<input type="text" maxlength="50">');
        }
        if(selected_variation.text() == 'Color'){
            var color_arr = Parent_color_name_1.children('input').filter(function(index) {
              return $(this).val() != false;
            })
            for(var i=0;i<color_arr.length;i++){
                var tr_html = '<tr class="raw">'+
                                    '<td class="attribute" data-attribute-name="row-selection">'+
                                        '<input type="checkbox" class="row-selection">'+
                                    '</td>'+
                                    '<td class="attribute hide" data-attribute-name="size_name">'+
                                        '<span class="variation-key"></span>'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="color_name">'+
                                        '<span class="variation-key">'+color_arr[i].value+'</span>'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="seller_sku">'+
                                        '<input type="text" name="item_sku_gio_child_1" id="item_sku_gio_child_'+i+'" maxlength="40" size="52.0" class="charcounter">'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="external_product_id">'+
                                        '<input type="text" name="product_id" id="external_product_id_gio_child_'+i+'" maxlength="16"size="20.8" class="charcounter border-red data_vaildate">'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="external_product_id_type">'+
                                        '<select id="external_product_id_type_gio_child_'+i+'" name="external_product_id_type_gio_child_1" class="attribute_select notification-required notification-required-unknown table-select border-red data_vaildate">'+
                                            '<option value="">- Select -</option>'+
                                            '<option value="GTIN">GTIN</option>'+
                                            '<option value="EAN">EAN</option>'+
                                            '<option value="GCID">GCID</option>'+
                                            '<option value="ISBN">ISBN</option>'+
                                        '</select>'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="condition_type">'+
                                        '<select id="condition_type_gio_child_'+i+'" name="condition_type_gio_child_1" class="attribute_select table-select">'+
                                            '<option value="">- Select -</option>'+
                                            '<option value="New" selected>New</option>'+
                                            '<option value="Refurbished">Refurbished</option>'+
                                            '<option value="Good">Good</option>'+
                                            '<option value="Like New">Like New</option>'+
                                            '<option value="Acceptable">Acceptable</option>'+
                                            '<option value="Very Good">Very Good</option>'+
                                        '</select>'+
                                    '</td>'+
                                    '<td class="attribute hide option_condition_note" data-attribute-name="condition_note">'+
                                        '<textarea name="condition_note-first-row" id="condition_note-first-row'+i+'" cols="50" class="condition_note_text"></textarea>'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="standard_price">'+
                                        '<div class="currency-container">'+
                                            '<span class="currency_number-symbol">$</span>'+
                                            '<input type="text" name="standard_price_gio_child_1" id="standard_price_gio_child_'+i+'" class="price table-price border-red data_vaildate">'+
                                        '</div>'+
                                    '</td>'+
                                    '<td class="attribute option_sale_block hide" data-attribute-name="sale_price">'+
                                        '<div class="currency-container">'+
                                            '<span class="currency_number-symbol">$</span>'+
                                            '<input type="text" name="sale_price-first-row" id="sale_price-first-row'+i+'" class="price table-price data_vaildate sale_price">'+
                                        '</div>'+
                                    '</td>'+
                                    '<td class="attribute option_sale_block hide" data-attribute-name="sale_from_date">'+
                                        '<div class="date_box date_box2">'+
                                            '<i class="icon-calendar a-icon"></i>'+
                                            '<input type="text" id="sale_from_date-first-raw'+i+'" class="form_date data_vaildate">'+
                                        '</div>'+
                                    '</td>'+
                                    '<td class="attribute option_sale_block hide" data-attribute-name="sale_end_date">'+
                                        '<div class="date_box date_box2">'+
                                            '<i class="icon-calendar a-icon"></i>'+
                                            '<input type="text" id="sale_end_date-first-raw'+i+'" class="form_date data_vaildate">'+
                                        '</div>'+
                                    '</td>'+
                                    '<td class="attribute" data-attribute-name="quantity">'+
                                        '<input type="number" size="10" min="0" maxlength="25" class="border-red data_vaildate" name="quantity" id="quantity_gio_child_'+i+'">'+
                                    '</td>'+
                                    '<td></td>'+
                                '</tr>'
                table_elements_tbody.append(tr_html);
            }
            Parent_color_name_1.empty().append('<input type="text" maxlength="50">');
        }
        if(selected_variation.text() == 'color-size'){
            var size_arr = size_name_input.children('input').filter(function(index) {
              return $(this).val() != false;
            })
            var color_arr = Parent_color_name_1.children('input').filter(function(index) {
              return $(this).val() != false;
            })
            for(var i=0;i<size_arr.length;i++){
                for(var j=0;j<color_arr.length;j++){
                    var tr_html = '<tr class="raw">'+
                                        '<td class="attribute" data-attribute-name="row-selection">'+
                                            '<input type="checkbox" class="row-selection">'+
                                        '</td>'+
                                        '<td class="attribute" data-attribute-name="size_name">'+
                                            '<span class="variation-key">'+size_arr[i].value+'</span>'+
                                        '</td>'+
                                        '<td class="attribute" data-attribute-name="color_name">'+
                                            '<span class="variation-key">'+color_arr[j].value+'</span>'+
                                        '</td>'+
                                        '<td class="attribute" data-attribute-name="seller_sku">'+
                                            '<input type="text" name="item_sku_gio_child_1" id="item_sku_gio_child_'+i+'" maxlength="40" size="52.0" class="charcounter">'+
                                        '</td>'+
                                        '<td class="attribute" data-attribute-name="external_product_id">'+
                                            '<input type="text" name="product_id" id="external_product_id_gio_child_'+i+'" maxlength="16"size="20.8" class="charcounter border-red data_vaildate">'+
                                        '</td>'+
                                        '<td class="attribute" data-attribute-name="external_product_id_type">'+
                                            '<select id="external_product_id_type_gio_child_'+i+'" name="external_product_id_type_gio_child_1" class="attribute_select notification-required notification-required-unknown table-select border-red data_vaildate">'+
                                                '<option value="">- Select -</option>'+
                                                '<option value="GTIN">GTIN</option>'+
                                                '<option value="EAN">EAN</option>'+
                                                '<option value="GCID">GCID</option>'+
                                                '<option value="ISBN">ISBN</option>'+
                                            '</select>'+
                                        '</td>'+
                                        '<td class="attribute" data-attribute-name="condition_type">'+
                                            '<select id="condition_type_gio_child_'+i+'" name="condition_type_gio_child_1" class="attribute_select table-select">'+
                                                '<option value="">- Select -</option>'+
                                                '<option value="New" selected>New</option>'+
                                                '<option value="Refurbished">Refurbished</option>'+
                                                '<option value="Good">Good</option>'+
                                                '<option value="Like New">Like New</option>'+
                                                '<option value="Acceptable">Acceptable</option>'+
                                                '<option value="Very Good">Very Good</option>'+
                                            '</select>'+
                                        '</td>'+
                                        '<td class="attribute hide option_condition_note" data-attribute-name="condition_note">'+
                                            '<textarea name="condition_note-first-row" id="condition_note-first-row'+i+'" cols="50" class="condition_note_text"></textarea>'+
                                        '</td>'+
                                        '<td class="attribute" data-attribute-name="standard_price">'+
                                            '<div class="currency-container">'+
                                                '<span class="currency_number-symbol">$</span>'+
                                                '<input type="text" name="standard_price_gio_child_1" id="standard_price_gio_child_'+i+'" class="price table-price border-red data_vaildate">'+
                                            '</div>'+
                                        '</td>'+
                                        '<td class="attribute option_sale_block hide" data-attribute-name="sale_price">'+
                                            '<div class="currency-container">'+
                                                '<span class="currency_number-symbol">$</span>'+
                                                '<input type="text" name="sale_price-first-row" id="sale_price-first-row'+i+'" class="price table-price data_vaildate sale_price">'+
                                            '</div>'+
                                        '</td>'+
                                        '<td class="attribute option_sale_block hide" data-attribute-name="sale_from_date">'+
                                            '<div class="date_box date_box2">'+
                                                '<i class="icon-calendar a-icon"></i>'+
                                                '<input type="text" id="sale_from_date-first-raw'+i+'" class="form_date data_vaildate">'+
                                            '</div>'+
                                        '</td>'+
                                        '<td class="attribute option_sale_block hide" data-attribute-name="sale_end_date">'+
                                            '<div class="date_box date_box2">'+
                                                '<i class="icon-calendar a-icon"></i>'+
                                                '<input type="text" id="sale_end_date-first-raw'+i+'" class="form_date data_vaildate">'+
                                            '</div>'+
                                        '</td>'+
                                        '<td class="attribute" data-attribute-name="quantity">'+
                                            '<input type="number" size="10" min="0" maxlength="25" class="border-red data_vaildate" name="quantity" id="quantity_gio_child_'+i+'">'+
                                        '</td>'+
                                        '<td></td>'+
                                    '</tr>'
                    table_elements_tbody.append(tr_html);
                }
            }
            size_name_input.empty().append('<input type="text" maxlength="50">');
            Parent_color_name_1.empty().append('<input type="text" maxlength="50">');
        }
        create_variations.prop('disabled',true);
        table_elements_tbody.find('.form_date').each(function(i){
           laydate.render({
             elem:this,
             trigger:'focus',
             lang: 'en',
             showBottom: false,
             done: function(value, date, endDate){
                    if(value){
                        $(this.elem[0]).parent('.date_box').removeClass('border-red'); 
                    }else{
                        $(this.elem[0]).parent('.date_box').addClass('border-red');  
                    }
               }
           })
        })
        if(option_sale_show %2 == 0){
            $('.option_sale_block').removeClass('hide');
            $('.form_date').parent('.date_box').addClass('border-red');
            table_elements_tbody.find('.sale_price').addClass('border-red');
        }else{
            $('.option_sale_block').addClass('hide');
            $('.form_date').parent('.date_box').removeClass('border-red');
            table_elements_tbody.find('.sale_price').removeClass('border-red');
        }
        if(option_note_show %2 == 0){
            $('.option_condition_note').removeClass('hide');
        }else{
            $('.option_condition_note').addClass('hide');
        }
        deleteTr();
    })
    // 删除 variations表单行
    function deleteTr(){
        var row_selection = table_elements_tbody.find('input.row-selection');
        var delete_variations = $('#delete-variations');
        var count_container_num = $('.count-container span.number');
        table_elements_thead.find('.row-selection').change(function() {
           var row_selection = table_elements_tbody.find('input.row-selection');
            if($(this).prop('checked')){
                row_selection.prop('checked',true);
                delete_variations.attr("disabled",false);
                count_container_num.text(row_selection.length);
            }else{
                row_selection.prop('checked',false);
                delete_variations.attr("disabled",true);
                count_container_num.text('0');
            }    
        })
        row_selection.change(function(){
            var row_selection = table_elements_tbody.find('input.row-selection');
            var row_select_all = row_selection.filter(function(index) {
               return $(this).is(':checked');
            })
            if(row_selection.is(":checked")){
                delete_variations.attr("disabled",false);
                count_container_num.text(row_select_all.length);
            }else{
                delete_variations.attr("disabled",true);
                count_container_num.text('0');
            }
            if(row_select_all.length == row_selection.length){
                table_elements_thead.find('.row-selection').prop('checked',true);
            }else{
                table_elements_thead.find('.row-selection').prop('checked',false);
            }
        })
        delete_variations.off('click').click(function(){
            var row_selection = table_elements_tbody.find('input.row-selection');
            var row_select_all = row_selection.filter(function(index) {
               return $(this).is(':checked');
            })
            $.each(row_select_all, function(index, target) {
                $(target).prop('checked',false).parents('.raw').remove();
            })
            count_container_num.text('0');
            delete_variations.attr("disabled",true);
            table_elements_thead.find('.row-selection').prop('checked',false);
        })
    }
    // offer-tab 切换动态显示
    $('.offer-tab').click(function(){
        if(Parent_variation_theme.val()){
            $('.SCQ_row').addClass('hide').find('input').removeClass('border-red');
            $('.SCQ_row').find('select').removeClass('border-red');
        }
    })
    // VitalInfo_tab 切换动态显示
    $('.VitalInfo_tab').click(function(){
        if(Parent_variation_theme.val()){
            $('.vital_info_productID').addClass('hide').find('input.ProductID').removeClass('border-red');
            $('.vital_info_productID').find('select#external_product_id_type').removeClass('border-red');
        }
    })
    // 必填数据验证
    var date_box_verify;
    $('body').on('change', '.data_vaildate', function(event) {
        if($(this).val() && $(this).val() != ' '){
            $(this).removeClass('border-red');
            var all_verify = $('.data_vaildate').filter(function(index) {
                return $(this).hasClass('border-red');
            })
            if(option_is_sale == '1'){
                date_box_verify = $('.date_box').filter(function(index) {
                    return $(this).hasClass('border-red');
                }) 
                if(!all_verify.length && !date_box_verify.length){
                    main_submit_button.attr('disabled',false);
                }
            }else{
                if(!all_verify.length){
                    main_submit_button.attr('disabled',false);
                }
            }
        }else{
            $(this).addClass('border-red');
            if(main_submit_button.attr('disabled')){
                return;
            }else{
                main_submit_button.attr('disabled',true);
            }
        }
    })
    // Add variations 
    var collapsible_header = $(".collapsible-header");
    var collapsible_content = $(".collapsible-content");
    $(".collapsible-header").click(function(){
        $(this).toggleClass('collapsed');
        collapsible_content.toggleClass('hide');
    })
    // 商品图片上传
    var img_upload = $('.imageUploadWidget').find('input[type="file"]');
    var base64_code;
    img_upload.change(function() {
        inputctr.public.judgeRecodertask('1205','了解并制作上传全新产品主副图开始');
        var file=this.files[0];
        var that = this;
        var imageUploadWidget = $(this).parents('.imageUploadWidget');
        var shop_img = imageUploadWidget.find('.previewImage');
        var noFileSelectedImage = imageUploadWidget.find('.noFileSelectedImage');
        var spinnerImage = imageUploadWidget.find('.spinnerImage');
        var chooseImageButton = imageUploadWidget.find('.chooseImageButton');
        var removeImageButton = imageUploadWidget.find('.removeImageButton');
        if(!/image\/\w+/.test(file.type)){ 
            alert('图片上传失败',"请确保文件为图片类型");
            return false; 
        }
        var reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function(){
            base64_code = this.result;
            noFileSelectedImage.addClass('hide');
            spinnerImage.removeClass('hide');
            $.post(baseUrl+'/UploadBase64Pic',{base64_pic:base64_code}, function(data){
                if(data.result == 1){
                    spinnerImage.addClass('hide');
                    var path_src = decodeURIComponent(data.pic); 
                    shop_img.attr('src',base64_code).removeClass('hide');
                    imageUploadWidget.attr('img_path',path_src);
                    chooseImageButton.addClass('hide');
                    removeImageButton.removeClass('hide');
                    removeImageButton.click(function(){
                        shop_img.attr('src','').addClass('hide');
                        that.value = '';
                        noFileSelectedImage.removeClass('hide');
                        $(this).addClass('hide');
                        chooseImageButton.removeClass('hide');
                    })
                }else{
                    alert(decodeURIComponent(data.error));
                }
            },'json')
        }
    })
    //Save and finish 页面数据提交
    main_submit_button.click(function(){
        inputctr.public.SellerRegisterLoading();
        inputctr.public.judgeRecodertask('1203','了解并填写全新商品的重要信息开始');
        //Vital Info
        var vital_segment = $('.vital_segment');
        products_info.vitalInfo.productID = vital_segment.find('input.ProductID').val().trim();
        products_info.vitalInfo.productName = vital_segment.find('input.ProductName').val().trim();
        products_info.vitalInfo.manufacturer = vital_segment.find('input.Manufacturer').val().trim();
        products_info.vitalInfo.brandName = vital_segment.find('input.BrandName').val().trim();
        products_info.vitalInfo.productIDType = vital_segment.find('select#external_product_id_type').val();
        inputctr.public.judgeFinishtask('1203');
        //Variations
        products_info.variations.variationTheme = selected_variation.text();
        var table_elements_raw = table_elements_tbody.find('.raw');
        products_info.variations.variations = [];
        for(var i=0;i<table_elements_raw.length;i++){
            products_info.variations.variations.push({
                color:$(table_elements_raw[i]).children('td[data-attribute-name="color_name"]').children('.variation-key').text(),
                size:$(table_elements_raw[i]).children('td[data-attribute-name="size_name"]').children('.variation-key').text(),
                colorMap:'',
                sizeMap:'',
                sellerSKU:$(table_elements_raw[i]).children('td[data-attribute-name="seller_sku"]').children('input').val().trim(),
                productID:$(table_elements_raw[i]).children('td[data-attribute-name="external_product_id"]').children('input').val().trim(),
                productIDType:$(table_elements_raw[i]).children('td[data-attribute-name="external_product_id_type"]').children('select').val(),
                condition:$(table_elements_raw[i]).children('td[data-attribute-name="condition_type"]').children('select').val(),
                conditionNote:$(table_elements_raw[i]).children('td[data-attribute-name="condition_note"]').find('textarea').val().trim(),
                yourPrice:$(table_elements_raw[i]).children('td[data-attribute-name="standard_price"]').find('input').val(),
                isSale:option_is_sale,
                salePrice:$(table_elements_raw[i]).children('td[data-attribute-name="sale_price"]').find('input').val().trim(),
                saleStartDate:$(table_elements_raw[i]).children('td[data-attribute-name="sale_from_date"]').find('input').val(),
                saleEndDate:$(table_elements_raw[i]).children('td[data-attribute-name="sale_end_date"]').find('input').val(),
                quantity:$(table_elements_raw[i]).children('td[data-attribute-name="quantity"]').find('input').val()
                }
            )
        }
        if(products_info.variations.variationTheme){
            inputctr.public.judgeFinishtask('1204');
        }
        var Offer_segment = $('.Offer_segment');
        products_info.offer.shippingTemplate = Offer_segment.find('#merchant_shipping_group_name').find("option:selected").text();
        products_info.offer.shippingTemplateID = Offer_segment.find('#merchant_shipping_group_name').val();
        products_info.offer.yourPrice = Offer_segment.find('#list_price').val().trim();
        products_info.offer.sellerSKU = Offer_segment.find('.SellerSKU').val().trim();
        products_info.offer.condition = Offer_segment.find('#external_product_condition').val();
        products_info.offer.quantity = Offer_segment.find('.Quantity').val().trim();
        // Images
        var Images_segment = $('.Images_segment');
        var imageUploadWidget = Images_segment.find('.imageUploadWidget');
        products_info.images.images = [];
        for(var m=0;m<imageUploadWidget.length;m++){
            if($(imageUploadWidget[m]).hasClass('main_img')){
                products_info.images.mainImg = $(imageUploadWidget[m]).attr('img_path');
            }else{
                products_info.images.images.push($(imageUploadWidget[m]).attr('img_path'));
            }
        }
        if(products_info.images.mainImg){
            inputctr.public.judgeFinishtask('1205');
        }
        // Description
        var Description_segment = $('.Description_segment');
        products_info.description.description = Description_segment.find('#product_description').val().trim();
        products_info.description.bulletPoint = [];
        Description_segment.find('.bullet-point').each(function(index,target){
            if(target.value == '' || target.value == ' '){
                return true;
            }
            products_info.description.bulletPoint.push(target.value.replace(/(^\s*)|(\s*$)/g, ""));
        });
        if(products_info.description.bulletPoint.length){
            inputctr.public.judgeFinishtask('1206');
        }
        products_info.description.legalDisclaimer = Description_segment.find('#legal_disclaimer_description').val().trim();
        products_info.description.cpsiaWarning = [];
        Description_segment.find('.cpsia_cautionary_statement_select').each(function(index,target){
            products_info.description.cpsiaWarning.push(target.value);
        });
        products_info.description.CPSIA = Description_segment.find('.CPSIAWarning').val().trim();
        // Keywords
        var Keywords = [];
        var Keywords_segment = $('.Keywords_segment');
        Keywords_segment.find('.SearchTerms').each(function(index,target){
            Keywords.push(target.value.replace(/(^\s*)|(\s*$)/g, ""));
        })
        products_info.keywords.searchTerms = Keywords.join();
        if(products_info.keywords.searchTerms){
            inputctr.public.judgeFinishtask('1207');
        }
        //More Details
        var More_Details_segment = $('.More_Details_segment');
        products_info.moreDetails.dimensions = More_Details_segment.find('#item_length_unit_of_measure').val();
        products_info.moreDetails.length = More_Details_segment.find('#item_length').val().trim();
        products_info.moreDetails.width = More_Details_segment.find('#item_width').val().trim();
        products_info.moreDetails.height = More_Details_segment.find('#item_height').val().trim();
        products_info.moreDetails.weightUnit = More_Details_segment.find('#package_weight_unit_of_measure').val();
        products_info.moreDetails.weight = More_Details_segment.find('#package_weight').val().trim();
        console.log(products_info)
        $.post(baseUrl+'/ProductAdd',{json:JSON.stringify(products_info)}, function(data){
            if(data){
                inputctr.public.SellerRegisterLoadingRemove();
            }
            if(data.result == 1){
                window.location.href = 'manage_inventory.html'
            }
        },'json')
    })
})
