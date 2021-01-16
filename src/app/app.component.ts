import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { api } from './Services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public apiService: api) {}
  lstcomments: any[] = [];
  lstposts: any[] = [];

  ngOnInit() {
    // this.apiService.getComments().subscribe((data) => {
    //   this.lstcomments = data;
    // });

    // this.apiService.getCommentByParameter().subscribe((data) => {
    //   this.lstposts = data;
    // });
    
  }

  onSubmit(form: NgForm) {
    this.apiService.addTransaction(form.value).subscribe((data) => {
         this.lstposts = data;
  });

}
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.apiService.formData = {
      CustomerName: '',
      MobileNumber: null,
      ProductName: '',
      Price: null,
      Amount: null,
      Quantity: null,
      Date: null,
      GST: '',
    };
  }

  title = 'BahikhataWeb';
}
