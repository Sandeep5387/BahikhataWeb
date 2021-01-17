import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { api } from './Services/api.service';
import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { HttpClientService } from './helper/services/http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public apiService: api,
    public httpClient: HttpClient,
    private httpService: HttpClientService
  ) {}
  lstcomments: any[] = [];
  lstposts: any[] = [];

  ngOnInit() {
    // this.apiService.getComments().subscribe((data) => {
    //   this.lstcomments = data;
    // });
    // this.apiService.getCommentByParameter().subscribe((data) => {
    //   this.lstposts = data;
    // });
    // this.httpClient.get("src/app/JSON/apiData.json").subscribe(data =>{
    //   console.log(data);
    // })
  }

  //onSubmit(form: NgForm) {

  // console.log(form.value.Cust_name);
  onSubmit(form: NgForm) {
    //  console.log(form.value.Cust_name);  // Extract Value from form
    const {
      Cust_name,
      Mob_Num,
      Product,
      Price,
      Quantity,
      Amount,
      GST,
      Date,
      paid,
    } = form.value; // Destructuring of properties from object
    console.log(form.value);
    // loginForm.value.username can be accessed this way also
    const req = {
      // object literal
      payload: {
        customer: {
          id: "",
          name: Cust_name,
          contactNumber: Mob_Num,
        },
        products: [
          {
            product: {
              id: '',
              name: Product,
              price: Number(Price),
              gst: Number(GST),
            },
            amount: Number(Amount),
            quantity: Number(Quantity),
          },
        ],
        date: Date.toISOString(),
        isPaid: paid,
      },
    };
    //   this.apiService.addTransaction(form.value).subscribe((data) => {
    //       this.lstposts = data;
    // }
    // JSON.stringify(req)
    console.log(JSON.stringify(req));
    this.httpService.post('api/Transaction/addTransaction', req).toPromise().then((data) => {
      this.lstposts = data;
    });
  }
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.apiService.formData = {
      CustomerName: '',
      MobileNumber: '',
      ProductName: '',
      Price: null,
      Amount: null,
      Quantity: null,
      Date: null,
      GST: null,
      paid: false,
    };
  }

  title = 'BahikhataWeb';
}
