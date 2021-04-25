import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
  registrationDetails: any={};
  registerForms:any=[];
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,

    ) {
        if (JSON.parse(localStorage.getItem('currentUser')) ){
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
        },{
            validator: this.userService.MustMatch('password', 'confirmPassword')
        });


    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
      this.submitted=true;
      this.registrationDetails=this.registerForm.controls;
      if(this.userNameExist(this.registrationDetails.username.value)){
        alert("Username already exist");
        return;
      }

        if (this.registerForm.invalid) {
            return;
        }

       let userData=JSON.parse(localStorage.getItem('userData'));
       if(!userData){
         userData=[];
       }
       var user={
         firstName:this.registrationDetails.firstName.value,
         mobileNumber:this.registrationDetails.mobileNumber.value,
         userName:this.registrationDetails.username.value,
         password:this.registrationDetails.password.value,
         confirmPassword:this.registrationDetails.confirmPassword.value
       }
       localStorage.setItem('currentUser',JSON.stringify(user));
       userData.push(user);
       localStorage.setItem('userData',JSON.stringify(userData));
       alert("Registration done successfully.");
         this.registrationDetails.firstName.reset();
         this.registrationDetails.mobileNumber.reset();
         this.registrationDetails.username.reset();
         this.registrationDetails.password.reset();
         this.registrationDetails.confirmPassword.reset();

    }

    userNameExist(userName){
      var users:any=JSON.parse(localStorage.getItem('userData'));
      if(!users){
        return false;
      }else{
        for(var i=0;i<users.length;i++){
          if(users[i].username==userName){
            return true;
          }
        }
      }
      return false;
    }
   
}
