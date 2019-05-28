import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http-service';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ForgotpasswordModel } from 'src/app/model/forgotpassword.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  constructor(private router: Router, private formBuilder: FormBuilder,private snackbar: MatSnackBar, private httpService: HttpService) { }
  hide = true;
  forgotpassword: ForgotpasswordModel=new ForgotpasswordModel();
  
  forgotpasswordForm=this.formBuilder.group({
    emailId:[this.forgotpassword.emailId,[Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
  });

  emailId = new FormControl('',[Validators.required,Validators.email ,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);

  getErrorMessageEmail() {
    return this.emailId.hasError('required') ? 'You must enter a value' :
        this.emailId.hasError('emailId') ? 'Not a valid email' :
            '';
  }

  ngOnInit() {
  }

  onForgotPassword()
  {
    this.httpService.postRequest("forgotPassword?emailId="+this.forgotpasswordForm.value.emailId,this.forgotpasswordForm.value).subscribe(
      data=>{
        if(data.statusCode===250)
        {
          this.snackbar.open(data.statusMessage,'OK',{duration:3000});
          this.router.navigateByUrl("/")
        }
        else{
          this.snackbar.open(data.statusMessage,'RETRY',{duration:3000});
        }
      }
    );
  }

}
