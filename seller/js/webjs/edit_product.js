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
    // 页面数据初始化
    inputctr.public.checkLogin();
    inputctr.public.SellerRegisterLoading();
    var reconciledImage = $('#reconciledImage');
    var goodsID = inputctr.public.getQueryString('goodsID');
    var reconciledDetailsAttributes = $('.reconciledDetailsAttributes');
    $.post(baseUrl+'/GetProductInfo',{goodsID:goodsID}, function(data){
        console.log(data.data)
        if(data.result == 1){
            if(data.data.goods_info.product_image){
                reconciledImage.attr('src',data.data.goods_info.product_image);
            }
            inputctr.public.setCookie('skuid',data.data.sku[0].sku_id);
            productView(data.data.sku[0],data.data.goods_info); 
            vitalInfo(data.data.sku[0],data.data.goods_info);
            variations(data.data.goods_info.variation_theme,data.data.sku);
            Images(data.data.goods_img,data.data.goods_info.product_image);
            Description(data.data.goods_info);
            MoreDetails(data.data.goods_info);
            inputctr.public.SellerRegisterLoadingRemove();
        }
    },'json')
    // 商品详情展示 初始化
    function productView(view1,view2){
        var view_html = '<strong>Cate Path:&nbsp;</strong>'+view2.catePath+' <br />'+
                        '<strong>'+view1.product_id_type+':&nbsp;</strong>'+view1.product_id+' <br />'+
                        '<strong>Product Name:&nbsp;</strong>'+view2.product_name+'<br />'+
                        '<strong>Brand Name:&nbsp;</strong>'+view2.brand_name+' <br />'+
                        '<strong>Manufacturer:&nbsp;</strong>'+view2.manufacturer+' <br />'+
                        '<strong>Category (item-type):&nbsp;</strong>'+view2.category+' <br /><br />'+
                        '<strong>Marketplace:&nbsp;</strong>'+view2.marketplace+' <br /><br />'+
                        '<strong>List Price:&nbsp;</strong><span class="smallnegative">$'+view1.your_price+'</span> <br /><br />'+
                        '<strong>Amazon Sales Rank:&nbsp;</strong>'+view2.sales_rank+'';
        reconciledDetailsAttributes.html(view_html);
    }
    // Vital Info 初始化
    function vitalInfo(vitalInfo,goodsInfo){
        var vital_segment = $('.vital_segment');
        var Offer_segment = $('.Offer_segment');
        if(!goodsInfo.variation_theme){
            vital_segment.find('input.ProductID').val(vitalInfo.product_id);
            vital_segment.find('select#external_product_id_type').children('option[value="'+vitalInfo.product_id_type+'"]').prop("selected","selected");
            Offer_segment.find('#list_price').val(vitalInfo.your_price);
            Offer_segment.find('.SellerSKU').val(vitalInfo.seller_sku);
            Offer_segment.find('#external_product_condition').children('option[value="'+vitalInfo.condition+'"]').prop("selected","selected");
            Offer_segment.find('.Quantity').val(vitalInfo.quantity);

        }
        vital_segment.find('input.ProductName').val(goodsInfo.product_name);
        vital_segment.find('input.Manufacturer').val(goodsInfo.manufacturer);
        vital_segment.find('input.BrandName').val(goodsInfo.brand_name);
        Offer_segment.find('#merchant_shipping_group_name').children('option[value="1"]').prop("selected","selected");
    }
    // Variation 页面初始化
    var listing_form_menu = $(".listing-form-menu");
    var color_size = $(".variations-key-inputs .variation-keys-attribute-group-container");
    var table_elements_thead = $('.one-by-one-table').children('thead');
    var table_elements_tbody = $('.one-by-one-table').children('tbody');
    function variations(Theme,list){
        if(Theme){
            var selected_span = $("#variation-theme-changer .selected");
            selected_span.text(Theme);
            if($(color_size[1]).hasClass('size-r')){
                $(color_size[1]).removeClass('size-r');
            }
            if(Theme == 'Color'){
                $(color_size[0]).removeClass('hide');$(color_size[1]).addClass('hide');
                table_elements_thead.find('td[data-attribute-name="color_name"]').removeClass('hide');
                table_elements_thead.find('td[data-attribute-name="size_name"]').addClass('hide');
            }else if(Theme == 'Size'){
                $(color_size[0]).addClass('hide');$(color_size[1]).removeClass('hide');
                table_elements_thead.find('td[data-attribute-name="color_name"]').addClass('hide');
                table_elements_thead.find('td[data-attribute-name="size_name"]').removeClass('hide');
            }else{
                color_size.removeClass('hide');
                $(color_size[1]).addClass('size-r');
                table_elements_thead.find('td[data-attribute-name="color_name"]').removeClass('hide');
                table_elements_thead.find('td[data-attribute-name="size_name"]').removeClass('hide');
            }
            variantRender(list);
        }else{
            listing_form_menu.addClass('hide');
            $('.Variations_no_message').removeClass('hide');
            table_elements_thead.find('td[data-attribute-name="color_name"]').addClass('hide');
            table_elements_thead.find('td[data-attribute-name="size_name"]').addClass('hide');
            $('.SCQ_row').removeClass('hide');
            $('.vital_info_productID').removeClass('hide');
        }
    }
    // Variation 变体列表初始化
    function variantRender(list){
        $.each(list, function(i, val) {
            var color_show = (val.color == false) ? 'hide' : '';
            var size_show = (val.size == false) ? 'hide' : '';
            var sale_show = (val.is_sale == 0) ? 'hide' : '';
            var condition = (val.condition_note == false) ? 'hide' : '';
            var tr_html = '<tr class="raw" sku_id ='+val.sku_id+'>'+
                                '<td class="attribute" data-attribute-name="row-selection">'+
                                    '<input type="checkbox" class="row-selection">'+
                                '</td>'+
                                '<td class="attribute '+size_show+'" data-attribute-name="size_name">'+
                                    '<span class="variation-key">'+val.size+'</span>'+
                                '</td>'+
                                '<td class="attribute '+color_show+'" data-attribute-name="color_name">'+
                                    '<span class="variation-key">'+val.color+'</span>'+
                                '</td>'+
                                '<td class="attribute" data-attribute-name="seller_sku">'+
                                    '<input type="text" name="item_sku_gio_child_1" id="item_sku_gio_child_'+i+'" maxlength="40" class="charcounter" value="'+val.seller_sku+'">'+
                                '</td>'+
                                '<td class="attribute" data-attribute-name="external_product_id">'+
                                    '<input type="text" name="product_id" id="external_product_id_gio_child_'+i+'" maxlength="16"size="20" class="charcounter data_vaildate" value="'+val.product_id+'">'+
                                '</td>'+
                                '<td class="attribute" data-attribute-name="external_product_id_type">'+
                                    '<select id="external_product_id_type_gio_child_'+i+'" name="external_product_id_type_gio_child_1" class="attribute_select notification-required notification-required-unknown table-select data_vaildate">'+
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
                                        '<option value="New">New</option>'+
                                        '<option value="Refurbished">Refurbished</option>'+
                                        '<option value="Good">Good</option>'+
                                        '<option value="Like New">Like New</option>'+
                                        '<option value="Acceptable">Acceptable</option>'+
                                        '<option value="Very Good">Very Good</option>'+
                                    '</select>'+
                                '</td>'+
                                '<td class="attribute hide option_condition_note" data-attribute-name="condition_note">'+
                                    '<textarea name="condition_note-first-row" id="condition_note-first-row'+i+'" cols="50" class="condition_note_text" value="'+val.condition_note+'"></textarea>'+
                                '</td>'+
                                '<td class="attribute" data-attribute-name="standard_price">'+
                                    '<div class="currency-container">'+
                                        '<span class="currency_number-symbol">$</span>'+
                                        '<input type="text" name="standard_price_gio_child_1" id="standard_price_gio_child_'+i+'" class="price table-price data_vaildate" value="'+val.your_price+'">'+ 
                                    '</div>'+
                                '</td>'+
                                '<td class="attribute option_sale_block hide" data-attribute-name="sale_price">'+
                                    '<div class="currency-container">'+
                                        '<span class="currency_number-symbol">$</span>'+
                                        '<input type="text" name="sale_price-first-row" id="sale_price-first-row'+i+'" class="price table-price data_vaildate sale_price" value="'+val.sale_price+'">'+
                                    '</div>'+
                                '</td>'+
                                '<td class="attribute option_sale_block hide" data-attribute-name="sale_from_date">'+
                                    '<div class="date_box date_box2">'+
                                        '<i class="icon-calendar a-icon"></i>'+
                                        '<input type="text" id="sale_from_date-first-raw'+i+'" class="form_date data_vaildate" value="'+val.sale_start_date+'">'+
                                    '</div>'+
                                '</td>'+
                                '<td class="attribute option_sale_block hide" data-attribute-name="sale_end_date">'+
                                    '<div class="date_box date_box2">'+
                                        '<i class="icon-calendar a-icon"></i>'+
                                        '<input type="text" id="sale_end_date-first-raw'+i+'" class="form_date data_vaildate" value="'+val.sale_end_date+'">'+
                                    '</div>'+
                                '</td>'+
                                '<td class="attribute" data-attribute-name="quantity">'+
                                    '<input type="number" size="10" min="0" maxlength="25" class="data_vaildate" name="quantity" id="quantity_gio_child_'+i+'" value="'+val.quantity+'">'+
                                '</td>'+
                                '<td></td>'+
                            '</tr>'
            table_elements_tbody.append(tr_html);
            var table_elements_raw = table_elements_tbody.find('.raw');
            $(table_elements_raw[i]).children('td[data-attribute-name="external_product_id_type"]').find('option[value="'+val.product_id_type+'"]').prop("selected","selected");
            $(table_elements_raw[i]).children('td[data-attribute-name="condition_type"]').find('option[value="'+val.condition+'"]').prop("selected","selected");
        })
        render_or_creat = true;
        deleteTr();
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
    }
    // Variation 列表 删除行
    var deleteSelected = true;
    function deleteTr(){
        var row_selection = table_elements_tbody.find('input.row-selection');
        var delete_variations = $('#delete-variations');
        var undelete_variations = $('#undelete-variations');
        var count_container_num = $('.count-container span.number');
        table_elements_thead.find('.row-selection').change(function() {
            var row_selection = table_elements_tbody.find('input.row-selection');
            var row_delected = row_selection.filter(function(index) {
                return $(this).parents('.raw').hasClass('delected');
            })
           if($(this).prop('checked')){
                row_selection.prop('checked',true);
                if(row_delected.length){
                    if(row_delected.length < row_selection.length){
                        undelete_variations.removeClass('hide').attr('disabled',false);
                        delete_variations.attr('disabled',false).removeClass('hide');
                    }else{
                        undelete_variations.removeClass('hide').attr('disabled',false);
                        delete_variations.attr('disabled',false).addClass('hide');
                    }
                }else{
                    undelete_variations.addClass('hide').attr('disabled',true);
                    delete_variations.attr('disabled',false).removeClass('hide');
                }
                count_container_num.text(row_selection.length);
           }else{
                if(row_delected.length){
                    if(row_delected.length < row_selection.length){
                        undelete_variations.removeClass('hide').attr('disabled',true);
                        delete_variations.attr('disabled',true).removeClass('hide');
                    }else{
                        undelete_variations.removeClass('hide').attr('disabled',true);
                        delete_variations.attr('disabled',true).addClass('hide');
                    }
                }else{
                    undelete_variations.addClass('hide').attr('disabled',true);
                    delete_variations.removeClass('hide').attr('disabled',true);
                }
                row_selection.prop('checked',false);
                count_container_num.text('0');
           }    
        })
        row_selection.change(function(){
            var row_selection = table_elements_tbody.find('input.row-selection');
            var row_select_all = row_selection.filter(function(index) {
               return $(this).is(':checked');
            })
            if(row_selection.is(":checked")){
                if(row_select_all.length == 1){
                    if($(this).parents('.raw').hasClass('delected')){
                        undelete_variations.attr("disabled",false).removeClass('hide');
                        delete_variations.addClass('hide').attr("disabled",true);
                    }else{
                        delete_variations.attr("disabled",false).removeClass('hide');
                        undelete_variations.addClass('hide').attr("disabled",true);
                    }
                }else{
                    if($(this).parents('.raw').hasClass('delected')){
                        undelete_variations.attr("disabled",false).removeClass('hide');
                    }else{
                        delete_variations.attr("disabled",false).removeClass('hide');
                    }
                }
                count_container_num.text(row_select_all.length);
            }else{
                undelete_variations.attr("disabled",true).addClass('hide');
                delete_variations.attr("disabled",true).removeClass('hide');
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
                if($(target).parents('.raw').attr('sku_id')){
                    if(!$(target).parents('.raw').hasClass('delected')){
                        $(target).parents('.raw').addClass('delected').find('.variation-key').addClass('delete-tr');
                        $(target).parents('.raw').find('select').addClass('delete-tr').attr('disabled',true);
                        $(target).parents('.raw').find('input:not(.row-selection)').attr('disabled',true).addClass('delete-tr').siblings().addClass('delete-tr');
                        $(target).prop('checked',false);
                    }
                }else{
                    $(target).prop('checked',false).parents('.raw').remove();
                }
            })
            var row_selection = table_elements_tbody.find('input.row-selection');
            var row_select_all = row_selection.filter(function(index) {
               return $(this).is(':checked');
            })
            count_container_num.text(row_select_all.length);
            delete_variations.attr("disabled",true);
            table_elements_thead.find('.row-selection').prop('checked',false);
            var row_delected = row_selection.filter(function(index) {
                return $(this).parents('.raw').hasClass('delected');
            })
            if(row_delected.length == row_selection.length){
                main_submit_button.attr('disabled',true);
                deleteSelected = false;
            }
        })
        undelete_variations.off('click').click(function(){
            var row_selection = table_elements_tbody.find('input.row-selection');
            var row_select_all = row_selection.filter(function(index) {
               return $(this).is(':checked');
            })
            $.each(row_select_all, function(index, target) {
                if($(target).parents('.raw').hasClass('delected')){
                    $(target).parents('.raw').removeClass('delected').find('.variation-key').removeClass('delete-tr');
                    $(target).parents('.raw').find('select').removeClass('delete-tr').attr('disabled',true);
                    $(target).parents('.raw').find('input:not(.row-selection)').attr('disabled',false).removeClass('delete-tr').siblings().removeClass('delete-tr');
                    $(target).prop('checked',false);
                    delete_variations.removeClass('hide');
                    undelete_variations.addClass('hide').attr('disabled',true);
                }
            })
            var row_select_all = row_selection.filter(function(index) {
               return $(this).is(':checked');
            })
            count_container_num.text(row_select_all.length);
            table_elements_thead.find('.row-selection').prop('checked',false);
            main_submit_button.attr('disabled',false);
            deleteSelected = true;  
        })
    }
    // Images 页面初始化
    function Images(productsImgs,mainImg){
        var Images_segment = $('.Images_segment');
        var imageUploadWidget = Images_segment.find('.imageUploadWidget');
        if(mainImg){
            $(imageUploadWidget[0]).attr('img_path',mainImg).find('.chooseImageButton').addClass('hide').siblings('.removeImageButton').removeClass('hide');
            $(imageUploadWidget[0]).find('.previewImage').attr('src',mainImg).removeClass('hide').siblings('.noFileSelectedImage').addClass('hide');
        }
        if(productsImgs.length){
            for(var m=1;m<imageUploadWidget.length;m++){
                if(m == productsImgs.length){
                    break;
                }
                $(imageUploadWidget[m]).attr('img_path',mainImg).find('.chooseImageButton').addClass('hide').siblings('.removeImageButton').removeClass('hide');
                $(imageUploadWidget[m]).attr('img_path',productsImgs[m-1].Column1).find('.previewImage').attr('src',productsImgs[m-1].Column1).removeClass('hide').siblings('.noFileSelectedImage').addClass('hide');
            }
        }
        imageUploadWidget.find('.Remove_img').click(function(){
            $(this).parents('.imageUploadWidget').attr('img_path','').find('.chooseImageButton').removeClass('hide').siblings('.removeImageButton').addClass('hide');
            $(this).parents('.imageUploadWidget').find('.previewImage').attr('src','').addClass('hide').siblings('.noFileSelectedImage').removeClass('hide');
        })
    }
    // Description Keywords页面初始化
    function Description(depict){
        var Description_segment = $('.Description_segment');
        Description_segment.find('#product_description').val(depict.description);
        bulletInit(Description_segment.find('.bullet-point')[0],depict.bullet_point);
        Description_segment.find('#legal_disclaimer_description').val(depict.legal_disclaimer);
        bulletInit(Description_segment.find('.cpsia_cautionary_statement')[0],depict.cpsia_warning);
        Description_segment.find('.CPSIAWarning').val(depict.CPSIA_warning_description);
        var Keywords_segment = $('.Keywords_segment');
        bulletInit(Keywords_segment.find('.SearchTerms')[0],depict.search_terms.split(','));
    }
    // More Details 页面初始化
    function MoreDetails(details){
        var More_Details_segment = $('.More_Details_segment');
        More_Details_segment.find('#item_length_unit_of_measure').children('option[value="'+details.package_unit.trim()+'"]').prop("selected","selected");
        More_Details_segment.find('#item_length').val(details.package_length);
        More_Details_segment.find('#item_width').val(details.package_width);
        More_Details_segment.find('#item_height').val(details.package_height);
        More_Details_segment.find('#package_weight_unit_of_measure').children('option[value="'+details.shipping_weight_unit+'"]').prop("selected","selected");
        More_Details_segment.find('#package_weight').val(details.shipping_weight);
    }
    // //页面数据收集
    var main_submit_button = $('#main_submit_button');
    // Vital Info
    var categoryID = inputctr.public.getQueryString('cateid');
    var vital_segment_input = $('.vital_segment').find('input[type="text"]');
    var external_product_id_type = $('#external_product_id_type');
    var products_info = {
        goodsid:goodsID,
        skuid:'',
        baseInfo:{
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
    // 产品详情选项卡
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
    function bulletInit(target,bulletArr){
        add_n = bulletArr.length;
        for(var b=1;b<add_n;b++){
            $(target).clone(true).insertAfter(target);
        }
        if($(target).attr('class') == 'cpsia_cautionary_statement'){
            var select = $(target).parent().find('select');
            for(var s=0;s<select.length;s++){
                $(select[s]).children('option[value="'+bulletArr[s]+'"]').prop("selected","selected");
            }
            if(add_n >= 2 && add_n < 5){
                 $(target).parent().siblings('.attributeMultiControls').children('.AddMore').siblings(":not('.AddMoreText')").toggleClass('hide')
            }
            if(add_n >= 5){
                $(target).parent().siblings('.attributeMultiControls').children('.AddMore').addClass('hide').siblings('.AddMoreText').removeClass('hide').siblings('.removeLastLink').removeClass('hide').siblings('.removeLastText').addClass('hide');
                return;
            }
        }else{
            var input = $(target).parent().find('input[type="text"]');
            for(var t=0;t<input.length;t++){
                $(input[t]).val(bulletArr[t]);
            }
            if(add_n >= 2 && add_n < 5){
                 $(target).parent().find('.AddMore').siblings(":not('.AddMoreText')").toggleClass('hide')
            }
            if(add_n >= 5){
                $(target).parent().find('.AddMore').addClass('hide').siblings('.AddMoreText').removeClass('hide').siblings('.removeLastLink').removeClass('hide').siblings('.removeLastText').addClass('hide');
                return;
            }
        }
    }
    function Add_More(add,selecter,html){
       attributeMultiControls.children('.AddMore').click(function(){
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
  // 添加尺寸、颜色 input
    var create_variations = $('#create-variations');
    var size_name_input = $('#Parent-size_name_1');
    var Parent_color_name_1 = $("#Parent-color_name_1");
    function size_color(target){
        target.on('change', 'input', function(event) {
            var n = $(this).index();
            if($(this).val() != false){
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
    // Fields: Condition Note & Sale Price
    var option_sale = $('.option_sale');
    var option_note = $('.option_note');
    var option_sale_show = 1;
    var option_is_sale = '0';
    function optionSaleShow(option_sale_show){
        if(option_sale_show %2 == 0){
            $('.option_sale_block').removeClass('hide');
            if(render_or_creat){
                $('.form_date').parent('.date_box');
                table_elements_tbody.find('.sale_price');
            }else{
                $('.form_date1').parent('.date_box').addClass('border-red');
                table_elements_tbody.find('.sale_price1').addClass('border-red');
            }
            option_is_sale = '1';
        }else{
            $('.option_sale_block').addClass('hide');
            $('.form_date').parent('.date_box').removeClass('border-red');
            table_elements_tbody.find('.sale_price').removeClass('border-red');
            option_is_sale = '0';
        }
    }
    option_sale.click(function(){
        option_sale_show++; 
        optionSaleShow(option_sale_show);
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
                                            '<input type="text" name="sale_price-first-row" id="sale_price-first-row'+i+'" class="price table-price data_vaildate sale_price1 sale_price">'+
                                        '</div>'+
                                    '</td>'+
                                    '<td class="attribute option_sale_block hide" data-attribute-name="sale_from_date">'+
                                        '<div class="date_box date_box2">'+
                                            '<i class="icon-calendar a-icon"></i>'+
                                            '<input type="text" id="sale_from_date-first-raw'+i+'" class="form_date1 data_vaildate form_date">'+
                                        '</div>'+
                                    '</td>'+
                                    '<td class="attribute option_sale_block hide" data-attribute-name="sale_end_date">'+
                                        '<div class="date_box date_box2">'+
                                            '<i class="icon-calendar a-icon"></i>'+
                                            '<input type="text" id="sale_end_date-first-raw'+i+'" class="form_date1 data_vaildate form_date">'+
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
                                            '<input type="text" name="sale_price-first-row" id="sale_price-first-row'+i+'" class="price table-price data_vaildate sale_price1 sale_price">'+
                                        '</div>'+
                                    '</td>'+
                                    '<td class="attribute option_sale_block hide" data-attribute-name="sale_from_date">'+
                                        '<div class="date_box date_box2">'+
                                            '<i class="icon-calendar a-icon"></i>'+
                                            '<input type="text" id="sale_from_date-first-raw'+i+'" class="form_date1 data_vaildate form_date">'+
                                        '</div>'+
                                    '</td>'+
                                    '<td class="attribute option_sale_block hide" data-attribute-name="sale_end_date">'+
                                        '<div class="date_box date_box2">'+
                                            '<i class="icon-calendar a-icon"></i>'+
                                            '<input type="text" id="sale_end_date-first-raw'+i+'" class="form_date1 data_vaildate form_date">'+
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
                                                '<input type="text" name="sale_price-first-row" id="sale_price-first-row'+i+'" class="price table-price data_vaildate sale_price1 sale_price">'+
                                            '</div>'+
                                        '</td>'+
                                        '<td class="attribute option_sale_block hide" data-attribute-name="sale_from_date">'+
                                            '<div class="date_box date_box2">'+
                                                '<i class="icon-calendar a-icon"></i>'+
                                                '<input type="text" id="sale_from_date-first-raw'+i+'" class="form_date1 data_vaildate form_date">'+
                                            '</div>'+
                                        '</td>'+
                                        '<td class="attribute option_sale_block hide" data-attribute-name="sale_end_date">'+
                                            '<div class="date_box date_box2">'+
                                                '<i class="icon-calendar a-icon"></i>'+
                                                '<input type="text" id="sale_end_date-first-raw'+i+'" class="form_date1 data_vaildate form_date">'+
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
        render_or_creat = false;
        optionSaleShow(option_sale_show);
        if(option_note_show %2 == 0){
            $('.option_condition_note').removeClass('hide');
        }else{
            $('.option_condition_note').addClass('hide');
        }
        deleteTr();
        main_submit_button.attr('disabled',true);
    }) 
    // 必填数据验证
    var date_box_verify;
    $('body').on('change', '.data_vaildate', function(event) {
        if($(this).val() != false){
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
                if(!all_verify.length && deleteSelected){
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
        products_info.skuid = inputctr.public.getCookie('skuid');
        //Vital Info
        var vital_segment = $('.vital_segment');
        products_info.vitalInfo.productID = vital_segment.find('input.ProductID').val().trim();
        products_info.vitalInfo.productName = vital_segment.find('input.ProductName').val().trim();
        products_info.vitalInfo.manufacturer = vital_segment.find('input.Manufacturer').val().trim();
        products_info.vitalInfo.brandName = vital_segment.find('input.BrandName').val().trim();
        products_info.vitalInfo.productIDType = vital_segment.find('select#external_product_id_type').val();
        //Variations
        products_info.variations.variationTheme = selected_variation.text();
        var table_elements_raw = table_elements_tbody.find('.raw');
        products_info.variations.variations = [];
        for(var i=0;i<table_elements_raw.length;i++){
            if($(table_elements_raw[i]).hasClass('delected')){
                continue;
            }
            var salePrice = $(table_elements_raw[i]).children('td[data-attribute-name="sale_price"]').find('input').val().trim();
            var isSale = (salePrice == false) ? '0' :'1';
            var skuid = ($(table_elements_raw[i]).attr('sku_id') == undefined) ? '' : $(table_elements_raw[i]).attr('sku_id'); 
            products_info.variations.variations.push({
                skuid:skuid,
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
                isSale:isSale,
                salePrice:salePrice,
                saleStartDate:$(table_elements_raw[i]).children('td[data-attribute-name="sale_from_date"]').find('input').val(),
                saleEndDate:$(table_elements_raw[i]).children('td[data-attribute-name="sale_end_date"]').find('input').val(),
                quantity:$(table_elements_raw[i]).children('td[data-attribute-name="quantity"]').find('input').val()
                }
            )
        }
        // Offer
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
        // Description
        var Description_segment = $('.Description_segment');
        products_info.description.description = Description_segment.find('#product_description').val().trim();
        products_info.description.bulletPoint = [];
        Description_segment.find('.bullet-point').each(function(index,target){
            products_info.description.bulletPoint.push(target.value.replace(/(^\s*)|(\s*$)/g, ""));
        });
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
        // More Details
        products_info.keywords.searchTerms = Keywords.join();
        var More_Details_segment = $('.More_Details_segment');
        products_info.moreDetails.dimensions = More_Details_segment.find('#item_length_unit_of_measure').val();
        products_info.moreDetails.length = More_Details_segment.find('#item_length').val().trim();
        products_info.moreDetails.width = More_Details_segment.find('#item_width').val().trim();
        products_info.moreDetails.height = More_Details_segment.find('#item_height').val().trim();
        products_info.moreDetails.weightUnit = More_Details_segment.find('#package_weight_unit_of_measure').val();
        products_info.moreDetails.weight = More_Details_segment.find('#package_weight').val().trim();
        console.log(products_info)
        $.post(baseUrl+'/ProductEdit',{json:JSON.stringify(products_info)}, function(data){
            if(data){
                inputctr.public.SellerRegisterLoadingRemove();
            }
            if(data.result == 1){
                setTimeout(function(){
                    window.location.href='manage_inventory.html';
                }, 0)
            }
        },'json')
    })
})