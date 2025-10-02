

function get_data() {
    $.get('queryHook', function(res) {
        if (res == 1) {
            $("#play").remove()
        } else {
            $("#stop").remove()
        }
        $.getJSON('getData', {
    
        }, function(res) {
            var max = res["max"]
            $("#prj_num").html(res['count'] + " / " + max)
            $("#prj_num_bar").attr("aria-valuenow", res['count'])
            $("#prj_num_bar").attr("aria-valuemax", max)
            $("#prj_num_bar").css("width", (res['count'] * 100 / max) + "%")
            
            // 筛选数据：topic不以$开头的存入globalRows，以$开头的存入globalRows2并去掉$
            globalRows = res["rows"]
            
            init_table(globalRows)  // 初始化表格使用非$开头的数据
            sync_chart()
        })
    })

}
var datatable = undefined
$(function() {
    datePicker = $("#timeFilter").flatpickr({
        "mode": "range"
    })
})

function init_table(rows) {
    console.log(rows)
    if (datatable) {
        datatable.destroy()
        datatable.clear()
    }
    $("#mqttdata").empty()
    for (i in rows) {
        let row = rows[i]
        row["time"] = new Date(new Date(row["time"]).getTime() + 480 * 60000).toLocaleString()
        $("#mqttdata").append("<tr><td>" + row["topic"] + "</td><td>" + row["message"] + "</td><td>" + row["time"] + "</td></tr>")
    }


    if (lang == 'zh')
        datatable = $("#apps_table").DataTable({
            "order": [
                [2, "asc"]
            ],
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
            },
            dom: 'lBrtip'
        });
    else if (lang == 'tw')
        datatable = $("#apps_table").DataTable({
            "order": [
                [2, "asc"]
            ],
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
            },
            dom: 'lBrtip'
        });
    else
        datatable = $("#apps_table").DataTable({
            "order": [
                [2, "asc"]
            ],
            dom: 'lBrtip'
        });
    datatable.on("page", sync_chart)
    datatable.on("length", sync_chart)
    datatable.on("search", sync_chart)
}

var filter = function() {
    var newRows = []
    var selectedDates = datePicker.selectedDates
    var compareTime = function(time1, time2) {
        if (time1[0] > time2[0])
            return 1
        else if (time1[0] == time2[0]) {
            if (time1[1] > time2[1])
                return 1
            else if (time1[1] == time2[1]) {
                if (time1[2] > time2[2])
                    return 1
                else if (time1[2] == time2[2])
                    return 0
                else
                    return -1
            } else
                return -1
        } else
            return -1
    }
    var startTime = []
    var endTime = []
    if (selectedDates.length > 0) {
        startTime = [selectedDates[0].getFullYear(), selectedDates[0].getMonth() + 1, selectedDates[0].getDate()]
        endTime = [selectedDates[1].getFullYear(), selectedDates[1].getMonth() + 1, selectedDates[1].getDate()]
    }
    for (i in globalRows) {
        let row = globalRows[i]
        if (row["topic"].indexOf($("#topicFilter").val()) != -1) {
            var curTime = [parseInt(row["time"].substr(0, 4)), parseInt(row["time"].substr(5, 2)), parseInt(row["time"].substr(8, 2))]
            if (selectedDates.length == 0 || (compareTime(curTime, startTime) >= 0 && compareTime(endTime, curTime) >= 0))
                newRows.push(row)
        }

    }
    init_table(newRows)
    sync_chart()
}

var undo = function() {
    init_table(globalRows)
    sync_chart()
    $("#topicFilter").val("")
    datePicker.clear()
}

var sync_chart = function() {
    var rows = datatable.rows({
        order: 'current',
        page: 'current',
        search: 'applied'
    }).data()
    var xis = []
    var srs = []
    for (var i = 0; i <= rows.length - 1; i = i + 1) {
        if (xis.length == 0 || xis[xis.length - 1] != rows[i][2])
            xis.push(rows[i][2])
        var have = false
        for (j in srs) {
            if (srs[j]["name"] == rows[i][0])
                have = true
        }
        if (!have) {
            srs.push({
                name: rows[i][0],
                data: [],
                type: "line"
            })
        }
    }
    for (i in xis) {
        var time = xis[i]
        for (j in srs) {
            var name = srs[j]["name"]
            var have = false
            for (var k = 0; k <= rows.length - 1; k = k + 1) {
                if (rows[k][0] == name && rows[k][2] == time) {
                    srs[j]["data"].push(rows[k][1])
                    have = true
                    break
                }
            }
            if (!have)
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
$(function() {
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
        series: [{

        }]
    };

    option && myChart.setOption(option);

    get_data()
})

var play = function() {
    var modald = showmodaltext("<div style='text-align:center'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
    $.get('startHook', function(res) {
        modald.close()
        if (res == 1)
            refresh()
        else
            showtext("unknown error")
    })
}

var stop = function() {
    var modald = showmodaltext("<div style='text-align:center'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
    $.get('stopHook', function(res) {
        modald.close()
        if (res == 1)
            refresh()
        else
            showtext("unknown error")
    })
}

var refresh = function() {
    window.location.href = window.location.href
}

var output = function() {
    var jsonData = datatable.data()
    let str = `topic,message,time\n`;
    for (let i = 0; i < jsonData.length; i++) {
        for (let item in jsonData[i]) {
            str += `${jsonData[i][item] + '\t'},`;
        }
        str += '\n';
    }
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    let link = document.createElement("a");
    link.href = uri;
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

var clearAll = function() {
    var modald = showmodaltext("<div style='text-align:center'><i class='fa fa-spin fa-cog' style='font-size:2rem;color:#4e73df'></i><p style='margin-top:6px;margin-bottom:0;color:#4e73df;font-size:1rem;font-weight:bold'>" + JSLang[lang].loading + "</p></div>")
    var condition = "topic like '%" + $("#topicFilter").val() + "%'"
    var selectedDates = datePicker.selectedDates
    if (selectedDates.length > 0) {
        var startStr = ""
        var startTime = [selectedDates[0].getFullYear(), selectedDates[0].getMonth() + 1, selectedDates[0].getDate()]
        startStr = startStr + startTime[0] + "-"
        if (startTime[1] >= 10)
            startStr = startStr + startTime[1] + "-"
        else
            startStr = startStr + "0" + startTime[1] + "-"
        if (startTime[2] >= 10)
            startStr = startStr + startTime[2] + " 00:00:00"
        else
            startStr = startStr + "0" + startTime[2] + " 00:00:00"
        var endStr = ""
        var endTime = [selectedDates[1].getFullYear(), selectedDates[1].getMonth() + 1, selectedDates[1].getDate()]
        endStr = endStr + endTime[0] + "-"
        if (endTime[1] >= 10)
            endStr = endStr + endTime[1] + "-"
        else
            endStr = endStr + "0" + endTime[1] + "-"
        if (endTime[2] >= 10)
            endStr = endStr + endTime[2] + " 23:59:59"
        else
            endStr = endStr + "0" + endTime[2] + " 23:59:59"
        condition = condition + " and time>='" + startStr + "' and time<='" + endStr + "'"
    }
    $.get('clearHook', {
        "condition": condition
    }, function(res) {
        modald.close()
        if (res == 1)
            refresh()
        else
            showtext("unknown error")
    })
}