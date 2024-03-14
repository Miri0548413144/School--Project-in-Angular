import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../models/course.model';
import { Router } from '@angular/router';
import { LearningMode } from '../models/course.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  courses: Course[] = [];
  categories: Category[] = [];
  selectedCategory: number = 0;
  selectedLearningMode: LearningMode | undefined;
  searchCourseName: string = '';
  constructor(private router: Router, private courseService: CourseService) { }


  ngOnInit(): void {
    this.loadCourses();
    this.loadCategories();
  }


  loadCourses(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data.filter(course => {
        let categoryMatch = true;
        let learningModeMatch = true;
        let courseNameMatch = true;

        if (this.selectedCategory) {
          categoryMatch = course.categoryId == this.selectedCategory;
        }

        if (this.selectedLearningMode) {
          learningModeMatch = course.learningMode == this.selectedLearningMode;
        }

        if (this.searchCourseName && this.searchCourseName.trim() !== '') {
          courseNameMatch = course.name.toLowerCase().includes(this.searchCourseName.toLowerCase());
        }

        return categoryMatch && learningModeMatch && courseNameMatch;
      });
    });
  }



  loadCategories(): void {
    this.courseService.getCategory().subscribe(data => {
      this.categories = data;
    });
  }


  applyFilter(): void {
    this.loadCourses();
  }


  onCourseSelected(c: Course) {
    if (sessionStorage.getItem('currentUser') || sessionStorage.getItem('currentLecturer')) {
      this.router.navigate([`/courseDetails/${c.id}`]);
    }
  }
}


