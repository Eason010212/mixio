var initTable = function(){
    $.getJSON("queryData",function(res){
        for(var i = 0;i<=res.length-1;i = i+1)
        {
            $("#tbody").append("<tr><td>"+res[i]["username"]+"</td><td>"+res[i]["projects"]+"</td><td>"+res[i]["messages"]+"</td><td>"+ "<a class='btn btn-sm btn-primary' style='cursor:pointer;' onclick=\"clearMessage('"+res[i]["username"]+"')\" >清空消息</a>&nbsp;"+ "<a class='btn btn-sm btn-success' style='cursor:pointer;' onclick=\"resetPassword('"+res[i]["username"]+"')\" >重置密码</a>&nbsp;"+"<a class='btn btn-sm btn-danger' style='cursor:pointer;' onclick=\"removeUser('"+res[i]["username"]+"')\" >删除用户</a>"+"</td></tr>")
        }
        datatable = $("#table").DataTable({
        "order": [[ 2, "desc" ]],
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
    $("#table").attr("class","table table-striped table-bordered dataTable no-footer")
    })
}
$(function(){
    initTable()
})