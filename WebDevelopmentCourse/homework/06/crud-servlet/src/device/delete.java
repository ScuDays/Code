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

public class delete extends HttpServlet {
    public void service(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.setCharacterEncoding("UTF-8");
       String id = request.getParameter("id");
//        String deviceId = request.getParameter("device_id");
//        String deviceName = request.getParameter("device_name");
//        String deviceType = request.getParameter("device_type");
//        System.out.println("[src/device/delete]收到device_id：" + deviceId);
//        System.out.println("[src/device/delete]收到device_name：" + deviceName);
//        System.out.println("[src/device/delete]收到device_type：" + deviceType);
//        String createTime = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
        //链接数据库，加载jdbc的驱动com.mysql.jdbc.Driver
        try {
            Class.forName("com.mysql.jdbc.Driver");
            System.out.println("[src/device/delete]加载了驱动");
        } catch (
                ClassNotFoundException classnotfoundexception) {
            //如果有异常就抛出
            classnotfoundexception.printStackTrace();
        }
        List list=new ArrayList();
        try {
            System.out.println("[src/device/delete]开始链接数据库");
            //链接数据库，IP地址是localhost，端口是3306，账号和密码是ylx，这些都可以更改
            Connection conn = DriverManager
                    .getConnection("jdbc:mysql://localhost:3306/test?user=root&password=1224&useUnicode=true&characterEncoding=UTF-8");
            System.out.println("[src/device/delete]链接完毕，开始创建准备数据库操作的statement");
            Statement statement = conn.createStatement();
            System.out.println("[src/device/delete]Connect Database Ok！！！");
            //执行查询语句，返回结果集
            String sql = "delete from project_todo where id=" + id;
            System.out.println("[src/device/delete]执行" + sql);
            statement.executeUpdate(sql);
            //如果查询有结果，则循环显示查询出来的记录
            System.out.println("[src/device/delete]====================开始输出====================");
            System.out.println("[src/device/delete]====================显示完毕====================");
            statement.close();
            conn.close();
            System.out.println("[src/device/delete]Database Closed！！！");
        } catch (
                SQLException sqlexception) {
            System.out.println("[src/device/delete]数据库访问出错：" + sqlexception.getMessage());
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
