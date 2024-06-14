package com.example.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @RequestMapping("/test")
    public String Hello(){
        System.out.println("[Hello]执行到这里了！");
        return "Hello World!";
    }
}
