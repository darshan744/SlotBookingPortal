import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {provideCharts, withDefaultRegisterables} from "ng2-charts";

import { httpErrorInterceptor } from './Services/interceptors/http-error.interceptor';
import { loadingInterceptor } from './Services/interceptors/Loading/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideAnimationsAsync(),
     provideHttpClient(
      withInterceptors([ loadingInterceptor , httpErrorInterceptor])
     ),
    provideCharts(withDefaultRegisterables()),
    ]
};
