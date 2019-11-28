'use strict'

function showdl(login) {
    $('.error-tj').hide();
    covershow();
    var divemp = document.getElementById("login"); //定位到登录的页面
    var divcss = window.getComputedStyle(divemp).getPropertyValue("display");
    divemp.style.display = "block";
    var arr = document.getElementsByClassName('ulli');
    arr[2].classList.add("active");
    arr[1].classList.remove('active');
    arr[0].classList.remove('active');
}

function closedenglu(login) {
    coverhide();
    var divemp = document.getElementById("login"); //定位到登录的页面
    var divcss = window.getComputedStyle(divemp).getPropertyValue("display");
    divemp.style.display = "none";
    var arr = document.getElementsByClassName('ulli');
    arr[0].classList.add("active");
    arr[1].classList.remove("active");
    arr[2].classList.remove("active");
}

function showzc(register) {
    covershow();
    var divemp = document.getElementById("register"); //定位到注册的页面
    var divcss = window.getComputedStyle(divemp).getPropertyValue("display");
    divemp.style.display = "block";

    var arr = document.getElementsByClassName('ulli');
    arr[1].classList.add("active");
    arr[2].classList.remove('active');
    arr[0].classList.remove('active');
}

function closezhuce(register) {
    coverhide();
    var divemp = document.getElementById("register"); //定位到注册的页面
    var divcss = window.getComputedStyle(divemp).getPropertyValue("display");
    divemp.style.display = "none";
    var arr = document.getElementsByClassName('ulli');
    arr[0].classList.add("active");
    arr[1].classList.remove("active");
    arr[2].classList.remove("active");
}

function gotozhuce() {
    closedenglu();
    showzc();
    shide();
}

function gotodenglu() {
    closezhuce();
    showdl();
    shide();
}

function covershow() { //隐藏主界面并且不可点击
    var coverbj = document.getElementById('cover');
    coverbj.style.display = 'block';
    coverbj.style.height = document.body.scrolltHeight + 'px';
}

function coverhide() { //去掉遮罩层
    var coverbj = document.getElementById('cover');
    coverbj.style.display = 'none';
}

function shide() {
    $(".error-tj").hide();
    $(".error-tip").hide();
}
// 问题：
//     代码重复性高 需要进行封装
//     啰嗦 未精简


//个人中心
$(".user").click(function() {
    if ($.cookie("user-name") == undefined) { //未登录
        $(".p").show().find("p").text("请先登录");
        $("#cover").show();
    } else {
        window.location.href = "http://127.0.0.1:5500/user.html";
    }
})




//查看更多
$(".mod-bth").click(function() {
    if ($.cookie("user-name") == undefined) { //未登录
        $(".p").show().find("p").text("请先登录");
        $("#cover").show();
    } else {
        $.removeCookie("all-name", {
            path: "/",
        })
        window.location.href = "http://127.0.0.1:5500/all.html"
    }
})