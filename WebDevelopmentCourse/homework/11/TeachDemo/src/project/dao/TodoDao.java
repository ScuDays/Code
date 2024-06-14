package project.dao;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import project.dao.Data;
import project.dao.TodoDao;

public class TodoDao {
	public void showDebug(String msg){
		System.out.println("["+(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date())+"][todo/dao/Db]"+msg);
	}
	private boolean checkParamValid(JSONObject param,String field) throws JSONException{
		boolean ok=false;
		ok=param.has(field) && param.getString(field)!=null && !param.getString(field).isEmpty() && !param.getString(field).equals("undefined") && !param.getString(field).equals("null");
		return ok;
	}
	/*添加记录*/
	public void addTodoRecord(Data data, JSONObject json) throws JSONException, SQLException {
		// 构造 SQL 语句，根据传递过来的条件参数
		String device_id = data.getParam().has("device_id") ? data.getParam().getString("device_id") : null;
		String device_name = data.getParam().has("device_name") ? data.getParam().getString("device_name") : null;
		String create_time = data.getParam().has("create_time") ? data.getParam().getString("create_time") : null;
		if (device_id != null && create_time != null) {
			String sql = "insert into device_file(device_id, device_name, create_time) values('"
					+ device_id + "', '"
					+ (device_name != null ? device_name : "") + "', '"
					+ create_time + "')";
			data.getParam().put("sql", sql);
			updateRecord(data, json);
		}
	}

	/*删除记录*/
	public void deleteTodoRecord(Data data,JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的条件参数
		String id=data.getParam().has("id")?data.getParam().getString("id"):null;
		if(id!=null){
			String sql="delete from device_file where id="+data.getParam().getString("id");
			data.getParam().put("sql",sql);
			updateRecord(data,json);
		}
	}
	/*修改记录*/
	public void modifyTodoRecord(Data data,JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的条件参数
		String id=data.getParam().has("id")?data.getParam().getString("id"):null;
		String device_id=data.getParam().has("device_id")?data.getParam().getString("device_id"):null;
		String device_name=data.getParam().has("device_name")?data.getParam().getString("device_name"):null;
		String create_time=data.getParam().has("create_time")?data.getParam().getString("create_time"):null;
		if(id!=null){
			String sql="update device_file";
			sql=sql+" set device_id='"+device_id+"'";
			sql=sql+" ,device_name='"+device_name+"'";
			sql=sql+" ,create_time='"+create_time+"'";
			sql=sql+" where id="+id;
			data.getParam().put("sql",sql);
			updateRecord(data,json);
		}
	}
	/*查询记录*/
	public void getTodoRecord(Data data,JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的查询条件参数
		String sql=createGetRecordSql(data);			//构造sql语句，根据传递过来的查询条件参数
		data.getParam().put("sql",sql);
		queryRecord(data,json);
	}
	/*
	 * 这是一个样板的函数，可以拷贝做修改用
	 */
	private void updateRecord(Data data,JSONObject json) throws JSONException, SQLException{
		/*--------------------获取变量 开始--------------------*/
		JSONObject param=data.getParam();
		int resultCode=0;
		String resultMsg="ok";
		/*--------------------获取变量 完毕--------------------*/
		/*--------------------数据操作 开始--------------------*/
		Db updateDb = new Db("test");
		String sql=data.getParam().getString("sql");
		showDebug("[updateRecord]"+sql);
		updateDb.executeUpdate(sql);
		updateDb.close();
		/*--------------------数据操作 结束--------------------*/
		/*--------------------返回数据 开始--------------------*/
		json.put("result_msg",resultMsg);															//如果发生错误就设置成"error"等
		json.put("result_code",resultCode);														//返回0表示正常，不等于0就表示有错误产生，错误代码
		/*--------------------返回数据 结束--------------------*/
	}
	private void queryRecord(Data data,JSONObject json) throws JSONException, SQLException{
		/*--------------------获取变量 开始--------------------*/
		String action = data.getParam().getString("action");
		String resultMsg = "ok";
		int resultCode = 0;
		List jsonList = new ArrayList();
		/*--------------------获取变量 完毕--------------------*/
		/*--------------------数据操作 开始--------------------*/
		Db queryDb = new Db("test");
		String sql=data.getParam().getString("sql");
		showDebug("[queryRecord]构造的SQL语句是：" + sql);
		try {
			ResultSet rs = queryDb.executeQuery(sql);
			ResultSetMetaData rsmd = rs.getMetaData();
			int fieldCount = rsmd.getColumnCount();
			while (rs.next()) {
				Map map = new HashMap();
				for (int i = 0; i < fieldCount; i++) {
					map.put(rsmd.getColumnName(i + 1), rs.getString(rsmd.getColumnName(i + 1)));
				}
				jsonList.add(map);
			}
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
			showDebug("[queryRecord]查询数据库出现错误：" + sql);
			resultCode = 10;
			resultMsg = "查询数据库出现错误！" + e.getMessage();
		}
		queryDb.close();
		/*--------------------数据操作 结束--------------------*/
		/*--------------------返回数据 开始--------------------*/
		json.put("aaData",jsonList);
		json.put("action",action);
		json.put("result_msg",resultMsg);															//如果发生错误就设置成"error"等
		json.put("result_code",resultCode);														//返回0表示正常，不等于0就表示有错误产生，错误代码
		/*--------------------返回数据 结束--------------------*/
	}

