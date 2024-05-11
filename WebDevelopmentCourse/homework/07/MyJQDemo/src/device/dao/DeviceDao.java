//package device.dao;
//
//
//import org.json.JSONException;
//import org.json.JSONObject;
//import java.text.SimpleDateFormat;
//import java.sql.SQLException;
//import java.util.Date;
//
//public class DeviceDao {
//
//    public void showDebug(String msg) {
//        System.out.println("["+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"]"+"[device/dao/Db]"+msg);
//    }
//
//    // 添加记录
//    public void addDeviceRecord(Data data, JSONObject json) throws JSONException, SQLException {
//        // 检测sql语句，确定数据库表名及字段名称
//        String deviceId = data.getParam().has("device_id") ? data.getParam().getString("device_id") : null;
//        String deviceName = data.getParam().has("device_name") ? data.getParam().getString("device_name") : null;
//        if(deviceId != null && deviceName != null){
//            String sql = "insert into device_file(device_id,device_name)";
//            sql = sql + " values('"+deviceId+"','"+deviceName+"')";
//            data.getParam().put("sql", sql);
//            updateRecord(data, json);
//        }
//    }
//
//    // 删除记录
//    public void deleteDeviceRecord(Data data, JSONObject json) throws JSONException, SQLException {
//        // 检测sql语句，确定数据库表名及字段名称
//        String id = data.getParam().has("id") ? data.getParam().getString("id") : null;
//        if(id != null){
//            String sql = "delete from device_file where id='"+data.getParam().getString("id")+"'";
//            data.getParam().put("sql", sql);
//            updateRecord(data, json);
//        }
//    }
//
//    // 修改记录
//    public void modifyDeviceRecord(Data data, JSONObject json) throws JSONException, SQLException {
//        // 检测sql语句，确定数据库表名及字段名称
//        String id = data.getParam().has("id") ? data.getParam().getString("id") : null;
//        String deviceId = data.getParam().has("device_id") ? data.getParam().getString("device_id") : null;
//        String deviceName = data.getParam().has("device_name") ? data.getParam().getString("device_name") : null;
//        if(id != null){
//            String sql = "update device_file";
//            sql += " set device_id='"+deviceId+"',";
//            sql += " device_name='"+deviceName+"'";
//            sql += " where id='"+id+"'";
//            data.getParam().put("sql", sql);
//            updateRecord(data, json);
//        }
//    }
//
//    private void updateRecord(Data data, JSONObject json) throws JSONException, SQLException {
//        JSONObject paramData = data.getParam();
//        int resultCode=0;
//        String resultMsg="ok";
//
//
//        Db updatedb = new Db();
//        String sql = data.getParam().getString("sql");
//        showDebug("updateRecord["+sql+"]");
//
//        updatedb.executeUpdate(sql);
//        updatedb.close();
//
//        /* ...省略部分代码... */
//
//        json.put("result_msg", resultMsg);
//        json.put("result_code", resultCode);
//
//        /* ...省略部分代码... */
//    }
//
//}
