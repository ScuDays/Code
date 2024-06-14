package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.DeviceDao;
import com.example.demo.entity.Device;

public class DeviceService {
    public void getDeviceRecord(JSONObject param,JSONObject json) {
        DeviceDao dao=new DeviceDao();
        dao.getDeviceRecord(param,json);
    }

    public void addDeviceRecord(Device device, JSONObject json) {
        DeviceDao dao=new DeviceDao();
        dao.addDeviceRecord(device,json);
    }
    public void modifyDeviceRecord(Device device, JSONObject json) {
        DeviceDao dao = new DeviceDao();
        dao.modifyDeviceRecord(device, json);
    }

    public Device getDeviceById(String id) {
        DeviceDao dao = new DeviceDao();
        return dao.getDeviceById(id);
    }
    public void deleteDeviceRecord(Device device, JSONObject json) {
        DeviceDao dao = new DeviceDao();
        dao.deleteDeviceRecord(device, json);
    }

}
