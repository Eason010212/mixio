$(function(){
    if(lang=='zh')
        $("#apps_table").DataTable({
            order: [[ 1, "desc" ]],
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
            order: [[ 1, "desc" ]],
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
    else
        $("#apps_table").DataTable({
            order: [[ 1, "desc" ]]
        });
})
var delete_data = function(prjid,msgcount){
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/modify.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">'+JSLang[lang].clearData+'</h5>'))
    editForm.append($('<p style="text-align:center;width:250px;margin-top:20px;margin-bottom:15px">'+JSLang[lang].confirmClear+'\''+prjid+'\''+JSLang[lang].prjs+''+msgcount+''+JSLang[lang].clearAsk+'</p>'))
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
    confirmEdit.click(function(){
        $.get('removeReserve',{'projectName':prjid},function(res){
            d.close()
            showtext(JSLang[lang].clearS)
            window.location.href = window.location.href
        })
    })
    bottomDiv.append(confirmEdit)
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b;"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function(){
        d.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var d = dialog({
        content:editForm[0]
    })
    d.showModal()
}
var view_project = function(prjid){
    window.location.href = 'projects?prjid='+prjid
}