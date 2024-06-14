package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Device;
import com.example.demo.service.DeviceService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/device")
public class DeviceController {
    @RequestMapping("/get_record")
//    public JSONObject getDeviceRecord(@RequestBody(required = false) JSONObject param){
//        JSONObject json=new JSONObject();
//        //if(!(param ==null)) {
//            DeviceService service = new DeviceService();
//            service.getDeviceRecord(param, json);
//        //}
//        return json;
//    }
    public JSONObject getDeviceRecord(@RequestBody(required = false) JSONObject param){
        JSONObject json=new JSONObject();
        //if(!(param ==null)) {
        DeviceService service = new DeviceService();
        service.getDeviceRecord(param, json);
        //}
        return json;
    }
    @RequestMapping("/add_record")
    public JSONObject addDeviceRecord(@RequestBody(required = false) Device device){
        JSONObject json=new JSONObject();
        System.out.println("[DeviceController/addDeviceRecord]"+device.toString());
        DeviceService service = new DeviceService();
        service.addDeviceRecord(device, json);
        return json;
    }
    @RequestMapping("/modify_record")
    public JSONObject modifyDeviceRecord(@RequestBody Device device) {
        JSONObject json = new JSONObject();
        System.out.println("[DeviceController/modifyDeviceRecord] " + device.toString());
        DeviceService service = new DeviceService();
        service.modifyDeviceRecord(device, json);
        return json;
    }
    @RequestMapping("/get_id_record")
    public Device getDeviceById(@RequestBody Map<String, String> params) {
        String id = params.get("id");
        DeviceService service = new DeviceService();
        return service.getDeviceById(id);
    }
    @RequestMapping("/delete_record")
    public JSONObject deleteDeviceRecord(@RequestBody Device device) {
        JSONObject json = new JSONObject();
        System.out.println("[DeviceController/modifyDeviceRecord] " + device.toString());
        DeviceService service = new DeviceService();
        service.deleteDeviceRecord(device, json);
        return json;
    }


}
