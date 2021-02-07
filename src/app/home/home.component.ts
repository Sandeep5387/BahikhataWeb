import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  NgForm,
} from '@angular/forms';
import { HttpClientService } from '../helper/services/http-client.service';
import { Transactions, Response } from '../interfaces/response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myReactiveTransaction: FormGroup;
  transactionDataSource: Transactions[] = [];
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
      date: new FormControl(new Date(), Validators.required),
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
  displayedColumns: string[] = [
    'customerName',
    'mobileNumber',
    'products',
    'price',
    'quantity',
    'amount',
    'date',
  ];

  ngOnInit() {
    this.getProducts();
  }

  onSubmit() {
    //  console.log(form.value.Cust_name);  // Extract Value from form
    const {
      customerName,
      mobileNumber,
      date,
      paid,
    } = this.myReactiveTransaction.value; // Destructuring of properties from object
    console.log(this.myReactiveTransaction.value);
    // loginForm.value.username can be accessed this way also
    const pdf: any[] = this.formArray.value;
    const products: any[] = [];
    pdf.forEach((a) => {
      const obj = {
        product: {
          id: '',
          price: a.price,
          gst: a.gst,
          name: a.product,
        },
        amount: a.amount,
        quantity: a.quantity,
      };
      products.push(obj);
    });

    console.log(this.formArray.value);

    const req = {
      // object literal
      payload: {
        customer: {
          id: '',
          name: customerName,
          contactNumber: mobileNumber,
        },
        products,
        date: date.toISOString(),
        isPaid: paid,
      },
    };

    console.log(JSON.stringify(req));
    this.httpService
      .post('Transaction/addTransaction', req)
      .subscribe((data) => this.getProducts());
  }

  getProducts() {
    this.httpService
      .get('Transaction/getTransactions')
      .subscribe((data: Response<Transactions[]>) => {
        this.lstposts = data.payload;
        this.transactionDataSource = this.lstposts;
      });
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
  }
  productDetailsFormGroup: FormGroup = new FormGroup({
    product: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    quantity: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    gst: new FormControl('', Validators.required),
  });

  onAdd() {
    this.formArray.push(this.productDetailsFormGroup);
  }

  title = 'BahikhataWeb';
}
