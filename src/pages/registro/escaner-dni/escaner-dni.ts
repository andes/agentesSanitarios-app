import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { DocumentoEscaneados } from '../regex-documento-scan';

// providers
import { AuthProvider } from '../../../providers/auth/auth';

// pages
import { IntegranteEditPage } from '../../formularioFamiliar/integrante/integranteEdit';
/**
 * Generated class for the EscanerDniPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-escaner-dni',
  templateUrl: 'escaner-dni.html',
})
export class EscanerDniPage implements OnInit {

  loading: any;
  datosPersona: any = {};
  info: any;

  hogarId: any;

  public textoLibre: string = null;

  ngOnInit() {

  }

  constructor(
    public storage: Storage,
    public authService: AuthProvider,
    private barcodeScanner: BarcodeScanner,
    public navCtrl: NavController,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.hogarId = this.navParams.get('hogarId');
  }

  goToNuevoIntegrante() {
    this.navCtrl.push(IntegranteEditPage, { hogarId: this.hogarId });
  }

  private comprobarDocumentoEscaneado(documento): any {

    for (let key in DocumentoEscaneados) {

      if (DocumentoEscaneados[key].regEx.test(documento)) {

        return DocumentoEscaneados[key];
      }
    }

    return null;
  }

  private parseDocumentoEscaneado(documento: any) {

    let datos = this.textoLibre.match(documento.regEx);
    let sexo = '';
    if (documento.grupoSexo > 0) {
      sexo = (datos[documento.grupoSexo].toUpperCase() === 'F') ? 'Femenino' : 'Masculino';
    }

    this.datosPersona = {
      'nombre': datos[documento.grupoNombre],
      'apellido': datos[documento.grupoApellido],
      'documento': datos[documento.grupoNumeroDocumento].replace(/\D/g, ''),
      'fechaNacimiento': datos[documento.grupoFechaNacimiento],
      'sexo': sexo,
      'genero': sexo,
      'telefono': null
    };

    this.storage.set('barscancode', this.datosPersona);
    this.navCtrl.push(IntegranteEditPage, { hogarId: this.hogarId, datosPersona: this.datosPersona });
  }

  scanner() {
    this.barcodeScanner.scan(
      {
        preferFrontCamera: false,
        formats: 'QR_CODE,PDF_417',
        disableSuccessBeep: false,
        showTorchButton: true,
        torchOn: true,
        prompt: 'Poner el código de barra en la cámara',
        resultDisplayDuration: 500,
      }

    ).then((barcodeData) => {
      this.textoLibre = barcodeData.text;

      let documentoEscaneado = this.comprobarDocumentoEscaneado(this.textoLibre);

      this.parseDocumentoEscaneado(documentoEscaneado);
    }, (err) => {

    });
  }
}
