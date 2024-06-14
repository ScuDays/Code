package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Device {
    @JsonProperty("id")
    private String id;
    @JsonProperty("deviceid")
    private String deviceid;
    @JsonProperty("devicename")
    private String devicename;
    @JsonProperty("devicetype")
    private String devicetype;
    @JsonProperty("createtime")
    private String createtime;
    @JsonProperty("device_id")
    private String device_id;

    public String getDevice_id() {
        return device_id;
    }

    public void setDevice_id(String device_id) {
        this.device_id = device_id;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getCreator_id() {
        return creator_id;
    }

    public void setCreator_id(String creator_id) {
        this.creator_id = creator_id;
    }

    public String getDevice_type() {
        return device_type;
    }

    public void setDevice_type(String device_type) {
        this.device_type = device_type;
    }

    @JsonProperty("creator")
    private String creator;
    @JsonProperty("creator_id")
    private String creator_id;
    @JsonProperty("device_type")
    private String device_type;

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDeviceid() {
        return deviceid;
    }

    public void setDeviceid(String deviceid) {
        this.deviceid = deviceid;
    }

    public String getDevicename() {
        return devicename;
    }

    public void setDevicename(String devicename) {
        this.devicename = devicename;
    }

    public String getDevicetype() {
        return devicetype;
    }

    public void setDevicetype(String devicetype) {
        this.devicetype = devicetype;
    }

    public String getCreatetime() {
        return createtime;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }

    @Override
    public String toString() {
        return "Device{" +
                "id='" + id + '\'' +
                ", deviceid='" + deviceid + '\'' +
                ", devicename='" + devicename + '\'' +
                ", devicetype='" + devicetype + '\'' +
                ", createtime='" + createtime + '\'' +
                '}';
    }
}
