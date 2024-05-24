package com.example.demo;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class TestController {
    @RequestMapping("/test")
    public String Hello(){
        System.out.println("[Hello]执行到这里了！");
        return "Hello World!";
    }
    @RequestMapping("/get_record")
    public JSONObject getRecord(){
        JSONObject json=new JSONObject();
        //
        String url="jdbc:mysql://localhost:3306/centerdb";
        String username="root";
        String password="1224";
        try {
            Class.forName("com.mysql.jdbc.Driver");
//            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        Connection connection=null;
        try {
            connection= DriverManager.getConnection(url,username,password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        Statement statement=null;
        try {
            statement=connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        String sql="select * from device_file order by device_name";
        List list=new ArrayList();
        try {
            ResultSet rs=statement.executeQuery(sql);
            while(rs.next()){
                Map map=new HashMap();
                map.put("device_id",rs.getString("device_id"));
                map.put("device_name",rs.getString("device_name"));
                map.put("device_type",rs.getString("device_type"));
                map.put("create_time",rs.getString("create_time"));
                list.add(map);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        json.put("aaData",list);
        json.put("result_code",0);
        json.put("result_msg","ok");
        //
        return json;
    }
}
