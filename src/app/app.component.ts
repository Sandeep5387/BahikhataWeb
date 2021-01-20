import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { api } from './Services/api.service';
import {
  HttpClient,
  HttpParams,
  JsonpClientBackend,
} from '@angular/common/http';
import { HttpClientService } from './helper/services/http-client.service';
import { Transactions, Response } from './interfaces/response.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  myReactiveTransaction: FormGroup;
  constructor(
    public apiService: api,
    public httpClient: HttpClient,
    private httpService: HttpClientService
  ) {
    this.myReactiveTransaction = new FormGroup({
      customerName: new FormControl(''),
      mobileNumber: new FormControl(''),
      product: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl(''),
      amount: new FormControl(''),
      gst: new FormControl(''),
      date: new FormControl(''),
      paid: new FormControl(false),
    });
  }
  lstcomments: any = [];
  lstposts: Transactions[] = [];

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
    this.getProducts();
  }

  //onSubmit(form: NgForm) {

  // console.log(form.value.Cust_name);
  onSubmit() {
    //  console.log(form.value.Cust_name);  // Extract Value from form
    const {
      customerName,
      mobileNumber,
      product,
      price,
      quantity,
      amount,
      gst,
      date,
      paid,
    } = this.myReactiveTransaction.value; // Destructuring of properties from object
    console.log(this.myReactiveTransaction.value);
    // loginForm.value.username can be accessed this way also
    const req = {
      // object literal
      payload: {
        customer: {
          id: '',
          name: customerName,
          contactNumber: mobileNumber,
        },
        products: [
          {
            product: {
              id: '',
              name: product,
              price: Number(price),
              gst: Number(gst),
            },
            amount: Number(amount),
            quantity: Number(quantity),
          },
        ],
        date: date.toISOString(),
        isPaid: paid,
      },
    };
    //   this.apiService.addTransaction(form.value).subscribe((data) => {
    //       this.lstposts = data;
    // }
    // JSON.stringify(req)
    console.log(JSON.stringify(req));
    this.httpService.post('api/Transaction/addTransaction', req).subscribe();
  }

  getProducts() {
    this.httpService
      .get('api/Transaction/getTransactions')
      .subscribe((data: Response<Transactions[]>) => {
        this.lstposts = data.payload;
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
