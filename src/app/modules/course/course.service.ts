import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "./course.model";
import { HttpClient } from "@angular/common/http";
import { Category } from "./category.model";

@Injectable()
export class CourseService{
getCourses():Observable<Course[]>{
    return this._http.get<Course[]>("/api/Course");
    console.log("Courses from service")
}
getCourseById(id:number):Observable<Course>{
    return this._http.get<Course>("/api/Course/"+id);
}
addCourse(newCourse:Course):Observable<any>{
    console.log("coursetosaveservic:", newCourse);
    return this._http.post<any>("/api/Course",newCourse);
}
editCourse(newCourse:Course,id:number):Observable<any>{
    console.log("coursetoeditservic:", newCourse);
    return this._http.put<any>(`/api/Course/${id}`,newCourse);
}
getCategory():Observable<Category[]>{
    return this._http.get<Category[]>("/api/Category");
    console.log("Category from service")
}
constructor(private _http:HttpClient) {}}