package com.example.demospringangular.web;

import com.example.demospringangular.entries.Payment;
import com.example.demospringangular.entries.PaymentStatus;
import com.example.demospringangular.entries.PaymentType;
import com.example.demospringangular.entries.Student;
import com.example.demospringangular.repository.PaymentRepository;
import com.example.demospringangular.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class PaymentRestController {

    private StudentRepository studentRepository;
    private PaymentRepository paymentRepository;

    public PaymentRestController(PaymentRepository paymentRepository,StudentRepository studentRepository){
        this.studentRepository=studentRepository;
        this.paymentRepository=paymentRepository;
    }

    @GetMapping(path="/payments")
    public List<Payment> allPayments(){
        return  paymentRepository.findAll();
    }
    @GetMapping(path="/students/{code}/payments")
    public List<Payment> paymentsByStudent(@PathVariable  String code){
        return  paymentRepository.findByStudentCode(code);
    }


    @GetMapping(path="payments/{id}")
    public Payment getPaymentBy( @PathVariable  Long id){
        return  paymentRepository.findById(id).get();
    }

    @GetMapping(path="/paymentsByStatus")
    public List<Payment> paymentsByStatus(@RequestParam PaymentStatus status){
        return  paymentRepository.findByStatus(status);
    }
    @GetMapping(path="/paymentsByType")
    public List<Payment> paymentsByType(@RequestParam PaymentType type){
        return  paymentRepository.findByType(type);
    }

    @GetMapping("/students")
    public List<Student> allStudents(){

        return studentRepository.findAll();
    }

    @GetMapping("/students/{code}")
    public Student getStudentByCode(@PathVariable String code){
     return  studentRepository.findByCode(code);
    }

    @GetMapping("/studentsByProId/{programId}")
    public List<Student> getStudentByProgramId(@RequestParam   String programId){
        return  studentRepository.findByProgramId(programId);
    }

    @PutMapping("/payments/{id}")
    public Payment updatePaymentStatus(@RequestParam PaymentStatus status, @PathVariable Long id){
        Payment payment=paymentRepository.findById(id).get();
        payment.setStatus(status);

        return  paymentRepository.save(payment);
    }

    @PostMapping(path = "/payments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment savePayment(@RequestParam  MultipartFile file, LocalDate date, double amount, PaymentType type, String studentCode) throws IOException {

        Path folderPath= Paths.get(System.getProperty("user.home"),"enset-data","payments");
        if(!Files.exists(folderPath)){
            Files.createDirectories(folderPath);
        }
        String fileName= UUID.randomUUID().toString();
        Path filePath=Paths.get(System.getProperty("user.home"),"enset-data","payments",fileName+".pdf");
        Files.copy(file.getInputStream(),filePath);
        Student student=studentRepository.findByCode(studentCode);
        Payment payment=Payment.builder()
                .date(date).type(type).student(student)
                .amount(amount)
                .status(PaymentStatus.CREATED)
                .file(filePath.toUri().toString())
                .build();
        return  paymentRepository.save(payment);
    }

    @GetMapping(path = "/paymentFile/{paymentId}",produces = MediaType.APPLICATION_PDF_VALUE)
    public  byte[] getPaymentsFile(@PathVariable Long paymentId) throws IOException {
    Payment payment =paymentRepository.findById(paymentId).get();
    return  Files.readAllBytes(Path.of(URI.create(payment.getFile())));
    }

//    @GetMapping(path = "/paymentFile/{paymentId}", produces = MediaType.IMAGE_PNG_VALUE)
//    public ResponseEntity<byte[]> getPaymentsFile(@PathVariable Long paymentId) throws IOException, URISyntaxException {
//        Optional<Payment> paymentOptional = paymentRepository.findById(paymentId);
//
//        // Check if payment exists
//        if (paymentOptional.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//
//        Payment payment = paymentOptional.get();
//        URI fileUri = new URI(payment.getFile());
//
//        // Convert URI to Path
//        Path imagePath = Paths.get(fileUri);
//
//        // Check if file exists
//        if (!Files.exists(imagePath)) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//
//        byte[] imageBytes = Files.readAllBytes(imagePath);
//
//        // Return the image file as response
//        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);
//    }

}
