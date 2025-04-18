import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {provideCharts, withDefaultRegisterables} from "ng2-charts";

import { httpErrorInterceptor } from './Services/interceptors/http-error.interceptor';
import { loadingInterceptor } from './Services/interceptors/Loading/loading.interceptor';
import {providePrimeNG} from 'primeng/config'
import Aura from '@primeng/themes/aura'
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      }
    }),
    provideHttpClient(
      withInterceptors([loadingInterceptor, httpErrorInterceptor])
    ),
    provideCharts(withDefaultRegisterables()),
  ],
};
