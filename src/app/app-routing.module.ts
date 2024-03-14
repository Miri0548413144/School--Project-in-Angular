import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './modules/user/logout/logout.component';
import { LoginComponent } from './modules/user/login/login.component';
import { RegisterComponent } from './modules/user/register/register.component';
import { AllCoursesComponent } from './modules/course/all-courses/all-courses.component';
import { AddCourseComponent } from './modules/course/add-course/add-course.component';
import { CourseDetailsComponent } from './modules/course/course-details/course-details.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"login",component:LoginComponent},
  {path:"logout",component:LogoutComponent},
  {path:"register",component:RegisterComponent},
  {path:"allCourses",component:AllCoursesComponent},
  {path:"addCourses",component:AddCourseComponent},
  { path: 'edit-course/:id', component: AddCourseComponent },
  {path:"courseDetails/:id",component:CourseDetailsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
