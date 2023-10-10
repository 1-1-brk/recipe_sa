package com.example.rsa_app.Configs;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

//@Component
@Slf4j
public class RequestsLogging implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Log the incoming request information
        String requestOrigin = request.getHeader("Origin");
        String requestURL = request.getRequestURL().toString();
        log.info("");
        log.info("");
        log.info("");
        log.info("");
        log.info("");
        log.info("");
        log.info("Incoming Request from Origin: " + requestOrigin);
        log.info("Request URL: " + requestURL);
        log.info("");
        log.info("");
        log.info("");
        log.info("");
        log.info("");
        log.info("");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // This method can be used for post-processing after handling the request
    }
}