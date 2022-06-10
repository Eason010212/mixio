$(function(){
    var userName = ""
    function toggle(){
        $.getJSON("getSession",function (res) {
            if(res['flag']){
                userName = res['userName']
                window.location.href = "projects"
            }else {

            }
        });
    }
    toggle();
    $('#form_register').submit(function (e) {
        e.preventDefault();
        var data=$('#form_register').serialize();
        if($("#exampleInputPassword").val()!=$("#exampleRepeatPassword").val()){
            showtext(JSLang[lang].diffRepeat)
        }
        else{
            if($("#exampleInputEmail").val()=="")
                showtext(JSLang[lang].userEmpty)
            else if($("#exampleInputPassword").val()=="")
                showtext(JSLang[lang].passEmpty)
            else
                $.get('registerAccount',data,function (res) {
                    if(res==1){
                        window.location.href = 'verify'
                    }
                    else{
                        showtext(JSLang[lang].userExist)
                    }
                })
        }
    });
})
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
