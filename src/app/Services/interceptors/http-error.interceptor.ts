import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from '../Toastr/toastr.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastrService);
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
          case 0:
            errorMessage = "Server did not respond contact Administrator";
            break;
          default:
            errorMessage = `Error: ${error.status} - ${error.message}`;
        }
      }
        toastService.showToast(errorMessage , true);
       return throwError(() => new Error(errorMessage));
    })
  );

};
