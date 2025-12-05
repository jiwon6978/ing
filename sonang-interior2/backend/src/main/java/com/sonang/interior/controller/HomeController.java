package com.sonang.interior.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/index.html")
    public String index() {
        return "index";
    }

    @GetMapping("/portfolio.html")
    public String portfolio() {
        return "portfolio";
    }

    @GetMapping("/reservation.html")
    public String reservation() {
        return "reservation";
    }

    @GetMapping("/contact.html")
    public String contact() {
        return "contact";
    }

    @GetMapping("/login.html")
    public String login() {
        return "login";
    }
}