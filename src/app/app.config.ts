import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/header-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import { productFeature } from './state/product/feature/product.feature';
import { provideEffects } from '@ngrx/effects';
import { ProductEffect } from './state/product/effect/product.effect';
import { profileFeature } from './state/auth/feature/profile.feature';
import { cartFeature } from './state/cart/feature/cart.feature';
import { CartEffect } from './state/cart/effect/cart.effect';
import { orderFeature } from './state/order/feature/order.feature';
import { OrderEffect } from './state/order/effect/order.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideStore(),
    provideState(productFeature),
    provideState(profileFeature),
    provideState(cartFeature),
    provideState(orderFeature),
    provideEffects([ProductEffect, CartEffect, OrderEffect])
  ]
};
