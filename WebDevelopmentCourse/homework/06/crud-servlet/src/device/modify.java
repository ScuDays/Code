package device;

import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class modify extends HttpServlet {
    public void service(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.setCharacterEncoding("UTF-8");
        String id = request.getParameter("id");
        String object_id = request.getParameter("object_id");
        String title = request.getParameter("title");
        String status = request.getParameter("status");
        String limit_time = request.getParameter("limit_time");
        String creator = request.getParameter("creator");
        System.out.println("收到消息" + object_id + title);
        String create_time = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
        //链接数据库，加载jdbc的驱动com.mysql.jdbc.Driver
        try {
            Class.forName("com.mysql.jdbc.Driver");
            System.out.println("[src/device/modify]加载了驱动");
        } catch (ClassNotFoundException classnotfoundexception) {
            //如果有异常就抛出
            classnotfoundexception.printStackTrace();
        }
        List list=new ArrayList();
        try {
            System.out.println("[src/device/modify]开始链接数据库");
            //链接数据库，IP地址是localhost，端口是3306，账号和密码是ylx，这些都可以更改
            Connection conn = DriverManager
                    .getConnection("jdbc:mysql://localhost:3306/test?user=root&password=1224&useUnicode=true&characterEncoding=UTF-8");
            System.out.println("[src/device/modify]链接完毕，开始创建准备数据库操作的statement");
            Statement statement = conn.createStatement();
            System.out.println("[src/device/modify]Connect Database Ok！！！");
            //执行查询语句，返回结果集
            String sql = "update project_todo set object_id='" + object_id + "',title='" + title + "',status='" + status + "',limit_time='" + limit_time + "'" +
                    ",creator='" + creator + "' where id=" + id;            System.out.println("[src/device/modify]执行"+sql);
            statement.executeUpdate(sql);
            //如果查询有结果，则循环显示查询出来的记录
            System.out.println("[src/device/modify]====================开始输出====================");
            System.out.println("[src/device/modify]====================显示完毕====================");
            statement.close();
            conn.close();
            System.out.println("[src/device/modify]Database Closed！！！");
        } catch (SQLException sqlexception) {
            System.out.println("[src/device/modify]数据库访问出错："+sqlexception.getMessage());
            sqlexception.printStackTrace();
        }
        //response.sendRedirect("device_list.html");
        //返回数据给前端页面
        JSONObject resultJson=new JSONObject();
        try {
            resultJson.put("aaData",list);
            resultJson.put("result_code",0);
            resultJson.put("result_msg","ok");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        response.setContentType("application/json; charset=UTF-8");
        try {
            response.getWriter().print(resultJson);
            response.getWriter().flush();
            response.getWriter().close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
