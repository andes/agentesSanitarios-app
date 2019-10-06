import { ComponentesHogarPage } from './componentes-hogar/componentes-hogar';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Provincias } from '../../assets/files/provincias';

@Component({
    selector: 'encuesta1',
    templateUrl: 'encuesta1.html'
})
export class Encuesta1Page {
    started = false;
    user: any;
    showMpi = false;
    provincias;

    constructor(
        // public authService: AuthProvider,
        // public deviceService: DeviceProvider,
        public navCtrl: NavController,
        // public menuCtrl: MenuController,
        // public reporter: ErrorReporterProvider
        ) {

        this.provincias = Provincias;
    }

    gotoComponentesHogar() {
        this.navCtrl.push(ComponentesHogarPage);
    }


}
