// 页面自动获取数据
function runEvery10Sec() {
    setTimeout(runEvery10Sec, 1000 * 10);
    $.ajax({
        type: "post",
        url: "http://101.200.145.9/jobout.php",
        // data: id = loginid,
        dataType: "json",
        success: function(data) {
            // console.log(data.arr[1].id);
            // console.log(data.arr[1]);
            // arr:{id,jobname,money,time,place,membernum,parttime,tel,interview,companyname,companyaddress}
            // arr:{jobname,money,place,membernum,parttime,companyaddress}
            for (let a = 0; a < 8; a++) {
                New(a, data.arr[a].jobname, data.arr[a].parttime, data.arr[a].place, data.arr[a].membernum, data.arr[a].money, data.arr[a].id);
            };

        },
        error: function(e) {
            console.log(e);
        }
    })

}

runEvery10Sec();

function New(a, jobname, parttime, place, membernum, money, id) {
    // $(this).find("div[class='item-class-left']").text(arr.parttime);
    $(".position-list .position-item:eq(" + a + ")").find("div[class='item-class-left']").text(parttime);
    $(".position-list .position-item:eq(" + a + ")").find("div[class='item-class-right']").find("span").text(1); //信誉分
    $(".position-list .position-item:eq(" + a + ")").find("div[class='item-name']").text(jobname); //兼职名字
    $(".position-list .position-item:eq(" + a + ")").find("ul>li:eq(0)").text(parttime); //全职/兼职
    $(".position-list .position-item:eq(" + a + ")").find("ul>li:eq(1)").text(place); //地点
    $(".position-list .position-item:eq(" + a + ")").find("ul>li:eq(2) span").text(membernum); //招聘人数
    $(".position-list .position-item:eq(" + a + ")").find("div[class='money']").find("span").text(money); //薪资
    $(".position-list .position-item:eq(" + a + ")").find("input").val(id); //兼职隐藏id
    //信誉分
    // $(this).find("")
}