import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  url = 'http://localhost:8000/loginuser';
  constructor(private router: Router, private http: HttpClient) {}

  loginform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {}

  login() {
    this.http.get<any>(this.url).subscribe((res) => {
      const user: any = res.find((a: any) => {
        return (
          a.email === this.loginform.value.email &&
          a.password === this.loginform.value.password
        );
      });
      if (user) {
        localStorage.setItem('loginUser',"true")
        this.loginform.reset();
        this.router.navigate(['dashboard']);
      } else {
        alert('Something went wrong!');
      }
    });
  }
}
