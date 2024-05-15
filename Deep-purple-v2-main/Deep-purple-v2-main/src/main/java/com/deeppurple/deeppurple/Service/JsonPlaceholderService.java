package com.deeppurple.deeppurple.Service;

import org.springframework.web.service.annotation.GetExchange;

import com.deeppurple.deeppurple.Post.Post_Lambda;

import java.util.List;

public interface JsonPlaceholderService {

    @GetExchange("/posts")
    List<Post_Lambda> loadPosts();

}
