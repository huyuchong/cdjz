var arrl;
//详情
$(document).ready(function() { //进入页面则发出ajak请求
    if ($.cookie("all-name") == undefined) {
        _vul = "";
        $(".position-form input[type='text']").val(_vul);
    } else {
        _vul = $.cookie("all-name");
        $(".position-form input[type='text']").val(_vul);
    }
    $.ajax({
        type: 'post',
        url: "http://101.200.145.9/searchjob.php",
        data: {
            jobname: _vul,
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 490) {
                console.log(data.msg);
            } else if (data.code == 200) {
                // 如果后端不存在此类数据 不返回200 返回其他状态值
                arrl = Array(data.arr.length);
                for (let index = 0; index < arrl.length; index++) {
                    $(".number:eq(" + index + ")").find("div[class='workName01'] span").text(data.arr[index].jobname);
                    $(".number:eq(" + index + ")").find("div[class='xx']:eq(0) span").text(data.arr[index].place);
                    $(".number:eq(" + index + ")").find("div[class='xx']:eq(1) span").text(data.arr[index].membernum);
                    $(".number:eq(" + index + ")").find("div[class='position3'] span").text(data.arr[index].money);
                    $(".number:eq(" + index + ")").find("div[class='position4'] input[type='hidden']").val(data.arr[index].id);
                    if (index != arrl.length - 1) {
                        $(".number:eq(0)").clone().appendTo(".all-work")
                    }
                    $(".position4 input[type='button'],.position-item .item-name").click(function() {
                        var workid = $(this).parent().find("input[type = 'hidden']").val();
                        if ($.cookie("work-name") != undefined) {
                            $.removeCookie("work-name", path = '/')
                        };
                        $.cookie("work-name",
                            workid, { path: '/', }
                        )
                        window.location.href = "http://127.0.0.1:5500/dateils.html"
                    })
                }

            }
        },
        error: function(msg) {
            console.log(msg);
        }
    })
})