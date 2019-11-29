function lookuserid(obj) {
    $(".user-id").show();

    $.ajax({
        type: 'post',
        url: 'http://101.200.145.9/userout.php',
        data: {
            id: $(obj).siblings("input").val(),
        },
        dataType: 'json',
        success: function(data) {
            $(".user-id .user-center ul li:eq(0) span").text(data.data.name);
            $(".user-id .user-center ul li:eq(1) span").text(data.data.sex);
            $(".user-id .user-center ul li:eq(2) span").text(data.data.degree);
            $(".user-id .user-center ul li:eq(3) span").text(data.data.status);
            $(".user-id .user-center ul li:eq(4) span").text(data.data.tel);
            $(".user-id .user-bottom p").text(data.data.adv);
        },
        error: function(_e) {
            console.log(1);
        }

    })
}

function Xclose() {
    $(".user-id").hide();
}

var lqid;
//录取
$(".issue-init-body table tr td input[value='未录取']").click(function() {
    $(".surelq").show();
    lqid = $(this).parent().prev().find("input").val();
})

function luyon() {
    $.ajax({
        type: 'post',
        url: 'http://101.200.145.9/allow.php',
        data: {
            userid: lqid,
            jobid: $(".issue-init input[type='hidden']").val(),
        },
        dataType: 'json',
        success: function(data) {
            back4();
            $(".p").show().find("p").text(data.msg);
            $("#cover").show();
        }
    })
}
var al = 0;
//我的已发布查看详情
function lookjob(obj) {
    var _jobid = $(obj).next().val();
    var _jobtime = $(obj).parent().prev().text();
    var _jobname = $(obj).parent().prevAll().eq(1).text();
    $('.issue-bottom').hide();
    $('.issue-init').show();
    $.ajax({
        type: 'post',
        url: 'http://101.200.145.9/managemember.php',
        data: {
            jobid: _jobid,
        },
        dataType: 'json',
        success: function(data) {
            $('.issue-init-header span').text(_jobname);
            $('.issue-init-time span').text(_jobtime);
            if (data.code == 505) {
                $(".issue-init-body p").remove();
                $(".issue-init-body table tr:not(:eq(0))").remove();
                $(".issue-init-body table tr:eq(0)").hide();
                $(".issue-init-body").append("<p>" + data.msg + "</p>")
            } else if (data.code == 200) {
                $(".issue-init-body p").remove();
                $(".issue-init-body table tr:not(:eq(0))").remove();
                $(".issue-init-body table tr").show();
                $(".issue-init input[type='hidden']").val(_jobid);
                for (al = 0; al < data.arr.length; al++) {
                    $(".issue-init-body table tr:eq(" + al + ") td:eq(0) span").text(data.arr[al].name);
                    $(".issue-init-body table tr:eq(" + al + ") td:eq(1) input").val(data.arr[al].userid)
                    if (data.arr[al].sex == "女") {
                        $(".issue-init-body table tr:eq(" + al + ") td:eq(0) img").attr('src', 'image/female.png');
                    }
                    if (data.arr[al].status == 510) {
                        $(".issue-init-body table tr:eq(" + al + ") td:eq(2) input").val("未录取").css({ "background-color": "red", "border": "red" })
                    } else
                    if (data.arr[al].status == 520) {
                        $(".issue-init-body table tr:eq(" + al + ") td:eq(2) input").val("已录取").css({ "background-color": "yellow", "border": "yellow" })
                    }
                    if (al < data.arr.length - 1) {
                        $(".issue-init-body table tr:eq(0)").clone(true).appendTo(".issue-init-body table");
                    }
                }

            }
        },
        error: function(_e) {
            console.log(1);
        }

    })
}

//

