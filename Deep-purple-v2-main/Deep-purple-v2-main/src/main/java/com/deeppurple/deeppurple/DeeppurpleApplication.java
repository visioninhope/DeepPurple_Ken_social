package com.deeppurple.deeppurple;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import com.deeppurple.deeppurple.Service.JsonPlaceholderService;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
@RestController
@Import(CorsConfiguration.class)
public class DeeppurpleApplication extends SpringBootServletInitializer {
	public static void main(String[] args) {
		SpringApplication.run(DeeppurpleApplication.class, args);
	}

	@Bean
	JsonPlaceholderService jsonPlaceholderService() {
		WebClient client = WebClient.builder()
				.baseUrl("https://jsonplaceholder.typicode.com")
				.build();

		HttpServiceProxyFactory factory = HttpServiceProxyFactory.builder(WebClientAdapter.forClient(client)).build();
		return factory.createClient(JsonPlaceholderService.class);
	}
}