import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  code: any;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe((params) => {
        this.code = params['token'];
        console.log(this.code);

      })

    if (this.code) {
      localStorage.setItem('accessToken', this.code)
      Swal.fire({
        icon: 'success',
        title: 'Sign Up successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['/dashboard'])
      })

    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Network Error. Please try again',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['/login'])

      })
    }

  }

}
