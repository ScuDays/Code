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
            <input type="hidden" id="page_id" name="page_id" value="device_list">
            <!-- BEGIN PAGE CONTENT-->
            <div class="row ">
                <div class="col-md-6">
                    <button type="button" class="btn btn-primary" id="datatable_button" name="datatable_button">切换到DataTable</button>
                    <button type="button" class="btn btn-primary"id="table_button" name="table_button">切换到自定义Table</button>
                    <button type="button" class="btn btn-primary"id="bar_button" name="bar_button">切换到自定义大横条</button>
                </div>
            </div>
            <div class="row" id="bar_tab" hidden>
                <div class="col-md-6">
                    <!-- Nested media object -->
                        <div id = "record_bar_div" name = "record_bar_div">
                        </div>
                </div>
                    <!--end media-->
            </div>

            <div class="row" id="datatable_tab">
                <div class="col-md-6">
                    <table class="table table-striped table-bordered table-hover datatable" id="record_list">
                        <thead>
                        <tr>
                            <th class="table-checkbox"><input type="checkbox" class="group-checkable" data-set="#record_list .checkboxes" /></th>
                            <th>事件id</th>
                            <th>事件</th>
                            <th>创建人</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>

            <div class="row display-none"id="table_tab" >
                <div class="col-md-6">
                    <!-- BEGIN SAMPLE TABLE PORTLET-->
                    <div class="portlet box blue">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-comments"></i>事件表
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse">
                                </a>
                                <a href="#portlet-config" data-toggle="modal" class="config">
                                </a>
                                <a href="javascript:;" class="reload">
                                </a>
                                <a href="javascript:;" class="remove">
                                </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-scrollable">
                                <table class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
<%--                                        <th>--%>
<%--                                            #--%>
<%--                                        </th>--%>
                                        <th>
                                            Class Name
                                        </th>
                                        <th>
                                            Column
                                        </th>
                                        <th>
                                            Column
                                        </th>
                                        <th>
                                            Column
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody id="record_table_content_div" name="record_table_content_div">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- END SAMPLE TABLE PORTLET-->
                </div>
            </div>
            <%--页面头结束========================================================--%>
            <!-- END PAGE CONTENT-->
        </div>
    </div>
    <!-- END CONTENT -->
    <%@include file="../../home/frame/frame_right_sidebar.jsp"%>
</div>
<!-- END CONTAINER -->
<%@include file="../../home/frame/frame_footer.jsp"%>



<%@include file="../../home/frame/frame_javascript.jsp"%>
<script type="text/javascript" src="jquery.dataTables.min.js"></script>
<!-- 通过device.js来实现执行相应的图表以及数据库查询-->
<script src="device.js" type="text/javascript" charset="UTF-8"></script>
</body>
<!-- END BODY -->


</html>





