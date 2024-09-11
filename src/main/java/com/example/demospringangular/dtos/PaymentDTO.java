package com.example.demospringangular.dtos;

import com.example.demospringangular.entries.PaymentStatus;
import com.example.demospringangular.entries.PaymentType;
import com.example.demospringangular.entries.Student;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PaymentDTO {

    private Long id ;
    private LocalDate date;
    private double amount;
    private PaymentType type;
    private PaymentStatus status;

}