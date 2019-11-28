// 登录
$(function() {
    //成为焦点
    $("#login .mobile，#login .password").focus(function() {
        $(this).next().hide();
    });
    //失去焦点
    $("#login .mobile").blur(function() {
        var value = $(this).val();
        var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        checkTip(value, $(this), filter, "账号不能为空！", "账号格式不对！");
    });
    $("#login .password").blur(function() {
        var value = $(this).val();
        var filter = /^[a-zA-Z0-9]\w{5,17}$/;
        checkTip(value, $(this), filter, "密码不能为空！", "密码格式不对！");
    });

    //公共部分
    function checkTip(value, cur, filter, text1, text2) {
        if (value == "") //输入内容为空
        {
            cur.next().show().text(text1);

        } else if (!filter.test(value)) //格式不对
        {
            cur.next().show().text(text2);
        } else {
            cur.next().hide();
        }
    };
});

//注册
$(function() {
    //成为焦点
    $('#register .email,#register .password').focus(function() {
        $(this).next().hide();
    });
    // 失去焦点
    $("#register .email").blur(function() {
        var val = $(this).val();
        var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        checkTip(val, $(this), filter, "请输入邮箱", "请输入正确的邮箱格式");
    });

    $("#register .password").blur(function() {
        var val = $(this).val();
        var filter = /^[a-zA-Z0-9]\w{5,17}$/;
        checkTip(val, $(this), filter, "密码不能为空", "请输入6-18位密码");
    });

    function checkTip(val, cur, filter, text1, text2) {
        if (val == "") {
            cur.next().show().text(text1);
        } else if (!filter.test(val)) {
            cur.next().show().text(text2);
        } else {
            cur.next().hide();
        }
    };

});

// 注册请求
$('#register #submitregister').click(function() {
    var _email = $.trim($('.email').val()),
        _psd = $.trim($('.regpwd').val());
    // if (!_email || !_psd || !$('.error-tip').is(":visible")) {
    //     $('.error-tj').text("请输入正确的信息！")
    // } else {
    // $("erro-tj").text("");
    $.ajax({
            type: "POST",
            url: 'http://101.200.145.9/rs.php',
            data: {
                email: _email,
                password: _psd,
            },
            dataType: "json",
            success: function(data) {
                // var user = data;
                if (data.code == 300) {
                    $(".p").show().find("p").text(data.msg);
                    $("#cover").show();
                } else if (data.code == 200) {
                    console.log(data.msg);
                    $(".p").show().find("p").text(data.msg);
                    $("#cover").show();
                    window.location.reload();
                }
            },
            error: function(e) {
                $(".p").show().find("p").text(e);
                $("#cover").show();
                console.log(e);
            }
        })
        //}
})

var loginid;
// 登录请求
$("#login #submitlogin").click(function() {
    var _mobile = $.trim($('.mobile').val()),
        _psd = $.trim($('.password').val());
    if (_mobile == "" || _psd == "" || $('error-tip').is(":visible")) { //为什么是和（&&）而不是或（||）
        $('.error-tj').show().text("请输入正确的信息！");
    } else {
        $.ajax({
            type: 'post',
            url: 'http://101.200.145.9/login.php', //后端接口       
            // contentType: "application/json", 加了之后出现跨域问题
            data: {
                email: _mobile,
                password: _psd, //由后端定义的传值
            }, //传给后端的值
            dataType: 'json',
            success: function(data) { //data是后端返回的值         
                if (data.code == 200) {
                    $.cookie("user-name", //cookie名字
                        data.loginid, //cookie的value值
                        {
                            expires: 3, //过期时间是三天
                            path: "/" //保存路径
                        });
                    movein();
                    loginid = $.cookie('user-name');
                    window.location.reload();
                } else if (data.code == 350) {
                    console.log(data.msg);
                    $(".p").show().find("p").text(data.msg);
                    $("#cover").show();
                }

            },
            error: function(msg) {
                console.log(msg);
                console.log("失败");
                // movein();
            }
        })
    }
})

function movein() {
    $('.zc ,.dl').remove();
    $('#login,#register,#cover').hide();
    var cloneback = $(".clone").clone();
    $(".clone").after(cloneback);
    $(".nav li:nth-child(2) a").text("退出");
    $(".nav li:first-child").addClass("active");
    $(".nav li:nth-child(2)").addClass("reback");
}


if ($.cookie("user-name") != undefined) {
    movein();
    $(".nav li:nth-child(2)").removeClass("active");
}