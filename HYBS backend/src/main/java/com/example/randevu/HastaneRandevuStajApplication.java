package com.example.randevu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication (exclude= SecurityAutoConfiguration.class)
public class HastaneRandevuStajApplication {

	public static void main(String[] args) {
		SpringApplication.run(HastaneRandevuStajApplication.class, args);
	}

}
