package device;


import org.json.JSONException;
import org.json.JSONObject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ServletAction extends HttpServlet {
    public void service(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        //获取json.js字符串里的JSON对象 //假设json.js字符串是前端的JSON-lib库生成
        String data = request.getParameter("json_data_str");
        System.out.println("接收到前端传来的Json数据是："  + data);
        JSONObject json=new JSONObject();
        try {
            //进行后台需要完成的操作
            //输出结果
            json.put("result_code",0);
            json.put("result_msg","ok");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        response.setContentType("application/json; charset=UTF-8"); //用ajax方式无需设置json格式，重要是设置contentType
        try {
            System.out.println("返回前端的Json数据是：" +json.toString());
            response.getWriter().print(json);
            response.getWriter().flush();
            response.getWriter().close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}