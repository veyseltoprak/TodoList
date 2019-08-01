package com.veyseltoprak.todolist.config;

import com.veyseltoprak.todolist.model.AuthProvider;
import com.veyseltoprak.todolist.model.User;
import com.veyseltoprak.todolist.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    private UserService userService;

    @Autowired
    public DataLoader(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        User user = new User();
        user.setName("Veysel");
        user.setEmail("user@veyseltoprak.com");
        user.setPassword("password");
        user.setProvider(AuthProvider.local);
        userService.saveUser(user);
    }

}