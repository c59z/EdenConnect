package com.yuki;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;


@SpringBootApplication
public class EdenApplication {
    public static void main(String[] args) {
        SpringApplication.run(EdenApplication.class,args);
    }
}
