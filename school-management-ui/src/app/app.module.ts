import { CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users-grid/users.component'
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatCell,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { SchoolsGridComponent } from './schools-grid/schools-grid.component';
import { EditSchoolComponent } from './edit-school/edit-school.component';
import { DeleteSchoolComponent } from './delete-school/delete-school.component';
import { SubjectsGridComponent } from './subjects-grid/subjects-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavigationComponent,
    UserProfileComponent,
    UsersComponent,
    EditUserComponent,
    DeleteUserComponent,
    SchoolsGridComponent,
    EditSchoolComponent,
    DeleteSchoolComponent,
    SubjectsGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatCardHeader,
    MatCard,
    MatInput,
    MatButton,
    MatOption,
    MatSelect,
    MatLabel,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    CommonModule,
    MatTableModule,
    MatDialogClose,
    MatDialogActions,
    MatDialogContent,
    ReactiveFormsModule,
    MatDialogTitle,
    FlexLayoutModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatFormField),
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
