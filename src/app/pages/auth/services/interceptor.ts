import { HttpInterceptorFn } from '@angular/common/http';

export const interceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token') ?? '';

  const cloned = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token,
    },
  });

  return next(cloned);
  // Refresh Token
  // .pipe(
  //   catchError((error: HttpErrorResponse) => {
  //     if (error?.status == 403) {
  //       // return this.refreshTokenMethod(cloned, next, token);
  //     } else {
  //       return throwError(() => error);
  //     }
  //   })
  // );;
};
