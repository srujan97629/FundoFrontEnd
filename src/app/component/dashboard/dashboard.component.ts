import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/service/http-service';
import { notStrictEqual } from 'assert';
import { Token } from '@angular/compiler';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  message: String;
  list: boolean = true;
  gird: boolean = false;
  constructor(private route: Router, private snackbar: MatSnackBar, private httpService: HttpService) { }

  ngOnInit() {
    this.message = "Fundo Notes";
  }

  verify() {
    if (localStorage.getItem('token') === null) {
      console.log("null value is present")
      this.route.navigateByUrl("/login");
      this.snackbar.open("Login first ", "ok", { duration: 10000 });

    }
    else {
      console.log(localStorage.getItem('token'))
    }
  }

  signout()
  {
    
     this.route.navigateByUrl("/login");
  }

  notes() {
    this.message = "Notes";
    // this.route.navigateByUrl("/dashboard");
  }

  archive() {
    this.message = "Archive";
    //this.route.navigateByUrl("/dashboard/archive");
  }

  trash() {
    this.message = "Trash";
    //this.route.navigateByUrl("/dashboard/bin");
  }
  reminders() {
    this.message = "Reminder";
    //this.route.navigateByUrl("/dashboard/reminder")
  }
  changeView() {
    if (this.list) {
      this.gird == true;
      this.list = false;
    }
    else {
      this.list == true;
      this.gird = false;
    }
  }

  getAllLabels() {
    this.httpService.getRequest("/label/getlabels").subscribe(

      (response) => {
        console.log("sucessfully got all labels", response),
          // this.data= response('body'),
          //console.log("data-->",this.data)
          // this.labels = response;
          //  console.log("got labels successfully",this.labels);
          console.log();
        // if(response.body.status===402)
        // {
        //   this.snackbar.open(response.body.Message,'Undo',{duration:1000})
        // }
      },
      (error) => {
        console.log("error", error);
      }
    )
  }

}
