package ru.kata.spring.boot_security.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/login")
public class LoginRestController {

    @GetMapping()
    public ModelAndView loginPage(){
        return new ModelAndView("login");
    }
}
