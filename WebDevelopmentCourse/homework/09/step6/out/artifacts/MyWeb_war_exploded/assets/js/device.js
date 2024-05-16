var module="device";
var sub="file";
document.domain="localhost";
/*================================================================================*/
jQuery(document).ready(function() {
	Page.init();
});
/* ================================================================================ */
//关于页面的控件生成等操作都放在Page里
var Page = function() {
	/*----------------------------------------入口函数  开始----------------------------------------*/
	var initPageControl=function(){
		pageId=$("#page_id").val();
		if(pageId=="device_list"){
			initDeviceList();
		}
		if(pageId=="device_add"){
			initDeviceAdd();
		}
		if(pageId=="device_modify"){
			initDeviceModify();
		}
		if(pageId=="device_file"){
			initDeviceFile();
		}
	};
	/*----------------------------------------入口函数  结束----------------------------------------*/
	var columnsData=undefined;
	var recordResult=undefined;
	/*----------------------------------------业务函数  开始----------------------------------------*/
	/*------------------------------针对各个页面的入口  开始------------------------------*/
	var initDeviceList=function(){
		initDeviceListControlEvent();
		initDeviceRecordList();
	}
	var initDeviceAdd=function(){
		initDeviceAddControlEvent();
	}
	var initDeviceModify=function(){
		initDeviceModifyControlEvent();
		initDeviceRecordView();
	}
	var initDeviceFile=function(){
		console.log("[initDeviceFile]");
		initDeviceFileControlEvent();
		initDeviceFileView();
	}
	/*------------------------------针对各个页面的入口 结束------------------------------*/
	var getUrlParam=function(name){
		//获取url中的参数
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return decodeURI(r[2]); return null; //返回参数值，如果是中文传递，就用decodeURI解决乱码，否则用unescape
	}
	var initDeviceListControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#add_button').click(function() {onAddRecord();});
	}
	var initDeviceAddControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#add_button').click(function() {submitAddRecord();});
	}
	var initDeviceModifyControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#modify_button').click(function() {submitModifyRecord();});
	}
	var initDeviceRecordView=function(){
		var id=getUrlParam("id");
		var data={};
		data.action="get_device_record";
		data.id=id;
		$.post("../../"+module+"_"+sub+"_servlet_action",data,function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0){
				var list=json.aaData;
				if(list!=undefined && list.length>0){
					for(var i=0;i<list.length;i++){
						var record=list[i];
						$("#device_id").val(record.device_id);
						$("#device_name").val(record.device_name);
					}
				}
			}
		})
	}
	var onAddRecord=function(){
		window.location.href="device_add.jsp";
	}
	var submitAddRecord=function(){
		var url="/MyWeb_war_exploded/device_file_servlet_action?action=get_device_record";

		var data={};
		data.action="add_device_record";
		data.device_id=$("#device_id").val();
		data.device_name=$("#device_name").val();
		data.device_type=$("#device_type").val();
		$.post(url,data,function(json){
			if(json.result_code==0){
				alert("已经完成设备添加。");
				window.location.href="frame_style.jsp";
			}
		});
	}
	var submitModifyRecord=function(){
		if(confirm("您确定要修改该记录吗？")){
			var id=getUrlParam("id");
			var url="../../device_file_servlet_action";
			var data={};
			data.action="modify_device_record";
			data.id=id;
			data.device_id=$("#device_id").val();
			data.device_name=$("#device_name").val();
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成设备修改。");
					window.location.href="frame_style.jsp";
				}
			});
		}
	}

	
	var initDeviceRecordList=function(){
		getDeviceRecordList();
	}
	var initDeviceMobileRecord=function(){
		getDeviceMobileRecord();
	}
	var getDeviceRecordList=function(){
		console.log("执行到getDeviceRecordList");
		$.post("/MyWeb_war_exploded/device_file_servlet_action?action=get_device_record", function(json) {

		//$.post("../../../"+module+"_"+sub+"_servlet_action?action=get_device_record",function(json){
		//$.post("../../"+"device"+"_"+"file"+"_servlet_action?action=get_device_record",function(json){
			if(json.result_code==0){
				var list=json.aaData;
				var html="";
				if(list!=undefined && list.length>0){
					for(var i=0;i<list.length;i++){
						var record=list[i];
						html=html+"<div>序号："+i+"<div>";
						html=html+"<div>设备ID："+record.device_id+"<div>";
						html=html+"<div>设备名称："+record.device_name+"<div>";
						html=html+"<div><a href=\"javascript:Page.onModifyRecord("+record.id+")\">【修改记录】</a><a href=\"javascript:Page.onDeleteRecord("+record.id+")\">【删除记录】</a><div>";
						html=html+"<p>";
					}
				}
				console.log(JSON.stringify(json));
				$("#record_list_div").html(html);
			}
		})
	}
	var onDeleteRecord = function(id){
		if(confirm("您确定要删除这条记录吗？")){
			if(id>-1){
				var url="../../device_file_servlet_action";
				var data={};
				data.action="delete_device_record";
				data.id=id;
				$.post(url,data,function(json){
					if(json.result_code==0){
						getDeviceRecordList();
					}
				})
			}
		}
	};
	var onModifyRecord=function(id){
		window.location.href="device_modify.jsp?id="+id;
	}
	var initDeviceFileControlEvent=function(id){
		$('#jump_div #upload_button').click(function() {onJumpUploadFile();});
		$('#ajax_div #upload_button').click(function() {onAjaxUploadFile();});
		console.log("[initDeviceFileControlEvent]");
	}
	var initDeviceFileView=function(id){
		console.log("[initDeviceFileView]");
		getDeviceFile();
	}
	var getDeviceFile=function(){

	}
	var onJumpUploadFile=function(){
		console.log("[onJumpUploadFile]====");
		var deviceId=$("#device_id").val();
		var deviceName=$("#device_name").val();
		jump_form.action="../../device_file_servlet_action?action=upload_file&device_id="+deviceId+"&device_name="+deviceName;
		//jump_form.action="http://192.168.3.111:8888?action=upload_file&device_id="+deviceId+"&device_name="+deviceName;			/*设置提交到TCP工具来接收，TCP工具设置好监听端口例如8888和接收自动存入文件*/
		jump_form.submit();
	}
	//如果出现“No resource with given identifier found”，注意：在谷歌浏览器调试界面找到Network界面导航栏中找到Preserve log，把勾去掉就好了。
	//https://blog.csdn.net/m0_46296300/article/details/126130250
	//发送ajax请求后页面自动刷新的问题
	//https://blog.csdn.net/GCTTTTTT/article/details/123824126
	var onAjaxUploadFile=function(){
		console.log("[onAjaxUploadFile]====");
		var deviceId = $("#device_id").val();
		var deviceName = $("#device_name").val();
		var options = {
			type : 'post', /*设置表单以post方法提交*/
			url : '../../device_file_servlet_action?action=upload_file&device_id='+deviceId+"&device_name="+deviceName, /*设置post提交到的页面*/
			success : function(json) {
				console.log("[onAjaxUploadFile]上传文件返回结果="+JSON.stringify(json));
				if(json.upload_files.length>0){
					var files=json.upload_files;
					var fileUrl = files[0].file_url_name;
					var objectId = files[0].file_object_id;
					$("#current_attachment_name").html("您当前上传的附件第一个是：<span style='color:blue;'><a href='javascript:window.open(\""+fileUrl+"\")'>" + fileUrl + "</a></span>");
					$("#current_attachment_object_id").val(objectId);
					console.log("[onAjaxUploadFile]fileUrl="+fileUrl);
					console.log("[onAjaxUploadFile]objectId="+objectId);
				}else{
					alert("[onAjaxUploadFile]没有上传文件结果返回！");
				}
			},
			error : function(error) {
				alert(error);
			},
			dataType : "json" /*设置返回值类型为文本*/
		};
		$("#ajax_form").ajaxSubmit(options);
	}
	//Page return 开始
	return {
		init: function() {
			initPageControl();
		},
		onDeleteRecord:function(id){
			onDeleteRecord(id);
		},
		onModifyRecord:function(id){
			onModifyRecord(id);
		}
	}
}();//Page
/*================================================================================*/
