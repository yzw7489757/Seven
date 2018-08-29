$(function () {
    inputctr.public.checkLogin();
    var baseUrl = 'http://192.168.2.164:8096/QAMZNAPI.asmx'
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
    var state_province;
    var E_mail;
    function addresstable () { 
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
                        <span>地址名称</span>
                    </div>
                    <div class="a-spacing-mini">
                        <input class="addressName" type="text" placeholder="例如，西雅图仓库" maxlength="60">
                    </div>
                    <div>
                        <span class="font_color">您为地址选择的自定义名称。</span>
                    </div>
                </div>
            </div>
            <hr>
            <div class="addressEditItem">
                <div class="addressEditTitle">
                    <span>国家/地区</span>
                </div>
                <div class="a-spacing-mini" id="country_regionId">
                    <div id="choose_country" class="bank-account-dropdown a-button a-button-dropdown relative">
                        <p class="pstyle country_region">---无---</p>
                    </div>
                    <div class="a-box country_city none" style="height: 251.75px; overflow-y: auto; min-width: 0px; width: 202px;">
                        <ul class="a-box">
                            <li tabindex="0" role="option" aria-checked="true" aria-labelledby="shipFromCountryDropdown_0" class="a-dropdown-item"><a
                                    tabindex="-1" href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NONE&quot;}" id="shipFromCountryDropdown_0"
                                    class="a-dropdown-link a-active">--- 无 ---</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_1" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AL&quot;}" id="shipFromCountryDropdown_1"
                                    class="a-dropdown-link">阿尔巴尼亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_2" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;DZ&quot;}" id="shipFromCountryDropdown_2"
                                    class="a-dropdown-link">阿尔及利亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_3" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AF&quot;}" id="shipFromCountryDropdown_3"
                                    class="a-dropdown-link">阿富汗</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_4" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AR&quot;}" id="shipFromCountryDropdown_4"
                                    class="a-dropdown-link">阿根廷</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_5" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AE&quot;}" id="shipFromCountryDropdown_5"
                                    class="a-dropdown-link">阿拉伯联合酋长国</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_6" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AW&quot;}" id="shipFromCountryDropdown_6"
                                    class="a-dropdown-link">阿鲁巴</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_7" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;OM&quot;}" id="shipFromCountryDropdown_7"
                                    class="a-dropdown-link">阿曼</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_8" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AZ&quot;}" id="shipFromCountryDropdown_8"
                                    class="a-dropdown-link">阿塞拜疆</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_9" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;EG&quot;}" id="shipFromCountryDropdown_9"
                                    class="a-dropdown-link">埃及</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_10" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;ET&quot;}" id="shipFromCountryDropdown_10"
                                    class="a-dropdown-link">埃塞俄比亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_11" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;IE&quot;}" id="shipFromCountryDropdown_11"
                                    class="a-dropdown-link">爱尔兰</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_12" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;EE&quot;}" id="shipFromCountryDropdown_12"
                                    class="a-dropdown-link">爱沙尼亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_13" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AD&quot;}" id="shipFromCountryDropdown_13"
                                    class="a-dropdown-link">安道尔</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_14" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AO&quot;}" id="shipFromCountryDropdown_14"
                                    class="a-dropdown-link">安哥拉</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_15" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AI&quot;}" id="shipFromCountryDropdown_15"
                                    class="a-dropdown-link">安圭拉</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_16" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AG&quot;}" id="shipFromCountryDropdown_16"
                                    class="a-dropdown-link">安提瓜和巴布达</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_17" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AT&quot;}" id="shipFromCountryDropdown_17"
                                    class="a-dropdown-link">奥地利</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_18" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AX&quot;}" id="shipFromCountryDropdown_18"
                                    class="a-dropdown-link">奥兰群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_19" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AU&quot;}" id="shipFromCountryDropdown_19"
                                    class="a-dropdown-link">澳大利亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_20" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BB&quot;}" id="shipFromCountryDropdown_20"
                                    class="a-dropdown-link">巴巴多斯</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_21" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PG&quot;}" id="shipFromCountryDropdown_21"
                                    class="a-dropdown-link">巴布亚新几内亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_22" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BS&quot;}" id="shipFromCountryDropdown_22"
                                    class="a-dropdown-link">巴哈马</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_23" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PK&quot;}" id="shipFromCountryDropdown_23"
                                    class="a-dropdown-link">巴基斯坦</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_24" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PY&quot;}" id="shipFromCountryDropdown_24"
                                    class="a-dropdown-link">巴拉圭</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_25" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PS&quot;}" id="shipFromCountryDropdown_25"
                                    class="a-dropdown-link">巴勒斯坦</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_26" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BH&quot;}" id="shipFromCountryDropdown_26"
                                    class="a-dropdown-link">巴林</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_27" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PA&quot;}" id="shipFromCountryDropdown_27"
                                    class="a-dropdown-link">巴拿马</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_28" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BR&quot;}" id="shipFromCountryDropdown_28"
                                    class="a-dropdown-link">巴西</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_29" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BY&quot;}" id="shipFromCountryDropdown_29"
                                    class="a-dropdown-link">白俄罗斯</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_30" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BM&quot;}" id="shipFromCountryDropdown_30"
                                    class="a-dropdown-link">百慕达群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_31" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BG&quot;}" id="shipFromCountryDropdown_31"
                                    class="a-dropdown-link">保加利亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_32" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MP&quot;}" id="shipFromCountryDropdown_32"
                                    class="a-dropdown-link">北马里亚纳群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_33" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BJ&quot;}" id="shipFromCountryDropdown_33"
                                    class="a-dropdown-link">贝宁</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_34" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BE&quot;}" id="shipFromCountryDropdown_34"
                                    class="a-dropdown-link">比利时</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_35" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;IS&quot;}" id="shipFromCountryDropdown_35"
                                    class="a-dropdown-link">冰岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_36" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BO&quot;}" id="shipFromCountryDropdown_36"
                                    class="a-dropdown-link">玻利维亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_37" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PR&quot;}" id="shipFromCountryDropdown_37"
                                    class="a-dropdown-link">波多黎各</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_38" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BA&quot;}" id="shipFromCountryDropdown_38"
                                    class="a-dropdown-link">波黑</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_39" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PL&quot;}" id="shipFromCountryDropdown_39"
                                    class="a-dropdown-link">波兰</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_40" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BW&quot;}" id="shipFromCountryDropdown_40"
                                    class="a-dropdown-link">博茨瓦纳</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_41" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BZ&quot;}" id="shipFromCountryDropdown_41"
                                    class="a-dropdown-link">伯利兹</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_42" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BT&quot;}" id="shipFromCountryDropdown_42"
                                    class="a-dropdown-link">不丹</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_43" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BF&quot;}" id="shipFromCountryDropdown_43"
                                    class="a-dropdown-link">布基纳法索</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_44" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BV&quot;}" id="shipFromCountryDropdown_44"
                                    class="a-dropdown-link">布维岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_45" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;KP&quot;}" id="shipFromCountryDropdown_45"
                                    class="a-dropdown-link">朝鲜</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_46" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GQ&quot;}" id="shipFromCountryDropdown_46"
                                    class="a-dropdown-link">赤道几内亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_47" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;DK&quot;}" id="shipFromCountryDropdown_47"
                                    class="a-dropdown-link">丹麦</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_48" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;DE&quot;}" id="shipFromCountryDropdown_48"
                                    class="a-dropdown-link">德国</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_49" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TL&quot;}" id="shipFromCountryDropdown_49"
                                    class="a-dropdown-link">东帝汶</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_50" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TG&quot;}" id="shipFromCountryDropdown_50"
                                    class="a-dropdown-link">多哥</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_51" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;DO&quot;}" id="shipFromCountryDropdown_51"
                                    class="a-dropdown-link">多米尼加共和国</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_52" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;DM&quot;}" id="shipFromCountryDropdown_52"
                                    class="a-dropdown-link">多米尼克</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_53" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;RU&quot;}" id="shipFromCountryDropdown_53"
                                    class="a-dropdown-link">俄罗斯</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_54" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;EC&quot;}" id="shipFromCountryDropdown_54"
                                    class="a-dropdown-link">厄瓜多尔</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_55" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;ER&quot;}" id="shipFromCountryDropdown_55"
                                    class="a-dropdown-link">厄立特里亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_56" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;FR&quot;}" id="shipFromCountryDropdown_56"
                                    class="a-dropdown-link">法国</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_57" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TF&quot;}" id="shipFromCountryDropdown_57"
                                    class="a-dropdown-link">法国南部领土</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_58" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;FO&quot;}" id="shipFromCountryDropdown_58"
                                    class="a-dropdown-link">法罗群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_59" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PF&quot;}" id="shipFromCountryDropdown_59"
                                    class="a-dropdown-link">法属波利尼西亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_60" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GF&quot;}" id="shipFromCountryDropdown_60"
                                    class="a-dropdown-link">法属圭亚那</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_61" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PH&quot;}" id="shipFromCountryDropdown_61"
                                    class="a-dropdown-link">菲律宾</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_62" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;FI&quot;}" id="shipFromCountryDropdown_62"
                                    class="a-dropdown-link">芬兰</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_63" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CV&quot;}" id="shipFromCountryDropdown_63"
                                    class="a-dropdown-link">佛得角</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_64" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;FK&quot;}" id="shipFromCountryDropdown_64"
                                    class="a-dropdown-link">福克兰群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_65" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GM&quot;}" id="shipFromCountryDropdown_65"
                                    class="a-dropdown-link">冈比亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_66" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CG&quot;}" id="shipFromCountryDropdown_66"
                                    class="a-dropdown-link">刚果（布）</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_67" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CD&quot;}" id="shipFromCountryDropdown_67"
                                    class="a-dropdown-link">刚果（金）</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_68" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CO&quot;}" id="shipFromCountryDropdown_68"
                                    class="a-dropdown-link">哥伦比亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_69" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CR&quot;}" id="shipFromCountryDropdown_69"
                                    class="a-dropdown-link">哥斯达黎加</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_70" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GD&quot;}" id="shipFromCountryDropdown_70"
                                    class="a-dropdown-link">格林纳达</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_71" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GL&quot;}" id="shipFromCountryDropdown_71"
                                    class="a-dropdown-link">格陵兰</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_72" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GE&quot;}" id="shipFromCountryDropdown_72"
                                    class="a-dropdown-link">格鲁吉亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_73" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GG&quot;}" id="shipFromCountryDropdown_73"
                                    class="a-dropdown-link">根西岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_74" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CU&quot;}" id="shipFromCountryDropdown_74"
                                    class="a-dropdown-link">古巴</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_75" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GP&quot;}" id="shipFromCountryDropdown_75"
                                    class="a-dropdown-link">瓜德罗普岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_76" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GU&quot;}" id="shipFromCountryDropdown_76"
                                    class="a-dropdown-link">关岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_77" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GY&quot;}" id="shipFromCountryDropdown_77"
                                    class="a-dropdown-link">圭亚那</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_78" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;KZ&quot;}" id="shipFromCountryDropdown_78"
                                    class="a-dropdown-link">哈萨克斯坦</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_79" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;HT&quot;}" id="shipFromCountryDropdown_79"
                                    class="a-dropdown-link">海地</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_80" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;KR&quot;}" id="shipFromCountryDropdown_80"
                                    class="a-dropdown-link">韩国</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_81" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NL&quot;}" id="shipFromCountryDropdown_81"
                                    class="a-dropdown-link">荷兰</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_82" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AN&quot;}" id="shipFromCountryDropdown_82"
                                    class="a-dropdown-link">荷属安的列斯</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_83" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;HM&quot;}" id="shipFromCountryDropdown_83"
                                    class="a-dropdown-link">赫德岛和麦克唐纳群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_84" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;HN&quot;}" id="shipFromCountryDropdown_84"
                                    class="a-dropdown-link">洪都拉斯</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_85" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;KI&quot;}" id="shipFromCountryDropdown_85"
                                    class="a-dropdown-link">基里巴斯</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_86" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;DJ&quot;}" id="shipFromCountryDropdown_86"
                                    class="a-dropdown-link">吉布提</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_87" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;KG&quot;}" id="shipFromCountryDropdown_87"
                                    class="a-dropdown-link">吉尔吉斯斯坦</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_88" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GN&quot;}" id="shipFromCountryDropdown_88"
                                    class="a-dropdown-link">几内亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_89" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GW&quot;}" id="shipFromCountryDropdown_89"
                                    class="a-dropdown-link">几内亚比绍</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_90" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CA&quot;}" id="shipFromCountryDropdown_90"
                                    class="a-dropdown-link">加拿大</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_91" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GH&quot;}" id="shipFromCountryDropdown_91"
                                    class="a-dropdown-link">加纳</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_92" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GA&quot;}" id="shipFromCountryDropdown_92"
                                    class="a-dropdown-link">加蓬</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_93" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;KH&quot;}" id="shipFromCountryDropdown_93"
                                    class="a-dropdown-link">柬埔寨</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_94" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CZ&quot;}" id="shipFromCountryDropdown_94"
                                    class="a-dropdown-link">捷克共和国</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_95" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;ZW&quot;}" id="shipFromCountryDropdown_95"
                                    class="a-dropdown-link">津巴布韦</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_96" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CM&quot;}" id="shipFromCountryDropdown_96"
                                    class="a-dropdown-link">喀麦隆</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_97" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;QA&quot;}" id="shipFromCountryDropdown_97"
                                    class="a-dropdown-link">卡塔尔</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_98" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;KY&quot;}" id="shipFromCountryDropdown_98"
                                    class="a-dropdown-link">开曼群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_99" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CC&quot;}" id="shipFromCountryDropdown_99"
                                    class="a-dropdown-link">科科斯群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_100" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;KM&quot;}" id="shipFromCountryDropdown_100"
                                    class="a-dropdown-link">科摩罗</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_101" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CI&quot;}" id="shipFromCountryDropdown_101"
                                    class="a-dropdown-link">科特迪瓦</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_102" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;KW&quot;}" id="shipFromCountryDropdown_102"
                                    class="a-dropdown-link">科威特</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_103" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;HR&quot;}" id="shipFromCountryDropdown_103"
                                    class="a-dropdown-link">克罗地亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_104" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;KE&quot;}" id="shipFromCountryDropdown_104"
                                    class="a-dropdown-link">肯尼亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_105" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CK&quot;}" id="shipFromCountryDropdown_105"
                                    class="a-dropdown-link">库克群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_106" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;LV&quot;}" id="shipFromCountryDropdown_106"
                                    class="a-dropdown-link">拉脱维亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_107" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;LS&quot;}" id="shipFromCountryDropdown_107"
                                    class="a-dropdown-link">莱索托</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_108" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;LA&quot;}" id="shipFromCountryDropdown_108"
                                    class="a-dropdown-link">老挝</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_109" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;LB&quot;}" id="shipFromCountryDropdown_109"
                                    class="a-dropdown-link">黎巴嫩</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_110" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;LR&quot;}" id="shipFromCountryDropdown_110"
                                    class="a-dropdown-link">利比里亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_111" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;LY&quot;}" id="shipFromCountryDropdown_111"
                                    class="a-dropdown-link">利比亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_112" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;LT&quot;}" id="shipFromCountryDropdown_112"
                                    class="a-dropdown-link">立陶宛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_113" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;LI&quot;}" id="shipFromCountryDropdown_113"
                                    class="a-dropdown-link">列支敦士登</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_114" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;RE&quot;}" id="shipFromCountryDropdown_114"
                                    class="a-dropdown-link">留尼汪</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_115" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;LU&quot;}" id="shipFromCountryDropdown_115"
                                    class="a-dropdown-link">卢森堡</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_116" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;RW&quot;}" id="shipFromCountryDropdown_116"
                                    class="a-dropdown-link">卢旺达</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_117" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;RO&quot;}" id="shipFromCountryDropdown_117"
                                    class="a-dropdown-link">罗马尼亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_118" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MG&quot;}" id="shipFromCountryDropdown_118"
                                    class="a-dropdown-link">马达加斯加</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_119" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MT&quot;}" id="shipFromCountryDropdown_119"
                                    class="a-dropdown-link">马耳他</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_120" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MV&quot;}" id="shipFromCountryDropdown_120"
                                    class="a-dropdown-link">马尔代夫</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_121" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MW&quot;}" id="shipFromCountryDropdown_121"
                                    class="a-dropdown-link">马拉维</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_122" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MY&quot;}" id="shipFromCountryDropdown_122"
                                    class="a-dropdown-link">马来西亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_123" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;ML&quot;}" id="shipFromCountryDropdown_123"
                                    class="a-dropdown-link">马里</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_124" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MK&quot;}" id="shipFromCountryDropdown_124"
                                    class="a-dropdown-link">马其顿</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_125" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MH&quot;}" id="shipFromCountryDropdown_125"
                                    class="a-dropdown-link">马绍尔群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_126" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MQ&quot;}" id="shipFromCountryDropdown_126"
                                    class="a-dropdown-link">马提尼克</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_127" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;YT&quot;}" id="shipFromCountryDropdown_127"
                                    class="a-dropdown-link">马约特</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_128" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MU&quot;}" id="shipFromCountryDropdown_128"
                                    class="a-dropdown-link">毛里求斯</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_129" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MR&quot;}" id="shipFromCountryDropdown_129"
                                    class="a-dropdown-link">毛里塔尼亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_130" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;US&quot;}" id="shipFromCountryDropdown_130"
                                    class="a-dropdown-link">美国</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_131" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;UM&quot;}" id="shipFromCountryDropdown_131"
                                    class="a-dropdown-link">美国本土外小岛屿</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_132" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AS&quot;}" id="shipFromCountryDropdown_132"
                                    class="a-dropdown-link">美属萨摩亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_133" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;VI&quot;}" id="shipFromCountryDropdown_133"
                                    class="a-dropdown-link">美属维尔京群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_134" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MN&quot;}" id="shipFromCountryDropdown_134"
                                    class="a-dropdown-link">蒙古</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_135" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MS&quot;}" id="shipFromCountryDropdown_135"
                                    class="a-dropdown-link">蒙特塞拉特</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_136" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BD&quot;}" id="shipFromCountryDropdown_136"
                                    class="a-dropdown-link">孟加拉国</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_137" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PE&quot;}" id="shipFromCountryDropdown_137"
                                    class="a-dropdown-link">秘鲁</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_138" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;FM&quot;}" id="shipFromCountryDropdown_138"
                                    class="a-dropdown-link">密克罗尼西亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_139" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MM&quot;}" id="shipFromCountryDropdown_139"
                                    class="a-dropdown-link">缅甸</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_140" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MD&quot;}" id="shipFromCountryDropdown_140"
                                    class="a-dropdown-link">摩尔多瓦</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_141" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MA&quot;}" id="shipFromCountryDropdown_141"
                                    class="a-dropdown-link">摩洛哥</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_142" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MC&quot;}" id="shipFromCountryDropdown_142"
                                    class="a-dropdown-link">摩纳哥</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_143" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MZ&quot;}" id="shipFromCountryDropdown_143"
                                    class="a-dropdown-link">莫桑比克</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_144" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MX&quot;}" id="shipFromCountryDropdown_144"
                                    class="a-dropdown-link">墨西哥</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_145" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NA&quot;}" id="shipFromCountryDropdown_145"
                                    class="a-dropdown-link">纳米比亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_146" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;ZA&quot;}" id="shipFromCountryDropdown_146"
                                    class="a-dropdown-link">南非</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_147" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AQ&quot;}" id="shipFromCountryDropdown_147"
                                    class="a-dropdown-link">南极洲</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_148" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GS&quot;}" id="shipFromCountryDropdown_148"
                                    class="a-dropdown-link">南乔治亚岛和南桑威奇群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_149" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NP&quot;}" id="shipFromCountryDropdown_149"
                                    class="a-dropdown-link">尼泊尔</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_150" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NI&quot;}" id="shipFromCountryDropdown_150"
                                    class="a-dropdown-link">尼加拉瓜</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_151" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NE&quot;}" id="shipFromCountryDropdown_151"
                                    class="a-dropdown-link">尼日尔</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_152" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NG&quot;}" id="shipFromCountryDropdown_152"
                                    class="a-dropdown-link">尼日利亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_153" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NU&quot;}" id="shipFromCountryDropdown_153"
                                    class="a-dropdown-link">纽埃</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_154" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NO&quot;}" id="shipFromCountryDropdown_154"
                                    class="a-dropdown-link">挪威</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_155" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NF&quot;}" id="shipFromCountryDropdown_155"
                                    class="a-dropdown-link">诺福克岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_156" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PW&quot;}" id="shipFromCountryDropdown_156"
                                    class="a-dropdown-link">帕劳</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_157" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PN&quot;}" id="shipFromCountryDropdown_157"
                                    class="a-dropdown-link">皮特凯恩</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_158" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PT&quot;}" id="shipFromCountryDropdown_158"
                                    class="a-dropdown-link">葡萄牙</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_159" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BI&quot;}" id="shipFromCountryDropdown_159"
                                    class="a-dropdown-link">蒲隆地</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_160" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;JP&quot;}" id="shipFromCountryDropdown_160"
                                    class="a-dropdown-link">日本</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_161" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SE&quot;}" id="shipFromCountryDropdown_161"
                                    class="a-dropdown-link">瑞典</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_162" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CH&quot;}" id="shipFromCountryDropdown_162"
                                    class="a-dropdown-link">瑞士</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_163" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SV&quot;}" id="shipFromCountryDropdown_163"
                                    class="a-dropdown-link">萨尔瓦多</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_164" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;WS&quot;}" id="shipFromCountryDropdown_164"
                                    class="a-dropdown-link">萨摩亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_165" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CS&quot;}" id="shipFromCountryDropdown_165"
                                    class="a-dropdown-link">塞尔维亚和黑山</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_166" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SL&quot;}" id="shipFromCountryDropdown_166"
                                    class="a-dropdown-link">塞拉利昂</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_167" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SN&quot;}" id="shipFromCountryDropdown_167"
                                    class="a-dropdown-link">塞内加尔</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_168" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CY&quot;}" id="shipFromCountryDropdown_168"
                                    class="a-dropdown-link">塞浦路斯</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_169" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SC&quot;}" id="shipFromCountryDropdown_169"
                                    class="a-dropdown-link">塞舌尔</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_170" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SA&quot;}" id="shipFromCountryDropdown_170"
                                    class="a-dropdown-link">沙特阿拉伯</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_171" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CX&quot;}" id="shipFromCountryDropdown_171"
                                    class="a-dropdown-link">圣诞岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_172" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;ST&quot;}" id="shipFromCountryDropdown_172"
                                    class="a-dropdown-link">圣多美普林西比</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_173" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SH&quot;}" id="shipFromCountryDropdown_173"
                                    class="a-dropdown-link">圣赫勒拿</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_174" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;KN&quot;}" id="shipFromCountryDropdown_174"
                                    class="a-dropdown-link">圣基茨和尼维斯</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_175" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;LC&quot;}" id="shipFromCountryDropdown_175"
                                    class="a-dropdown-link">圣卢西亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_176" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SM&quot;}" id="shipFromCountryDropdown_176"
                                    class="a-dropdown-link">圣马力诺</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_177" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;PM&quot;}" id="shipFromCountryDropdown_177"
                                    class="a-dropdown-link">圣皮埃尔和密克隆</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_178" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;VC&quot;}" id="shipFromCountryDropdown_178"
                                    class="a-dropdown-link">圣文森特和格林纳丁斯</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_179" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SZ&quot;}" id="shipFromCountryDropdown_179"
                                    class="a-dropdown-link">史瓦济兰</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_180" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;LK&quot;}" id="shipFromCountryDropdown_180"
                                    class="a-dropdown-link">斯里兰卡</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_181" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SK&quot;}" id="shipFromCountryDropdown_181"
                                    class="a-dropdown-link">斯洛伐克</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_182" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SI&quot;}" id="shipFromCountryDropdown_182"
                                    class="a-dropdown-link">斯洛文尼亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_183" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SJ&quot;}" id="shipFromCountryDropdown_183"
                                    class="a-dropdown-link">斯瓦尔巴特群岛和扬马延</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_184" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SD&quot;}" id="shipFromCountryDropdown_184"
                                    class="a-dropdown-link">苏丹</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_185" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SR&quot;}" id="shipFromCountryDropdown_185"
                                    class="a-dropdown-link">苏里南</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_186" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SO&quot;}" id="shipFromCountryDropdown_186"
                                    class="a-dropdown-link">索马里</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_187" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SB&quot;}" id="shipFromCountryDropdown_187"
                                    class="a-dropdown-link">所罗门群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_188" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TJ&quot;}" id="shipFromCountryDropdown_188"
                                    class="a-dropdown-link">塔吉克斯坦</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_189" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TH&quot;}" id="shipFromCountryDropdown_189"
                                    class="a-dropdown-link">泰国</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_190" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TZ&quot;}" id="shipFromCountryDropdown_190"
                                    class="a-dropdown-link">坦桑尼亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_191" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TO&quot;}" id="shipFromCountryDropdown_191"
                                    class="a-dropdown-link">汤加</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_192" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TC&quot;}" id="shipFromCountryDropdown_192"
                                    class="a-dropdown-link">特克斯和凯科斯群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_193" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TT&quot;}" id="shipFromCountryDropdown_193"
                                    class="a-dropdown-link">特立尼达和多巴哥</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_194" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TN&quot;}" id="shipFromCountryDropdown_194"
                                    class="a-dropdown-link">突尼斯</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_195" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TV&quot;}" id="shipFromCountryDropdown_195"
                                    class="a-dropdown-link">图瓦卢</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_196" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TR&quot;}" id="shipFromCountryDropdown_196"
                                    class="a-dropdown-link">土耳其</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_197" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TM&quot;}" id="shipFromCountryDropdown_197"
                                    class="a-dropdown-link">土库曼</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_198" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TK&quot;}" id="shipFromCountryDropdown_198"
                                    class="a-dropdown-link">托克劳</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_199" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;WF&quot;}" id="shipFromCountryDropdown_199"
                                    class="a-dropdown-link">瓦利斯和富图纳</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_200" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;VU&quot;}" id="shipFromCountryDropdown_200"
                                    class="a-dropdown-link">瓦努阿图</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_201" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GT&quot;}" id="shipFromCountryDropdown_201"
                                    class="a-dropdown-link">危地马拉</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_202" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;VE&quot;}" id="shipFromCountryDropdown_202"
                                    class="a-dropdown-link">委内瑞拉</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_203" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;BN&quot;}" id="shipFromCountryDropdown_203"
                                    class="a-dropdown-link">文莱</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_204" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;UG&quot;}" id="shipFromCountryDropdown_204"
                                    class="a-dropdown-link">乌干达</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_205" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;UA&quot;}" id="shipFromCountryDropdown_205"
                                    class="a-dropdown-link">乌克兰</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_206" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;UY&quot;}" id="shipFromCountryDropdown_206"
                                    class="a-dropdown-link">乌拉圭</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_207" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;UZ&quot;}" id="shipFromCountryDropdown_207"
                                    class="a-dropdown-link">乌兹别克斯坦</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_208" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;ES&quot;}" id="shipFromCountryDropdown_208"
                                    class="a-dropdown-link">西班牙</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_209" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;EH&quot;}" id="shipFromCountryDropdown_209"
                                    class="a-dropdown-link">西撒哈拉</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_210" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GR&quot;}" id="shipFromCountryDropdown_210"
                                    class="a-dropdown-link">希腊</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_211" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SG&quot;}" id="shipFromCountryDropdown_211"
                                    class="a-dropdown-link">新加坡</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_212" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NC&quot;}" id="shipFromCountryDropdown_212"
                                    class="a-dropdown-link">新喀里多尼亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_213" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NZ&quot;}" id="shipFromCountryDropdown_213"
                                    class="a-dropdown-link">新西兰</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_214" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;HU&quot;}" id="shipFromCountryDropdown_214"
                                    class="a-dropdown-link">匈牙利</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_215" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;SY&quot;}" id="shipFromCountryDropdown_215"
                                    class="a-dropdown-link">叙利亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_216" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;JM&quot;}" id="shipFromCountryDropdown_216"
                                    class="a-dropdown-link">牙买加</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_217" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;AM&quot;}" id="shipFromCountryDropdown_217"
                                    class="a-dropdown-link">亚美尼亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_218" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;YE&quot;}" id="shipFromCountryDropdown_218"
                                    class="a-dropdown-link">也门</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_219" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;IQ&quot;}" id="shipFromCountryDropdown_219"
                                    class="a-dropdown-link">伊拉克</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_220" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;IR&quot;}" id="shipFromCountryDropdown_220"
                                    class="a-dropdown-link">伊朗</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_221" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;IL&quot;}" id="shipFromCountryDropdown_221"
                                    class="a-dropdown-link">以色列</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_222" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;IT&quot;}" id="shipFromCountryDropdown_222"
                                    class="a-dropdown-link">意大利</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_223" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;IN&quot;}" id="shipFromCountryDropdown_223"
                                    class="a-dropdown-link">印度</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_224" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;ID&quot;}" id="shipFromCountryDropdown_224"
                                    class="a-dropdown-link">印尼</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_225" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GB&quot;}" id="shipFromCountryDropdown_225"
                                    class="a-dropdown-link">英国</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_226" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;VG&quot;}" id="shipFromCountryDropdown_226"
                                    class="a-dropdown-link">英属维尔京群岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_227" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;IO&quot;}" id="shipFromCountryDropdown_227"
                                    class="a-dropdown-link">英属印度洋领地</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_228" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;JO&quot;}" id="shipFromCountryDropdown_228"
                                    class="a-dropdown-link">约旦</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_229" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;VN&quot;}" id="shipFromCountryDropdown_229"
                                    class="a-dropdown-link">越南</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_230" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;ZM&quot;}" id="shipFromCountryDropdown_230"
                                    class="a-dropdown-link">赞比亚</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_231" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;JE&quot;}" id="shipFromCountryDropdown_231"
                                    class="a-dropdown-link">泽西岛</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_232" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TD&quot;}" id="shipFromCountryDropdown_232"
                                    class="a-dropdown-link">乍得</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_233" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;GI&quot;}" id="shipFromCountryDropdown_233"
                                    class="a-dropdown-link">直布罗陀</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_234" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CL&quot;}" id="shipFromCountryDropdown_234"
                                    class="a-dropdown-link">智利</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_235" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CF&quot;}" id="shipFromCountryDropdown_235"
                                    class="a-dropdown-link">中非共和国</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_236" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;CN&quot;}" id="shipFromCountryDropdown_236"
                                    class="a-dropdown-link">中国</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_237" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;MO&quot;}" id="shipFromCountryDropdown_237"
                                    class="a-dropdown-link">中国澳门</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_238" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;TW&quot;}" id="shipFromCountryDropdown_238"
                                    class="a-dropdown-link">中国台湾</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_239" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;HK&quot;}" id="shipFromCountryDropdown_239"
                                    class="a-dropdown-link">中国香港</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_240" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;NR&quot;}" id="shipFromCountryDropdown_240"
                                    class="a-dropdown-link">瑙鲁</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_241" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;VA&quot;}" id="shipFromCountryDropdown_241"
                                    class="a-dropdown-link">梵帝冈</a></li>
                            <li tabindex="0" role="option" aria-labelledby="shipFromCountryDropdown_242" class="a-dropdown-item"><a tabindex="-1"
                                    href="javascript:void(0)" data-value="{&quot;stringVal&quot;:&quot;FJ&quot;}" id="shipFromCountryDropdown_242"
                                    class="a-dropdown-link">斐济</a></li>
                    </ul>
                    </div>
                </div>
            </div>
            <div class="a-row">
                <div class="addressEditItem">
                    <div class="addressEditTitle">
                        <span>地址</span>
                    </div>
                    <div class="a-spacing-mini" id="line_oneId">
                        <input class="line_one" type="text" placeholder="地址行 1" maxlength="60">
                    </div>
                    <div class="a-spacing-mini">
                        <input class="line_two" type="text" placeholder="地址行 2" maxlength="60">
                    </div>
                </div>
            </div>
            <div class="a-row">
                <div class="addressEditItem">
                    <div class="addressEditTitle">
                        <span>邮政编码</span>
                    </div>
                    <div class="a-row" id="postalcodeId">
                        <div class="a-spacing-mini width48 float_left">
                            <input class="postalcode" type="text"  maxlength="60">
                        </div>
                        <div class="width48 float_right">
                            <a class="checkCodeLink">
                                检查邮政编码
                            </a>
                            <i class="a-icon a-icon-success postalSuccessIcon none"></i>
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
                                <span>市/镇</span>
                            </div>
                            <div class="a-row a-spacing-mini float_left">
                                <input class="city_town" type="text" maxlength="60">
                            </div>
                        </div>
                        <div class="a-spacing-mini width48 float_right" id="state_provinceId">
                            <div class="addressEditTitle">
                                <span>州、省、直辖市或自治区</span>
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
                                <span>主要电话</span>
                            </div>
                            <div class="a-row a-spacing-mini float_left">
                                <input class="tel" type="text" maxlength="60">
                            </div>
                        </div>
                        <div class="a-spacing-mini width48 float_right" id="E_mailId">
                            <div class="addressEditTitle">
                                <span>电子邮件地址</span>
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
        dropdown_box(".country_city", "#choose_country")
     }
    // 增加地址、修改地址
    function callback() {  
        $("div.myWarn").remove();
        $("input").removeClass("activebtn");
        addressName = $('.addressName').val().trim();
        country_region = $('.country_region').text();
        line_one = $('.line_one').val().trim();
        line_two = $('.line_two').val().trim();
        postalcode = $('.postalcode').val().trim();
        city_town = $('.city_town').val().trim();
        state_province = $('.state_province').val().trim();
        tel = $('.tel').val().trim();
        E_mail = $('.E_mail').val().trim();//内层确定触发的事件
        if (addressName && line_one && state_province && city_town && postalcode && tel && country_region !="---无---") {
            // 增加
            if(window.sessionStorage && sessionStorage.getItem('add')){
                $.ajax({
                    url: baseUrl + '/AddAddressNew',
                    method: 'post',
                    dataType: "json",
                    data: {
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
                    },
                    success: function (res) {
                        console.log(res)
                        if(res.result == 1){
                            window.location.reload();
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
            if(window.sessionStorage && sessionStorage.getItem('update')){
                $.ajax({
                    url: baseUrl + "/UpdateDistributionAddress",
                    method: "post",
                    dataType: "json",
                    data: {
                        userid: amazon_userid,
                        addressId:address_id,
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
                            window.location.reload();
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
            addwarn("choose_country", 2, "请选择国家/地区");
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
                        }
                    }
                    var add = doT.template($('#addArray').text());
                    $('#addTmpl ').html(add(address_data));
                    $('input[type="radio"]:checked').parents('.add').addClass('address-item-select')
                    $('.add input').each(function (i) {
                        $('.add input').eq(i).click(function () {
                            address_id = $('input[type="radio"]:checked').parents('.add').attr('data-id')
                            console.log(address_id)
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
                                            window.location.reload();
                                            //console.log("success!");
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
                            ` //内层内容层
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
                        address_id = $(this).parents('.add').attr('data-id')
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
                                    $('.addressName').val(decodeURIComponent(data.name));
                                    $('.country_region').text(decodeURIComponent(data.country));
                                    $('.line_one').val(decodeURIComponent(data.address));
                                    $('.line_two').val(decodeURIComponent(data.address2));
                                    $('.postalcode').val(decodeURIComponent(data.zipcode));
                                    $('.city_town').val(decodeURIComponent(data.city));
                                    $('.state_province').val(decodeURIComponent(data.name));
                                    $('.tel').val(decodeURIComponent(data.phone));
                                    $('.E_mail').val(decodeURIComponent(data.email));//内层确定触发的事件   
                                    if(window.localStorage){
                                        sessionStorage.setItem('update','update')
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
            if (res.result == 1) {
                var data = res.data.strAddress
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
                if (window.sessionStorage) {
                    sessionStorage.setItem('address_id', decodeURIComponent(data.address_id))
                }

            } else {
                console.log(decodeURIComponent(res.error));

            }
        },
        error: function (res) {
            console.log(decodeURIComponent(res.error));
        }
    });

    // 编辑
    $('.editBtn_first').click(function () {
        addPopup({
            type:1,
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
                            //window.location.reload()
                            $('.box-content').show()
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
                                            <ul class="a-box" id="timeZone"> 
                                        
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
            if(window.sessionStorage){
                sessionStorage.setItem('add','add')
            }
        })    
    });

})