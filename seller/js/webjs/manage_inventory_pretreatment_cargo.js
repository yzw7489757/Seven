$(function () {
    var sizeInput1 = $('.sizeInput1').val();
    var sizeInput2 = $('.sizeInput2').val();
    var sizeInput3 = $('.sizeInput3').val();
    var inputweight = $('.inputweight').val();
    var moreSizeInput1 = $('.moreSizeInput1').val();
    var moreSizeInput2 = $('.moreSizeInput2').val();
    var moreSizeInput3 = $('.moreSizeInput3').val();
    var moreSizeweight = $('.moreSizeweight').val();
    var box_goods_num = $('.box_goods_num').val();
    var box_num = $('.box_num').val();
    var shippingMethod; // 配送方式（1 小包裹快递 2 汽运零担）
    var shippingService; // 承运人编号
    var shipmentPacking = "1"; // 如何包装（1 多个箱子  2 所有商品装于一个箱子）
    var provideMode = "3"; // 箱内物品信息提供方式（1 使用网页表格 2 上传文件 3 跳过箱子信息并收取手动处理费用 ）

    var baseUrl = 'http://192.168.2.164:8096/QAMZNAPI.asmx';
    if (window.sessionStorage) {
        var planId = sessionStorage.getItem('planId')
        var cargoNo = sessionStorage.getItem('cargoNo')
        var planGoodsId = sessionStorage.getItem('planGoodsId')
    }
    if ($('.addInput tr').length <= '2') {
        $('.addInput tr').eq(0).find('.closeBtn').hide();
    }

    function inputValue() {
        sizeInput1 = $('.sizeInput1').val();
        sizeInput2 = $('.sizeInput2').val();
        sizeInput3 = $('.sizeInput3').val();
        inputweight = $('.inputweight').val();
        moreSizeInput1 = $('.moreSizeInput1').val();
        moreSizeInput2 = $('.moreSizeInput2').val();
        moreSizeInput3 = $('.moreSizeInput3').val();
        moreSizeweight = $('.moreSizeweight').val();
        box_goods_num = $('.box_goods_num').val();
        box_num = $('.box_num').val();
    }
    // 检查并修改商品
    $('.checkupBtn').click(function () {
        $('.checkupBtn').hide();
        $('.hiddengoodsBtn').removeClass('dispplay_none');
        $('.hiddenInfo').show();
    })
    // 隐藏商品
    $('.hiddengoodsBtn').click(function () {
        $('.hiddengoodsBtn').addClass('dispplay_none');
        $('.checkupBtn').show()
        $('.hiddenInfo').hide();
    })

    $('#packing_box_select').bind("change", function () {
        if ($(this).val() == 'multiple_boxes') {
            $('.multiple_boxes').show()
            $('.a_box').hide()
        } else if ($(this).val() == 'a_box') {
            $('.multiple_boxes').hide()
            $('.a_box').show()
        }
    })
    // 删除
    $('.deleteBtn').click(function () {
        $(this).parent().parent().remove();
    })
    // 确认
    $('.confirmBtn').click(function () {
        inputValue();
        if (sizeInput1 && sizeInput2 && sizeInput3 && inputweight) {
            $('.successInfo').show()
        }
    })
    $('.moreConfirmBtn').click(function () {
        inputValue();
        strBoxJson = JSON.stringify({
            planNo: planId,
            cargoNo: cargoNo,
            planGoods: [{
                plan_goods_id: planGoodsId,
                goodsBox:[{
                    box_weights: moreSizeweight,
                    box_length: moreSizeInput1,
                    box_width: moreSizeInput2,
                    box_height: moreSizeInput3,
                    box_goods_num:box_goods_num,
                    box_num: box_num
                }]
            }]   
        });
        $('.addInput tr').each(function (i) { 
            console.log($('.addInput tr').eq(i).text())
         })
        if (moreSizeInput1 && moreSizeInput2 && moreSizeInput3 && moreSizeweight ) {
            alert('保存成功')
        }
    })
    // 添加其他箱子配置 添加
    $('.add_configuration').click(function () {
        var html = $(`
        <tr>
            <td class=" width18 align_right">
                <div class="a-spacing-small">
                    <input type="text" class="a-text-right box_goods_num">
                </div>
            </td>
            <td class=" pdLeft45 align_right">
                <div class="a-spacing-small addNumInput">
                    <div class="a-spacing-small">
                        <input type="text" class="a-text-right box_num">
                        <img src="./img/icon_4.png" alt="closeImg" class="pdleft10 closeBtn ">
                    </div>
                </div>

            </td>
            <td class=" width9 align_right">
                <div class="a-spacing-small height21">
                    <span>-</span>
                </div>

            </td>
            <td class="pdLeft45 align_right">
                <div class="a-spacing-small">
                    <input type="text" class="moreSizeweight ">
                </div>
            </td>
            <td class="a-text-right ">
                <div class="a-spacing-small">
                    <input type="text" class="moreSizeInput1 a-text-center ">
                    <img src="./img/close.png" alt="">
                    <input type="text" class="moreSizeInput2 a-text-center ">
                    <img src="./img/close.png" alt="">
                    <input type="text" class="moreSizeInput3 a-text-center ">
                </div>
            </td>
        </tr>
        `)
        for(let i = 0 ;i<$('.addInput tr').length;i++){
            // inputweight = $(this).find($('.inputweight')).val();
            // moreSizeInput1 = $(this).find($('.moreSizeInput1')).val();
            // moreSizeInput2 = $(this).find($('.moreSizeInput2')).val();
            // moreSizeInput3 = $(this).find($('.moreSizeInput3')).val();
            // moreSizeweight = $(this).find($('.moreSizeweight')).val();
            // box_goods_num = $(this).find($('.box_goods_num')).val();
            // box_num = $(this).find($('.box_num')).val();
            
        }
        
        if ($('.addInput tr').length > '2') {
            $('.addInput tr').eq(0).find('.closeBtn').show();
        }
    })
    // 添加其他箱子配置 删除
    $('.addInput').on("click", '.closeBtn', function () {
        $(this).parent().parent().parent().parent().remove();
        if ($('.addInput tr').length <= '2') {
            $('.addInput tr').eq(0).find('.closeBtn').hide();
        }
    });
    // 完成货件按钮变换颜色
    function changeFinishBtn() { 
        if (moreSizeweight && moreSizeInput1 && moreSizeInput2 && moreSizeInput3 && box_goods_num && box_num && shippingMethod) {
            $('.finish').show();
            $('.unfinish').hide();
        }
     }
    // 配送方式（1 小包裹快递 2 汽运零担）
    $('input[name="type"]').change(function () {
        inputValue();

        if ($(this).val() == 'spd') {
            shippingMethod = 1;
            changeFinishBtn();
        } else {
            shippingMethod = 2;
            changeFinishBtn();
        }
    })
    // 如何包装（1 多个箱子  2 所有商品装于一个箱子）
    $('select[name="select_box"]').change(function () {
        if ($(this).val() == 'multiple_boxes') {
            shipmentPacking = 1;
        } else {
            shipmentPacking = 2;
        }
    })
    // 箱内物品信息提供方式（1 使用网页表格 2 上传文件 3 跳过箱子信息并收取手动处理费用 ）
    $('input[name="info"]').change(function () {
        if ($(this).val() == 'table') {
            provideMode = 1;
        } else if ($(this).val() == 'updateFile') {
            provideMode = 2;
        } else {
            provideMode = 3;
        }
    })

    function Input_blur(target) {
        $(target).blur(function (e) {
            e.preventDefault();
            inputValue();
            changeFinishBtn();
            if ($(target).val() == "") {
                alert('箱子配置为空')
            }
            
        });
    }
    Input_blur('.moreSizeweight');
    Input_blur('.moreSizeInput1');
    Input_blur('.moreSizeInput2');
    Input_blur('.moreSizeInput3');
    Input_blur('.box_goods_num');
    Input_blur('.box_num');
    // 完成货件
    $('.finishBtn').click(function () {
        inputValue();
        if (moreSizeweight && moreSizeInput1 && moreSizeInput2 && moreSizeInput3 && box_goods_num && box_num && shippingMethod) {
            $('.finish').show();
            $('.unfinish').hide();
            strGoodsCargo = JSON.stringify({
                planNo: planId,
                cargoNo: cargoNo,
                shippingMethod: shippingMethod,
                shippingService: shippingService,
                shipmentPacking: shipmentPacking,
                provideMode: provideMode
            });
            $.post(baseUrl + '/SetCargo', {
                strGoodsCargo: strGoodsCargo
            }, function (res) {
                console.log(res);
                if (res.result == '1') {
                    console.log('success!')
                    $(location).attr('href', '/seller/manage_inventory_list.html');
                }
            }, 'json')
        } else {
            alert('请选择配送方式 && 填写箱子配送信息')
        }
    })

    // 获取承运人
    $.post(baseUrl + '/GetShippingCarrier', function (res) {
        console.log(res);
        console.log('success!')
        var data = res.carrierInfo
        var add = doT.template($('#addArray').text());
        $('#addTmpl').html(add(data))
        // 承运人编号
        shippingService = $('.select').find('option:selected').attr('data-id');
        $('.select').change(function () {
            shippingService = $('.select').find('option:selected').attr('data-id');
        })
    }, 'json')

    
    // 获取进度操作数据
    $.post(baseUrl + '/GetSchedule', {
        tag: '5',
        planId: planId
    }, function (res) {
        console.log(res);
        $('.cargoName').text(decodeURIComponent(res.cargoName));
        $('.cargoNo').text(decodeURIComponent(res.cargoNo));
        $('.shippingNumber').text(decodeURIComponent(res.shippingNumber));
        $('.name').text(decodeURIComponent(res.adrInfo.name));
        $('.address').text(decodeURIComponent(res.adrInfo.address));
        $('.address2').text(decodeURIComponent(res.adrInfo.address2));
        $('.detailAddress').text(`${decodeURIComponent(res.adrInfo.city)} ${decodeURIComponent(res.adrInfo.province)}`);
        $('.zipcode').text(decodeURIComponent(res.adrInfo.zipcode));
        $('.country').text(decodeURIComponent(res.adrInfo.country));
        $('.goodsNum').text(decodeURIComponent(res.goodsNum));
        $('.createTime').text(res.createTime)
        $('.cargoStatus').text(decodeURIComponent(res.cargoStatus))
    }, 'json')

   // 6.4 查看货件内商品
    $.post(baseUrl + '/GetCargoGoods', {
        planId: planId
    }, function (res) {
        console.log(res)
        var data = res.goodsLable[0];
        // 卖家sku
        $('.sellerId').text(data.sellerId)
        // 商品名称
        $('.goodsName').text(decodeURIComponent(data.goodsName))
        // 配送类型：-1 所有 1卖家 2 亚马逊
        if (data.packModel == '-1') {
            $('.shippingMode').text('所有')
        } else if (data.packModel == '1') {
            $('.shippingMode').text('卖家')
        } else if (data.packModel == '2') {
            $('.shippingMode').text('亚马逊')
        }
        // 发货（1是 0否）
        if (data.deliveried == '1') {
            $('.deliveried').text('是')
        } else {
            $('.deliveried').text('否')
        }
        // 货件数量
        $('.goodsNum').text(res.goodsNum)
    }, 'json')
    // 返回
    $('.returnBtn').click(function () {
        $(location).attr('href', '/seller/manage_inventory_pretreatment_cargo.html');
    })
})