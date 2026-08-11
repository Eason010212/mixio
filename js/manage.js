var initTable = function(){
    $.getJSON("queryData",function(res){
        for(var i = 0;i<=res.length-1;i = i+1)
        {
            $("#tbody").append("<tr><td>"+res[i]["username"]+"</td><td>"+res[i]["projects"]+"</td><td>"+res[i]["messages"]+"</td><td>"+ "<a class='btn btn-sm btn-primary' style='cursor:pointer;' onclick=\"clearMessage('"+res[i]["username"]+"')\" >" + i18n('clearMessages') + "</a>&nbsp;"+ "<a class='btn btn-sm btn-success' style='cursor:pointer;' onclick=\"resetPassword('"+res[i]["username"]+"')\" >" + i18n('resetPassword') + "</a>&nbsp;"+"<a class='btn btn-sm btn-danger' style='cursor:pointer;' onclick=\"removeUser('"+res[i]["username"]+"')\" >" + i18n('deleteUser') + "</a>"+"</td></tr>")
        }
        datatable = $("#table").DataTable({
        "order": [[ 2, "desc" ]],
        language: getDataTableLanguage()
    });
    $("#table").attr("class","table table-striped table-bordered dataTable no-footer")
    })
}
$(function(){
    initTable()
})
