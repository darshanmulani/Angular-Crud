import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupuserService } from '../service/signupuser.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  userData: any;
  constructor(private signupUser: SignupuserService, private router: Router) {}

  signupform = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {}

  getUserData() {
    this.signupUser.signupuser(this.signupform.value).subscribe(
      (result) => {
        this.signupform.reset();
        this.router.navigate(['login']);
      },
      (err) => {
        alert('something went wrong!');
      }
    );
  }
}
