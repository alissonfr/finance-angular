import { registerLocaleData } from "@angular/common";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import localePt from "@angular/common/locales/pt";
import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from "@angular/core";
import { provideNativeDateAdapter } from "@angular/material/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { JwtModule } from "@auth0/angular-jwt";
import { authInterceptor } from "@core/interceptors/auth.interceptor";
import { NgxCurrencyInputMode, provideEnvironmentNgxCurrency } from "ngx-currency";
import { routes } from "./app.routes";

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideNativeDateAdapter(),
        importProvidersFrom([
            JwtModule.forRoot({
                config: {
                    tokenGetter: () => localStorage.getItem("token")
                }
            })
        ]),
        provideEnvironmentNgxCurrency({
            align: "left",
            allowNegative: true,
            allowZero: true,
            decimal: ",",
            precision: 2,
            prefix: "R$ ",
            suffix: "",
            thousands: ".",
            nullable: true,
            min: null,
            max: null,
            inputMode: NgxCurrencyInputMode.Financial,
        }),
        { provide: LOCALE_ID, useValue: "pt-BR" },
    ]
};
