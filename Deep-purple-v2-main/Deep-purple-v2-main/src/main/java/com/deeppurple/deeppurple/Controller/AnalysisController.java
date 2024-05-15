package com.deeppurple.deeppurple.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deeppurple.deeppurple.Service.AnalysisService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/analysis")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AnalysisController {

    @Autowired
    private AnalysisService analysisService;

    @RequestMapping("/getSentiment")
    public ResponseEntity<String> getSentimentFromText(@RequestBody String post) {
        try {

            System.out.println(post);
            ObjectMapper mapper = new ObjectMapper();
            String postText = mapper.readTree(post).get("text").asText();

            String responseBody = analysisService.textToSentiment(postText);

            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Error");
    }

    @RequestMapping("/getEmotion")
    public ResponseEntity<String> getEmotionFromText(@RequestBody String post) {
        try {

            ObjectMapper mapper = new ObjectMapper();
            String postText = mapper.readTree(post).get("text").asText();

            String responseBody = analysisService.textToEmotion(postText);

            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Error");
    }

    @PostMapping("/predictPostEmotionInBulk")
    public ResponseEntity<String> predictSentiment(@RequestBody String[] sentences) {
        try {
            String response = analysisService.analyzeSentences(sentences);
            System.out.println(response);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping("/savetweet")
    public ResponseEntity<String> saveTweet(@RequestBody String tweetData) {

        System.out.println(tweetData);

        return ResponseEntity.ok().body("Tweet saved");
    }

}
