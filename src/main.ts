import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Bootstrap topic: start the standalone Angular app with the shared providers.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
