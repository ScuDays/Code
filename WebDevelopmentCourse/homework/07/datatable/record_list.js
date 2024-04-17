var data={"aaData":[[1,"1","22","3333","4444"],[2,"1","22","3333","4444"]]};
jQuery(document).ready(function() {
	Record.init();
});
/* ================================================================================ */
var MyPage = function() {
	var initPageStyle = function() {
		$(".page-content-single").css("background-color","#fff");
		$(".page-content-single").css("margin-left","0px");
		$(".page-content-single").css("margin-top","0px");
		$(".page-content-single").css("min-height","600px");
		$(".page-content-single").css("padding","25px 20px 10px 20px");
	}
	return {
		init: function() {
			initPageStyle();
			initLeftMenu("gis");
		}
	};
}();
var Record = function() {
	var html="";
	var initRecordStyle = function() {
	};
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
						sReturn = '<input type="checkbox" class="checkboxes" value="'+data+'"/>';
						return sReturn;
					},"orderable": false
				},{},{},{},{}],
			"aLengthMenu": [[5,10,15,20,25,40,50,-1],[5,10,15,20,25,40,50,"所有记录"]],
			"fnDrawCallback": function(){$(".checkboxes").uniform();$(".group-checkable").uniform();},
			//"sAjaxSource": "get_record.jsp"
			//"data":data.aaData,			//这个用来显示不从后台交互获取数据的情况下，显示当前页面已经有的json数据
			"sAjaxSource": "get_record.jsp?device_id=001"
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
	return {
		init: function() {
			initRecordList();
			initRecordStyle();
		}
	};
}();
