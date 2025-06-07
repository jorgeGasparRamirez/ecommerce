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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideStore([AuthState, ProductState], withNgxsStoragePlugin({
        keys: [AuthState, ProductState]
      }),
      withNgxsLoggerPlugin(),
      withNgxsReduxDevtoolsPlugin()
    ),
  ]
};
