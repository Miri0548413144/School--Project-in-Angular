import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UserService } from "./user.service";
import { LogoutComponent } from "./logout/logout.component";

@NgModule({
    declarations:[
        RegisterComponent,
        LoginComponent,
        LogoutComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers:[UserService],
    exports:[ 
        RegisterComponent,
        LoginComponent,
        LogoutComponent
    ]
})
export class UserModule{
    
}