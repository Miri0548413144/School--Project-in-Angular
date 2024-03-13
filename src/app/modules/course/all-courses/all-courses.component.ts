import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, OnSameUrlNavigation, Router } from '@angular/router';
import { Course, LearningMode } from '../course.model';
import { CourseService } from '../course.service';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { LearningModeIconPipe } from '../learning-mode-icon.pipe';
@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  onCourseSelected(c: Course) {
    if(sessionStorage.getItem('currentUser')||sessionStorage.getItem('currentLecturer'))
      this.router.navigate([`/courseDetails/${c.id}`]);
  }
  courses: Course[] = [];

  ngOnInit(): void {
    this._courseService.getCourses().subscribe(data => {
      this.courses = data
      console.log(this.courses);
    })
  }

  constructor(private router: Router, private route: ActivatedRoute, private _courseService: CourseService) {
  }
}
