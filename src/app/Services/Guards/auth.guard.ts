import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn , Router, RouterStateSnapshot} from '@angular/router';


export const authGuard: CanActivateFn = (route : ActivatedRouteSnapshot, state : RouterStateSnapshot) => {

  const router = inject(Router);
  const role : any = route.data;
  const session = sessionStorage.getItem('loggedInUser');
  if(!session) {
    return router.navigateByUrl('');
  }
  let userType = JSON.parse(session).role;
  if(role.role === userType) {
    return true;
  }
  else{
   return router.navigateByUrl('');
  }

  // return true
};
