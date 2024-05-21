<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="UTF-8">
    <title>Metronic | Data Tables - Basic Datatables</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description"/>
    <meta content="" name="author"/>

    <%@include file="../../home/frame/frame_style.jsp"%>
    <link rel="stylesheet" type="text/css" href="dataTables.bootstrap.css" />

    <link rel="shortcut icon" href="favicon.ico"/>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->

<body class="page-header-fixed page-quick-sidebar-over-content ">


<div class="clearfix">
</div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
    <%@include file="../../home/frame/frame_left_sidebar.jsp"%>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <%@include file="../../home/frame/frame_page_header.jsp"%>

            <!-- BEGIN PAGE HEADER-->
            <h3 class="page-title">
                设备信息<small>管理设备信息表</small>
            </h3>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="index.html">Home</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="#">Data Tables</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="#">Basic Datatables</a>
                    </li>
                </ul>
                <div class="page-toolbar">
                    <div class="btn-group pull-right">
                        <button type="button" class="btn btn-fit-height grey-salt dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="true">
                            Actions <i class="fa fa-angle-down"></i>
                        </button>
                        <ul class="dropdown-menu pull-right" role="menu">
                            <li>
                                <a href="#">Action</a>
                            </li>
                            <li>
                                <a href="#">Another action</a>
                            </li>
                            <li>
                                <a href="#">Something else here</a>
                            </li>
                            <li class="divider">
                            </li>
                            <li>
                                <a href="#">Separated link</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->

            <%--页面开始========================================================--%>

<%--            <!-- BEGIN PAGE CONTENT-->--%>
<%--            <div class="row ">--%>
<%--                <div class="col-md-6">--%>
<%--                    <button type="button" class="btn btn-primary" id="return_button" name="return_button">返回</button>--%>

<%--                </div>--%>
<%--            </div>--%>
<%--            <div class="row" id="bar_tab">--%>
<%--                <div class="col-md-6">--%>
<%--                    <!-- Nested media object -->--%>
<%--                    <div id = "record_bar_div" name = "record_bar_div">--%>
<%--                        <div class="portlet-body form">--%>
<%--                            <form class="form-horizontal" role="form">--%>

<%--                                <div class="form-body">--%>
<%--                                    <div class="form-group">--%>
<%--                                        <label class="col-md-3 control-label">设备编号</label>--%>
<%--                                        <div class="col-md-9">--%>
<%--                                            <input type="text" class="form-control" placeholder="Enter text" id="device_id" name="device_id">--%>

<%--                                        </div>--%>
<%--                                    </div>--%>

<%--                                    <div class="form-group">--%>
<%--                                        <label class="col-md-3 control-label">设备名称</label>--%>
<%--                                        <div class="col-md-9">--%>
<%--                                            <input type="text" class="form-control" placeholder="Enter text" id="device_name" name="device_name">--%>

<%--                                        </div>--%>
<%--                                    </div>--%>
<%--                                </div>--%>
<%--                            </form>--%>
<%--                        </div>--%>

<%--                    </div>--%>
<%--                </div>--%>
<%--                <!--end media-->--%>
<%--            </div>--%>
<%--            &lt;%&ndash;页面头结束========================================================&ndash;%&gt;--%>
            <!-- END PAGE CONTENT-->
            <!-- BEGIN ROW -->
            <input type="hidden" id="page_id" name="page_id" value="device_statistics">
            <div class="row">
                <div class="col-md-12">
                    <!-- BEGIN CHART PORTLET-->
                    <div class="portlet light bordered">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="icon-bar-chart font-green-haze"></i>
                                <span class="caption-subject bold uppercase font-green-haze"> Bar Charts</span>
                                <span class="caption-helper">column and line mix</span>
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse">
                                </a>
                                <a href="#portlet-config" data-toggle="modal" class="config">
                                </a>
                                <a href="javascript:;" class="reload">
                                </a>
                                <a href="javascript:;" class="fullscreen">
                                </a>
                                <a href="javascript:;" class="remove">
                                </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="chart_1" class="chart" style="height: 500px;">
                            </div>
                        </div>
                    </div>
                    <!-- END CHART PORTLET-->
                </div>
            </div>
            <!-- END ROW -->
        </div>
    </div>
    <!-- END CONTENT -->
    <%@include file="../../home/frame/frame_right_sidebar.jsp"%>
</div>
<!-- END CONTAINER -->
<%@include file="../../home/frame/frame_footer.jsp"%>



<%@include file="../../home/frame/frame_javascript.jsp"%>
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="../../assets/global/plugins/amcharts/amcharts/amcharts.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amcharts/serial.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amcharts/pie.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amcharts/radar.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amcharts/themes/light.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amcharts/themes/patterns.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amcharts/themes/chalk.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/ammap/ammap.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/ammap/maps/js/worldLow.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amstockcharts/amstock.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<script type="text/javascript" src="jquery.dataTables.min.js"></script>
<!-- 通过device.js来实现执行相应的图表以及数据库查询-->
<script src="device.js" type="text/javascript" charset="UTF-8"></script>
</body>
<!-- END BODY -->


</html>

<%@include file="device_add_div.jsp"%>
<%@include file="device_modify_div.jsp"%>
