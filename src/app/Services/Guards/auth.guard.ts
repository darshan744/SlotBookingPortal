import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn , Router, RouterStateSnapshot} from '@angular/router';


export const authGuard: CanActivateFn = (route : ActivatedRouteSnapshot, state : RouterStateSnapshot) => {

  const router = inject(Router);
  const role = route.data;
  const session = sessionStorage.getItem('loggedInUser');
  if(!session) {
    return router.navigateByUrl('');
  }
  let userType = JSON.parse(session).role;
  if(role === userType) {
    return true;
  }
  else{
   return false;
  }

  // return true
};
