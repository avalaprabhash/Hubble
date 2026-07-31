import { Injectable } from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class Auth {
    login(username:string,password:string):boolean{
        // Demo credentials are hard-coded for the local prototype.
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
        // Persist the login flag so refreshes keep the session alive.
        return localStorage.getItem('isLoggedIn') === 'true';
    }
}