//我对boss的评分
$('.eb-t .navbar-nav li:eq(1)').click(function() {
    $.ajax({
        type: "post",
        url: "http://101.200.145.9/pjcompany1.php",
        data: {
            loginid: $.cookie("user-name"),
        },
        dataType: "json",
        success: function(data) {
            var pfboss = 0;
            $(".eb-b table tr:not(:eq(0))").remove();
            if (data.arr == null) {
                $(".eb-b table tr:eq(0)").hide();
                $(".eb-b p").text("未做过任何兼职")
            } else {
                for (; pfboss < data.arr.length; pfboss++) {
                    $(".eb-b table tr:eq(" + pfboss + ") td:eq(0)").text(data.arr[pfboss].companyname);
                    $(".eb-b table tr:eq(" + pfboss + ") td:eq(1)").text(data.arr[pfboss].jobname);
                    $(".eb-b table tr:eq(" + pfboss + ") td:eq(2) input[type='hidden']").val(data.arr[pfboss].id);
                    if (data.arr[pfboss].companyscore == 0) {
                        $(".eb-b table tr:eq(" + pfboss + ") td:eq(2) span").hide();
                        $(".eb-b table tr:eq(" + pfboss + ") td:eq(2) input").show();
                    } else {
                        $(".eb-b table tr:eq(" + pfboss + ") td:eq(2) span").show();
                        $(".eb-b table tr:eq(" + pfboss + ") td:eq(2) input").hide();
                        $(".eb-b table tr:eq(" + pfboss + ") td:eq(2) span").text(data.arr[pfboss].companyscore + "分");
                    }
                    if (pfboss < data.arr.length - 1) {
                        $(".eb-b table tr:eq(0)").clone(true).appendTo(".eb-b table")
                    }
                }
            }

        },
        error: function(_e) {
            console.log(1);
        }
    })
})


var jzz = 0;
//我对兼职者的评分
$('.eb-t .navbar-nav li:eq(2)').click(function() {
    $.ajax({
        type: "post",
        url: "http://101.200.145.9/joboutown.php",
        data: {
            loginid: $.cookie("user-name"),
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 200) {
                for (; jzz < data.arr.length; jzz++) {
                    $(".eb-c table tr:eq(" + jzz + ") td:eq(0)").text(data.arr[jzz].jobname);
                    $(".eb-c table tr:eq(" + jzz + ") td:eq(1)").text(data.arr[jzz].time);
                    $(".eb-c table tr:eq(" + jzz + ") td:eq(2) input[type='hidden']").val(data.arr[jzz].id);
                    if (jzz < data.arr.length - 1) {
                        $(".eb-c table tr:eq(0)").clone(true).appendTo(".eb-c table");
                    }
                }
            }
        },
        error: function(_e) {
            console.log(1);
        }
    })
})



function lookthisjob(obj) {
    $('.eb-c').hide();
    $('.eb-c-hide').show();
    $.ajax({
        type: "post",
        url: "http://101.200.145.9/pjuser1.php",
        data: {
            jobid: $(obj).next().val(),
        },
        dataType: "json",
        success: function(data) {
            var jobworknum = 0;
            if (data.code == 600) {
                console.log(data.msg);
                $(".p").show().find("p").text(data.msg);
                $("#cover").show();
            } else if (data.code == 200) {
                $("#jobidid").val($(obj).next().val());
                $(".eb-c-hide table tr:not(:eq(0))").remove();
                if (data.arr == null) {
                    $(".eb-c-hide table tr:eq(0)").hide();
                    $(".eb-c-hide p").text("暂无人报名")
                } else {
                    $(".eb-c-hide p").text("");
                    $(".eb-c-hide table tr:eq(0)").show();
                    for (jobworknum; jobworknum < data.arr.length; jobworknum++) {
                        $(".eb-c-hide table tr:eq(" + jobworknum + ") td:eq(0)").text(data.arr[jobworknum].username);
                        if (data.arr[jobworknum].userscore == 0) {
                            $(".eb-c-hide table tr:eq(" + jobworknum + ") td:eq(1) input[type='button']").show();
                            $(".eb-c-hide table tr:eq(" + jobworknum + ") td:eq(1) p").hide();
                            $(".eb-c-hide table tr:eq(" + jobworknum + ") td:eq(1) input[type='hidden']").val(data.arr[jobworknum].id);
                        } else {
                            $(".eb-c-hide table tr:eq(" + jobworknum + ") td:eq(1) input").hide();
                            $(".eb-c-hide table tr:eq(" + jobworknum + ") td:eq(1) p").show();
                            $(".eb-c-hide table tr:eq(" + jobworknum + ") td:eq(1) p").text(data.arr[jobworknum].userscore + "分");
                        }
                        if (jobworknum < data.arr.length - 1) {
                            $(".eb-c-hide table tr:eq(0)").clone(true).appendTo(".eb-c-hide table");
                        }
                    }
                }

            }

        },
        error: function(_e) {
            console.log(1);
        }
    })
}


