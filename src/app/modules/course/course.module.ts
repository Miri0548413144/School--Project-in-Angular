import { NgModule } from "@angular/core";
import { AddCourseComponent } from "./add-course/add-course.component";
import { CommonModule } from "@angular/common";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { AllCoursesComponent } from "./all-courses/all-courses.component";
import { CourseService } from "./course.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LearningModeIconPipe } from "./learning-mode-icon.pipe";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[
        AddCourseComponent,
        AllCoursesComponent,
        CourseDetailsComponent,
        LearningModeIconPipe
    ],
    imports:[
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule
    ],
    providers:[CourseService],
    exports:[
        AllCoursesComponent,
        AddCourseComponent,
        CourseDetailsComponent
     ]
})
export class CourseModule{
    
}