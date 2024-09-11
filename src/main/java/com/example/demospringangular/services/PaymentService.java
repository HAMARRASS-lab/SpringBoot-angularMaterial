//package com.example.demospringangular.services;
//
//import com.example.demospringangular.entries.Payment;
//import com.example.demospringangular.entries.PaymentStatus;
//import com.example.demospringangular.entries.PaymentType;
//import com.example.demospringangular.entries.Student;
//import com.example.demospringangular.repository.PaymentRepository;
//import com.example.demospringangular.repository.StudentRepository;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.net.URI;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.time.LocalDate;
//import java.util.UUID;
//
//@Service
//public class PaymentService {
//
//    private StudentRepository studentRepository;
//    private PaymentRepository paymentRepository;
//    public Payment savePayment(MultipartFile file, LocalDate date, double amount, PaymentType type, String studentCode) throws IOException {
//
//        Path folderPath= Paths.get(System.getProperty("user.home"),"enset-data","payments");
//        if(!Files.exists(folderPath)){
//            Files.createDirectories(folderPath);
//        }
//        String fileName= UUID.randomUUID().toString();
//        Path filePath=Paths.get(System.getProperty("user.home"),"enset-data","payments",fileName+".pdf");
//        Files.copy(file.getInputStream(),filePath);
//        Student student=studentRepository.findByCode(studentCode);
//        Payment payment=Payment.builder()
//                .date(date).type(type).student(student)
//                .amount(amount)
//                .status(PaymentStatus.CREATED)
//                .file(filePath.toUri().toString())
//                .build();
//        return  paymentRepository.save(payment);
//    }
//
//
//    public Payment updatePaymentStatus( PaymentStatus status, Long id){
//        Payment payment=paymentRepository.findById(id).get();
//        payment.setStatus(status);
//
//        return  paymentRepository.save(payment);
//    }
//
//    public  byte[] getPaymentsFile( Long paymentId) throws IOException {
//        Payment payment =paymentRepository.findById(paymentId).get();
//        return  Files.readAllBytes(Path.of(URI.create(payment.getFile())));
//    }
//}
