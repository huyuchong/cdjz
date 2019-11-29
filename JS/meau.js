$(".meau2").click(function() {
    back();
    $(this).siblings('li').removeClass("active");
    $(this).addClass('active');
    $(".meau2 img").attr('src', 'image/resume-fff.png');
    $(".meau3 img").attr('src', 'image/issue-black.png');
    $(".meau4 img").attr('src', 'image/work-black.png');
    $(".meau5 img").attr('src', 'image/evaluate-black.png');
    $('#meau2').siblings('div').removeClass("active");
    $("#meau2").addClass('active');
});

function meau3() {
    back2();
    $('.meau3').siblings('li').removeClass("active");
    $('.meau3').addClass('active');
    $(".meau2 img").attr('src', 'image/resume-black.png');
    $(".meau3 img").attr('src', 'image/issue-fff.png');
    $(".meau4 img").attr('src', 'image/work-black.png');
    $(".meau5 img").attr('src', 'image/evaluate-black.png');
    $('#meau3').siblings('div').removeClass("active");
    $("#meau3").addClass('active');
}
$(".meau3").click(function() {
    meau3();
});
$(".meau4").click(function() {
    back();
    $(this).siblings('li').removeClass("active");
    $(this).addClass('active');
    $(".meau2 img").attr('src', 'image/resume-black.png');
    $(".meau3 img").attr('src', 'image/issue-black.png');
    $(".meau4 img").attr('src', 'image/work-fff.png');
    $(".meau5 img").attr('src', 'image/evaluate-black.png');
    $('#meau4').siblings('div').removeClass("active");
    $("#meau4").addClass('active');
});
$(".meau5").click(function() {
    back();
    $(this).siblings('li').removeClass("active");
    $(this).addClass('active');
    $(".meau2 img").attr('src', 'image/resume-black.png');
    $(".meau3 img").attr('src', 'image/issue-black.png');
    $(".meau4 img").attr('src', 'image/work-black.png');
    $(".meau5 img").attr('src', 'image/evaluate-fff.png');
    $('#meau5').siblings('div').removeClass("active");
    $("#meau5").addClass('active');
})

$(".amend>span").click(function() {
    $(".resume").hide();
    $(".rwork").show();
})

$(".back").click(function() {
    back1();
})

function back1() {
    $(".rwork").hide();
    $(".resume").show();
}

$(".navbar-nav>li").click(function() {
    back5();
    if ($(".eb-b").hasClass("active")) {
        $(".navbar-nav>li:first-child").siblings("li").removeClass("active");
        $(".navbar-nav>li:last-child").addClass("active");
        $(".eb-b").removeClass("active")
        $(".eb-a").addClass("active");
    } else {
        $(".navbar-nav>li:last-child").siblings("li").addClass("active");
        $(".navbar-nav>li:first-child").removeClass("active");
        $(".eb-a").removeClass("active")
        $(".eb-b").addClass("active");
    }
})

$(".navbar-nav>li:first-child").click(function() {
    back5();
    $(".eb-b ,.eb-c").removeClass("active");
    $(".eb-a").addClass("active");
    $(this).addClass("active");
    $(this).next().removeClass("active");
    $(this).next().next().removeClass("active");
})

$(".navbar-nav>li:nth-child(2)").click(function() {
    back5();
    $(".eb-a,.eb-c").removeClass("active");
    $(".eb-b").addClass("active");
    $(this).addClass("active");
    $(this).prev().removeClass("active");
    $(this).next().removeClass("active");
})

$(".navbar-nav>li:last-child").click(function() {
    $(".eb-a, .eb-b").removeClass("active")
    $(".eb-c").addClass("active");
    $('.eb-c').show();
    $(this).addClass("active");
    $(this).prev().removeClass("active");
    $(this).prev().prev().removeClass("active");

})


function fb() {
    $(".issue-out").hide();
    $(".issue-in").show();
}

$(".issue-header").click(function() {
    fb();
})

function back2() {
    $(".issue-in").hide();
    $(".issue-out").show();
}

function back() {
    back1();
    back2();
    backallform();
    Xclose();
    back4();
    back5();
}

var url = window.location.href;
index = url.indexOf("falg-index"); //检索是否存在falg-index
if (index != -1) {
    meau3();
    fb();
}

function backallform() {
    $('.issue-init').hide();
    $('.issue-bottom').show();
}

function back3() {
    $(".eb-c-hide").hide();
    $(".eb-c").show();
}

function back4() {
    $(".surelq").hide();
}

function back5() {
    $(".eb-c-hide").hide();
}

var iduser;

function thisjobpf(obj) {
    iduser = $(obj).next().val();
    $(".pf").show();
}

function pf() {
    if ($(".pf input").val() == "") {
        alert("评分不能为空");
    } else {
        $.ajax({
            type: "post",
            url: "http://101.200.145.9/pjuser2.php",
            data: {
                loginid: iduser, //这份工作的id
                jobid: $("#jobidid").val(),
                userscore: $(".pf input").val(),
            },
            dataType: "json",
            success: function(data) {
                alert(data.msg);
                $(".pf input").val("");
                $(".pf").hide();
            }
        })
    }
}


var idjob;

function thisjobpfboss(obj) {
    idjob = $(obj).next().val();
    $(".pfboss").show();
    console.log(idjob);

}


function pfboss() {
    if ($(".pfboss input").val() == "") {
        alert("评分不能为空");
    } else {
        $.ajax({
            type: "post",
            url: "http://101.200.145.9/pjcompany2.php",
            data: {
                loginid: $.cookie("user-name"),
                jobid: idjob,
                companyscore: $(".pfboss input").val(),
            },
            dataType: "json",
            success: function(data) {
                alert(data.msg);
                $(".pfboss input").val("");
                $(".pfboss").hide();
            }
        })
    }
}