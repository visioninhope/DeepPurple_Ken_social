package com.deeppurple.deeppurple.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deeppurple.deeppurple.Service.UserPostsRequestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/streamRequest")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserPostsRequestController {

    @Autowired
    private UserPostsRequestService userPostsRequestService;

    @GetMapping("/Twitter/{username}")
    public ResponseEntity<?> getTweets(@PathVariable String username) {
        String twitterfeeds = userPostsRequestService.getTweets(username);
        return ResponseEntity.ok(twitterfeeds);
    }

}
