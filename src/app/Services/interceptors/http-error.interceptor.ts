import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req);
  return next(req).pipe(
    catchError((error : HttpErrorResponse) => {
      let errorMessage = 'Unknown Error Occured';
      if(error.error instanceof ErrorEvent) {
        errorMessage = `User-Side error : ${error.error.message}`
      }
      else {
        switch (error.status) {
          case 400:
            errorMessage = 'Bad Request. Please check your input.';
            break;
          case 401:
            errorMessage = 'Unauthorized. Please login again.';
            break;
          case 403:
            errorMessage = 'Forbidden. You do not have permission.';
            break;
          case 404:
            errorMessage = 'Not Found. The resource does not exist.';
            break;
          case 500:
            errorMessage = 'Server Error. Please try again later.';
            break;
          default:
            errorMessage = `Error: ${error.status} - ${error.message}`;
        }


      }
       return throwError(() => new Error(errorMessage));
    })
  );

};
