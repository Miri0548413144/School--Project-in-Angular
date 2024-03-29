import { Component, Input, OnInit } from '@angular/core';
import { Course, LearningMode } from '../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { LoginComponent } from '../../user/login/login.component';
import { UserService } from '../../user/user.service';
import { Category } from '../models/category.model';
import { Lecturer } from 'src/app/modules/user/models/lecturer.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course!: Course;
  learningModes = LearningMode;
  lec = sessionStorage.getItem('currentLecturer');
  isLecturer: boolean = false;
  categories!: Category[];
  lecturers!: Lecturer[];
  getCategoryImg():string{
    return this.categories[this.course.categoryId-1].iconPath;
  }
  isStartInNextWeek(startDate: any): boolean {
    if (!(startDate instanceof Date)) {
      startDate = new Date(startDate);
    }
    const today = new Date();
    const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    const isNextWeek = startDate.getTime() >= today && startDate.getTime() <= nextWeek;
    return isNextWeek;
  }
  getLearningModeString(mode: LearningMode): string {
    return this.learningModes[mode];
  }
  ngOnInit(): void {
    this._courseService.getCategory().subscribe(data => {
      this.categories = data;
    });
    this._userService.getLecturer().subscribe(data => {
      this.lecturers = data;
    });
    this.route.paramMap.subscribe(params => {
      const courseId = parseInt(params.get('id') || '');
      this._courseService.getCourseById(courseId).subscribe(course => {
        this.course = course;
        if (this.lec) {
          const lect = JSON.parse(this.lec);
          if (this.course?.lecturerId == lect.id) {
            this.isLecturer = true;
          }
        }
      });
    });
  }
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }
  
  getLecturerName(lecturerId: number): string {
    const lecturer = this.lecturers.find(l => l.id === lecturerId);
    return lecturer ? lecturer.name : '';
  }
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _courseService: CourseService,
    private _userService: UserService
  ) { }

}
