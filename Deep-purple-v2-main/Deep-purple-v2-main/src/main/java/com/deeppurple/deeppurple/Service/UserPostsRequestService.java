package com.deeppurple.deeppurple.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class UserPostsRequestService {

    public String getTweets(String username) {
        WebClient webClient = WebClient.create();// replace with the Twitter username
        System.out.println("Getting tweets for " + username);
        String url = "http://127.0.0.1:8000/tweets/" + username;

        String response = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        System.out.println(response);

        return response;
    }
}
