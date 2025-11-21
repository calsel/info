import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Portfolio } from "./app/components/portfolio/portfolio";
import { provideHttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  imports: [Portfolio],
  template: `<app-portfolio></app-portfolio>`,
})
export class AppComponent {
  name = 'Angular';
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
});
