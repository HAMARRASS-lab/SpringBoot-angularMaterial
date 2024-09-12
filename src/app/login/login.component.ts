import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit{

   public loginForm! :  FormGroup;
  constructor( private fb: FormBuilder, private  authService: AuthService , private router: Router) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
     username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)

    });
  }
  // ngOnInit(): void {
  //   this.loginForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }
  login() : void {
    let username=this.loginForm.value.username;
    let password=this.loginForm.value.password;
    let auth:boolean= this.authService.login(username,password);

    if(auth==true){
      this.router.navigateByUrl("/admin")
    }
  }
}
