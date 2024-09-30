package com.example.demospringangular.dtos;

import com.example.demospringangular.entries.PaymentType;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class NewPaymentDTO {


    private PaymentType type;
    private double amount ;
    private LocalDate date;
    private String studentCode;
    private MultipartFile file;

}
