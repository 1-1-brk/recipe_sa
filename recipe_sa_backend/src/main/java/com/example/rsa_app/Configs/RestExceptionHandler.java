package com.example.rsa_app.Configs;


import com.example.rsa_app.DTOs.ErrorDto;
import com.example.rsa_app.Exceptions.AppException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = {AppException.class})
    @ResponseBody
    public ResponseEntity<ErrorDto> handleException(AppException e){
        return ResponseEntity.status(e.getStatusCode())
                .body(ErrorDto.builder()
                        .message(e.getMessage())
                        .build());
    }
}
