import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { AddProductComponent } from './liste/add-product/add-product.component';
import { ProductFilterPipe } from './shared/product-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { Carousel, Dropdown, initTE } from 'tw-elements';
import { AuthGuard } from './auth.guard';
import { AuthServiceService } from './services/auth-service.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ListeComponent,
        ProductFilterPipe,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
        AuthServiceService, AuthGuard,

    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NavbarComponent,
        RouterModule, AppRoutingModule,
        NgxPaginationModule,
    ]
})
export class AppModule {
  
    ngOnInit() {
        initTE({ Carousel, Dropdown });
    }

    
}
