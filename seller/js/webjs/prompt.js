function addwarn(target, type, text) {
  /*
     * @target 插入的目标节点
     * @type图片类型，1为info i，2是error ！
     * @text  提示文字
     */
  let imgtype = "";
  type == 1 ? (imgtype = "info") : (imgtype = "error");
  let div = document.createElement("div");
  div.setAttribute("class", "a-row myWarn");
  div.innerHTML = `<div class="a-column ">
                                <div  class="a-box a-alert-inline a-alert-inline-${imgtype}" >
                                    <div class="a-box-inner a-alert-container warnInfo">
                                        <i class="a-icon a-icon-alert"></i>
                                        <div class="a-alert-content">
                                            ${text}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
  if (document.getElementById(target).getElementsByTagName("input")[0]) {
    //input框
    $(`#${target} input`).after(div);
  } else if (
    document.getElementById(target).getElementsByTagName("select")[0]
  ) {
    //select下拉框
    $(`#${target} select`).after(div);
  } else if (document.getElementById(target).getElementsByTagName("p")[0]) {
    //其他处理
    $(`#${target} p`)
      .parent()
      .after(div);
  }
}

function bubble(target, text, className) {
  let div = document.createElement("div");
  div.setAttribute("class", `a-popover ${className} none`);
  div.innerHTML = ` <div class="a-row relative">
        <div class="a-popover-wrapper">
            <div class="a-popover-inner2">
                <button class="button a-button-close">
                    <i class="a-icon a-icon-close"></i>
                </button>
                <div>
                    <p>${text}</p>
                </div>
            </div>
        </div>
        <div class="a-arrow-border a-arrow-border-personal-absolute">
            <span>
                <em></em>
            </span>
        </div>
    </div>
        `;
  $(".tip")
    .parents(".bubbleStyle")[0]
    .after(div);
}
// 下拉框
function dropdown_box(ulName, selectName) {
  let arr = $(ulName).find("li");
  for (let i = 0; i < arr.length; i++) {
    //.removeClass('select_style')
    arr[i].addEventListener("click", function() {
      for (let j = 0; j < $(`${ulName} li `).length; j++) {
        $(`${ulName} li `)
          .eq(j)
          .removeClass("select_style");
      }
      $(selectName)
        .find("p")
        .text(this.innerText);
      this.className = `${this.className} select_style`;
      $(selectName)
        .find("input")
        .val(this.innerText);
      $(ulName).hide();
    });
  }
  $(selectName).on("click", function() {
    $(ulName).show();
    $(ulName).addClass("zIndex999");
  });
}

//  退货通知里面的删除按钮
function deteleList(target, text) {
  let $deleteBtn = $(target);
  var hr = "";
  if ($(`${target} li`).length > 0) {
    hr = "<hr/>";
  }
  let $deleteLi = $(`
                        <li>
                        ${hr}
                        <div class="a-row">
                            <div class="width74 a-column2_4 float_left">${text}</div>
                            <div class="width23 float_left">
                                <span class="a-button-inner a-button-small  block a-button ">
                                    <span class="a-button-text border_box block removeReason">
                                        删除
                                    </span>
                                </span>
                            </div>
                            <div class="clear"></div>
                        </div>
                        </li>`);
  $deleteBtn.append($deleteLi);
}


