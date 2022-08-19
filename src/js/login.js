if(window.location.href == "http://mixio.mixly.cn/"||window.location.href == "http://mixio.mixly.org/")
    window.location.href = "https://mixio.mixly.cn/"
function showmodaltext(text){
    var d = dialog({
        content: text
    });
    d.showModal();
    return d
}
$(function(){
    $("#admin").attr("href","http://"+window.location.href.split("//")[1].split(":")[0].replace("/","")+":18084")
    fullHeight = $("#cd").height()+"px"
    halfHeight = "calc( "+($("#cd").height()-$("#ref1").height()-$("#reset_text").height()-10)+"px - 1rem)"
    if(window.screen.width<800)
        halfHeight = "calc( "+($("#cd").height()-$("#ref1").height()*2-$("#reset_text").height()-20)+"px - 1rem)"
    $("#cd").css("height",fullHeight)
    var userName = ""
    function toggle(){
        $.getJSON("getSession",function (res) {
            if(res['flag']){
                userName = res['userName']
                if(userName[0]=="@")
                    window.location.href = 'projects-mixly'
                else
                    window.location.href = 'projects'
            }else {

            }
        });
    }
    if ('_cordovaNative' in window)
    {
        $("#android_text").attr("hidden","hidden")
    }
    toggle();
    $('#form_login').submit(function (e) {
        var modald = showmodaltext("<div style='text-align:center' class='nnt'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>"+JSLang[lang]['loading']+"</p></div>")
        e.preventDefault();
        var data=$('#form_login').serialize();
        $.getJSON('login',data,function (res) {  
            if(res==1){
                modald.close()
                toggle();
            }
            else if(res==2){
                modald.close()
                showtext(JSLang[lang]['wrongAcc'])
            }
            else
            {
                modald.close()
                window.location.href = 'verify'
            }
        })
    });
    $('#form_login_2').submit(function (e) {
        var modald = showmodaltext("<div style='text-align:center' class='nnt'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>"+JSLang[lang].loading+"</p></div>")
        e.preventDefault();
        var data=$('#form_login_2').serialize();
        if(data=="userName=")
        {
            modald.close()
            showtext(JSLang[lang].noKey)
        }
        else
            $.getJSON('keyLogin',data,function (res) {  
                if(res==1){
                    modald.close()
                    window.location.href = 'projects-mixly'
                }
                else
                    modald.close()
            })
    });
})
var guestLogin = function () {
    console.trace()
    var modald = showmodaltext("<div style='text-align:center' class='nnt'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>"+JSLang[lang].loading+"</p></div>")
    var data=$("#vfCode").val()
    if(data=="")
    {
        modald.close()
        showtext(JSLang[lang].noVfCode)
    }
    else
    {
        modald.close()
        var tmp = $("#vfCode").val()
        $("#vfCode").val('')
        window.location.href = "observe?sid="+tmp
    }
}
var currentLoginMode = 1;//1==mixio, 2==mixly
var mixioLogin = function(){
    if(currentLoginMode==1)
        doNothing()
    else
    {
        currentLoginMode = 1
        $("#switch1").removeClass("btn-light")
        $("#switch1").addClass("btn-primary")
        $("#switch2").removeClass("btn-primary")
        $("#switch2").addClass("btn-light")
        $("#switch3").removeClass("btn-primary")
        $("#switch3").addClass("btn-light")
        $("#form_login").removeAttr("hidden")
        $("#form_login_2").attr("hidden","hidden")
        $("#form_login_3").attr("hidden","hidden")
        $("#reset_text").removeAttr("hidden")
        $("#register_text").removeAttr("hidden")
        $("#cd").css("height",fullHeight)
    }
}
var mixlyLogin = function(){
    if(currentLoginMode==2)
        doNothing()
    else
    {
        currentLoginMode = 2
        $("#switch2").removeClass("btn-light")
        $("#switch2").addClass("btn-primary")
        $("#switch1").removeClass("btn-primary")
        $("#switch1").addClass("btn-light")
        $("#switch3").removeClass("btn-primary")
        $("#switch3").addClass("btn-light")
        $("#form_login_2").removeAttr("hidden")
        $("#form_login").attr("hidden","hidden")
        $("#form_login_3").attr("hidden","hidden")
        $("#reset_text").attr("hidden","hidden")
        $("#register_text").attr("hidden","hidden")
        $("#cd").css("height",halfHeight)
    }
}
var projLogin = function(){
    if(currentLoginMode==3)
        doNothing()
    else
    {
        currentLoginMode = 3
        $("#switch3").removeClass("btn-light")
        $("#switch3").addClass("btn-primary")
        $("#switch1").removeClass("btn-primary")
        $("#switch1").addClass("btn-light")
        $("#switch2").removeClass("btn-primary")
        $("#switch2").addClass("btn-light")
        $("#form_login_3").removeAttr("hidden")
        $("#form_login").attr("hidden","hidden")
        $("#form_login_2").attr("hidden","hidden")
        $("#reset_text").attr("hidden","hidden")
        $("#register_text").attr("hidden","hidden")
        $("#cd").css("height",halfHeight)
    }
}
var doNothing = function(){

}
function doPost(URL,PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.style.display = "none";
    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}