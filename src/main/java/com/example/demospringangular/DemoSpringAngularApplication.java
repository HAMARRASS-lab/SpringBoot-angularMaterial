package com.example.demospringangular;

import com.example.demospringangular.entries.Payment;
import com.example.demospringangular.entries.PaymentStatus;
import com.example.demospringangular.entries.PaymentType;
import com.example.demospringangular.entries.Student;
import com.example.demospringangular.repository.PaymentRepository;
import com.example.demospringangular.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class DemoSpringAngularApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoSpringAngularApplication.class, args);
    }


    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository, PaymentRepository paymentRepository){

        return  args -> {
             studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                             .firstName("Hamza").code("11223344").programId("KIA")
                     .build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstName("hassane").code("1122334466").programId("ka")
                    .build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstName("Mohcine").code("1122334455").programId("ta")
                    .build());


            PaymentType[] paymentTypes=PaymentType.values();
            Random random= new Random();
            studentRepository.findAll().forEach(st->{
                for (int i=0; i<10; i++){
                     int index= random.nextInt(paymentTypes.length);
                    Payment payment=Payment.builder()
                            .amount(1000+(int)(Math.random()*20000))
                            .type(paymentTypes[index])
                            .status(PaymentStatus.CREATED)
                            .date(LocalDate.now())
                            .student(st)
                            .build();
                    paymentRepository.save(payment);
                }
            });

        };
    }

}
