import { NuevoComponenteHogarPage } from './nuevo-componente-hogar/nuevo-componente-hogar';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'componentes-hogar',
    templateUrl: 'componentes-hogar.html'
})
export class ComponentesHogarPage {
    started = false;
    user: any;
    showMpi = false;
    provincias;

    constructor(
        public navCtrl: NavController,
        ) {
    }

    nuevoComponenteHogar() {
        this.navCtrl.push(NuevoComponenteHogarPage);
    }
}
