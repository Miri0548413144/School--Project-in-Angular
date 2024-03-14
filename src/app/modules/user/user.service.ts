import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./models/user.model";
import { Observable } from "rxjs";
import { Lecturer } from "src/app/modules/user/models/lecturer.model";

@Injectable()
export class UserService{
    getUsers():Observable<User[]>{
        return this._http.get<User[]>("/api/Users");
    }
    getUserById(id:number):Observable<User>{
        return this._http.get<User>("/api/Users/"+id);
    }
    addUser(newUser:User):Observable<any>{
        return this._http.post<any>("/api/Users",newUser);
    }
    getLecturer():Observable<Lecturer[]>{
        return this._http.get<Lecturer[]>("/api/Lecturer");
    }
    getLecturerById(id:number):Observable<Lecturer>{
        return this._http.get<Lecturer>("/api/Lecturer/"+id);
    }
    addLecturer(newUser:User):Observable<any>{
        return this._http.post<any>("/api/Lecturer",newUser);
    }
    constructor(private _http:HttpClient) {}
}