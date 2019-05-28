import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { FormGroup ,FormBuilder, FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/service/http-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  constructor( private router: Router,private httpService:HttpService,public formBuilder:FormBuilder,private snackBar:MatSnackBar) { }


   user:UserModel=new UserModel();
 
   hide = true;
  registerForm = this.formBuilder.group({
    firstName:[this.user.firstName, [Validators.required]],
    lastName:[this.user.lastName, [Validators.required]],
    mobileNumber:[this.user.mobileNumber,[Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
    emailId:[this.user.emailId,[Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password:[this.user.password , [Validators.required,Validators.minLength(6), Validators.maxLength(10)]]
  });

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  mobileNumber = new FormControl('', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]);
  emailId = new FormControl('', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
  password = new FormControl('', [Validators.required,Validators.minLength(6), Validators.maxLength(10)]);


  getErrorMessageFirstName() {
    return this.firstName.hasError('required') ? 'You must enter a value' :   
            '';
  }
  

  getErrorMessageLastName() {
    return this.lastName.hasError('required') ? 'You must enter a value' :      
            '';
  }
  getErrorMessageMobileNumber() {
    return this.mobileNumber.hasError('required') ? 'You must enter a value' :
        this.mobileNumber.hasError('mobileNumber') ? 'Enter valid mobile number' :
            '';
  }
  getErrorMessageEmail() {
    return this.emailId.hasError('required') ? 'You must enter a value' :
        this.emailId.hasError('emailId') ? 'Not a valid email' :
            '';
  }
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
        this.password.hasError('password') ? 'Enter valid password' :
            '';
  }
 
  

  ngOnInit() {
      
  }
  onRegister()
  {

   // console.log( this.registerForm.value);
      this.httpService.postRequest("register",this.registerForm.value).subscribe(
        data =>{
          console.log(data.value);
          if(data.statusCode===100)
          {
             this.snackBar.open(data.statusMessage,'OK',{duration:3000});
             this.router.navigateByUrl("/login");
          }
          else
          {
             this.snackBar.open(data.statusMessage,'RETRY',{duration:3000});
          }
        }
      )
  }

}
