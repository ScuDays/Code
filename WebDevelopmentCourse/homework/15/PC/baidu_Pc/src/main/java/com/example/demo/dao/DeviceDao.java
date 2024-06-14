package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Device;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;

public class DeviceDao {
    public void getDeviceRecord(JSONObject param, JSONObject json) {
        /*--------------------函数开始 传递进来的参数在param里--------------------*/
        System.out.println("[DeviceDao/getDeviceRecord]执行到这里param=null");
        /*--------------------数据库访问 开始--------------------*/
        String url="jdbc:mysql://www.ylxteach.net:3366/webyykf2024";
        String username="Administrator";
        String password="XWClassroom20202023";
        try {
            Class.forName("com.mysql.jdbc.Driver");
            //Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        System.out.println("[DeviceDao/getDeviceRecord]驱动加载完毕");
        Connection connection=null;
        try {
            connection= DriverManager.getConnection(url,username,password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("[DeviceDao/getDeviceRecord]Connection连接完毕");
        Statement statement=null;
        try {
            statement=connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("[DeviceDao/getDeviceRecord]Statement创建完毕");
       String sql="select * from gps_realtime order by id";
        //String sql = "SELECT * FROM gps_realtime gr JOIN gps_file gf ON gf.device_id = gr.device_id";


        List list=new ArrayList();
        try {
            ResultSet rs=statement.executeQuery(sql);
            while(rs.next()){
                Map map=new HashMap();
                map.put("id",rs.getString("id"));
                map.put("device_id",rs.getString("device_id"));
                map.put("gps_time",rs.getString("gps_time"));
                map.put("speed",rs.getString("speed"));
                map.put("longitude",rs.getString("longitude"));
                map.put("latitude",rs.getString("latitude"));
                map.put("creator",rs.getString("creator"));
                map.put("creator_id",rs.getString("creator_id"));
                map.put("device_type",rs.getString("device_type"));
                list.add(map);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        /*--------------------数据库访问 结束--------------------*/
        json.put("aaData",list);
        json.put("result_code",0);
        json.put("result_msg","ok");
        /*--------------------函数结束 返回的结果存放在json里--------------------*/
    }

    public void addDeviceRecord(Device device, JSONObject json) {
        /*--------------------函数开始 传递进来的参数在param里--------------------*/
        System.out.println("[DeviceDao/addDeviceRecord]执行到这里device="+device.toString());
        /*--------------------数据库访问 开始--------------------*/
        String url="jdbc:mysql://localhost:3306/centerdb";
        String username="root";
        String password="1224";
        try {
            Class.forName("com.mysql.jdbc.Driver");
            //Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        System.out.println("[DeviceDao/addDeviceRecord]驱动加载完毕");
        Connection connection=null;
        try {
            connection= DriverManager.getConnection(url,username,password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("[DeviceDao/addDeviceRecord]Connection连接完毕");
        Statement statement=null;
        try {
            statement=connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("[DeviceDao/addDeviceRecord]Statement创建完毕");

        String deviceId=device.getDeviceid();
        String deviceName=device.getDevicename();
        String deviceType=device.getDevicetype();
        Date date=new Date();
        String createTime=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
        String sql="insert into device_file(device_id,device_name,device_type,create_time)" +
                " values('"+deviceId+"','"+deviceName+"','"+deviceType+"','"+createTime+"')";

        List list=new ArrayList();
        try {
            statement.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        /*--------------------数据库访问 结束--------------------*/
        json.put("aaData",list);
        json.put("result_code",0);
        json.put("result_msg","ok");
        /*--------------------函数结束 返回的结果存放在json里--------------------*/
    }

public void modifyDeviceRecord(Device device, JSONObject json) {
    System.out.println("[DeviceDao/modifyDeviceRecord] " + device.toString());
    String url="jdbc:mysql://www.ylxteach.net:3366/webyykf2024";
    String username="Administrator";
    String password="XWClassroom20202023";

    try {
        Class.forName("com.mysql.jdbc.Driver");
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    }

    Connection connection = null;
    try {
        connection = DriverManager.getConnection(url, username, password);
    } catch (SQLException e) {
        e.printStackTrace();
    }

    //String sql = "UPDATE device_file SET device_id = ?, device_name = ?, device_type = ?, create_time = ? WHERE id = ?";
    String sql = "UPDATE gps_realtime SET device_id = ?, creator = ?, creator_id = ?, device_type = ? WHERE device_id = ?";

    String debugSql = "UPDATE device_file SET device_id = '" + device.getDeviceid() + "', device_name = '" + device.getDevicename() + "', device_type = '" + device.getDevicetype() + "', create_time = '" + device.getCreatetime() + "' WHERE id = '" + device.getId() + "'";
    System.out.println("[DeviceDao/modifyDeviceRecord] SQL: " + sql);
    System.out.println("[DeviceDao/modifyDeviceRecord] Debug SQL: " + debugSql);
    System.out.println("[DeviceDao/modifyDeviceRecord] Parameters: device_id=" + device.getDeviceid() + ", device_name=" + device.getDevicename() + ", device_type=" + device.getDevicetype() + ", create_time=" + device.getCreatetime() + ", id=" + device.getId());

    try (PreparedStatement statement = connection.prepareStatement(sql)){

        statement.setString(1, device.getDevice_id());    // 设备ID
        statement.setString(2, device.getCreator());     // 负责人名
        statement.setString(3, device.getCreator_id());   // 负责人ID
        statement.setString(4, device.getDevice_type());  // 设备类型
        statement.setString(5, device.getDevice_id());    // WHERE 子句的设备ID，假设更新条件是 deviceId

        int rowsUpdated = statement.executeUpdate();
        if (rowsUpdated > 0) {
            json.put("result_code", 0);
            json.put("result_msg", "Record updated successfully.");
        } else {
            json.put("result_code", 1);
            json.put("result_msg", "No record updated. Please check if the device ID exists.");
        }
    } catch (SQLException e) {
        e.printStackTrace();
        json.put("result_code", 1);
        json.put("result_msg", "SQL Exception: " + e.getMessage());
    }

}

public void deleteDeviceRecord(Device device, JSONObject json) {
                System.out.println("[DeviceDao/deleteDeviceRecord] " + device.toString());
                String url = "jdbc:mysql://www.ylxteach.net:3366/webyykf2024";
                String username = "Administrator";
                String password = "XWClassroom20202023";

                try {
                    Class.forName("com.mysql.jdbc.Driver");
                } catch (ClassNotFoundException e) {
                    e.printStackTrace();
                    json.put("result_code", 1);
                    json.put("result_msg", "Driver not found: " + e.getMessage());
                    return;
                }
                String sql = "DELETE FROM gps_realtime WHERE device_id = ?";
                System.out.println(sql);
                try (Connection connection = DriverManager.getConnection(url, username, password);
                     PreparedStatement statement = connection.prepareStatement(sql)) {
                    statement.setString(1, device.getDevice_id());  // 只绑定 device_id
                    int rowsDeleted = statement.executeUpdate();
                    if (rowsDeleted > 0) {
                        json.put("result_code", 0);
                        json.put("result_msg", "Record deleted successfully.");
                    } else {
                        json.put("result_code", 1);
                        json.put("result_msg", "No record found with the given device ID.");
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                    json.put("result_code", 1);
                    json.put("result_msg", "SQL Exception: " + e.getMessage());
                }
            }

            public Device getDeviceById(String id) {
        String url = "jdbc:mysql://localhost:3306/centerdb";
        String username = "root";
        String password = "1224";
        Device device = null;

        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            String sql = "SELECT * FROM device_file WHERE id = ?";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, id);
                try (ResultSet rs = statement.executeQuery()) {
                    if (rs.next()) {
                        device = new Device();
                        device.setId(rs.getString("id"));
                        device.setDeviceid(rs.getString("device_id"));
                        device.setDevicename(rs.getString("device_name"));
                        device.setDevicetype(rs.getString("device_type"));
                        device.setCreatetime(rs.getString("create_time"));
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return device;
    }



}
