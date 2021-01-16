import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

// import { Component, Inject } from '@angular/core';
// import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-snackbar',
//   templateUrl: './snackbar.component.html'
// })
// export class SnackbarComponent {
//   constructor(
//     public snackBarRef: MatSnackBarRef<SnackbarComponent>,
//     @Inject(MAT_SNACK_BAR_DATA) public data: any
//   ) { }

// }