$(function(){
    if(lang=="zh")
        questions = [
            "您的出生地是？",
            "您的姓名是？",
            "您父亲的姓名是？",
            "您就读的中学是？",
            "您母亲的姓名是？",
            "您的出生年份是？",
            "您小学班主任的名字是？"
        ]
    else if(lang=="tw")
    {
        questions = [
            "您的出生地是？",
            "您的姓名是？",
            "您父親的姓名是？",
            "您就讀的中學是？",
            "您母親的姓名是？",
            "您的出生年份是？",
            "您小學班主任的名字是？"
        ]
    }
    else
    {
        questions = [
            "Where were you born?",
            "What is your name?",
            "What is your father's name?",
            "What is your middle school?",
            "What is your mother's name?",
            "What is your year of birth?",
            "What is your primary school head teacher's name?"
        ]
    }
    qindex = Math.floor(Math.random() * questions.length + 1)-1;
    $("#question").html(questions[qindex])
})


var changeQuestion = function(){
    var prevQ = questions[qindex]
    qindex = Math.floor(Math.random() * questions.length + 1)-1;
    var newQ = questions[qindex]
    while(prevQ==newQ)
    {
        qindex = Math.floor(Math.random() * questions.length + 1)-1;
        newQ = questions[qindex]
    }
    $("#question").html(newQ)
    return false;
}
var confirmSet = function(){
    $("#send_button").html(JSLang[lang].settingP)
    $.getJSON('setProtect',{
        'question':questions[qindex],
        'answer':$("#answer").val()
    },function(res){
        console.log(res)
        if(res==1)
        {
            $("#send_button").html(JSLang[lang].settingS)
            window.location.href = 'logout'
        }
        else{
            $("#send_button").html(JSLang[lang].settingF)
        }
    }) 
}