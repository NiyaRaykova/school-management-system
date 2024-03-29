import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users-grid/users.component';
import { SchoolsGridComponent } from './schools-grid/schools-grid.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'userProfile',
    component: UserProfileComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'schools',
    component: SchoolsGridComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
