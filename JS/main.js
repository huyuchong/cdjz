//退出登录
$(".reback").click(function() {
    //删除cookie
    $.removeCookie("user-name", { path: '/' });
    $.removeCookie("all-name", { path: '/' });
    $.removeCookie("work-name", { path: '/' });
    //删除成功则退出
    //删除失败则提示
    if ($.cookie('user-name') == undefined) {
        window.location.href = "http://127.0.0.1:5500/index.html"
    } else {
        $(".p").show().find("p").text("退出失败");
        $("#cover").show();
    }
})
var _vul;
//搜索
$('.position-form input[type="button"]').click(function() {
    if ($.cookie('user-name') == undefined) { //未登录
        $(".p").show().find("p").text("请先登录");
        $("#cover").show();
    } else {
        var _vul = $(this).prev().val();
        console.log(_vul);
        if (_vul == "") {
            $(".p").show().find("p").text("请输入查询的信息");
            $("#cover").show();
        } else {
            if ($.cookie("all-name") != undefined) {
                $.removeCookie("all-name", path = '/')
            };
            $.cookie("all-name",
                _vul, { path: '/', }
            )
            if (window.location.href != "http://127.0.0.1:5500/all.html") {
                window.location.href = "http://127.0.0.1:5500/all.html"
            } else {
                window.location.reload();
            }
        }
    }
})

//发布招聘
$(".jz-post").click(function() {
    if ($.cookie("user-name") == undefined) { //未登录
        $(".p").show().find("p").text("请先登录");
        $("#cover").show();
    } else {
        window.location.href = "http://127.0.0.1:5500/user.html?falg-index=ture";
    }
})




//详情
$(".position4 input[type='button'],.position-item .item-name").click(function() {
    if ($.cookie('user-name') == undefined) { //未登录
        $(".p").show().find("p").text("请先登录");
        $("#cover").show();
    } else {
        var workid = $(this).parent().find("input[type = 'hidden']").val();
        if ($.cookie("work-name") != undefined) {
            $.removeCookie("work-name", path = '/')
        };
        $.cookie("work-name",
            workid, { path: '/', }
        )
        window.location.href = "http://127.0.0.1:5500/dateils.html";
    }
})

function closetishi() {
    $("#cover,.p").hide();
    location.reload();
}