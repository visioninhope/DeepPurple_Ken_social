package com.deeppurple.deeppurple.Controller;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import com.deeppurple.deeppurple.Post.Post_Lambda;
import com.deeppurple.deeppurple.Service.JsonPlaceholderService;
import com.deeppurple.deeppurple.Service.PostNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostLambdaController {

    private final JsonPlaceholderService jsonPlaceholderService;
    private static final Logger log = LoggerFactory.getLogger(PostLambdaController.class);
    private List<Post_Lambda> posts = new ArrayList<>();

    public PostLambdaController(JsonPlaceholderService jsonPlaceholderService) {
        this.jsonPlaceholderService = jsonPlaceholderService;
    }

    @GetMapping
    List<Post_Lambda> findAll() {
        return posts;
    }

    @GetMapping("/{id}")
    Optional<Post_Lambda> findById(@PathVariable Integer id) {
        return Optional.ofNullable(posts
                .stream()
                .filter(post -> post.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new PostNotFoundException("Post with id: " + id + " not found.")));
    }

    @PostMapping
    void create(@RequestBody Post_Lambda post) {
        posts.add(post);
    }

    @PutMapping("/{id}")
    void update(@RequestBody Post_Lambda post, @PathVariable Integer id) {
        posts.stream()
                .filter(p -> p.id().equals(id))
                .findFirst()
                .ifPresent(value -> posts.set(posts.indexOf(value), post));
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable Integer id) {
        posts.removeIf(post -> post.id().equals(id));
    }

    @PostConstruct
    private void init() {
        if (posts.isEmpty()) {
            log.info("Loading Posts using JsonPlaceHolderService");
            posts = jsonPlaceholderService.loadPosts();
        }
    }

}