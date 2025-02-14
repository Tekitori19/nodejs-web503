// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
//
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app/app.routes";
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { authFeatureKey, authReducer } from "./app/auth/store/reducer";


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
})
