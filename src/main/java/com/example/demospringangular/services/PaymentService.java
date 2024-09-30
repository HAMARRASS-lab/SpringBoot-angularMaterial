package com.example.demospringangular.services;

import com.example.demospringangular.dtos.NewPaymentDTO;
import com.example.demospringangular.entries.Payment;
import com.example.demospringangular.entries.PaymentStatus;

import com.example.demospringangular.entries.Student;
import com.example.demospringangular.repository.PaymentRepository;
import com.example.demospringangular.repository.StudentRepository;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.UUID;

@Service
public class PaymentService {

    private StudentRepository studentRepository;
    private PaymentRepository paymentRepository;
    public Payment savePayment(MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException {

        Path folderPath= Paths.get(System.getProperty("user.home"),"enset-data","payments");
        if(!Files.exists(folderPath)){
            Files.createDirectories(folderPath);
        }
        String fileName= UUID.randomUUID().toString();
        Path filePath=Paths.get(System.getProperty("user.home"),"enset-data","payments",fileName+".pdf");
        Files.copy(file.getInputStream(),filePath);
        Student student=studentRepository.findByCode(newPaymentDTO.getStudentCode());
        Payment payment=Payment.builder()
                .date(newPaymentDTO.getDate())
                .type(newPaymentDTO.getType())
                .student(student)
                .amount(newPaymentDTO.getAmount())
                .status(PaymentStatus.CREATED)
                .file(filePath.toUri().toString())
                .build();
        return  paymentRepository.save(payment);
    }


//    public Payment updatePaymentStatus( PaymentStatus status, Long id){
//        Payment payment=paymentRepository.findById(id).get();
//        payment.setStatus(status);
//
//        return  paymentRepository.save(payment);
//    }

//    public  byte[] getPaymentsFile( Long paymentId) throws IOException {
//        Payment payment =paymentRepository.findById(paymentId).get();
//        return  Files.readAllBytes(Path.of(URI.create(payment.getFile())));
//    }
}
