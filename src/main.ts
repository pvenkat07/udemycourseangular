import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // Required for ngx-toastr
    importProvidersFrom(ToastrModule.forRoot()), // Configure ToastrModule globally
  ],
}).catch((err) => console.error(err));
