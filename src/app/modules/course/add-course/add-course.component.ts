import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Course, LearningMode } from '../models/course.model';
import Swal from 'sweetalert2';
import { Category } from '../models/category.model';
import { Lecturer } from 'src/app/modules/user/models/lecturer.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm!: FormGroup;
  categories!: Category[];
  lecturers!: Lecturer[];
  course!: Course;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _courseService: CourseService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this._courseService.getCategory().subscribe(data => {
      this.categories = data;
    });
    this._userService.getLecturer().subscribe(data => {
      this.lecturers = data;
    });
    this.initForm(); // קריאה לפונקציה שמאתחלת את הטופס
    this.addSyllabus();
    this.route.paramMap.subscribe(params => {
      const courseId = parseInt(params.get('id') || '');
      if (courseId) {
        this._courseService.getCourseById(courseId).subscribe(course => {
          this.course = course;
          this.fetchf(course)

        });

      }
    });
  }
  public fetchf(course: Course): void {
    this.courseForm.patchValue({
      name: course.name,
      categoryId: course.categoryId,
      lessonCount: course.lessonCount,
      startDate: course.startDate,
      learningMode: course.learningMode,
      lecturerId: course.lecturerId,
      image: course.image
    });

    // Clear existing syllabus controls
    while (this.syllabusControls.length !== 0) {
      this.removeSyllabus(0);
    }

    // Populate syllabus controls with the syllabus of the course
    course.syllabus.forEach(syllabusItem => {
      this.addSyllabus();
    });

    // Set the value of each syllabus control
    course.syllabus.forEach((syllabusItem, index) => {
      this.syllabusControls.at(index).setValue(syllabusItem);
    });
  }
  private initForm(): void {
    this.courseForm = this.fb.group({
      name: [ '', Validators.required],
      categoryId: [ '', Validators.required],
      lessonCount: ['', [Validators.required, Validators.min(3), Validators.pattern(/^[1-9]\d*$/)]],
      startDate: [ '', Validators.required],
      syllabus: this.fb.array([]),
      learningMode: [ '', Validators.required],
      lecturerId: [ '', Validators.required],
      image: ['', Validators.required]
    });

    const syllabusArray = this.courseForm.get('syllabus') as FormArray;
    if (this.course?.syllabus && this.course.syllabus.length > 0) {
      this.course.syllabus.forEach(item => {
        syllabusArray.push(this.fb.control(item, Validators.required));
      });
    }
  }

  addCourse(): void {
    if (this.courseForm.invalid) {
      return;
    }

    const lastSyllabusIndex = this.syllabusControls.length - 1;
    if (lastSyllabusIndex >= 0) {
      const lastSyllabus = this.syllabusControls.at(lastSyllabusIndex).value;
      if (lastSyllabus.trim() === '') {
        this.syllabusControls.removeAt(lastSyllabusIndex);
      }
    }

    const formData = this.courseForm.value;
    formData.learningMode = parseInt(formData.learningMode);

    const newCourse = new Course(
      formData.name,
      formData.categoryId,
      formData.lessonCount,
      new Date(formData.startDate),
      formData.syllabus,
      formData.learningMode as LearningMode,
      formData.lecturerId,
      formData.image
    );
    if (this.course) {
      this._courseService.editCourse(newCourse, this.course.id).subscribe(() => {
        this.courseForm.reset();
        Swal.fire('Success', 'Login successful! Redirecting to courses page...', 'success');
        this.router.navigate(['/allCourses']);
      }, error => {
        console.error('Failed to add course:', error);
      });
    }
    else {
      this._courseService.addCourse(newCourse).subscribe(() => {
        this.courseForm.reset();
        Swal.fire('Success', 'Login successful! Redirecting to courses page...', 'success');
        this.router.navigate(['/allCourses']);
      }, error => {
        console.error('Failed to add course:', error);
      });
    }
  }

  get syllabusControls() {
    return this.courseForm.get('syllabus') as FormArray;
  }

  addSyllabus(): void {
    this.syllabusControls.push(this.fb.control(''));
  }

  removeSyllabus(index: number): void {
    this.syllabusControls.removeAt(index);
  }

  onInput(): void {
    const lastSyllabusIndex = this.syllabusControls.length - 1;
    const lastSyllabus = this.syllabusControls.at(lastSyllabusIndex).value;

    if (lastSyllabus.trim() !== '') {
      this.addSyllabus();
    }
  }
}
