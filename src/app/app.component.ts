import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
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
    public httpClient: HttpClient,
    private httpService: HttpClientService
  ) {
    this.myReactiveTransaction = new FormGroup({
      customerName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', [
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      date: new FormControl('', Validators.required),
      paid: new FormControl(false),

      addProductDetailFields: new FormArray([
        new FormGroup({
          product: new FormControl('', Validators.required),
          price: new FormControl('', Validators.required),
          quantity: new FormControl('', Validators.required),
          amount: new FormControl('', Validators.required),
          gst: new FormControl('', Validators.required),
        }),
      ]),
    });
    this.formArray = this.myReactiveTransaction.get(
      'addProductDetailFields'
    ) as FormArray;
  }
  lstcomments: any = [];
  lstposts: Transactions[] = [];
  formArray: FormArray;

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
    this.getProducts();
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
  }

  onAdd() {
    this.formArray.push(
      new FormGroup({
        product: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        amount: new FormControl('', Validators.required),
        gst: new FormControl('', Validators.required),
      })
    );
  }

  title = 'BahikhataWeb';
}
