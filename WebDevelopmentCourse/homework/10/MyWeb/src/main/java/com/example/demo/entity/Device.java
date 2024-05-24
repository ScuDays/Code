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
