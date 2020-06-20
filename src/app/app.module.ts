import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import {RouterModule, Routes} from '@angular/router';
import { GroupComponent } from './group/group.component';
import { MarkComponent } from './mark/mark.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SubjectComponent } from './subject/subject.component';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path: '', redirectTo: '/students', pathMatch: 'full' },
  {path: 'groups', component: GroupComponent},
  {path: 'marks', component: MarkComponent},
  {path: 'teachers', component: TeacherComponent},
  {path: 'subjects', component: SubjectComponent},
  {path: 'students', component: StudentComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    MarkComponent,
    TeacherComponent,
    SubjectComponent,
    StudentComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