$(document).ready(function() {
    var loginid;
    loginid = $.cookie("user-name");
    //获取简历
    $.ajax({
        type: "post",
        url: "http://101.200.145.9/userout.php",
        data: {
            id: loginid,
        },
        dataType: "json",
        success: function(data) {
            if (data.code == 475) {
                console.log(data.msg);
            } else if (data.code == 200) {
                $(".message-right ul li:eq(0) span").text(data.data.name);
                $(".message-right ul li:eq(1) span").text(data.data.sex);
                $(".message-right ul li:eq(2) span").text(data.data.degree);
                $(".message-right ul li:eq(3) span").text(data.data.status);
                $(".message-right ul li:eq(4) span").text(data.data.tel);
                $(".introduce-left p").text(data.data.adv);
            }
        },
        error: function(e) {
            console.log(e);
        }
    })


    //发布兼职
    $(".issue-in-body form input[value='保存']").click(function() {
        var _jobname = $.trim($("#_jobname").val()),
            _money = $.trim($("#_money").val()),
            _time = $.trim($('#_time').val()),
            _place = $.trim($("#_place").val()),
            _companyname = $.trim($("#_companyname").val()),
            _companyaddress = $.trim($("#_companyaddress").val()),
            _membernum = $.trim($("#_membernum").val()),
            _parttime = $.trim($("#_parttime").val()),
            _tel = $.trim($("#_tel").val()),
            _interview = $.trim($("#_interview").val());
        if (_jobname == "" || _money == "" || _time == "" || _parttime == "" || _place == "" || _membernum == "" || _tel == "" || _interview == "" || _companyaddress == "" || _companyname == "") {
            $(".p").show().find("p").text("请输入完整的信息");
            $("#cover").show();
        } else {
            $.ajax({
                type: "post",
                url: "http://101.200.145.9/jobin.php",
                data: {
                    loginid: loginid,
                    jobname: _jobname,
                    money: _money,
                    time: _time,
                    place: _place,
                    companyname: _companyname,
                    companyaddress: _companyaddress,
                    membernum: _membernum,
                    parttime: _parttime,
                    tel: _tel,
                    interview: _interview,
                },
                dataType: "json",
                success: function(data) {
                    if (data.code == 400) {
                        $(".p").show().find("p").text("保存失败，请稍后再试");
                        $("#cover").show();
                        console.log(data.msg);
                    } else if (data.code == 200) {
                        console.log(data.msg);
                        $(".p").show().find("p").text(data.msg);
                        $("#cover").show();
                        location.reload();
                    }
                },
                error: function(e) {
                    console.log(e);
                }
            })
        }

    })

    //保存简历

    $(".rwork-body form input[value='保存']").click(function() {
        var _name = $.trim($("#jlname").val()),
            _sex = $.trim($("#jlsex").val()),
            _teach = $.trim($("#jlteach").val()),
            _job = $.trim($("#jljob").val()),
            _tel = $.trim($("#jltel").val()),
            _adv = $.trim($("#jladv").val());
        if (_name == "" || _sex == "" || _teach == "" || _job == "" || _tel == "" || _adv == "") {
            $(".p").show().find("p").text("请输入完整的信息");
            $("#cover").show();
        } else {
            $.ajax({
                type: "post",
                url: "http://101.200.145.9/userin.php",
                data: {
                    loginid: loginid,
                    name: _name,
                    sex: _sex,
                    degree: _teach,
                    status: _job,
                    tel: _tel,
                    adv: _adv,
                },
                dataType: "json",
                success: function(data) {
                    if (data.code == 411) {
                        $(".p").show().find("p").text("个人信息保存失败，请稍后再试");
                        $("#cover").show();
                        console.log(data.msg);
                    } else if (data.code == 200) {
                        console.log(data.msg);
                        $(".p").show().find("p").text("保存成功");
                        $("#cover").show();
                        location.reload();
                    }
                },
                error: function(e) {
                    console.log(e);
                }
            })
        }
    })

    var index = 0,
        index1;
    // var lookjob;
    // 点击我的发布获取信息
    $(".leftmeau-ul li:eq(1)").click(function() {
        $.ajax({
            type: "post",
            url: "http://101.200.145.9/joboutown.php",
            data: {
                loginid: loginid,
            },
            dataType: "json",
            success: function(data) {
                if (index == data.arr.length) { //已经复制过
                    for (index = 0; index < data.arr.length; index++) {
                        index1 = index + 1;
                        $(".issue-bottom tr:eq(" + index1 + ") td:eq(0)").text(data.arr[index].jobname);
                        $(".issue-bottom tr:eq(" + index1 + ") td:eq(1)").text(data.arr[index].time);
                        $(".issue-bottom tr:eq(" + index1 + ") td:eq(2)").html("<input type='button' value='查看详情' class='lookjob' onclick='lookjob(this)'> <input type='hidden' value='" + data.arr[index].id + "'>")
                    }
                } else { //没有复制过
                    for (index = 0; index < data.arr.length; index++) {
                        $(".issue-bottom tr:eq(0)").clone(true).appendTo(".issue-bottom table");
                        index1 = index + 1;
                        $(".issue-bottom tr:eq(" + index1 + ") td:eq(0)").text(data.arr[index].jobname);
                        $(".issue-bottom tr:eq(" + index1 + ") td:eq(1)").text(data.arr[index].time);
                        $(".issue-bottom tr:eq(" + index1 + ") td:eq(2)").html("<input type='button' value='查看详情' class='lookjob' onclick='lookjob(this)'> <input type='hidden' value='" + data.arr[index].id + "'>")
                    }
                }
            },
            error: function(e) {
                console.log(e);
            }
        })
    });


    var bm = 0;
    //点击我的报名获取信息
    $(".leftmeau-ul li:eq(2)").click(function() {
        $.ajax({
            type: "post",
            url: "http://101.200.145.9/myjob.php",
            data: {
                loginid: loginid,
            },
            dataType: "json",
            success: function(data) {
                var bmval;
                if (bm == data.arr.length) { //已经复制过
                    for (bm = 0; bm < data.arr.length; bm++) {
                        index1 = bm + 1;
                        $(".mine-bottom tr:eq(" + index1 + ") td:eq(0)").text(data.arr[bm].jobname);
                        $(".mine-bottom tr:eq(" + index1 + ") td:eq(1)").text(data.arr[bm].time);
                        if (data.arr[bm].status == 510) {
                            bmval = "未录取";
                        } else if (data.arr[bm].status == 520) {
                            bmval = "已录取";
                        }
                        $(".mine-bottom tr:eq(" + index1 + ") td:eq(2)").html("<input type='button'  value='" + bmval + "' disabled=true>")
                        if (data.arr[bm].status == 520) {
                            $(".mine-bottom tr:eq(" + index1 + ") td:eq(2) input").css({ "background-color": "yellow", "border": "yellow" })
                        }
                    }
                } else { //没有复制过
                    for (bm = 0; bm < data.arr.length; bm++) {
                        $(".mine-bottom tr:eq(0)").clone(true).appendTo(".mine-bottom table");
                        index1 = bm + 1;
                        $(".mine-bottom tr:eq(" + index1 + ") td:eq(0)").text(data.arr[bm].jobname);
                        $(".mine-bottom tr:eq(" + index1 + ") td:eq(1)").text(data.arr[bm].time);
                        if (data.arr[bm].status == 510) {
                            bmval = "未录取";
                        } else if (data.arr[bm].status == 520) {
                            bmval = "已录取";
                        }
                        $(".mine-bottom tr:eq(" + index1 + ") td:eq(2)").html("<input type='button' value='" + bmval + "' disabled=true>")
                        if (data.arr[bm].status == 520) {
                            $(".mine-bottom tr:eq(" + index1 + ") td:eq(2) input").css({ "background-color": "yellow", "border": "yellow" })
                        }
                    }
                }
            },
            error: function(_e) {
                console.log('error');
            }
        })
    });

    //点击我的评价获取信息
    var mycore = 0;
    $(".leftmeau-ul li:eq(3)").click(function() {
        $.ajax({
            type: "post",
            url: "http://101.200.145.9/minepj.php",
            data: {
                loginid: loginid,
            },
            dataType: "json",
            success: function(data) {
                if (data.code == 600) {
                    console.log(data.msg);
                } else if (data.code == 200) {
                    if (data.arr == null) {
                        $(".eb-a table tr").hide();
                        $(".eb-a").html("<p>暂无评分</p>")
                    } else {
                        for (mycore; mycore < data.arr.length; mycore++) {
                            $(".eb-a table tr:eq(" + mycore + ") td:eq(0)").text(data.arr[mycore].jobname);
                            $(".eb-a table tr:eq(" + mycore + ") td:eq(1) span").text(data.arr[mycore].userscore + "分");
                            if (mycore < data.arr.length) {
                                $(".eb-a tr:eq(0)").clone(true).appendTo(".eb-a table");
                            }
                        }
                        if (mycore == data.arr.length) {
                            $(".eb-a table tr:eq(" + mycore + ") td:eq(0)").text("总信誉度");
                            $(".eb-a table tr:eq(" + mycore + ") td:eq(1) span").text(data.credit + "分");
                        }

                    }

                }
            },
            error: function(error) {
                console.log(error);
            }
        })

    })
})