function get_data(){
    $.get('queryHook',function(res){
        if(res == 1)
        {
            $("#play").addClass("disabled")
        }
        else{
            $("#stop").addClass("disabled")
        }
        $.getJSON('getData',{

        },function(res){
            $("#prj_num").html(res['count']+" / "+1000)
            $("#prj_num_bar").attr("aria-valuenow",res['count'])
            $("#prj_num_bar").css("width",(res['count']*100/1000)+"%")
            init_table(res["rows"])
            sync_chart()
        })
    })
    
}
function init_table(rows){
    for (i in rows)
    {
        let row = rows[i]
        $("#mqttdata").append("<tr><td>"+row["topic"]+"</td><td>"+row["message"]+"</td><td>"+row["time"]+"</td></tr>")
    }

    
    if(lang=='zh')
        datatable = $("#apps_table").DataTable({
            "order": [[ 2, "asc" ]],
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
        datatable = $("#apps_table").DataTable({
            "order": [[ 2, "asc" ]],
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
        datatable = $("#apps_table").DataTable({
            "order": [[ 2, "asc" ]]
        });
    datatable.on("page",sync_chart)
    datatable.on("length",sync_chart)
    datatable.on("search",sync_chart)
}

var sync_chart = function(){
    var rows = datatable.rows({
        order:'current',
        page:'current',
        search:'applied'
    }).data()
    console.log(rows)
    var xis = []
    var srs = []
    for (var i = 0;i<=rows.length - 1;i = i+1)
    {
        if(xis.length==0 || xis[xis.length-1] != rows[i][2])
            xis.push(rows[i][2])
        var have = false
        for(j in srs)
        {
            if(srs[j]["name"] == rows[i][0])
                have = true
        }
        if(!have)
        {
            srs.push({
                name:rows[i][0],
                data:[],
                type:"line"
            })
        }
    }
    for(i in xis)
    {
        var time = xis[i]
        for(j in srs)
        {
            var name = srs[j]["name"]
            var have = false
            for(var k = 0;k<=rows.length - 1;k = k+1)
            {
                if(rows[k][0] == name && rows[k][2] == time)
                {
                    srs[j]["data"].push(rows[k][1])
                    have = true
                    break
                }   
            }
            if(!have)
                srs[j]["data"].push(NaN)
        }
    }
    option = {
        tooltip: {
            trigger: 'axis'
          },
        xAxis: {
          type: 'category',
          data: xis
        },
        yAxis: {
          type: 'value'
        },
        series: srs
      };
      
      option && myChart.setOption(option, true);
}
$(function(){
    var chartDom = document.getElementById('chart');
    myChart = echarts.init(chartDom);
    option = {
        tooltip: {
            trigger: 'axis'
          },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            
          }
        ]
      };
      
      option && myChart.setOption(option);
      
    get_data()
})

var play = function(){
    var modald = showmodaltext("<div style='text-align:center'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>"+JSLang[lang].loading+"</p></div>")
    $.get('startHook',function(res){
        modald.close()
        if(res == 1)
            refresh()
        else
            showtext("unknown error")
    })
}

var stop = function(){
    var modald = showmodaltext("<div style='text-align:center'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>"+JSLang[lang].loading+"</p></div>")
    $.get('stopHook',function(res){
        modald.close()
        if(res == 1)
            refresh()
        else
            showtext("unknown error")
    })
}

var refresh = function(){
    window.location.href = window.location.href
}

var output = function(){
    var jsonData = datatable.data()
    let str = `topic,message,time\n`;
      for(let i = 0 ; i < jsonData.length ; i++ ){
        for(let item in jsonData[i]){
            str+=`${jsonData[i][item] + '\t'},`;     
        }
        str+='\n';
      }
      let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      let link = document.createElement("a");
      link.href = uri;
      link.download =  "data.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
}

var clearAll = function(){
    console.log(111)
    var modald = showmodaltext("<div style='text-align:center'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>"+JSLang[lang].loading+"</p></div>")
    $.get('clearHook',function(res){
        modald.close()
        if(res == 1)
            refresh()
        else
            showtext("unknown error")
    })
}