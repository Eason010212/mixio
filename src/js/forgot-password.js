var send_reset_email = function(){
    target = $("#exampleInputEmail").val()
    if(target=="")
        showtext(JSLang[lang].emailEmpty)
    else
    {
        $("#send_button").html(JSLang[lang].querying)
        $.getJSON('resetQuestion',{'target':target},function(result){
            if(result.code==1)
            {
                $("#send_button").html(JSLang[lang].queryS)
                $("#question").html(result.question)
                $("#new_label").removeAttr("hidden")
                $("#new_form").removeAttr("hidden")
            }
            else if(result.code==999){
                $("#send_button").html(JSLang[lang].queryN)
            }
            else{
                console.log(result.code)
                $("#send_button").html(JSLang[lang].queryF)
            }
        }
        )
    }
    
}
var reset_password = function(){
    var vfcode = $("#verify_code").val()
    var pass = $("#new_pass").val()
    var pass_confirm = $("#new_pass_confirm").val()
    if(vfcode=="")
    {
        showtext(JSLang[lang].answerEmpty)
    }
    else if(pass=="")
    {
        showtext(JSLang[lang].passEmpty)
    }
    else if(pass!=pass_confirm)
    {
        showtext(JSLang[lang].diffRepeat)
    }
    else
    {
        $.get('reset',{'target':target, 'vfcode':vfcode, 'pass':pass},function(res){
            if(res==1)
            {
                showtext(JSLang[lang].resetSuccess)
                window.location.href = 'logout'
            }
            else if(res==2){
                showtext(JSLang[lang].wrongAns)
            }
        })
    }
}