import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideStore} from '@ngxs/store';

import {routes} from './app.routes';
import {AuthState} from './store/auth/auth.state';
import {withNgxsStoragePlugin} from '@ngxs/storage-plugin';
import {withNgxsLoggerPlugin} from '@ngxs/logger-plugin';
import {withNgxsReduxDevtoolsPlugin} from '@ngxs/devtools-plugin';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideStore([AuthState], withNgxsStoragePlugin({
        keys: ['auth.token']
      }),
      withNgxsLoggerPlugin(),
      withNgxsReduxDevtoolsPlugin()
    ),
  ]
};
