import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { TestResolver } from './service/test.resolver';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path:"",
    redirectTo: "login",
    pathMatch:'full'
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"signup",
    component:SignUpComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    // canActivate: [AuthGuard],
    resolve: {
      productgetall :  TestResolver
    }
  },
  {
    path:"**",
    component:ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
