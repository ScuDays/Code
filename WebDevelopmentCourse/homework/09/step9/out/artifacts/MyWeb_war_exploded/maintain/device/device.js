var module = "device";
var sub = "file";

// document.domain="localhost";
/*================================================================================*/
jQuery(document).ready(function () {
    Metronic.init(); // init metronic core components
    Layout.init(); // init current layout
    QuickSidebar.init(); // init quick sidebar
    Demo.init(); // init demo features
    Page.init();
});
/* ================================================================================ */
//关于页面的控件生成等操作都放在Page里
var Page = function () {
    /*----------------------------------------入口函数  开始----------------------------------------*/
    var initPageControl = function () {
        pageId = $("#page_id").val();
        if (pageId == "device_list") {
            initDeviceList();
        }
        if (pageId == "device_add") {
            initDeviceAdd();
        }
        if (pageId == "device_modify") {
            initDeviceModify();
        }
        if (pageId == "device_file") {
            initDeviceFile();
        }
        if (pageId == "device_view") {
            initDeviceView();
        }
        if (pageId == "device_print") {
            initDevicePrint();
        }
        if (pageId == "device_statistics") {
            initDeviceStatistics();
        }
    };
    /*----------------------------------------入口函数  结束----------------------------------------*/
    var columnsData = undefined;
    var recordResult = undefined;
    var chartData = [{
            "year": 2009,
            "income": 23.5,
            "expenses": 18.1
        }, {
            "year": 2010,
            "income": 26.2,
            "expenses": 22.8
        }, {
            "year": 2011,
            "income": 30.1,
            "expenses": 23.9
        }, {
            "year": 2012,
            "income": 29.5,
            "expenses": 25.1
        }, {
            "year": 2013,
            "income": 30.6,
            "expenses": 27.2,
        }, {
            "year": 2014,
            "income": 34.1,
            "expenses": 29.9,
        }, {
        "year": 123,
        "income": 53,
        "expenses": 29.9,
    }, {
        "year": 234,
        "income": 345,
        "expenses": 29.9,
    }, {
        "year": 345,
        "income": 34.1,
        "expenses": 29.9,
    }, {
        "year": 567,
        "income": 34.1,
        "expenses": 29.9,
    }];
    /*----------------------------------------业务函数  开始----------------------------------------*/
    /*------------------------------针对各个页面的入口  开始------------------------------*/
    var initDeviceList = function () {
        initDeviceListControlEvent();
        initDeviceRecordList();
    }
    var initDeviceAdd = function () {
        initDeviceAddControlEvent();
    }
    var initDeviceModify = function () {
        initDeviceModifyControlEvent();
        initDeviceRecordView();
    }
    var initDeviceFile = function () {
        console.log("[initDeviceFile]");
        initDeviceFileControlEvent();
        initDeviceFileView();
    }
    var initDeviceView=function () {
        initDeviceViewControlEvent();
        initDeviceRecordView();
    }

    var initDevicePrint=function () {
        initDevicePrintControlEvent();
        initDeviceRecordPrint();
    }

    var initDeviceStatistics=function () {
        $.ajaxSettings.async = false;
        initDeviceStatisticsRecord();
        $.ajaxSettings.async = true;
        initBarChart();
    }
    /*------------------------------针对各个页面的入口 结束------------------------------*/
    var getUrlParam = function (name) {
        //获取url中的参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值，如果是中文传递，就用decodeURI解决乱码，否则用unescape
    }
    var initDeviceListControlEvent = function () {
        $("#help_button").click(function () {
            help();
        });
        $('#add_button').click(function () {
            onAddRecord();
        });
        $('#datatable_button').click(function () {
            onDatatableTab();
        });
        $('#table_button').click(function () {
            onTableTab();
        });
        $('#bar_button').click(function () {
            onBarTab();
        });
        $('#record_modify_div #submit_button').click(function () {
            onModifyDivSubmit();
        });
        $('#record_add_div #submit_button').click(function () {
            onAddDivSubmit();
        });

        $('#query_button').click(function () {
            onQueryRecord();
        });
        $('#export_button').click(function () {
            onExportRecord();
        });
        $('#print_button').click(function () {
            onPrintRecord();
        });
        $('#statistics_button').click(function () {
            onStatisticsRecord();
        });
    }

    var initDeviceAddControlEvent = function () {
        $("#help_button").click(function () {
            help();
        });
        $('#add_button').click(function () {
            submitAddRecord();
        });
    }
    var initDeviceModifyControlEvent = function () {
        $("#help_button").click(function () {
            help();
        });
        $('#modify_button').click(function () {
            submitModifyRecord();
        });
    }
    var initDeviceViewControlEvent = function () {
        $("#help_button").click(function () {
            help();
        });
        $('#return_button').click(function () {
            returnBack();
        });
    }

    var initDevicePrintControlEvent = function () {
        $("#help_button").click(function () {
            help();
        });
        $('#return_button').click(function () {
            returnBack();
        });
    }
    var initDeviceRecordView = function () {
        var id = getUrlParam("id");
        var data = {};
        data.action = "get_device_record";
        data.id = id;
        $.post("../../" + module + "_" + sub + "_servlet_action", data, function (json) {
            console.log(JSON.stringify(json));
            if (json.result_code == 0) {
                var list = json.aaData;
                if (list != undefined && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var record = list[i];
                        $("#device_id").val(record.device_id);
                        $("#device_name").val(record.device_name);
                    }
                }
            }
        })
    }
     var initDeviceRecordPrint = function () {
         var data={};
         data.id=$("#record_query_setup #id").val();
         data.device_id=$("#record_query_setup #device_id").val();
         data.device_name=$("#record_query_setup #device_name").val();
         $.post("../../" + module + "_" + sub + "_servlet_action?action=get_device_record", data,function (json) {
             console.log(JSON.stringify(json));
             if (json.result_code == 0) {
                 var list = json.aaData;
                 var html = "";
                 if (list != undefined && list.length > 0) {
                     for (var i = 0; i < list.length; i++) {
                         var record = list[i];
                         html = html + "              <tr class=\"active\">";
                         html = html + "             <td>";
                         html = html + "              " + i;
                         html = html + "             </td>";
                         html = html + "             <td>";
                         html = html + "              " + record.device_id;
                         html = html + "             </td>";
                         html = html + "             <td>";
                         html = html + "              " + record.device_name;
                         html = html + "             </td>";
                         html = html + "             <td>";
                         html = html + "             <a href=\"javascript:Page.onModifyRecord(" + record.id + ")\">【修改记录】</a><a href=\"javascript:Page.onDeleteRecord(" + record.id + ")\">【删除记录】</a>";
                         html = html + "             </td>";
                         html = html + "              </tr>";
                     }
                 }
                 $("#record_print_div").html(html);
             }
         })

     }
     var initDeviceStatisticsRecord=function () {
         var data={};
         data.id=$("#record_query_setup #id").val();
         data.device_id=$("#record_query_setup #device_id").val();
         data.device_name=$("#record_query_setup #device_name").val();
         $.post("../../" + module + "_" + sub + "_servlet_action?action=get_device_record", data,function (json){

         // var url = "../../device_file_servlet_action";
         // var data = {"action":"get_gps_receive_count_by_hour"};
         // $.post(url, data, function(json){
             var html="";
             if(json.result_code==0){
                 console.log(JSON.stringify(json));
                 var list=json.aaData;
                 if(list!=undefined && list.length>0){
                    // changeResultDataToChartData(list, chartData);
                     console.log(JSON.stringify(chartData));
                 }
             } else {
                 alert("[initDeviceStatisticRecord]与后端交互错误！" + json.result_msg);
             }
         });

     }

     var changeResultDataToChartData = function(list, chartData) {
        for(var i=0; i < list.length; i++){
            list[i].id = i;
            var json={"year":list[i].id,"income":list[i].id+1,"expenses":list[i].id+5};
            chartData.push(json);
        }

     }
     var  initBarChart= function () {
         var chart = AmCharts.makeChart("chart_1", {
             "type": "serial",
             "theme": "light",
             "pathToImages": Metronic.getGlobalPluginsPath() + "amcharts/amcharts/images/",
             "autoMargins": false,
             "marginLeft": 30,
             "marginRight": 8,
             "marginTop": 10,
             "marginBottom": 26,

             "fontFamily": 'Open Sans',
             "color":    '#888',

             "dataProvider": [{
                 "year": 2009,
                 "income": 23.5,
                 "expenses": 18.1
             }, {
                 "year": 2010,
                 "income": 26.2,
                 "expenses": 22.8
             }, {
                 "year": 2011,
                 "income": 30.1,
                 "expenses": 23.9
             }, {
                 "year": 2012,
                 "income": 29.5,
                 "expenses": 25.1
             }, {
                 "year": 2013,
                 "income": 30.6,
                 "expenses": 27.2,
                 "dashLengthLine": 5
             }, {
                 "year": 2014,
                 "income": 34.1,
                 "expenses": 29.9,
                 "dashLengthColumn": 5,
                 "alpha": 0.2,
                 "additional": "(projection)"
             },{
                 "year": 123,
                 "income": 53,
                 "expenses": 29.9,
             }, {
                 "year": 234,
                 "income": 345,
                 "expenses": 29.9,
             }, {
                 "year": 345,
                 "income": 34.1,
                 "expenses": 29.9,
             }, {
                 "year": 567,
                 "income": 34.1,
                 "expenses": 29.9,
             }],
             "valueAxes": [{
                 "axisAlpha": 0,
                 "position": "left"
             }],
             "startDuration": 1,
             "graphs": [{
                 "alphaField": "alpha",
                 "balloonText": "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>",
                 "dashLengthField": "dashLengthColumn",
                 "fillAlphas": 1,
                 "title": "Income",
                 "type": "column",
                 "valueField": "income"
             }, {
                 "balloonText": "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>",
                 "bullet": "round",
                 "dashLengthField": "dashLengthLine",
                 "lineThickness": 3,
                 "bulletSize": 7,
                 "bulletBorderAlpha": 1,
                 "bulletColor": "#FFFFFF",
                 "useLineColorForBulletBorder": true,
                 "bulletBorderThickness": 3,
                 "fillAlphas": 0,
                 "lineAlpha": 1,
                 "title": "Expenses",
                 "valueField": "expenses"
             }],
             "categoryField": "year",
             "categoryAxis": {
                 "gridPosition": "start",
                 "axisAlpha": 0,
                 "tickLength": 0
             }
         });

         $('#chart_1').closest('.portlet').find('.fullscreen').click(function() {
             chart.invalidateSize();
         });
     }


    var onAddRecord = function () {
        //window.location.href = "device_add.jsp";
        // window.location.href = "device_modify.jsp?id=" + id;
        $("#record_add_div").modal("show");


    }
    var submitAddRecord = function () {
        var url = "../../device_file_servlet_action";
        var data = {};
        data.action = "add_device_record";
        data.device_id = $("#device_id").val();
        data.device_name = $("#device_name").val();
        data.device_type = $("#device_type").val();
        $.post(url, data, function (json) {
            if (json.result_code == 0) {
                alert("已经完成设备添加。");
                window.location.href = "frame_style.jsp";
            }
        });
    }



    var initDeviceRecordList = function () {
        getDeviceRecordList();
        getDeviceRecordDataTable();
        getDeviceRecordBar();
    }
    var initDeviceMobileRecord = function () {
        getDeviceMobileRecord();
    }
    var getDeviceRecordList = function () {
        var data={};
        data.id=$("#record_query_setup #id").val();
        data.device_id=$("#record_query_setup #device_id").val();
        data.device_name=$("#record_query_setup #device_name").val();
        $.post("../../" + module + "_" + sub + "_servlet_action?action=get_device_record", data,function (json) {
            console.log(JSON.stringify(json));
            if (json.result_code == 0) {
                var list = json.aaData;
                var html = "";
                if (list != undefined && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var record = list[i];
                        html = html + "              <tr class=\"active\">";
                        html = html + "             <td>";
                        html = html + "              " + i;
                        html = html + "             </td>";
                        html = html + "             <td>";
                        html = html + "              " + record.device_id;
                        html = html + "             </td>";
                        html = html + "             <td>";
                        html = html + "              " + record.device_name;
                        html = html + "             </td>";
                        html = html + "             <td>";
                        html = html + "             <a href=\"javascript:Page.onModifyRecord(" + record.id + ")\">【修改记录】</a><a href=\"javascript:Page.onDeleteRecord(" + record.id + ")\">【删除记录】</a>";
                        html = html + "             </td>";
                        html = html + "              </tr>";
                    }
                }
                $("#record_table_content_div").html(html);
            }
        })


    }
    var onDeleteRecord = function (id) {
        if (confirm("您确定要删除这条记录吗？")) {
            if (id > -1) {
                var url = "../../device_file_servlet_action";
                var data = {};
                data.action = "delete_device_record";
                data.id = id;
                $.post(url, data, function (json) {
                    if (json.result_code == 0) {
                        window.location.reload();
                    }
                })
            }
        }
    };
    var onModifyRecord = function (id) {
        // window.location.href = "device_modify.jsp?id=" + id;
        for(var i=0; i < resultList.length; i++){
            if(id==resultList[i].id) {
                $("#record_modify_div #id").val(resultList[i].id);
                $("#record_modify_div #device_id").val(resultList[i].device_id);
                $("#record_modify_div #device_name").val(resultList[i].device_name);
                $("#record_modify_div").modal("show");
            }
        }
    }
    var initDeviceFileControlEvent = function (id) {
        $('#jump_div #upload_button').click(function () {
            onJumpUploadFile();
        });
        $('#ajax_div #upload_button').click(function () {
            onAjaxUploadFile();
        });
        console.log("[initDeviceFileControlEvent]");
    }
    var initDeviceFileView = function (id) {
        console.log("[initDeviceFileView]");
        getDeviceFile();
    }
    var getDeviceFile = function () {

    }
    var onJumpUploadFile = function () {
        console.log("[onJumpUploadFile]====");
        var deviceId = $("#device_id").val();
        var deviceName = $("#device_name").val();
        jump_form.action = "../../device_file_servlet_action?action=upload_file&device_id=" + deviceId + "&device_name=" + deviceName;
        //jump_form.action="http://192.168.3.111:8888?action=upload_file&device_id="+deviceId+"&device_name="+deviceName;			/*设置提交到TCP工具来接收，TCP工具设置好监听端口例如8888和接收自动存入文件*/
        jump_form.submit();
    }
    //如果出现“No resource with given identifier found”，注意：在谷歌浏览器调试界面找到Network界面导航栏中找到Preserve log，把勾去掉就好了。
    //https://blog.csdn.net/m0_46296300/article/details/126130250
    //发送ajax请求后页面自动刷新的问题
    //https://blog.csdn.net/GCTTTTTT/article/details/123824126
    var onAjaxUploadFile = function () {
        console.log("[onAjaxUploadFile]====");
        var deviceId = $("#device_id").val();
        var deviceName = $("#device_name").val();
        var options = {
            type: 'post', /*设置表单以post方法提交*/
            url: '../../device_file_servlet_action?action=upload_file&device_id=' + deviceId + "&device_name=" + deviceName, /*设置post提交到的页面*/
            success: function (json) {
                console.log("[onAjaxUploadFile]上传文件返回结果=" + JSON.stringify(json));
                if (json.upload_files.length > 0) {
                    var files = json.upload_files;
                    var fileUrl = files[0].file_url_name;
                    var objectId = files[0].file_object_id;
                    $("#current_attachment_name").html("您当前上传的附件第一个是：<span style='color:blue;'><a href='javascript:window.open(\"" + fileUrl + "\")'>" + fileUrl + "</a></span>");
                    $("#current_attachment_object_id").val(objectId);
                    console.log("[onAjaxUploadFile]fileUrl=" + fileUrl);
                    console.log("[onAjaxUploadFile]objectId=" + objectId);
                } else {
                    alert("[onAjaxUploadFile]没有上传文件结果返回！");
                }
            },
            error: function (error) {
                alert(error);
            },
            dataType: "json" /*设置返回值类型为文本*/
        };
        $("#ajax_form").ajaxSubmit(options);
    }
    //Page return 开始





    $('#datatable_button').click(function () {
        onDatatableTab();
    });
    $('#table_button').click(function () {
        onTableTab();
    });
    $('#bar_button').click(function () {
        onBarTab();
    });
    var onDatatableTab = function () {
        $("#datatable_tab").show();
        $("#table_tab").hide();
        $("#bar_tab").hide();

    };
    var onTableTab = function () {
        $("#datatable_tab").hide();
        $("#table_tab").show();
        $("#bar_tab").hide();

    };
    var onBarTab = function () {
        $("#datatable_tab").hide();
        $("#table_tab").hide();
        $("#bar_tab").show();
    };
    var getDeviceRecordBar=function () {
        var data={};
        data.id=$("#record_query_setup #id").val();
        data.device_id=$("#record_query_setup #device_id").val();
        data.device_name=$("#record_query_setup #device_name").val();
        $.post("../../" + module + "_" + sub + "_servlet_action?action=get_device_record", data,function (json) {
            console.log(JSON.stringify(json));
            if (json.result_code == 0) {
                var list = json.aaData;
                var html = "";
                if (list != undefined && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var record = list[i];
                        html = html + "<div class=\"media\">";
                        html = html + "    <a href=\"javascript:;\" class=\"pull-left\">";
                        html = html + "        <img alt=\"\" src=\"../../assets/admin/pages/media/blog/5.jpg\" class=\"media-object\" style=\"width:50px;height: 50px;border-radius: 50% !important;\">";
                        html = html + "    </a>";
                        html = html + "    <div class=\"media-body\">";
                        html = html + "        <h4 class=\"media-heading\">"+record.device_id+  "<span>";
                        html = html + "            "+ record.create_time+ "/ <a href=\"javascript:;\">";
                        html = html + "            Reply </a>";
                        html = html + "            </span>";
                        html = html + "        </h4>";
                        html = html + "        <p>";
                        html = html + "            设备名称:" + record.device_name;
                        html = html + "        </p>";
                        html = html + "    </div>";
                        html = html + "</div>";
                        html = html + "<hr>";

                    }
                }
                $("#record_bar_div").html(html);
            }
        })

    };

    var onModifyDivSubmit = function (id) {
        $("#record_modify_div").modal("hide");
        submitModifyRecordDiv();
    };
    var  onAddDivSubmit = function () {
        $("#record_modify_div").modal("hide");
        submitAddRecordDiv();
    }
    var submitAddRecordDiv = function () {
        var url = "../../device_file_servlet_action";
        var data = {};
        data.action = "add_device_record";
        data.device_id = $("#device_id").val();
        data.device_name = $("#device_name").val();
        data.device_type = $("#device_type").val();
        $.post(url, data, function (json) {
            if (json.result_code == 0) {
                alert("已经完成设备添加。");
                window.location.reload();
            }
        });
    }
    var submitModifyRecordDiv = function () {
        if (confirm("您确定要修改该记录吗？")) {

            var url = "../../device_file_servlet_action";
            var data = {};
            data.action = "modify_device_record";
            data.id = $("#record_modify_div #id").val();
            data.device_id = $("#record_modify_div #device_id").val();
            data.device_name = $("#record_modify_div #device_name").val();
            $.post(url, data, function (json) {
                if (json.result_code == 0) {
                    alert("已经完成设备修改。");
                    window.location.reload();
                }
            });
        }
    }
    var resultList=[];
    var getDeviceRecordDataTable = function () {
        resultList=[];
        $('.datatable').dataTable({
            "paging": true,
            "searching": false,
            "oLanguage": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "sProcessing": "处理中...",
                "sLengthMenu": "_MENU_ 记录/页",
                "sZeroRecords": "没有匹配的记录",
                "sInfo": "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项记录，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项记录过滤)",
                "sInfoPostFix": "",
                "sSearch": "过滤:",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                }
            },
            "aoColumns": [{
                "mRender": function (data, type, full) {
                    sReturn = '<input type="checkbox" class="checkboxes" value="' + data + full.id + '"/>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.device_id + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.device_name + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.device_sub_type + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.device_create_time + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    resultList.push(full);
                    sReturn = '<div><a href="javascript:Page.onModifyRecord(' + full.id + ')">【修改记录】</a><a href="javascript:Page.onDeleteRecord(' + full.id + ')">【删除记录】</a> </a><a href="javascript:Page.onViewRecord(' + full.id + ')">【查看记录】</a></div>';
                    return sReturn;
                }, "orderable": false
            }],
            "aLengthMenu": [[5, 10, 15, 20, 25, 40, 50, -1], [5, 10, 15, 20, 25, 40, 50, "所有记录"]],
            "fnDrawCallback": function () {
                $(".checkboxes").uniform();
                $(".group-checkable").uniform();
            },
            //"sAjaxSource": "get_record.jsp"
            //"data":data.aaData,			//这个用来显示不从后台交互获取数据的情况下，显示当前页面已经有的json数据
            "sAjaxSource": "../../" + module + "_" + sub + "_servlet_action?action=get_device_record"
        });
        $('.datatable').find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).attr("checked", true);
                    $(this).parents('tr').addClass("active");
                } else {
                    $(this).attr("checked", false);
                    $(this).parents('tr').removeClass("active");
                }
            });
            jQuery.uniform.update(set);
        });
        $('.datatable').on('change', 'tbody tr .checkboxes', function () {
            $(this).parents('tr').toggleClass("active");
        });
    }
    var onViewRecord = function (id) {
        window.location.href="device_view.jsp?id="+id;
    }
    var returnBack=function () {
        history.go(-1);
    }
    var onQueryRecord=function () {
        initDeviceRecordList();
    }
    var onExportRecord=function () {
        var url="../../device_file_servlet_action";
        var data = {"action":"export_device_record"};
        $.post(url,data,function (json) {
            if(json.result_code==0){
                console.log(JSON.stringify(json));
                $("#record_download_div #download_url" ).attr("href",json.download_url);
                $("#record_download_div" ).modal("show");
            }
            else{
                alert("[onExportRecord]与后端交互错误！ "+json.result_msg);
            }

        })
    }
    var onPrintRecord=function (id) {
        window.location.href="device_print.jsp?id="+id;
    }

    var onStatisticsRecord=function (id) {
        window.location.href="device_statistics.jsp";
    }

    return {
        init: function () {
            initPageControl();
        },
        onDeleteRecord: function (id) {
            onDeleteRecord(id);
        },
        onModifyRecord: function (id) {
            onModifyRecord(id);
        },
        onViewRecord: function (id) {
            onViewRecord(id);
        }
    }
}();//Page
/*================================================================================*/
