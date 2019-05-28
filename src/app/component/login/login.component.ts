import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl} from '@angular/forms';
import { Router ,ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http-service';
import { MatSnackBar } from '@angular/material';
import { LoginModel} from 'src/app/model/login.model';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
    constructor(private router: Router, private route:ActivatedRoute,private formBuilder: FormBuilder,private snackbar: MatSnackBar
     , private httpService: HttpService) { }
    hide = true;
    token:string;
    login:LoginModel=new LoginModel();

    loginForm=this.formBuilder.group({
      emailId:[this.login.emailId,[Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
       password:[this.login.password,[Validators.required,Validators.minLength(6),Validators.maxLength(10)]]
    });
    
   
    

    emailId = new FormControl('', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
    password = new FormControl('', [Validators.required,Validators.minLength(6), Validators.maxLength(10)]);

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
       
      this.token=this.route.snapshot.paramMap.get('token');
        }  
        userdata:any;
            
  
  onLogin()
  {
    //console.log(this.loginForm.value);
    this.httpService.postRequest("login",this.loginForm.value).subscribe(
      data =>{
        console.log(data.status,data.statusMessage);
        if(data.statusCode === 200)
        {
         console.log(data.token);
         this.userdata=data;
         console.log(this.userdata);
          this.snackbar.open(data.statusMessage,'OK',{duration:3000});
          this.router.navigateByUrl("/dashboard");
          localStorage.setItem('token',data.token);
        }
        else
        {
          this.snackbar.open(data.statusMessage,'RETRY',{duration:3000});
          this.router.navigateByUrl("/login");
        }
      }
    );
  }

}
