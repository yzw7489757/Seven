$(function () {
        inputctr.public.checkLogin();
        inputctr.public.selectCountry();
        
        var methos_id = null;
        var fld_code = null;
        var addressName;
        var line_one;
        var line_two;
        var country_region;
        var postalcode;
        var city_town;
        var tel;
        var state_province;
        var E_mail;

        function addresstable() {
                addPopup({
                        parentClass: 'sb', //最外层盒子class
                        contral: true, //点击遮罩是否关闭，默认不
                        width: '500px', //div宽度
                        type: 1, // 如果是多级div，必须加这个参数
                        title: '添加新的送货地址', //标题
                        className: 'box-inside', //内容层div
                        btn: ['确定', '取消'],
                        commit: function () {
                                callback()
                        },
                        cancel: function () { //取消的事件
                                $('.box-inside').hide();
                                $('.box-content').show();
                                console.log($('.box-inside'))
                        },
                        content: `
            <div class="a-row">
                <div class="addressEditItem" id="addressNameId">
                    <div class="addressEditTitle">
                        <span  data-i18n-text="_body_address_name">地址名称</span>
                    </div>
                    <div class="a-spacing-mini">
                        <input class="addressName" type="text" data-i18n-placeholder="_body_for_example" maxlength="60">
                    </div>
                    <div>
                        <span class="font_color">您为地址选择的自定义名称。</span>
                    </div>
                </div>
            </div>
            <hr>
            <div class="addressEditItem">
                <div class="addressEditTitle">
                    <span data-i18n-text="_body_country_region">国家/地区</span>
                </div>
                <div class="a-spacing-mini" id="country_regionId">
                   
                <div class="address-dropdown">
                        <select name="country" class="address-dropdown-select dropdown-select country ">
                        <option value="none" selected>---无---</option>
                        <option value="阿尔巴尼亚">阿尔巴尼亚</option>
                        <option value="阿尔及利亚">阿尔及利亚</option>
                        <option value="阿富汗">阿富汗</option>
                        <option value="阿根廷">阿根廷</option>
                        <option value="阿联酋">阿联酋</option>
                        <option value="阿鲁巴">阿鲁巴</option>
                        <option value="阿曼">阿曼</option>
                        <option value="阿塞拜疆">阿塞拜疆</option>
                        <option value="阿森松岛">阿森松岛</option>
                        <option value="埃及">埃及</option>
                        <option value="埃塞俄比亚">埃塞俄比亚</option>
                        <option value="爱尔兰">爱尔兰</option>
                        <option value="爱沙尼亚">爱沙尼亚</option>
                        <option value="安道尔">安道尔</option>
                        <option value="安哥拉">安哥拉</option>
                        <option value="安圭拉">安圭拉</option>
                        <option value="安提瓜和巴布达">安提瓜和巴布达</option>
                        <option value="奥地利">奥地利</option>
                        <option value="奥尔得尼岛">奥尔得尼岛</option>
                        <option value="奥兰群岛">奥兰群岛</option>
                        <option value="澳大利亚">澳大利亚</option>
                        <option value="澳大利亚圣诞岛">澳大利亚圣诞岛</option>
                        <option value="澳门">澳门</option>
                        <option value="巴巴多斯">巴巴多斯</option>
                        <option value="巴布亚新几内亚">巴布亚新几内亚</option>
                        <option value="巴哈马国">巴哈马国</option>
                        <option value="巴基斯坦">巴基斯坦</option>
                        <option value="巴拉圭">巴拉圭</option>
                        <option value="巴勒斯坦">巴勒斯坦</option>
                        <option value="巴林">巴林</option>
                        <option value="巴拿马">巴拿马</option>
                        <option value="巴西">巴西</option>
                        <option value="白俄罗斯">白俄罗斯</option>
                        <option value="百慕大">百慕大</option>
                        <option value="保加利亚">保加利亚</option>
                        <option value="北马里亚纳群岛自由邦">北马里亚纳群岛自由邦</option>
                        <option value="贝宁">贝宁</option>
                        <option value="比利时">比利时</option>
                        <option value="冰岛">冰岛</option>
                        <option value="波多黎各">波多黎各</option>
                        <option value="波兰">波兰</option>
                        <option value="波斯尼亚和墨塞哥维那">波斯尼亚和墨塞哥维那</option>
                        <option value="玻利维亚">玻利维亚</option>
                        <option value="伯利兹">伯利兹</option>
                        <option value="博茨瓦纳">博茨瓦纳</option>
                        <option value="不丹">不丹</option>
                        <option value="布基纳法索">布基纳法索</option>
                        <option value="布隆迪">布隆迪</option>
                        <option value="朝鲜">朝鲜</option>
                        <option value="赤道几内亚">赤道几内亚</option>
                        <option value="丹麦">丹麦</option>
                        <option value="德国">德国</option>
                        <option value="东帝汶">东帝汶</option>
                        <option value="多哥">多哥</option>
                        <option value="多米尼加共和国">多米尼加共和国</option>
                        <option value="多米尼克">多米尼克</option>
                        <option value="俄罗斯">俄罗斯</option>
                        <option value="厄瓜多尔">厄瓜多尔</option>
                        <option value="厄立特里亚">厄立特里亚</option>
                        <option value="法国">法国</option>
                        <option value="法罗群岛">法罗群岛</option>
                        <option value="法属波利尼西亚">法属波利尼西亚</option>
                        <option value="法属圭亚那">法属圭亚那</option>
                        <option value="梵蒂冈城国">梵蒂冈城国</option>
                        <option value="菲律宾">菲律宾</option>
                        <option value="斐济">斐济</option>
                        <option value="芬兰">芬兰</option>
                        <option value="佛得角">佛得角</option>
                        <option value="福克兰群岛">福克兰群岛</option>
                        <option value="冈比亚">冈比亚</option>
                        <option value="刚果共和国">刚果共和国</option>
                        <option value="刚果民主共和国">刚果民主共和国</option>
                        <option value="哥伦比亚">哥伦比亚</option>
                        <option value="哥斯达黎加">哥斯达黎加</option>
                        <option value="格林纳达">格林纳达</option>
                        <option value="格陵兰">格陵兰</option>
                        <option value="格鲁吉亚">格鲁吉亚</option>
                        <option value="根西岛">根西岛</option>
                        <option value="古巴">古巴</option>
                        <option value="瓜德罗普">瓜德罗普</option>
                        <option value="关岛">关岛</option>
                        <option value="圭亚那">圭亚那</option>
                        <option value="哈萨克斯坦">哈萨克斯坦</option>
                        <option value="海地">海地</option>
                        <option value="韩国">韩国</option>
                        <option value="荷兰">荷兰</option>
                        <option value="荷兰加勒比区">荷兰加勒比区</option>
                        <option value="荷属安的列斯">荷属安的列斯</option>
                        <option value="荷属圣马丁">荷属圣马丁</option>
                        <option value="黑山共和国">黑山共和国</option>
                        <option value="洪都拉斯">洪都拉斯</option>
                        <option value="基里巴斯">基里巴斯</option>
                        <option value="吉布提">吉布提</option>
                        <option value="吉尔吉斯斯坦">吉尔吉斯斯坦</option>
                        <option value="几内亚">几内亚</option>
                        <option value="几内亚比绍">几内亚比绍</option>
                        <option value="加拿大">加拿大</option>
                        <option value="加那利群岛">加那利群岛</option>
                        <option value="加纳">加纳</option>
                        <option value="加蓬">加蓬</option>
                        <option value="柬埔寨">柬埔寨</option>
                        <option value="捷克">捷克</option>
                        <option value="津巴布韦">津巴布韦</option>
                        <option value="喀麦隆">喀麦隆</option>
                        <option value="卡塔尔">卡塔尔</option>
                        <option value="开曼群岛">开曼群岛</option>
                        <option value="科科斯(基林)群岛">科科斯(基林)群岛</option>
                        <option value="科摩罗">科摩罗</option>
                        <option value="科特迪瓦">科特迪瓦</option>
                        <option value="科威特">科威特</option>
                        <option value="克罗地亚">克罗地亚</option>
                        <option value="肯尼亚">肯尼亚</option>
                        <option value="库克群岛">库克群岛</option>
                        <option value="库拉索岛">库拉索岛</option>
                        <option value="拉脱维亚">拉脱维亚</option>
                        <option value="莱索托">莱索托</option>
                        <option value="老挝">老挝</option>
                        <option value="黎巴嫩">黎巴嫩</option>
                        <option value="立陶宛">立陶宛</option>
                        <option value="利比里亚">利比里亚</option>
                        <option value="利比亚">利比亚</option>
                        <option value="列支敦士登">列支敦士登</option>
                        <option value="留尼旺">留尼旺</option>
                        <option value="卢森堡">卢森堡</option>
                        <option value="卢旺达">卢旺达</option>
                        <option value="罗马尼亚">罗马尼亚</option>
                        <option value="马达加斯加">马达加斯加</option>
                        <option value="马尔代夫">马尔代夫</option>
                        <option value="马耳他">马耳他</option>
                        <option value="马拉维">马拉维</option>
                        <option value="马来西亚">马来西亚</option>
                        <option value="马里">马里</option>
                        <option value="马其顿">马其顿</option>
                        <option value="马绍尔群岛共和国">马绍尔群岛共和国</option>
                        <option value="马提尼克">马提尼克</option>
                        <option value="马约特岛">马约特岛</option>
                        <option value="毛里求斯">毛里求斯</option>
                        <option value="毛里塔尼亚">毛里塔尼亚</option>
                        <option value="美国">美国</option>
                        <option value="美属萨摩亚">美属萨摩亚</option>
                        <option value="美属维京群岛旗">美属维京群岛旗</option>
                        <option value="蒙古">蒙古</option>
                        <option value="蒙特塞拉特">蒙特塞拉特</option>
                        <option value="孟加拉国">孟加拉国</option>
                        <option value="秘鲁">秘鲁</option>
                        <option value="密克罗尼西亚">密克罗尼西亚</option>
                        <option value="缅甸">缅甸</option>
                        <option value="摩尔多瓦">摩尔多瓦</option>
                        <option value="摩洛哥">摩洛哥</option>
                        <option value="摩纳哥">摩纳哥</option>
                        <option value="莫桑比克">莫桑比克</option>
                        <option value="墨西哥">墨西哥</option>
                        <option value="纳米比亚">纳米比亚</option>
                        <option value="南非">南非</option>
                        <option value="南乔治亚岛和南桑威奇群岛">南乔治亚岛和南桑威奇群岛</option>
                        <option value="南苏丹">南苏丹</option>
                        <option value="瑙鲁共和国">瑙鲁共和国</option>
                        <option value="尼泊尔">尼泊尔</option>
                        <option value="尼加拉瓜">尼加拉瓜</option>
                        <option value="尼日尔">尼日尔</option>
                        <option value="尼日利亚">尼日利亚</option>
                        <option value="纽埃">纽埃</option>
                        <option value="挪威">挪威</option>
                        <option value="诺福克岛">诺福克岛</option>
                        <option value="帕劳">帕劳</option>
                        <option value="葡萄牙">葡萄牙</option>
                        <option value="日本">日本</option>
                        <option value="瑞典">瑞典</option>
                        <option value="瑞士">瑞士</option>
                        <option value="萨尔瓦多">萨尔瓦多</option>
                        <option value="萨摩亚群岛">萨摩亚群岛</option>
                        <option value="塞尔维亚">塞尔维亚</option>
                        <option value="塞尔维亚共和国">塞尔维亚共和国</option>
                        <option value="塞拉利昂">塞拉利昂</option>
                        <option value="塞内加尔">塞内加尔</option>
                        <option value="塞舌尔">塞舌尔</option>
                        <option value="桑给巴尔岛">桑给巴尔岛</option>
                        <option value="沙特阿拉伯">沙特阿拉伯</option>
                        <option value="圣巴泰勒米岛">圣巴泰勒米岛</option>
                        <option value="圣多美及普林西比">圣多美及普林西比</option>
                        <option value="圣基茨和尼维斯">圣基茨和尼维斯</option>
                        <option value="圣卢西亚">圣卢西亚</option>
                        <option value="圣马丁">圣马丁</option>
                        <option value="圣马力诺共和国">圣马力诺共和国</option>
                        <option value="圣皮埃尔和密克隆">圣皮埃尔和密克隆</option>
                        <option value="圣文森特和格林纳丁斯">圣文森特和格林纳丁斯</option>
                        <option value="斯里兰卡">斯里兰卡</option>
                        <option value="斯洛伐克">斯洛伐克</option>
                        <option value="斯洛文尼亚">斯洛文尼亚</option>
                        <option value="斯威士兰">斯威士兰</option>
                        <option value="苏丹">苏丹</option>
                        <option value="苏里南">苏里南</option>
                        <option value="所罗门群岛">所罗门群岛</option>
                        <option value="索马里">索马里</option>
                        <option value="塔吉克斯坦">塔吉克斯坦</option>
                        <option value="台湾">台湾</option>
                        <option value="泰国">泰国</option>
                        <option value="坦桑尼亚">坦桑尼亚</option>
                        <option value="汤加">汤加</option>
                        <option value="特克斯和凯科斯群岛">特克斯和凯科斯群岛</option>
                        <option value="特立尼达和多巴哥">特立尼达和多巴哥</option>
                        <option value="突尼斯">突尼斯</option>
                        <option value="图瓦卢">图瓦卢</option>
                        <option value="土耳其">土耳其</option>
                        <option value="土库曼斯坦">土库曼斯坦</option>
                        <option value="瓦努阿图">瓦努阿图</option>
                        <option value="危地马拉">危地马拉</option>
                        <option value="委内瑞拉">委内瑞拉</option>
                        <option value="文莱达鲁萨兰国">文莱达鲁萨兰国</option>
                        <option value="沃利斯及富图纳群岛">沃利斯及富图纳群岛</option>
                        <option value="乌干达">乌干达</option>
                        <option value="乌克兰">乌克兰</option>
                        <option value="乌拉圭">乌拉圭</option>
                        <option value="乌兹别克斯坦">乌兹别克斯坦</option>
                        <option value="西班牙">西班牙</option>
                        <option value="希腊">希腊</option>
                        <option value="香港">香港</option>
                        <option value="新加坡">新加坡</option>
                        <option value="新喀里多尼亚">新喀里多尼亚</option>
                        <option value="新西兰">新西兰</option>
                        <option value="匈牙利">匈牙利</option>
                        <option value="叙利亚">叙利亚</option>
                        <option value="牙买加">牙买加</option>
                        <option value="亚美尼亚">亚美尼亚</option>
                        <option value="也门">也门</option>
                        <option value="伊拉克">伊拉克</option>
                        <option value="伊朗">伊朗</option>
                        <option value="以色列">以色列</option>
                        <option value="意大利">意大利</option>
                        <option value="印度">印度</option>
                        <option value="印度尼西亚">印度尼西亚</option>
                        <option value="英国">英国</option>
                        <option value="英属维尔京群岛">英属维尔京群岛</option>
                        <option value="约旦">约旦</option>
                        <option value="越南">越南</option>
                        <option value="赞比亚">赞比亚</option>
                        <option value="泽西岛">泽西岛</option>
                        <option value="乍得">乍得</option>
                        <option value="直布罗陀">直布罗陀</option>
                        <option value="智利">智利</option>
                        <option value="中非">中非</option>
                        <option value="中国">中国</option>
                        </select>
                        </div>

                   
                </div>
            </div>
            <div class="a-row">
                <div class="addressEditItem">
                    <div class="addressEditTitle">
                        <span data-i18n-text="_body_address">地址</span>
                    </div>
                    <div class="a-spacing-mini" id="line_oneId">
                        <input class="line_one" type="text" data-i18n-placeholder="_body_address_line_one" maxlength="60">
                    </div>
                    <div class="a-spacing-mini">
                        <input class="line_two" type="text" data-i18n-placeholder="_body_address_line_two" maxlength="60">
                    </div>
                </div>
            </div>
            <div class="a-row">
                <div class="addressEditItem">
                    <div class="addressEditTitle">
                        <span data-i18n-text="_body_postal_code">邮政编码</span>
                    </div>
                    <div class="a-row" id="postalcodeId">
                        <div class="a-spacing-mini width48 float_left">
                            <input class="postalcode" type="text"  maxlength="60">
                        </div>
                        <div class="width48 float_right">
                            <a class="checkCodeLink"  data-i18n-text="_body_check_postal_code">
                                检查邮政编码
                            </a>
                            <i class="a-icon a-icon-success postalSuccessIcon" style="display:none"></i>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            <div class="a-row">
                <div class="addressEditItem">
                    <div class="a-row">
                        <div class="a-spacing-mini width48 float_left" id="city_townId">
                            <div class="addressEditTitle">
                                <span data-i18n-text="_body_city_town">市/镇</span>
                            </div>
                            <div class="a-row a-spacing-mini float_left">
                                <input class="city_town" type="text" maxlength="60">
                            </div>
                        </div>
                        <div class="a-spacing-mini width48 float_right" id="state_provinceId">
                            <div class="addressEditTitle">
                                <span data-i18n-text="_body_state_province">州、省、直辖市或自治区</span>
                            </div>
                            <div class="a-row a-spacing-mini float_left">
                                <input class="state_province" type="text" maxlength="60">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="a-row">
                <div class="addressEditItem">
                    <div class="a-row">
                        <div class="a-spacing-mini width48 float_left" id="telId">
                            <div class="addressEditTitle">
                                <span data-i18n-text="_body_main_phone">主要电话</span>
                            </div>
                            <div class="a-row a-spacing-mini float_left">
                                <input class="tel" type="text" maxlength="60">
                            </div>
                        </div>
                        <div class="a-spacing-mini width48 float_right" id="E_mailId">
                            <div class="addressEditTitle">
                                <span data-i18n-text="_body_e_mail_address">电子邮件地址</span>
                            </div>
                            <div class="a-row a-spacing-mini float_left">
                                <input class="E_mail" type="text" maxlength="60">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            ` //内层内容层
                })
                $('.checkCodeLink').click(function (e) {
                        e.preventDefault();
                        console.log('111')
                        postalcode = $('.postalcode').val().trim();
                        if (postalcode) {
                                $('.postalSuccessIcon').show()
                        } else {
                                $('.postalSuccessIcon').hide()
                        }
                })
                execI18n()

        }
       
        // 增加地址、修改地址
        function callback() {
                $("div.myWarn").remove();
                $("input").removeClass("activebtn");
                addressName = $('.addressName').val().trim();
                country_region = $('.country option:selected').text();
                line_one = $('.line_one').val().trim();
                line_two = $('.line_two').val().trim();
                postalcode = $('.postalcode').val().trim();
                city_town = $('.city_town').val().trim();
                state_province = $('.state_province').val().trim();
                tel = $('.tel').val().trim();
                E_mail = $('.E_mail').val().trim(); //内层确定触发的事件

                if (addressName && line_one && state_province && city_town && postalcode && tel && country_region != "---无---") {
                        // 增加
                        if (window.sessionStorage && sessionStorage.getItem('add')) {
                            var data= {
                                                userid: amazon_userid,
                                                address: line_one,
                                                address2: line_two,
                                                city: city_town,
                                                province: state_province,
                                                country: country_region,
                                                zipcode: postalcode,
                                                phone: tel,
                                                type: '3',
                                                name: addressName,
                                                email: E_mail,
                                                full_name: ''
                                        };
                                $('.country_region').text('---无---');
                                $.ajax({
                                        url: baseUrl + '/AddAddress',
                                        method: 'post',
                                        dataType: "json",
                                        data:{ json: JSON.stringify(data) },
                                        success: function (res) {
                                                console.log(res)
                                                if (res.result == 1) {
                                                        GetAddressList()
                                                        $('.box-inside').hide();
                                                        $('.box-content').show();
                                                }
                                        },
                                        error: function (res) {
                                                console.log(decodeURIComponent(res.error))
                                        }
                                })
                                sessionStorage.removeItem('add')
                        }
                        // 修改
                        if (window.sessionStorage && sessionStorage.getItem('update')) {
                                $.ajax({
                                        url: baseUrl + "/UpdateDistributionAddress",
                                        method: "post",
                                        dataType: "json",
                                        data: {
                                                userid: amazon_userid,
                                                addressId: address_id,
                                                address: line_one,
                                                address2: line_two,
                                                city: city_town,
                                                province: state_province,
                                                country: country_region,
                                                zipcode: postalcode,
                                                phone: tel,
                                                name: addressName,
                                                email: E_mail
                                        },
                                        success: function (res) {
                                                console.log(res);
                                                if (res.result == 1) {
                                                        GetAddressList()
                                                        $('.box-inside').hide();
                                                        $('.box-content').show();
                                                        //console.log("success!");
                                                } else {
                                                        console.log(decodeURIComponent(res.error));
                                                }
                                        },
                                        error: function (res) {
                                                console.log(decodeURIComponent(res.error));
                                        }
                                });
                                sessionStorage.removeItem('update')
                        }
                }
                if (!addressName) {
                        addwarn("addressNameId", 2, "请输入库房名称。");
                        $('.addressName').addClass('activebtn')
                }
                if (!line_one) {
                        addwarn("line_oneId", 2, "请输入地址");
                        $('.line_one').addClass('activebtn')
                }

                if (!state_province) {
                        addwarn("state_provinceId", 2, "请输入州、省、直辖市或自治区");
                        $('.state_province').addClass('activebtn')
                }
                if (!city_town) {
                        addwarn("city_townId", 2, "请输入市/镇");
                        $('.city_town').addClass('activebtn')
                }
                if (!postalcode) {
                        addwarn("postalcodeId", 2, "请输入一个有效邮政编码。");
                        $('.postalcode').addClass('activebtn')
                }
                if (!tel) {
                        addwarn("telId", 2, "请输入一个电话号码。");
                        $('.tel').addClass('activebtn')
                }
                if (country_region === '---无---') {
                        addwarn("country_regionId", 2, "请选择国家/地区");
                }

        }
        //地址列表
        function GetAddressList() {
                // 默认地址
                $.ajax({
                        url: baseUrl + '/GetAddressList',
                        method: 'post',
                        dataType: "json",
                        data: {
                                userid: amazon_userid,
                                sign: '3'
                        },
                        success: function (res) {
                                console.log(res)
                                if (res.result == 1) {
                                        address_id = res.registered_address_Id
                                        address_data = res.List
                                        for (let i = 0; i < address_data.length; i++) {
                                                address_data[i].status = false;
                                                if (address_data[i].id_default === '1') {
                                                        address_data[i].status = true;
                                                        if(!address_data[i].status){
                                                                console.log($('.pstyle').text())
                                                        }
                                                }
                                        }
                                        var add = doT.template($('#addArray').text());
                                        $('#addTmpl ').html(add(address_data));
                                        $('input[type="radio"]:checked').parents('.add').addClass('address-item-select')
                                        $('.add input').each(function (i) {
                                                $('.add input').eq(i).click(function () {
                                                        $('input').parents('.add').removeClass('address-item-select');
                                                        $('input[type="radio"]:checked').parents('.add').addClass('address-item-select');
                                                        address_id = $(this).parents('.add').attr('data-id');
                                                        console.log(address_id)
                                                        if(!address_data[i].status){
                                                               $('.pstyle').text('设置时区')
                                                               $('.ul li').click(function () { 
                                                                       if($(this).text() != "设置时区"){
                                                                              $('.alertBox').show()
                                                                       }
                                                                })
                                                        }
                                                })
                                        })

                                        //  删除
                                        $('.deleteBtn').click(function (e) {
                                                e.preventDefault();
                                                address_id = $(this).parents('.add').attr('data-id')
                                                $('.box-content').hide();
                                                addPopup({
                                                        parentClass: 'parentDel', //最外层盒子class
                                                        contral: true, //点击遮罩是否关闭，默认不
                                                        width: '600px', //div宽度
                                                        type: 1, // 如果是多级div，必须加这个参数
                                                        title: '确认', //标题
                                                        className: 'box-delete', //内容层div
                                                        btn: ['是，请删除', '不，请保留'],
                                                        commit: function () {
                                                                $.ajax({
                                                                        url: baseUrl + "/DelDistributionAddress",
                                                                        method: "post",
                                                                        dataType: "json",
                                                                        data: {
                                                                                addressId: address_id
                                                                        },
                                                                        success: function (res) {
                                                                                console.log(res);
                                                                                if (res.result == 1) {
                                                                                        //window.location.reload();
                                                                                        GetAddressList()
                                                                                        $('.box-delete').hide()
                                                                                        $('.box-content').show();
                                                                                } else {
                                                                                        console.log(decodeURIComponent(res.error));
                                                                                }
                                                                        },
                                                                        error: function (res) {
                                                                                console.log(decodeURIComponent(res.error));
                                                                        }
                                                                });
                                                        },
                                                        cancel: function () { //取消的事件
                                                                $('.box-delete').hide()
                                                                $('.box-content').show()
                                                        },
                                                        content: `
                                                                <div class="a-popover-inner msg-con">
                                                                        <div class="a-box a-alert a-alert-warning">
                                                                        <div class="a-box-inner a-alert-container">
                                                                                <h4 class="a-alert-heading">是否确定要删除这个地址？</h4>
                                                                                <i class="a-icon a-icon-alert"></i>
                                                                                <div class="a-alert-content" id="delete_div">
                                                                        
                                                                                </div>
                                                                        </div>
                                                                        </div>
                                                                </div>
                                                                `
                                                //内层内容层
                                                })

                                                $.ajax({
                                                        url: baseUrl + '/InitialiAddress',
                                                        method: 'post',
                                                        dataType: "json",
                                                        data: {
                                                                addressId: address_id,
                                                        },
                                                        success: function (res) {
                                                                console.log(res)
                                                                if (res.result == 1) {
                                                                        var data = res.data
                                                                        var delete_tmpl = doT.template($('#delete_tmpl').text());
                                                                        $('#delete_div').html(delete_tmpl(data));

                                                                } else {
                                                                        console.log(decodeURIComponent(res.error))
                                                                }
                                                        }
                                                })
                                        })

                                        //  编辑地址
                                        $('.editBtn').click(function () {
                                                $('.box-content').hide()
                                                address_id = $(this).parents('.add').attr('data-id');
                                                $.ajax({
                                                        url: baseUrl + '/InitialiAddress',
                                                        method: 'post',
                                                        dataType: "json",
                                                        data: {
                                                                addressId: address_id,
                                                        },
                                                        success: function (res) {
                                                                console.log(res)
                                                                if (res.result == 1) {
                                                                        var data = res.data;
                                                                        var optionValue = decodeURIComponent(data.country)
                                                                        $('select[name="country"]').find("option[value='optionValue']").attr('selected',true)
                                                                        $('.addressName').val(decodeURIComponent(data.name));
                                                                        $('.country_region').text(decodeURIComponent(data.country));
                                                                        $('.line_one').val(decodeURIComponent(data.address));
                                                                        $('.line_two').val(decodeURIComponent(data.address2));
                                                                        $('.postalcode').val(decodeURIComponent(data.zipcode));
                                                                        $('.city_town').val(decodeURIComponent(data.city));
                                                                        $('.state_province').val(decodeURIComponent(data.province));
                                                                        $('.tel').val(decodeURIComponent(data.phone));
                                                                        $('.E_mail').val(decodeURIComponent(data.email)); //内层确定触发的事件   
                                                                        if (window.localStorage) {
                                                                                sessionStorage.setItem('update', 'update')
                                                                        }
                                                                } else {
                                                                        console.log(decodeURIComponent(res.error))
                                                                }
                                                        }
                                                })
                                                addresstable()

                                        })
                                } else {
                                        console.log(decodeURIComponent(res.error))
                                }
                        },
                        error: function (res) {
                                console.log(decodeURIComponent(res.error))
                        }
                })

        }
        // 时区
        function GetTimeZone() {
                $.ajax({
                        url: baseUrl + '/GetTimeZone',
                        method: 'post',
                        dataType: "json",
                        success: function (res) {
                                console.log(res)
                                fld_code = 'US%2fPacific'
                                var data = res.result;
                                var timeZone_tmpl = doT.template($('#timeZone_tmpl').text());
                                $('#timeZone').html(timeZone_tmpl(data));
                                $('#timeZone li').each(function (i) {
                                        $('#timeZone li').eq(i).click(function () {
                                                fld_code = $(this).attr('fld_code') 
                                        })
                                })
                                dropdown_box(".time", "#choose_time")
                        },
                        error: function (res) {
                                console.log(decodeURIComponent(res.error))
                        }
                })
        }


        //配送设置 默认配送地址
        $.ajax({
                url: baseUrl + "/InitialShippingSettings",
                method: "post",
                dataType: "json",
                data: {
                        userid: amazon_userid
                },
                success: function (res) {
                        console.log(res);
                        if (res) {
                                inputctr.public.judgeBegaintask('1104');
                              }
                        if (res.result == 1) {
                                var data = res.data.strSetting
                                $('.name').text(decodeURIComponent(data.name))
                                $('.address').text(decodeURIComponent(data.address))
                                $('.address2').text(decodeURIComponent(data.address2))
                                $('.city').text(decodeURIComponent(data.city))
                                $('.country').text(decodeURIComponent(data.country))
                                $('.email').text(decodeURIComponent(data.email))
                                $('.full_name').text(decodeURIComponent(data.full_name))
                                $('.phone').text(decodeURIComponent(data.phone))
                                $('.province').text(decodeURIComponent(data.province))
                                $('.zipcode').text(decodeURIComponent(data.zipcode))
                                console.log("success!");
                                // if (window.sessionStorage) {
                                //         sessionStorage.setItem('address_id', decodeURIComponent(data.address_id))
                                // }

                        } else {
                                console.log(decodeURIComponent(res.error));

                        }
                },
                error: function (res) {
                        console.log(decodeURIComponent(res.error));
                }
        });
        function successInfo () { 
                GetAddressList()
                $('.box-content').show()
                $('.alertBox').hide()
         }
        // 编辑
        $('.editBtn_first').click(function () {
                inputctr.public.judgeRecodertask('1104', '查看默认配送设置，确认默认配送地址正确性开始');
                addPopup({
                        type: 1,
                        parentClass: 'sb', //最外层盒子class
                        contral: true, //点击遮罩是否关闭，默认不
                        width: '900px', //div宽度
                        title: '编辑默认配送地址', //标题
                        className: 'box-content', //内容class，不包括标题
                        btn: ['确定', '取消'], //按钮，限定为两个
                        commit: function () { //确定的触发事件
                                // 保存默认配送地址和时区
                                $.ajax({
                                        url: baseUrl + "/UpdateDefAdr",
                                        method: "post",
                                        dataType: "json",
                                        data: {
                                                userId: amazon_userid,
                                                address_id: address_id,
                                                time_zone: fld_code
                                        },
                                        success: function (res) {
                                                console.log(res);
                                                if (res.result == 1) {
                                                        $('.sb').hide();
                                                        alert("更改成功")
                                                        inputctr.public.judgeFinishtask('1104', successInfo);
                                                } else {
                                                        console.log(decodeURIComponent(res.error));
                                                }
                                        },
                                        error: function (res) {
                                                console.log(decodeURIComponent(res.error));
                                        }
                                });
                        },
                        cancel: function () { //外层取消触发事件
                                $('.sb').hide()
                        },
                        content: `<table class="a-normal">
                        <tr>
                               <td>
                                        <div class="alertBox none">
                                                <div class="a-box a-alert a-alert-warning">
                                                        <div class="a-box-inner a-alert-container">
                                                                <i class="a-icon a-icon-alert"></i>
                                                
                                                        <div class="a-alert-content">
                                                                <span>此更改将导致更新您的时区，这将反映在您的截止时间中。</span>
                                                        </div>
                                                     
                                                </div>
                                        </div>
                               </td>
                        </tr>
                        <tr>
                        <td class="a-span8">
                            <div class="normal-font shipping_address_content">
                                <div class="alertBox"></div>
                                <div class="a-form-label margin-bottom">
                                    <span>选择地址</span>
                                </div>
                                <hr class="a-divider-normal">
                                <div class="addressList-size" id="addressList">
                                    <div id="addTmpl">
                                    </div>
                                    
                                </div>
                                <div>
                                    <a class="add_new_address">+ 添加新地址</a>
                                </div>
                                <div class="a-form-label relative">
                                    <div class="timeZoneTitle">
                                        <span>选择正确的时区作为您的默认配送地址</span>
                                    </div>
                                    <hr class="a-divider-normal">
                                    <div class="a-dropdown-container ">
                                        <div id="choose_time" class="bank-account-dropdown a-button a-button-dropdown relative">
                                            <p class="pstyle">(UTC-7:00) 美国/太平洋</p>
                                        </div>
                                        <div class="a-box time none">                                                                                
                                            <ul class="a-box ul" id="timeZone"> 
                                        
                                            </ul>           
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="a-span4">
                            <div class="shipping_address_illustrate">
                                <div class="a-form-label">
                                    <span>什么是默认配送地址？</span>
                                </div>
                                <div class="normal-font">
                                    <span>
                                        默认配送地址是用于配送订单的主要实际地址、电子邮件地址和电话号码。 此信息保存在您的帐户中，当您在“购买配送”首选项和“配送设置”页面中选择地址时会自动显示。
                                    </span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>` //外层内容层
                });

                addPopup(addPopup, GetAddressList, GetTimeZone);

                $('.add_new_address').click(function () {
                        $('.box-content').hide(); //先把当前内容层隐藏
                        addresstable();
                        $('input').val('')
                        country_region === '---无---'
                        if (window.sessionStorage) {
                                sessionStorage.setItem('add', 'add')
                        }
                })
        });

//默认运费信息加入
$.ajax({
            url: baseUrl + '/GetService',
            method: 'post',
            dataType: "json",
            data: {
                userid: amazon_userid,
            },
            success: function (res) {   
                console.log(res)
                if(res.result.is_standard==1){
                    $(".standard_No").hide();
                    $(".standard_Yes").show();
                }

                if(res.result.is_expedited==1){
                    $(".Expedited_No").hide();
                    $(".Expedited_Yes").show();
                }
                  if(res.result.is_two_day==1){
                    $(".twoDay_No").hide();
                    $(".twoDay_Yes").show();
                }
                  if(res.result.is_one_day==1){
                    $(".oneDay_No").hide();
                    $(".oneDay_Yes").show();
                }
            },
            error:function(res){
                console.log(decodeURIComponent(res))
            }
        })

})