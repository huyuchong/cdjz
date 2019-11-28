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
                $(".issue-init-body table tr").show();

            }

        },
        error: function(e) {
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

        // var regtime = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
        // if(!regtime.test()){
        //     　　alert("时间格式不正确，正确格式为：12:00:00");
        //     　　return;
        //     }

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
            error: function(e) {
                console.log('error');
            }
        })
    });

    //点击我的评价获取信息

    $(".leftmeau-ul li:eq(3)").click(function() {

        console.log(4);

    })

})