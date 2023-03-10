$(function(){
    if(lang=='zh')
        $("#apps_table").DataTable({
            language: {
                "sProcessing": "处理中...",
                "sLengthMenu": "每页 _MENU_ 项",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 项至 第 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 项至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            }
        });
    else if(lang=='tw')
        $("#apps_table").DataTable({
            language: {
                "sProcessing": "處理中...",
                "sLengthMenu": "每頁 _MENU_ 項",
                "sZeroRecords": "沒有匹配結果",
                "sInfo": "顯示第 _START_ 項至 第 _END_ 項結果，共 _TOTAL_ 項",
                "sInfoEmpty": "顯示第 0 項至 0 項結果，共 0 項",
                "sInfoFiltered": "(由 _MAX_ 項結果過濾)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中數據為空",
                "sLoadingRecords": "載入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首頁",
                    "sPrevious": "上頁",
                    "sNext": "下頁",
                    "sLast": "末頁"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            }
        });
    else
        $("#apps_table").DataTable();
})
var pause_share = function(shareid){
    $.get('modifyShare',{
        'shareid':shareid,
        'method':'0'
    },function(res){
        if(res==1)
        {
            window.location.href = window.location.href
        }
    })
}
var play_share = function(shareid){
    $.get('modifyShare',{
        'shareid':shareid,
        'method':'1'
    },function(res){
        if(res==1)
        {
            window.location.href = window.location.href
        }
    })
}
var delete_share = function(shareid){
    $.get('modifyShare',{
        'shareid':shareid,
        'method':'2'
    },function(res){
        if(res==1)
        {
            window.location.href = window.location.href
        }
    })
}
var view_share = function(res){
    var link = window.location.href.split('/')
    link.pop()
    link.push("observe?sid="+res)
    link = link.join('/')
    var resDiv = $("<div class='nnt' style='display:flex;flex-direction:column;align-items:center;justify-content:center'/>")
    resDiv.append($("<span style='font-size:1.2rem;'>"+JSLang[lang].aucode+"</span>"))
    resDiv.append($("<span style='margin-bottom:8px;font-size:2rem;color:#1cc88a;font-weight:bold'>"+res+"</span>"))
    resDiv.append($("<span style='font-size:1.2rem;margin-bottom:2px'>"+JSLang[lang].guestURL+"</span>"))
    resDiv.append($("<a href='"+link+"' style='margin-bottom:3px;word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;width:250px;text-align:center'>"+link+"</a>"))
    var qrCode = $("<div style='width:100px;height:100px;margin-bottom:12px'></div>")
    resDiv.append(qrCode)
    var backButton = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    backButton.click(function(){
        d.close()
    })
    resDiv.append(backButton)
    new QRCode(qrCode[0],{
        text: link,
        width: 100,
        height: 100,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.M
    })
    var d = dialog({
        content: resDiv[0],
    });
    d.showModal();
}