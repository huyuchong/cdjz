if ($.cookie("work-name") == undefined) {
    $(".p").show().find("p").text("出错了");
    $("#cover").show();
} else {
    $.ajax({
        type: 'post',
        url: 'http://101.200.145.9/workdetail.php', //后端接口       
        data: {
            jobid: $.cookie("work-name"),
        },
        dataType: 'json',
        success: function(data) {
            if (data.code == 200) {
                // { id, jobname, money, time, place, membernum, parttime, tel, companyname, companyaddress, interview }
                $(".workName01").text(data.data.jobname);
                $(".work-left ul li:eq(0) span").text(data.data.time);
                $(".work-left ul li:eq(1) span").text(data.data.place);
                $(".work-left ul li:eq(2) span").text(data.data.membernum);
                $(".money span").text(data.data.money);
                $(".introduce-body ol li").text(data.data.interview);
                $(".boss-body h6").text(data.data.employername);
                $(".boss-body table tr:eq(0) td:eq(1)").text(data.data.employertel);
                $(".boss-body table tr:eq(1) td:eq(1)").text(data.data.credit + "分");
            } else if (data.code == 502) {
                console.log(data.msg);
            }
        },
        error: function(msg) {
            console.log(msg);
        }
    })
}


function baoming() {
    $(".sure,#cover").show();
}

function quxiao() {
    $(".sure,#cover").hide();
}

function queding() {
    $.ajax({
        type: 'post',
        url: 'http://101.200.145.9/apply.php', //报名接口
        data: {
            userid: $.cookie("user-name"), //用户的iduser
            jobid: $.cookie("work-name"), //工作的id
        },
        dataType: 'json',
        success: function(data) {
            if (data.code == 200) {
                $(".sure").hide();
                $(".p").show()
                $(".p p").text(data.msg);
            } else if (data.code == 504) {
                $(".sure").hide();
                $(".p").show()
                $(".p p").text(data.msg);
            } else if (data.code == 503) {
                $(".sure").hide();
                $(".p").show()
                $(".p p").text(data.msg);
            }
        },
        error: function() {
            console.log(msg);
        }
    })
}