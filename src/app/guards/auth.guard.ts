import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
   constructor(private authService:AuthService , private router:Router) {
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

     if(this.authService.isAuthenticated){
       return true;
     }else{
       this.router.navigateByUrl("/login")
       return false
     }
    // Implement your logic here (e.g., check if the user is authenticated)

  }
}

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
