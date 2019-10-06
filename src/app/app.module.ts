import { NuevoComponenteHogarPage } from './../pages/encuesta/componentes-hogar/nuevo-componente-hogar/nuevo-componente-hogar';
import { ENV } from '@app/env';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
// import { LOCALE_ID } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

// // Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// import { EscanerDniPage } from '../pages/registro/escaner-dni/escaner-dni';
// import { RegistroPersonalDataPage } from '../pages/registro/personal-data/personal-data';
// import { RegistroUserDataPage } from '../pages/registro/user-data/user-data';
import { LoginPage } from '../pages/login/login';

import { PrincipalPage } from '../pages/principal/principal';
import { Encuesta1Page } from '../pages/encuesta/encuesta1';
import { ComponentesHogarPage } from '../pages/encuesta/componentes-hogar/componentes-hogar';
import { NavbarPage } from '../components/navbar/navbar';


// // Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Screenshot } from '@ionic-native/screenshot';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { Device } from '@ionic-native/device';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Camera } from '@ionic-native/camera';


// // Providers
import { AuthProvider } from '../providers/auth/auth';
import { NetworkProvider } from './../providers/network';
import { DeviceProvider } from '../providers/auth/device';
import { ToastProvider } from '../providers/toast';
import { ConstanteProvider } from '../providers/constantes';
import { ErrorReporterProvider } from '../providers/errorReporter';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { DatePickerModule } from 'ion-datepicker';
import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
//         EscanerDniPage,
//         RegistroPersonalDataPage,
//         RegistroUserDataPage,
        LoginPage,
        PrincipalPage,
        Encuesta1Page,
        ComponentesHogarPage,
        NuevoComponenteHogarPage,
        NavbarPage,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,

        ReactiveFormsModule,
        IonicModule.forRoot(MyApp),
        DatePickerModule,
        IonicStorageModule.forRoot({
            name: 'andes',
            driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        }),
        AgmCoreModule.forRoot({
            apiKey: ENV.MAP_KEY
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        Encuesta1Page,
        ComponentesHogarPage,
        NuevoComponenteHogarPage,
//         EscanerDniPage,
//         RegistroPersonalDataPage,
//         RegistroUserDataPage,
        LoginPage,
        NavbarPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        BarcodeScanner,
        EmailComposer,
        Screenshot,
        SQLite,
        Network,
//         // Sim,
        Device,
//         { provide: ErrorHandler, useClass: IonicErrorHandler },
        AuthProvider,
//         TurnosProvider,
        DeviceProvider,
        ToastProvider,
//         PacienteProvider,
        ConstanteProvider,
        NetworkProvider,
        ConnectivityProvider,
        ErrorReporterProvider,
        Geolocation,
        NativeGeocoder,
        Camera,
    ]
})
export class AppModule { }