	private String createGetRecordSql(Data data) throws JSONException {
		JSONObject param=data.getParam();
		String sql="select * from device_file";
		String where="";
		if(checkParamValid(param,"id")){
			where="id="+param.getString("id");
		}
		if(checkParamValid(param,"id")){
			where="id="+param.getString("id");
		}
		if(checkParamValid(param,"time_from") && checkParamValid(param,"time_to")){
			if(!where.isEmpty()){
				where=where+" and create_time between '"+param.getString("time_from")+"' and '"+param.getString("time_to")+"'";
			}else{
				where="create_time between '"+param.getString("time_from")+"' and '"+param.getString("time_to")+"'";
			}
		}
		if(checkParamValid(param,"todo_id")){
			if(!where.isEmpty()){
				where=where+" and todo_id = '"+param.getString("todo_id")+"'";
			}else{
				where="todo_id ='"+param.getString("todo_id")+"'";
			}
		}
		if(checkParamValid(param,"todo_type")){
			if(!where.isEmpty()){
				where=where+" and todo_type = '"+param.getString("todo_type")+"'";
			}else{
				where="todo_type ='"+param.getString("todo_type")+"'";
			}
		}
		if(checkParamValid(param,"todo_name")){
			if(!where.isEmpty()){
				where=where+" and todo_name like '%"+param.getString("todo_name")+"%'";
			}else{
				where="todo_name like '%"+param.getString("todo_name")+"%'";
			}
		}
		if(!where.isEmpty()){
			sql=sql+" where "+where;
		}
		if(checkParamValid(param,"order_by")){
			sql=sql+" order by "+param.getString("order_by");
		}
		return sql;
	}
    public void saveUploadFileRecord(JSONObject json, Data data) throws JSONException, SQLException {
		//构造sql语句，根据传递过来的查询条件参数
		//首先分析json里有多少文件，多个文件需要用循环构造多个sql语句
		showDebug("[saveUploadFileRecord]保存文件后，文件和字段信息json是："+json.toString());
		/*--------------------循环 开始--------------------*/
		//for(int i=0;i<nCount;i++){
		//String sql=createSaveUploadFileRecordSql(data);			//构造sql语句，根据传递过来的查询条件参数
		//data.getParam().put("sql",sql);
		//updateRecord(data,json);
		//}
		/*--------------------循环 结束--------------------*/
    }
}
