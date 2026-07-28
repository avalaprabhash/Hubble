import { Injectable } from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class Auth {
    login(username:string,password:string):boolean{
        if(username === 'admin' && password === "admin123"){
            localStorage.setItem('isLoggedIn', 'true');
            return true;
        }
        return false;
    }

    logout(){
        localStorage.removeItem('isLoggedIn');
    }

    isAuth(){
        return localStorage.getItem('isLoggedIn') === 'true';
    }
}
