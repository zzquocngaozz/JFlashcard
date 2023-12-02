package com.example.jflashcardsv0_9.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
public class AsyncConfig {

    @Bean(name = "taskExecutor")
    public ThreadPoolTaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(3); // Số lượng luồng tối thiểu
        executor.setMaxPoolSize(5);  // Số lượng luồng tối đa
        executor.setQueueCapacity(10); // Số lượng tác vụ được chờ đợi khi pool đã đầy
        executor.setThreadNamePrefix("AsyncSendEmail-");
        executor.initialize();
        return executor;
    }
}




