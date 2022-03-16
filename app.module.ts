import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InterceptorService } from './interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: LoggingInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
