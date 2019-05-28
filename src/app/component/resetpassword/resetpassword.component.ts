import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/service/http-service';
import { ResetpasswordModel } from 'src/app/model/resetpassword.model';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private snackbar: MatSnackBar, private httpService: HttpService) { }
  hide = true;
  resetpassword: ResetpasswordModel = new ResetpasswordModel();

  resetPasswordForm = this.formBuilder.group({
    newPassword: [this.resetpassword.newPassword, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
  });
  newPassword = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]);

  getErrorMessagePassword() {
    return this.newPassword.hasError('required') ? 'You must enter a value' :
      this.newPassword.hasError('password') ? 'Enter valid password' :
        '';
  }
  ngOnInit() {
  }
  getUrl() {
     return localStorage.getItem('token');
  }
  onReset() {
    console.log(this.resetPasswordForm.value);
  }

}
