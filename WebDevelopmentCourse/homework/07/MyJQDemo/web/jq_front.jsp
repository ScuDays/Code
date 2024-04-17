<%@page contentType="text/html; charset=UTF-8"%>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="dataTables.bootstrap.css" />
<link rel="stylesheet" type="text/css" href="bootstrap.min.css"/>
<button type="button" id="get_data_button" name="get_data_button" onclick="javascript:getData();">从后端获取json</button>
<button type="button" id="send_data_button" name="send_data_button" onclick="javascript:sendData();">发送json到后端</button>

<table class="table table-striped table-bordered table-hover datatable" id="record_list">
    <thead>
    <tr>
        <th class="table-checkbox"><input type="checkbox" class="group-checkable" data-set="#record_list .checkboxes" /></th>
        <th>设备ID</th>
        <th>设备名称</th>
        <th>创建人</th>
        <th>创建时间</th>
    </tr>
    </thead>
</table>

<div id="message" name="message"></div>


<script type="text/javascript" src="jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="jquery.uniform.min.js"></script>
<script type="text/javascript" src="jquery.dataTables.min.js"></script>

<script>
    var jsonObj=undefined;
    function getData1(){
        $.post("maintain_order.json", function(json){
            console.log("前端接收：" + JSON.stringify(json));
            jsonObj=json;
            $("#message").html("前端接收：" + JSON.stringify(json));
        });
    }

    function sendData(){
        // var data=jsonObj; // 此处获取的json未经修改
        var data={"json_data_str": JSON.stringify(jsonObj)}; // 将json对象转换成json字符串
        // $.post("ja_back.jsp", data, function(json){ // 调用ESP方式
        $.post("device_servlet_action", data, function(json){ // 调用Servlet方式
            console.log("后端返回：" + JSON.stringify(json));
            $("#message").html("后端返回：" + JSON.stringify(json));
        });
    }
    function getData(){
        initRecordList();
        }
</script>

<script>
    var initRecordList=function(){
        $('.datatable').dataTable( {
            "paging":true,
            "searching":false,
            "oLanguage": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "sProcessing":   "处理中...",
                "sLengthMenu":   "_MENU_ 记录/页",
                "sZeroRecords":  "没有匹配的记录",
                "sInfo":         "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
                "sInfoEmpty":    "显示第 0 至 0 项记录，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项记录过滤)",
                "sInfoPostFix":  "",
                "sSearch":       "过滤:",
                "oPaginate": {
                    "sFirst":    "首页",
                    "sPrevious": "上页",
                    "sNext":     "下页",
                    "sLast":     "末页"
                }
            },
            "aoColumns": [{"mRender": function(data, type, full) {
                console.log(data);
                console.log(full);
                    sReturn = '<input type="checkbox" class="checkboxes" value="'+full.id+'"/>';
                    return sReturn;
                },"orderable": false
            },{"mRender": function(data, type, full) {
                    console.log(data);
                    console.log(full);
                    sReturn = '<div>' +full.devic_id + '</div>';
                    return sReturn;
                },"orderable": false},{"mRender": function(data, type, full) {
                    console.log(data);
                    console.log(full);
                    sReturn = '<div>' +full.devic_id + '</div>';
                    return sReturn;
                },"orderable": false},{"mRender": function(data, type, full) {
                    console.log(data);
                    console.log(full);
                    sReturn = '<div>' +full.devic_id + '</div>';
                    return sReturn;
                },"orderable": false},{"mRender": function(data, type, full) {
                    console.log(data);
                    console.log(full);
                    sReturn = '<div>' +full.devic_id + '</div>';
                    return sReturn;
                },"orderable": false}],
            "aLengthMenu": [[5,10,15,20,25,40,50,-1],[5,10,15,20,25,40,50,"所有记录"]],
            "fnDrawCallback": function(){$(".checkboxes").uniform();$(".group-checkable").uniform();},
            //"sAjaxSource": "get_record.jsp"
            //"data":data.aaData,			//这个用来显示不从后台交互获取数据的情况下，显示当前页面已经有的json数据
            "sAjaxSource": "maintain_order.json"
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
</script>