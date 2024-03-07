import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./models/user.model";
import { Observable } from "rxjs";

@Injectable()
export class UserService{
    getUsers():Observable<User[]>{
        return this._http.get<User[]>("/api/users");
    }
    getByIdUsers(id:number):Observable<User>{
        return this._http.get<User>("/api/users/"+id);
    }
    addUser(newUser:User):Observable<boolean>{
        this._http.post("/api/user/",newUser);
        return this._http.post<boolean>("/api/users",newUser);
    }
    constructor(private _http:HttpClient) {}
}