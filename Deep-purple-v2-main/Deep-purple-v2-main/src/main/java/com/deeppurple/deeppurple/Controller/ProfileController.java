package com.deeppurple.deeppurple.Controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
public class ProfileController {

    @GetMapping(value = "users", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<User> getUser() {
        return List.of(new User("John", "Doe", "john.doe@baeldung.com"),
                new User("John", "Doe", "john.doe-2@baeldung.com"));
    }
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class User {

    private String name;
    private String surname;
    private String emailAddress;

    // standard constructor, getters and setters
}