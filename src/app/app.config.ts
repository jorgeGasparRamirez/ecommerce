import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideStore} from '@ngxs/store';

import {withNgxsStoragePlugin} from '@ngxs/storage-plugin';
import {withNgxsLoggerPlugin} from '@ngxs/logger-plugin';
import {withNgxsReduxDevtoolsPlugin} from '@ngxs/devtools-plugin';
import {provideHttpClient} from '@angular/common/http';

import {provideRouter} from '@angular/router';


import {routes} from './app.routes';
import {AuthState} from './store/auth/auth.state';
import {ProductState} from './store/product/product.state';
import {ShoppingCarState} from './store/shopping-cart/shopping-car.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideStore([AuthState, ProductState, ShoppingCarState], withNgxsStoragePlugin({
        keys: [AuthState, ProductState, ShoppingCarState]
      }),
      withNgxsLoggerPlugin(),
      withNgxsReduxDevtoolsPlugin()
    ),
  ]
};
